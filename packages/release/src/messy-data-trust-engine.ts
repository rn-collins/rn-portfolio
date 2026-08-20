export type RawRecord={id:string;name:string;email:string;amount:string;unit:string;source:string};
export type Transformation={field:string;before:string;after:string;rule:string;reversible:boolean};
export type NormalizedRecord={sourceId:string;canonicalName:string;canonicalEmail:string;amount:number|null;unit:string;transformations:Transformation[];duplicateGroup:string|null};
export type DataTrustInput={records:RawRecord[];schemaVersion:string;normalizationRulesVersion:string;reviewedDuplicateGroups:string[]};
export type DataTrustAssessment={status:'TRUST GAPS'|'REVIEW REQUIRED'|'TRACEABLE';records:NormalizedRecord[];duplicateGroups:Record<string,string[]>;blocking:string[];warnings:string[];engineVersion:string};
export const MESSY_DATA_TRUST_ENGINE_VERSION='026.1.0';
const email=(v:string)=>v.trim().toLowerCase();
const name=(v:string)=>v.trim().replace(/\s+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const amount=(v:string)=>{const n=Number(v.replace(/[$,\s]/g,''));return Number.isFinite(n)?n:null};
const tx=(field:string,before:string,after:string,rule:string):Transformation|null=>before===after?null:{field,before,after,rule,reversible:true};
export function assessMessyDataTrust(input:DataTrustInput):DataTrustAssessment{
 const blocking:string[]=[],warnings:string[]=[];
 if(!input.records.length)blocking.push('Add at least one source record.');
 if(!input.schemaVersion.trim())blocking.push('Declare the target schema version.');
 if(!input.normalizationRulesVersion.trim())blocking.push('Declare the normalization-rules version.');
 const ids=input.records.map(x=>x.id.trim());
 if(ids.some(x=>!x))blocking.push('Every source record needs a stable identity.');
 if(new Set(ids).size!==ids.length)blocking.push('Source record identities must be unique.');
 const records:NormalizedRecord[]=input.records.map(r=>{
  const canonicalName=name(r.name),canonicalEmail=email(r.email),parsedAmount=amount(r.amount),canonicalUnit=r.unit.trim().toUpperCase();
  const transformations=[tx('name',r.name,canonicalName,'name/title-case-v1'),tx('email',r.email,canonicalEmail,'email/lowercase-v1'),tx('amount',r.amount,parsedAmount===null?'INVALID':String(parsedAmount),'number/currency-strip-v1'),tx('unit',r.unit,canonicalUnit,'unit/uppercase-v1')].filter(Boolean) as Transformation[];
  return{sourceId:r.id,canonicalName,canonicalEmail,amount:parsedAmount,unit:canonicalUnit,transformations,duplicateGroup:null};
 });
 const keyToIds:Record<string,string[]>={};for(const r of records){const key=r.canonicalEmail||`${r.canonicalName}|${r.amount}|${r.unit}`;(keyToIds[key]??=[]).push(r.sourceId)}
 const duplicateGroups:Record<string,string[]>={};let i=0;for(const ids of Object.values(keyToIds))if(ids.length>1){const group=`DUP-${String(++i).padStart(2,'0')}`;duplicateGroups[group]=ids;for(const r of records)if(ids.includes(r.sourceId))r.duplicateGroup=group}
 for(const r of records){if(!r.canonicalName)blocking.push(`${r.sourceId}: name is empty after normalization.`);if(!r.canonicalEmail.includes('@'))blocking.push(`${r.sourceId}: email is not structurally valid.`);if(r.amount===null)blocking.push(`${r.sourceId}: amount could not be parsed.`);if(!r.sourceId.trim())continue;if(!input.records.find(x=>x.id===r.sourceId)?.source.trim())blocking.push(`${r.sourceId}: source provenance is missing.`)}
 const open=Object.keys(duplicateGroups).filter(x=>!input.reviewedDuplicateGroups.includes(x));if(open.length)warnings.push(`${open.length} duplicate group${open.length===1?'':'s'} require human review; no records were silently merged.`);
 const status:DataTrustAssessment['status']=blocking.length?'TRUST GAPS':open.length?'REVIEW REQUIRED':'TRACEABLE';
 return{status,records,duplicateGroups,blocking:[...new Set(blocking)],warnings,engineVersion:MESSY_DATA_TRUST_ENGINE_VERSION};
}
