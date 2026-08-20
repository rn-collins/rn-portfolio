export type ReadinessKey='people'|'data'|'workflow'|'controls'|'evidence';
export type EvidenceReference={id:string;locator:string;observedAt:string;reviewer:string};
export type ReadinessLayer={key:ReadinessKey;label:string;score:0|1|2;owner:string;ownerAuthority:string;evidence:string;evidenceRefs:EvidenceReference[];validationMethod:string;gap:string};
export type InheritedBuildId='012'|'013'|'021';
export type InheritedAssessment={buildId:InheritedBuildId;assessmentId:string;engineVersion:string;outcome:string;closed:boolean;reviewedAt:string;unresolvedGaps:string[]};
export type PilotControls={boundary:string;excludedData:string;excludedActions:string;deploymentOwner:string;ownerAuthority:string;successMeasure:string;stopCondition:string;incidentPath:string;rollback:string;expiresAt:string;approvalRecord:string};
export type ImplementationReadinessInput={useCase:string;decisionSupported:string;layers:ReadinessLayer[];inheritedAssessments:InheritedAssessment[];pilot:PilotControls};
export type ImplementationReadinessAssessment={status:'READY FOR BOUNDED PILOT'|'READINESS GAPS'|'NOT READY';score:number;maxScore:number;validatedLayers:ReadinessKey[];blocking:string[];priorities:string[];engineVersion:string};
export const IMPLEMENTATION_READINESS_ENGINE_VERSION='025.2.0';
const written=(v:string,min=8)=>v.trim().length>=min;
const dated=(v:string)=>/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?Z)?$/.test(v);
const evidenceReady=(ref:EvidenceReference)=>written(ref.id,4)&&written(ref.locator,8)&&dated(ref.observedAt)&&written(ref.reviewer,4);
const expected:ReadinessKey[]=['people','data','workflow','controls','evidence'];
const inheritedExpected:InheritedBuildId[]=['012','013','021'];
export function assessImplementationReadiness(input:ImplementationReadinessInput):ImplementationReadinessAssessment{
 const blocking:string[]=[],priorities:string[]=[];
 if(!written(input.useCase,20))blocking.push('Define one bounded AI use, including the task and operating context.');
 if(!written(input.decisionSupported,12))blocking.push('Name the decision the readiness record is intended to support.');
 const layerKeys=input.layers.map(x=>x.key);
 for(const key of expected)if(!layerKeys.includes(key))blocking.push(`Add the ${key} readiness layer.`);
 if(new Set(layerKeys).size!==layerKeys.length||input.layers.length!==expected.length)blocking.push('Each of the five readiness layers must appear exactly once.');
 const validatedLayers:ReadinessKey[]=[];
 for(const layer of input.layers){
  const refsReady=layer.evidenceRefs.length>0&&layer.evidenceRefs.every(evidenceReady);
  const governanceReady=written(layer.owner)&&written(layer.ownerAuthority)&&written(layer.validationMethod);
  const supportReady=written(layer.evidence,12)&&refsReady&&governanceReady;
  if(layer.score>0&&!written(layer.evidence,12))blocking.push(`${layer.label}: a positive score requires a specific evidence statement.`);
  if(layer.score>0&&!refsReady)blocking.push(`${layer.label}: link every positive score to a locatable, dated, reviewed evidence record.`);
  if(layer.score>0&&!written(layer.owner))blocking.push(`${layer.label}: name an accountable owner.`);
  if(layer.score>0&&!written(layer.ownerAuthority))blocking.push(`${layer.label}: define the owner's authority.`);
  if(layer.score>0&&!written(layer.validationMethod))blocking.push(`${layer.label}: state how the evidence was tested.`);
  if(layer.score===2&&written(layer.gap))blocking.push(`${layer.label}: full readiness cannot retain an unresolved gap.`);
  if(layer.score<2&&!written(layer.gap))priorities.push(`${layer.label}: describe what prevents full readiness.`);
  if(layer.score>0&&supportReady)validatedLayers.push(layer.key);
 }
 const inheritedIds=input.inheritedAssessments.map(x=>x.buildId);
 if(new Set(inheritedIds).size!==inheritedIds.length)blocking.push('Each inherited assessment must appear exactly once.');
 for(const buildId of inheritedExpected){
  const record=input.inheritedAssessments.find(x=>x.buildId===buildId);
  if(!record){blocking.push(`Attach the inherited Build ${buildId} assessment record.`);continue}
  const traceable=written(record.assessmentId,6)&&written(record.engineVersion,5)&&written(record.outcome,5)&&dated(record.reviewedAt);
  if(!traceable)blocking.push(`Build ${buildId}: provide a traceable assessment ID, engine version, outcome, and review date.`);
  if(!record.closed||record.unresolvedGaps.length)blocking.push(`Build ${buildId}: inherited assessment is not closed without unresolved gaps.`);
 }
 const controls:[keyof PilotControls,string][]=[
  ['boundary','pilot boundary'],['excludedData','excluded data'],['excludedActions','excluded actions'],
  ['deploymentOwner','deployment owner'],['ownerAuthority','owner authority'],['successMeasure','success measure'],
  ['stopCondition','stop condition'],['incidentPath','incident path'],['rollback','rollback path'],['approvalRecord','approval record']
 ];
 for(const [key,label] of controls)if(!written(input.pilot[key],key==='boundary'?20:8))blocking.push(`Define the ${label}.`);
 if(!dated(input.pilot.expiresAt))blocking.push('Define a valid pilot expiration date.');
 const score=expected.reduce((n,key)=>{const layer=input.layers.find(x=>x.key===key);return n+(layer&&validatedLayers.includes(key)?layer.score:0)},0);
 const hardBlock=blocking.length>0||input.layers.some(x=>x.score===0);
 if(input.layers.some(x=>x.score===0))priorities.push('Do not pilot while any organizational readiness layer is absent.');
 if(score<10)priorities.push('Close every evidence-backed layer before treating the use as ready for a bounded pilot.');
 const status:ImplementationReadinessAssessment['status']=hardBlock?'NOT READY':score===10?'READY FOR BOUNDED PILOT':'READINESS GAPS';
 return{status,score,maxScore:10,validatedLayers:[...new Set(validatedLayers)],blocking:[...new Set(blocking)],priorities:[...new Set(priorities)],engineVersion:IMPLEMENTATION_READINESS_ENGINE_VERSION};
}
