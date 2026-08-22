export type DataClass='necessary'|'optional'|'sensitive'|'derived'|'prohibited';
export type PermissionState='granted'|'withdrawn'|'not-required';
export type DataField={
 id:string;label:string;classification:DataClass;collected:boolean;
 purposeId:string;purpose:string;necessityBasis:string;evidenceRefs:string[];
 permissionState:PermissionState;permissionPurposeId?:string;
 retentionDays:number|null;retentionBasis:string;deletionTrigger:string;deletionMethod:string;
 redactionRule:string;decisionOwner:string;counterfactualTested:boolean;functionalityImpact:string;
 derivedFrom?:string;derivationLogic?:string;sourceSensitivity?:'sensitive'|'non-sensitive';
};
export type MinimizationAssessment={
 status:'CONTROL CHECK PASSED'|'UNRESOLVED'|'OVER-COLLECTING';
 collectedCount:number;excludedCount:number;gaps:string[];prohibited:string[];
 redactions:Array<{id:string;rule:string}>;retention:Array<{id:string;days:number;basis:string;trigger:string;method:string}>;
 engineVersion:string;assuranceBoundary:string;
};
export const PRIVACY_MINIMIZATION_ENGINE_VERSION='024.2.0';
const written=(v:string,min=8)=>v.trim().length>=min;
const referenced=(values:string[])=>values.some(v=>written(v,5));
export function assessDataMinimization(fields:DataField[]):MinimizationAssessment{
 const gaps:string[]=[];
 if(fields.length===0)gaps.push('Inventory is empty; no minimization conclusion is available.');
 const seen=new Set<string>();
 for(const f of fields){
  if(!written(f.id,3)||seen.has(f.id))gaps.push(`${f.id||'UNNAMED'}: field identifiers must be present and unique.`);
  seen.add(f.id);
  if(!written(f.label,3))gaps.push(`${f.id}: name the field.`);
  if(!written(f.decisionOwner))gaps.push(`${f.id}: name the accountable classification owner.`);
  if(!f.collected)continue;
  if(!written(f.purposeId,3)||!written(f.purpose))gaps.push(`${f.id}: bind collection to a specific purpose identifier and bounded purpose.`);
  if(f.classification==='optional')gaps.push(`${f.id}: optional data is still collected; permission does not establish necessity.`);
  if(f.classification==='prohibited')gaps.push(`${f.id}: prohibited data must not be collected.`);
  if(!['optional','prohibited'].includes(f.classification)){
   if(!written(f.necessityBasis)||!referenced(f.evidenceRefs))gaps.push(`${f.id}: necessity requires a reason and at least one inspectable evidence reference.`);
   if(!f.counterfactualTested||!written(f.functionalityImpact))gaps.push(`${f.id}: document a tested no-collection counterfactual and its functionality impact.`);
  }
  if(f.classification==='sensitive'){
   if(f.permissionState!=='granted')gaps.push(`${f.id}: sensitive collection lacks active purpose-specific permission inherited from Build 023.`);
   if(!f.permissionPurposeId||f.permissionPurposeId!==f.purposeId)gaps.push(`${f.id}: permission purpose does not match the collection purpose.`);
  }
  if(f.classification==='derived'){
   if(!written(f.derivedFrom||'')||!written(f.derivationLogic||''))gaps.push(`${f.id}: record source fields and derivation logic.`);
   if(f.sourceSensitivity==='sensitive'&&(f.permissionState!=='granted'||f.permissionPurposeId!==f.purposeId))gaps.push(`${f.id}: derivation from sensitive data lacks matching active purpose-specific permission.`);
  }
  if(f.retentionDays===null||!Number.isInteger(f.retentionDays)||f.retentionDays<1)gaps.push(`${f.id}: set a positive whole-day retention limit.`);
  if(!written(f.retentionBasis))gaps.push(`${f.id}: document the basis for the retention period.`);
  if(!written(f.deletionTrigger)||!written(f.deletionMethod))gaps.push(`${f.id}: specify both deletion trigger and deletion method.`);
  if(!written(f.redactionRule))gaps.push(`${f.id}: specify an export/disclosure redaction rule, including “none” with a reason.`);
 }
 const prohibited=fields.filter(f=>f.collected&&f.classification==='prohibited').map(f=>f.id);
 const status=prohibited.length||fields.some(f=>f.collected&&f.classification==='optional')?'OVER-COLLECTING':gaps.length?'UNRESOLVED':'CONTROL CHECK PASSED';
 return {
  status,collectedCount:fields.filter(f=>f.collected).length,excludedCount:fields.filter(f=>!f.collected).length,gaps,prohibited,
  redactions:fields.filter(f=>f.collected&&written(f.redactionRule)).map(f=>({id:f.id,rule:f.redactionRule})),
  retention:fields.filter(f=>f.collected&&f.retentionDays!==null).map(f=>({id:f.id,days:f.retentionDays!,basis:f.retentionBasis,trigger:f.deletionTrigger,method:f.deletionMethod})),
  engineVersion:PRIVACY_MINIMIZATION_ENGINE_VERSION,
  assuranceBoundary:'A passed deterministic control check is not proof of necessity, lawful processing, effective deletion, or compliance.'
 };
}
