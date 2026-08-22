export type RawRecord={id:string;name:string;email:string;amount:string;unit:string;source:string};
export type Transformation={field:keyof Omit<RawRecord,'source'>;before:string;after:string;rule:string;ruleVersion:string;reversible:true};
export type DuplicateDecision='keep-separate'|'confirmed-same-entity'|'needs-more-evidence';
export type DuplicateReview={groupId:string;candidateSourceIds:string[];decision:DuplicateDecision;reviewer:string;reviewedAt:string;evidenceRef:string;rationale:string;identityResolutionRef?:string};
export type NormalizedRecord={sourceId:string;sourceLocator:string;rawSnapshot:RawRecord;canonicalName:string;canonicalEmail:string;amount:number|null;unit:string;transformations:Transformation[];duplicateGroup:string|null};
export type DataTrustInput={records:RawRecord[];schemaVersion:string;normalizationRulesVersion:string;duplicateReviews:DuplicateReview[]};
export type DataTrustAssessment={status:'TRUST GAPS'|'REVIEW REQUIRED'|'TRACEABLE';records:NormalizedRecord[];duplicateGroups:Record<string,string[]>;reviewDecisions:Record<string,DuplicateDecision>;blocking:string[];warnings:string[];engineVersion:string};
export const MESSY_DATA_TRUST_ENGINE_VERSION='026.2.0';
const dated=(v:string)=>/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?Z)?$/.test(v);
const written=(v:string,min=4)=>v.trim().length>=min;
const validEmail=(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const email=(v:string)=>v.trim().toLowerCase();
const name=(v:string)=>v.trim().replace(/\s+/g,' ').replace(/(^|[\s.'’-])\p{L}/gu,c=>c.toLocaleUpperCase());
const parseAmount=(v:string)=>{const raw=v.trim();if(!/^\$?\s*-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?$/.test(raw))return null;const n=Number(raw.replace(/[$,\s]/g,''));return Number.isFinite(n)?n:null};
const tx=(field:Transformation['field'],before:string,after:string,rule:string,version:string):Transformation|null=>before===after?null:{field,before,after,rule,ruleVersion:version,reversible:true};
const sameIds=(a:string[],b:string[])=>a.length===b.length&&[...a].sort().every((x,i)=>x===[...b].sort()[i]);
export function assessMessyDataTrust(input:DataTrustInput):DataTrustAssessment{
 const blocking:string[]=[],warnings:string[]=[];
 if(!input.records.length)blocking.push('Add at least one source record.');
 if(!written(input.schemaVersion))blocking.push('Declare the target schema version.');
 if(input.normalizationRulesVersion!==MESSY_DATA_TRUST_ENGINE_VERSION)blocking.push(`Use normalization rules version ${MESSY_DATA_TRUST_ENGINE_VERSION} for this engine.`);
 const ids=input.records.map(x=>x.id.trim());
 if(ids.some(x=>!x))blocking.push('Every source record needs a stable identity.');
 if(new Set(ids).size!==ids.length)blocking.push('Source record identities must be unique after trimming.');
 const records:NormalizedRecord[]=input.records.map(r=>{
  const sourceId=r.id.trim(),canonicalName=name(r.name),canonicalEmail=email(r.email),parsedAmount=parseAmount(r.amount),canonicalUnit=r.unit.trim().toUpperCase();
  const transformations=[tx('id',r.id,sourceId,'identity/trim',input.normalizationRulesVersion),tx('name',r.name,canonicalName,'name/space-and-case',input.normalizationRulesVersion),tx('email',r.email,canonicalEmail,'email/trim-lowercase',input.normalizationRulesVersion),tx('amount',r.amount,parsedAmount===null?'INVALID':String(parsedAmount),'number/strict-currency-parse',input.normalizationRulesVersion),tx('unit',r.unit,canonicalUnit,'unit/trim-uppercase',input.normalizationRulesVersion)].filter(Boolean) as Transformation[];
  return{sourceId,sourceLocator:r.source.trim(),rawSnapshot:{...r},canonicalName,canonicalEmail,amount:parsedAmount,unit:canonicalUnit,transformations,duplicateGroup:null};
 });
 const emailToIds:Record<string,string[]>={};for(const r of records)if(validEmail(r.canonicalEmail))(emailToIds[r.canonicalEmail]??=[]).push(r.sourceId);
 const duplicateGroups:Record<string,string[]>={};let i=0;for(const candidateIds of Object.values(emailToIds))if(candidateIds.length>1){const group=`DUP-${String(++i).padStart(2,'0')}`;duplicateGroups[group]=[...candidateIds];for(const r of records)if(candidateIds.includes(r.sourceId))r.duplicateGroup=group}
 for(const r of records){
  if(!r.canonicalName)blocking.push(`${r.sourceId||'Unknown record'}: name is empty after normalization.`);
  if(!validEmail(r.canonicalEmail))blocking.push(`${r.sourceId||'Unknown record'}: email is not structurally valid and cannot drive duplicate grouping.`);
  if(r.amount===null)blocking.push(`${r.sourceId||'Unknown record'}: amount is blank or not a strict currency number.`);
  if(!/^[A-Z]{3}$/.test(r.unit))blocking.push(`${r.sourceId||'Unknown record'}: unit must be a three-letter code.`);
  if(!written(r.sourceLocator,8))blocking.push(`${r.sourceId||'Unknown record'}: source provenance is missing or too vague.`);
 }
 const reviewsByGroup=new Map<string,DuplicateReview[]>();
 for(const review of input.duplicateReviews)(reviewsByGroup.get(review.groupId)||reviewsByGroup.set(review.groupId,[]).get(review.groupId)!).push(review);
 for(const review of input.duplicateReviews)if(!duplicateGroups[review.groupId])blocking.push(`${review.groupId||'Unknown review'}: review does not match a current duplicate group.`);
 const reviewDecisions:Record<string,DuplicateDecision>={};const open:string[]=[];
 for(const [groupId,candidateIds] of Object.entries(duplicateGroups)){
  const reviews=reviewsByGroup.get(groupId)||[];
  if(reviews.length!==1){open.push(groupId);if(reviews.length>1)blocking.push(`${groupId}: exactly one current review decision is allowed for this export.`);continue}
  const review=reviews[0];const traceable=sameIds(review.candidateSourceIds,candidateIds)&&written(review.reviewer)&&dated(review.reviewedAt)&&written(review.evidenceRef,8)&&written(review.rationale,12);
  if(!traceable){blocking.push(`${groupId}: review must bind the exact candidates and include reviewer, date, evidence reference, and rationale.`);open.push(groupId);continue}
  if(review.decision==='confirmed-same-entity'&&!written(review.identityResolutionRef||'',8)){blocking.push(`${groupId}: a confirmed identity requires a Build 011 identity-resolution record.`);open.push(groupId);continue}
  reviewDecisions[groupId]=review.decision;
  if(review.decision==='needs-more-evidence')open.push(groupId);
 }
 if(open.length)warnings.push(`${open.length} duplicate group${open.length===1?'':'s'} remain in review; no records were merged or removed.`);
 const status:DataTrustAssessment['status']=blocking.length?'TRUST GAPS':open.length?'REVIEW REQUIRED':'TRACEABLE';
 return{status,records,duplicateGroups,reviewDecisions,blocking:[...new Set(blocking)],warnings:[...new Set(warnings)],engineVersion:MESSY_DATA_TRUST_ENGINE_VERSION};
}
