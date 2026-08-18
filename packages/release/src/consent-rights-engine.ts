export const CONSENT_RIGHTS_ENGINE_VERSION='023.1.0';
export type ConsentPurpose={id:string;purpose:string;data:string;recipient:string;retention:string;downstreamUse:string;granted:boolean;evidence:string};
export type RightsControl={access:string;correction:string;deletion:string;withdrawal:string;retention:string;downstreamUse:string;owner:string;responseTime:string};
export type ConsentEvent={id:string;at:string;actor:string;action:'GRANTED'|'WITHDRAWN'|'CORRECTED';purposeId:string;prior:boolean;next:boolean;reason:string};
export type ConsentRightsInput={personLabel:string;purposes:ConsentPurpose[];controls:RightsControl;events:ConsentEvent[]};
export type ConsentRightsAssessment={status:'RIGHTS PATHS READY'|'RIGHTS GAPS'|'CONSENT UNDEFINED';gaps:string[];activePurposeCount:number;withdrawnPurposeCount:number;engineVersion:string};
const complete=(v:string)=>v.trim().length>=12;
export function assessConsentRights(input:ConsentRightsInput):ConsentRightsAssessment{
 const gaps:string[]=[];const ids=new Set<string>();
 if(!complete(input.personLabel))gaps.push('Name the person or represented group without using a real identifier in this demonstration.');
 if(!input.purposes.length)gaps.push('Define at least one specific purpose.');
 for(const p of input.purposes){
  if(ids.has(p.id))gaps.push(`${p.id}: use a unique purpose record ID.`);ids.add(p.id);
  for(const [key,value] of Object.entries({purpose:p.purpose,data:p.data,recipient:p.recipient,retention:p.retention,downstreamUse:p.downstreamUse,evidence:p.evidence}))if(!complete(value))gaps.push(`${p.id}: define ${key} with an evidence-bearing record.`);
 }
 for(const [key,value] of Object.entries(input.controls))if(!complete(value))gaps.push(`Define the ${key} rights path.`);
 for(const e of input.events){if(!ids.has(e.purposeId))gaps.push(`${e.id}: link the event to a known purpose.`);if(!complete(e.actor)||!complete(e.reason)||!e.at)gaps.push(`${e.id}: record actor, time, and reason.`);if(e.prior===e.next)gaps.push(`${e.id}: preserve a real state change.`)}
 const activePurposeCount=input.purposes.filter(p=>p.granted).length,withdrawnPurposeCount=input.purposes.length-activePurposeCount;
 const status:ConsentRightsAssessment['status']=!input.purposes.length?'CONSENT UNDEFINED':gaps.length?'RIGHTS GAPS':'RIGHTS PATHS READY';
 return {status,gaps:[...new Set(gaps)],activePurposeCount,withdrawnPurposeCount,engineVersion:CONSENT_RIGHTS_ENGINE_VERSION};
}
