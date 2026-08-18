export type DataClass='necessary'|'optional'|'sensitive'|'derived'|'prohibited';
export type PermissionState='granted'|'withdrawn'|'not-required';
export type DataField={id:string;label:string;classification:DataClass;collected:boolean;purpose:string;necessityBasis:string;permissionState:PermissionState;retentionDays:number|null;deletionTrigger:string;redactionRule:string;derivedFrom?:string;derivationLogic?:string};
export type MinimizationAssessment={status:'MINIMIZED'|'PARTIAL'|'OVER-COLLECTING';collectedCount:number;excludedCount:number;gaps:string[];prohibited:string[];redactions:Array<{id:string;rule:string}>;retention:Array<{id:string;days:number;trigger:string}>;engineVersion:string};
export const PRIVACY_MINIMIZATION_ENGINE_VERSION='024.1.0';
const written=(v:string)=>v.trim().length>=8;
export function assessDataMinimization(fields:DataField[]):MinimizationAssessment{
 const gaps:string[]=[];const prohibited=fields.filter(f=>f.collected&&f.classification==='prohibited').map(f=>f.id);
 for(const f of fields){if(!f.collected)continue;
  if(!written(f.purpose))gaps.push(`${f.id}: state a bounded purpose.`);
  if((f.classification==='necessary'||f.classification==='sensitive')&&!written(f.necessityBasis))gaps.push(`${f.id}: evidence necessity rather than asserting it.`);
  if(f.classification==='optional')gaps.push(`${f.id}: optional data is still collected; exclude it or justify reclassification.`);
  if(f.classification==='sensitive'&&f.permissionState!=='granted')gaps.push(`${f.id}: sensitive collection lacks an active purpose-specific permission record.`);
  if(f.classification==='derived'&&(!written(f.derivedFrom||'')||!written(f.derivationLogic||'')))gaps.push(`${f.id}: record source fields and derivation logic.`);
  if(f.retentionDays===null||f.retentionDays<1)gaps.push(`${f.id}: set a bounded retention period.`);
  if(!written(f.deletionTrigger))gaps.push(`${f.id}: name a deletion trigger.`);
  if(f.classification==='prohibited')gaps.push(`${f.id}: prohibited data must not be collected.`);
 }
 const status=prohibited.length?'OVER-COLLECTING':gaps.length?'PARTIAL':'MINIMIZED';
 return {status,collectedCount:fields.filter(f=>f.collected).length,excludedCount:fields.filter(f=>!f.collected).length,gaps,prohibited,redactions:fields.filter(f=>f.collected&&written(f.redactionRule)).map(f=>({id:f.id,rule:f.redactionRule})),retention:fields.filter(f=>f.collected&&f.retentionDays!==null).map(f=>({id:f.id,days:f.retentionDays!,trigger:f.deletionTrigger})),engineVersion:PRIVACY_MINIMIZATION_ENGINE_VERSION};
}