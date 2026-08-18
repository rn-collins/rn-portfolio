export const CONSENT_RIGHTS_ENGINE_VERSION='023.2.0';
export type ConsentPurpose={id:string;purpose:string;data:string;recipient:string;retention:string;downstreamUse:string;granted:boolean;evidence:string};
export type RightsControl={access:string;correction:string;deletion:string;withdrawal:string;retention:string;downstreamUse:string;owner:string;responseTime:string};
export type ConsentEvent={id:string;at:string;actor:string;action:'GRANTED'|'WITHDRAWN'|'CORRECTED';purposeId:string;prior:boolean;next:boolean;reason:string};
export type ConsentRightsInput={personLabel:string;purposes:ConsentPurpose[];controls:RightsControl;events:ConsentEvent[]};
export type ConsentRightsAssessment={status:'RIGHTS PATHS READY'|'RIGHTS GAPS'|'CONSENT UNDEFINED';gaps:string[];activePurposeCount:number;withdrawnPurposeCount:number;validEventCount:number;engineVersion:string};
const complete=(v:string)=>v.trim().length>=12;
export function assessConsentRights(input:ConsentRightsInput):ConsentRightsAssessment{
 const gaps:string[]=[];const ids=new Set<string>();const eventIds=new Set<string>();
 if(!complete(input.personLabel))gaps.push('Name the person or represented group without using a real identifier in this demonstration.');
 if(!input.purposes.length)gaps.push('Define at least one specific purpose.');
 for(const p of input.purposes){
  if(!p.id.trim())gaps.push('Every purpose needs a stable record ID.');
  if(ids.has(p.id))gaps.push(`${p.id}: use a unique purpose record ID.`);ids.add(p.id);
  for(const [key,value] of Object.entries({purpose:p.purpose,data:p.data,recipient:p.recipient,retention:p.retention,downstreamUse:p.downstreamUse,evidence:p.evidence}))if(!complete(value))gaps.push(`${p.id||'Purpose'}: define ${key} with an evidence-bearing record.`);
 }
 for(const [key,value] of Object.entries(input.controls))if(!complete(value))gaps.push(`Define the ${key} rights path.`);
 const states=new Map(input.purposes.map(p=>[p.id,p.granted]));const lastAt=new Map<string,number>();let validEventCount=0;
 for(let index=input.events.length-1;index>=0;index--){const e=input.events[index];if(!states.has(e.purposeId))continue;states.set(e.purposeId,e.prior)}
 for(const e of input.events){
  let valid=true;if(eventIds.has(e.id)){gaps.push(`${e.id}: event IDs must be unique.`);valid=false}else eventIds.add(e.id);
  if(!ids.has(e.purposeId)){gaps.push(`${e.id}: link the event to a known purpose.`);valid=false}
  if(!complete(e.actor)||!complete(e.reason)){gaps.push(`${e.id}: record actor and reason.`);valid=false}
  const at=Date.parse(e.at);if(!Number.isFinite(at)){gaps.push(`${e.id}: record a valid event time.`);valid=false}
  const previousAt=lastAt.get(e.purposeId);if(Number.isFinite(at)&&previousAt!==undefined&&at<previousAt){gaps.push(`${e.id}: events must remain chronological within a purpose.`);valid=false}if(Number.isFinite(at))lastAt.set(e.purposeId,at);
  const expected=states.get(e.purposeId);if(expected!==undefined&&e.prior!==expected){gaps.push(`${e.id}: prior state does not continue the append-only chain.`);valid=false}
  if(e.prior===e.next){gaps.push(`${e.id}: preserve a real state change.`);valid=false}
  if(e.action==='GRANTED'&&(e.prior||!e.next)){gaps.push(`${e.id}: GRANTED must change not-granted to granted.`);valid=false}
  if(e.action==='WITHDRAWN'&&(!e.prior||e.next)){gaps.push(`${e.id}: WITHDRAWN must change granted to not-granted.`);valid=false}
  states.set(e.purposeId,e.next);if(valid)validEventCount++;
 }
 for(const p of input.purposes)if(states.get(p.id)!==p.granted)gaps.push(`${p.id}: current permission state conflicts with its event history.`);
 const activePurposeCount=input.purposes.filter(p=>p.granted).length,withdrawnPurposeCount=input.purposes.length-activePurposeCount;
 const status:ConsentRightsAssessment['status']=!input.purposes.length?'CONSENT UNDEFINED':gaps.length?'RIGHTS GAPS':'RIGHTS PATHS READY';
 return {status,gaps:[...new Set(gaps)],activePurposeCount,withdrawnPurposeCount,validEventCount,engineVersion:CONSENT_RIGHTS_ENGINE_VERSION};
}
