export type AccessNeed='lowVision'|'colorIndependent'|'keyboardOnly'|'reducedMotion'|'lowBandwidth'|'plainLanguage'|'reducedDensity';
export type RepairKey='textScale125'|'highContrast'|'nonColorCues'|'visibleFocus'|'target44'|'motionReduced'|'lightweightMode'|'plainLanguage'|'reducedDensity';
export type RepairSet=Record<RepairKey,boolean>;
export type EvidenceRef={id:string;title:string;url:string;checkedAt:string;scope:'design-guidance'|'test-procedure'};
export type InclusiveInput={needs:AccessNeed[];repairs:RepairSet;consentForDemonstration:boolean;profilePersisted:boolean;changeTraceId:string;evidence:EvidenceRef[];assessedAt:string};
export type Finding={id:string;kind:'control'|'mapping'|'interaction'|'evidence';message:string;needs:AccessNeed[];repairs:RepairKey[]};
export type InclusiveAssessment={status:'CONTROL BLOCKED'|'MAPPED GAPS'|'MAPPED CONTROLS PRESENT';findings:Finding[];applied:RepairKey[];mappingVersion:string;engineVersion:string;limitations:string[]};
export const INCLUSIVE_EXPERIENCE_ENGINE_VERSION='030.2.0';
export const INCLUSIVE_MAPPING_VERSION='030-map-2';
export const REPAIR_ORDER:RepairKey[]=['textScale125','highContrast','nonColorCues','visibleFocus','target44','motionReduced','lightweightMode','plainLanguage','reducedDensity'];
export const NEED_ORDER:AccessNeed[]=['lowVision','colorIndependent','keyboardOnly','reducedMotion','lowBandwidth','plainLanguage','reducedDensity'];
const required:Record<AccessNeed,RepairKey[]>={lowVision:['textScale125','highContrast'],colorIndependent:['nonColorCues'],keyboardOnly:['visibleFocus','target44'],reducedMotion:['motionReduced'],lowBandwidth:['lightweightMode'],plainLanguage:['plainLanguage'],reducedDensity:['reducedDensity']};
const interactions:Array<{needs:AccessNeed[];repairs:RepairKey[];message:string}>=[
 {needs:['lowVision','lowBandwidth'],repairs:['textScale125','lightweightMode'],message:'Zoom and text scaling must remain usable when lightweight delivery removes nonessential assets.'},
 {needs:['keyboardOnly','reducedDensity'],repairs:['visibleFocus','target44','reducedDensity'],message:'Reduced density must not remove focus order, labels, or reachable actions.'}
];
// Only declared access conditions participate; this deliberately avoids inferring a person or diagnosis.
const validInteractions=interactions;
function validDate(value:string){return /^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(`${value}T00:00:00Z`))}
export function assessInclusiveExperience(input:InclusiveInput):InclusiveAssessment{
 const findings:Finding[]=[];const selected=NEED_ORDER.filter(n=>input.needs.includes(n));
 if(!input.consentForDemonstration)findings.push({id:'control:consent',kind:'control',message:'Confirm this is an interface-condition demonstration before applying transient selections.',needs:[],repairs:[]});
 if(input.profilePersisted)findings.push({id:'control:persistence',kind:'control',message:'Do not persist, transmit, or identify a visitor from these transient selections.',needs:[],repairs:[]});
 if(!input.changeTraceId.trim())findings.push({id:'control:trace',kind:'control',message:'Link the derived repair change to a Build 029 trace.',needs:[],repairs:[]});
 if(!validDate(input.assessedAt))findings.push({id:'control:assessment-date',kind:'control',message:'Provide a valid YYYY-MM-DD assessment date for deterministic replay.',needs:[],repairs:[]});
 if(!input.evidence.length)findings.push({id:'evidence:missing',kind:'evidence',message:'Link inspectable evidence with scope and review date; a label alone is not evidence.',needs:[],repairs:[]});
 const seenEvidence=new Set<string>();for(const evidence of [...input.evidence].sort((a,b)=>a.id.localeCompare(b.id))){const reviewed=Date.parse(`${evidence.checkedAt}T00:00:00Z`),assessed=Date.parse(`${input.assessedAt}T00:00:00Z`);if(seenEvidence.has(evidence.id)||!evidence.id.trim()||!evidence.title.trim()||!/^https:\/\//.test(evidence.url)||!validDate(evidence.checkedAt)||evidence.checkedAt>input.assessedAt||assessed-reviewed>366*86400000)findings.push({id:`evidence:${evidence.id||'invalid'}`,kind:'evidence',message:'Evidence requires a unique ID, title, HTTPS source, valid review date within 366 days, and no future-dated review.',needs:[],repairs:[]});seenEvidence.add(evidence.id)}
 for(const need of selected)for(const repair of required[need])if(!input.repairs[repair])findings.push({id:`mapping:${need}:${repair}`,kind:'mapping',message:`${need}: enable mapped control ${repair}.`,needs:[need],repairs:[repair]});
 for(const [index,interaction] of validInteractions.entries())if(interaction.needs.every(n=>selected.includes(n))&&interaction.repairs.some(r=>!input.repairs[r]))findings.push({id:`interaction:${index+1}`,kind:'interaction',message:interaction.message,needs:interaction.needs,repairs:interaction.repairs});
 const applied=REPAIR_ORDER.filter(r=>input.repairs[r]);const controlBlocked=findings.some(f=>f.kind==='control'||f.kind==='evidence');
 return{status:controlBlocked?'CONTROL BLOCKED':findings.length?'MAPPED GAPS':'MAPPED CONTROLS PRESENT',findings,applied,mappingVersion:INCLUSIVE_MAPPING_VERSION,engineVersion:INCLUSIVE_EXPERIENCE_ENGINE_VERSION,limitations:['Controls are deterministic mappings over a synthetic fixture, not a simulation of a person or lived experience.','Controls being present does not prove usability, accessibility, localization quality, WCAG conformance, legal compliance, or repair efficacy.','Manual testing with disabled people, assistive technologies, target devices, languages, and network conditions remains required.']};
}
