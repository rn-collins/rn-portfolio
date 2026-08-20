export type ControlClass='OWN'|'RENT'|'DEPEND';export type RevocationRisk='low'|'medium'|'high'|'unknown';
export type LegalBasis='not-assessed'|'creator-origin-asserted'|'license-documented'|'contract-right-documented';
export type EvidenceSupport='creator-origin'|'operational-custody'|'account-access'|'contractual-use'|'export-test'|'backup-restore'|'transfer-test'|'revocation-terms';
export type OwnershipEvidence={id:string;locator:string;observedAt:string;reviewer:string;supports:EvidenceSupport};
export type RecoveryControl={available:boolean;evidence:OwnershipEvidence[];testedAt:string};
export type TransferControl={status:'not-established'|'contractual-right'|'operationally-tested';evidence:OwnershipEvidence[];testedAt:string};
export type CreatorAsset={id:string;name:string;kind:string;control:ControlClass;legalBasis:LegalBasis;provider:string;controlEvidence:OwnershipEvidence[];legalEvidence:OwnershipEvidence[];exportControl:RecoveryControl;backupControl:RecoveryControl;transferControl:TransferControl;revocationRisk:RevocationRisk;revocationEvidence:OwnershipEvidence[];revocationConditions:string;revocationResponse:string;exitPlan:string;replacementChannel:string};
export type OwnershipInput={assets:CreatorAsset[];schemaVersion:string;assessedAt:string};
export type AssetExposure={id:string;score:number;tier:'UNRESOLVED'|'CONTROLLED'|'EXPOSED'|'CRITICAL';reasons:string[];scoreBasis:string[]};
export type OwnershipAssessment={status:'MAP GAPS'|'CRITICAL DEPENDENCY'|'OWNERSHIP GAPS'|'MAPPED';exposures:AssetExposure[];blocking:string[];portfolioRisks:string[];engineVersion:string};
export const CREATOR_OWNERSHIP_ENGINE_VERSION='027.2.0';
const written=(v:string,min=4)=>v.trim().length>=min;const iso=(v:string)=>/^\d{4}-\d{2}-\d{2}$/.test(v);
const days=(a:string,b:string)=>Math.floor((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000);
const validEvidence=(e:OwnershipEvidence,assessedAt:string,support?:EvidenceSupport)=>written(e.id)&&written(e.locator,8)&&written(e.reviewer)&&iso(e.observedAt)&&days(assessedAt,e.observedAt)>=0&&days(assessedAt,e.observedAt)<=365&&(!support||e.supports===support);
const has=(xs:OwnershipEvidence[],date:string,support:EvidenceSupport)=>xs.some(x=>validEvidence(x,date,support));
export function assessCreatorOwnership(input:OwnershipInput):OwnershipAssessment{
 const blocking:string[]=[],portfolioRisks:string[]=[];
 if(!input.assets.length)blocking.push('Add at least one asset relationship.');
 if(input.schemaVersion!=='creator-ownership-map-v2')blocking.push('Use creator-ownership-map-v2 for this engine.');
 if(!iso(input.assessedAt))blocking.push('Record an ISO assessment date.');
 const ids=input.assets.map(x=>x.id.trim());if(ids.some(x=>!x))blocking.push('Every asset needs a stable identity.');if(new Set(ids).size!==ids.length)blocking.push('Asset identities must be unique after trimming.');
 const exposures=input.assets.map(asset=>{
  const reasons:string[]=[],scoreBasis:string[]=[];let score=asset.control==='OWN'?0:asset.control==='RENT'?3:5;scoreBasis.push(`operational relationship ${asset.control}: +${score}`);
  const assetBlockers:string[]=[];
  if(!written(asset.name))assetBlockers.push('name the asset');
  if(!written(asset.kind))assetBlockers.push('identify the asset type');
  if(!written(asset.provider,asset.control==='OWN'?4:8))assetBlockers.push('name the custodian, platform, licensor, host, or dependency');
  const controlSupport:EvidenceSupport=asset.control==='OWN'?'operational-custody':asset.control==='RENT'?'contractual-use':'account-access';
  if(!has(asset.controlEvidence,input.assessedAt,controlSupport))assetBlockers.push(`attach current evidence supporting ${controlSupport}, not merely a selected label`);
  if(asset.legalBasis==='not-assessed'){reasons.push('Legal title, license, or contractual basis is not assessed.');score+=1;scoreBasis.push('legal basis not assessed: +1')}
  if(asset.legalBasis==='creator-origin-asserted'&&!has(asset.legalEvidence,input.assessedAt,'creator-origin'))assetBlockers.push('support the creator-origin assertion with a dated provenance record');
  if((asset.legalBasis==='license-documented'||asset.legalBasis==='contract-right-documented')&&!has(asset.legalEvidence,input.assessedAt,'contractual-use'))assetBlockers.push('support the documented legal basis with current terms or license evidence');
  if(asset.exportControl.available){
   if(!has(asset.exportControl.evidence,input.assessedAt,'export-test')||!iso(asset.exportControl.testedAt)||days(input.assessedAt,asset.exportControl.testedAt)>180)assetBlockers.push('a usable export requires a current export test and evidence record');
  }else{reasons.push('No verified usable export path.');score+=2;scoreBasis.push('no verified export: +2')}
  if(asset.backupControl.available){
   if(!has(asset.backupControl.evidence,input.assessedAt,'backup-restore')||!iso(asset.backupControl.testedAt)||days(input.assessedAt,asset.backupControl.testedAt)>180)assetBlockers.push('a backup requires a current restoration test and evidence record');
  }else{reasons.push('No independently restorable current backup.');score+=2;scoreBasis.push('no restored backup: +2')}
  if(asset.transferControl.status==='operationally-tested'){
   if(!has(asset.transferControl.evidence,input.assessedAt,'transfer-test')||!iso(asset.transferControl.testedAt)||days(input.assessedAt,asset.transferControl.testedAt)>180)assetBlockers.push('operational transferability requires a current transfer test and evidence record');
  }else if(asset.transferControl.status==='contractual-right'){if(!has(asset.transferControl.evidence,input.assessedAt,'contractual-use'))assetBlockers.push('a contractual transfer right requires current terms evidence');reasons.push('Contract language has not been operationally tested.');score+=1;scoreBasis.push('untested contractual transfer: +1')}
  else{reasons.push('Transferability is not established.');score+=2;scoreBasis.push('transfer not established: +2')}
  if(asset.revocationRisk==='unknown'){reasons.push('Revocation exposure is unknown.');score+=3;scoreBasis.push('unknown revocation exposure: +3')}
  else if(!has(asset.revocationEvidence,input.assessedAt,'revocation-terms')&&!written(asset.revocationConditions,12)){assetBlockers.push('revocation risk requires current terms evidence or explicit conditions')}
  if(asset.revocationRisk==='medium'){reasons.push('Access may be revoked under documented conditions.');score+=1;scoreBasis.push('medium revocation exposure: +1')}
  if(asset.revocationRisk==='high'){reasons.push('High revocation or platform-loss exposure.');score+=3;scoreBasis.push('high revocation exposure: +3')}
  if(asset.control!=='OWN'&&!written(asset.revocationResponse,12)){reasons.push('No documented response to revocation.');score+=1;scoreBasis.push('no revocation response: +1')}
  if(asset.control!=='OWN'&&!written(asset.exitPlan,12)){reasons.push('No tested exit plan from the dependency.');score+=1;scoreBasis.push('no exit plan: +1')}
  if(asset.control==='DEPEND'&&!written(asset.replacementChannel,8)){reasons.push('No replacement distribution or access channel.');score+=1;scoreBasis.push('no replacement channel: +1')}
  for(const issue of assetBlockers)blocking.push(`${asset.id||'Asset'}: ${issue}.`);
  const tier:AssetExposure['tier']=assetBlockers.length?'UNRESOLVED':score>=8?'CRITICAL':score>=3?'EXPOSED':'CONTROLLED';
  return{id:asset.id,score,tier,reasons,scoreBasis};
 });
 if(input.assets.some(x=>x.control==='DEPEND'))portfolioRisks.push('At least one relationship depends on a system the creator does not operationally control.');
 if(input.assets.some(x=>!x.backupControl.available))portfolioRisks.push('At least one asset lacks an independently restored current backup.');
 if(input.assets.some(x=>!x.exportControl.available))portfolioRisks.push('At least one asset lacks a verified usable export path.');
 if(input.assets.some(x=>x.legalBasis==='not-assessed'))portfolioRisks.push('At least one legal basis remains explicitly unassessed.');
 const status:OwnershipAssessment['status']=blocking.length?'MAP GAPS':exposures.some(x=>x.tier==='CRITICAL')?'CRITICAL DEPENDENCY':exposures.some(x=>x.tier==='EXPOSED')?'OWNERSHIP GAPS':'MAPPED';
 return{status,exposures,blocking:[...new Set(blocking)],portfolioRisks:[...new Set(portfolioRisks)],engineVersion:CREATOR_OWNERSHIP_ENGINE_VERSION};
}
