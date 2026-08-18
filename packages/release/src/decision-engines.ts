export type EvidenceClass='direct-source'|'cross-source-synthesis'|'research-inference'|'product-heuristic';
export type ProvenanceRef={id:string;classification:EvidenceClass};
export type ReviewDimension={key:string;label:string;score:0|1|2;note:string;provenance:ProvenanceRef[]};
export type ReviewAssessment={score:number;maxScore:number;grade:'Strong'|'Partial'|'Weak';gaps:string[];priorities:string[];dimensions:ReviewDimension[];protocol:string;engineVersion:string};

export const HUMAN_REVIEW_ENGINE_VERSION='001.1.0';
export const REVIEW_PROVENANCE:Record<string,ProvenanceRef[]>={
 competence:[{id:'n1',classification:'cross-source-synthesis'},{id:'i1',classification:'cross-source-synthesis'}],
 timing:[{id:'e1',classification:'direct-source'},{id:'i1',classification:'cross-source-synthesis'}],
 evidence:[{id:'n1',classification:'cross-source-synthesis'},{id:'e1',classification:'direct-source'}],
 authority:[{id:'e1',classification:'direct-source'},{id:'i1',classification:'direct-source'}],
 escalation:[{id:'e1',classification:'cross-source-synthesis'},{id:'i1',classification:'direct-source'}],
 record:[{id:'i1',classification:'direct-source'}],
 capacity:[{id:'i1',classification:'direct-source'}],
 testing:[{id:'n1',classification:'cross-source-synthesis'},{id:'i1',classification:'cross-source-synthesis'}]
};
export function humanReviewGrade(score:number){return score>=13?'Strong' as const:score>=8?'Partial' as const:'Weak' as const}
export function humanReviewScore(dimensions:Array<Pick<ReviewDimension,'score'>>){return dimensions.reduce((n,d)=>n+d.score,0)}

export const DECISION_GAP_ENGINE_VERSION='003.1.0';
export type GapSignals={frequency:number;consequence:number;ambiguity:number;fragmentation:number};
export function decisionGapScore(v:GapSignals,sourceCount:number,decision:string){const core=(v.frequency+v.consequence+v.ambiguity+v.fragmentation)/4;const infoPenalty=Math.min(20,sourceCount*3);const unresolved=decision.trim().length>18?15:5;return Math.max(0,Math.min(100,Math.round(core*17+infoPenalty+unresolved-30)))}
export function decisionGapTier(n:number){return n>=75?'strong gap':n>=55?'promising gap':n>=35?'investigate':'weak signal'}
export const DECISION_GAP_PROVENANCE:ProvenanceRef[]=[{id:'003-heuristic-v1',classification:'product-heuristic'}];

export type MeaningAnchorAudit={label:string;ok:boolean;detail:string};
export const MEANING_AUDIT_VERSION='002.1.0';
export const MEANING_AUDIT_PROVENANCE:ProvenanceRef[]=[{id:'002-anchor-contract-v1',classification:'product-heuristic'}];

export const FEEDBACK_LOOP_ENGINE_VERSION='007.1.0';
export type FeedbackEventKind='use'|'outcome'|'correction'|'unmet-need';
export type FeedbackSignal={id:string;kind:FeedbackEventKind;description:string;source:string;affectedGroup:string;urgency:'routine'|'important'|'urgent';consentConfirmed:boolean};
export type FeedbackControl={owner:string;reviewTrigger:string;evidenceStandard:string;changeAuthority:string;validationRule:string;escalationPath:string;notificationRule:string;retentionRule:string;reviewCapacity:string};
export type FeedbackLoopAssessment={status:'GOVERNED LOOP'|'PARTIAL LOOP'|'ONE-WAY PRODUCT';coverage:FeedbackEventKind[];missing:FeedbackEventKind[];humanControl:{score:number;grade:'Strong'|'Partial'|'Weak'};priorities:string[];backlogRules:string[];engineVersion:string};
export function assessFeedbackLoop(signals:FeedbackSignal[],control:FeedbackControl):FeedbackLoopAssessment{
 const kinds:FeedbackEventKind[]=['use','outcome','correction','unmet-need'];
 const coverage=kinds.filter(kind=>signals.some(signal=>signal.kind===kind));
 const missing=kinds.filter(kind=>!coverage.includes(kind));
 const complete=(value:string)=>value.trim().length>=8;
 const dimensions=[control.owner,control.reviewTrigger,control.evidenceStandard,control.changeAuthority,control.validationRule,control.escalationPath,control.notificationRule,control.reviewCapacity].map(value=>({score:(complete(value)?2:0) as 0|2}));
 const score=humanReviewScore(dimensions);const grade=humanReviewGrade(score);
 const privacyReady=complete(control.retentionRule)&&signals.every(signal=>signal.consentConfirmed);
 const status:FeedbackLoopAssessment['status']=coverage.length===4&&grade==='Strong'&&privacyReady?'GOVERNED LOOP':coverage.length>=2&&grade!=='Weak'?'PARTIAL LOOP':'ONE-WAY PRODUCT';
 const priorities:string[]=[];
 if(missing.length)priorities.push(`Add explicit capture for: ${missing.join(', ')}.`);
 if(grade!=='Strong')priorities.push('Define the human trigger, evidence, authority, escalation, notification, validation, and capacity needed to change the product.');
 if(!privacyReady)priorities.push('Do not route feedback into learning until consent and retention rules are explicit.');
 if(!complete(control.validationRule))priorities.push('Define how a proposed improvement will be tested before broader release.');
 if(!complete(control.notificationRule))priorities.push('Define when affected users are told that feedback changed product behavior.');
 const backlogRules=[
  'Urgent corrections enter human triage before ordinary product requests.',
  'No signal becomes a change without a named owner, evidence standard, and decision record.',
  'Changes require a validation rule and rollback/escalation path proportionate to consequence.',
  'Feedback collection is minimized to the stated purpose and retention rule.',
  'People affected by a material behavior change are notified through the defined communication rule.'
 ];
 return {status,coverage,missing,humanControl:{score,grade},priorities,backlogRules,engineVersion:FEEDBACK_LOOP_ENGINE_VERSION};
}
export const FEEDBACK_LOOP_PROVENANCE:ProvenanceRef[]=[
 {id:'007-nist-ai-rmf-v1',classification:'cross-source-synthesis'},
 {id:'007-ms-hai-guidelines',classification:'cross-source-synthesis'},
 {id:'007-govuk-service-standard',classification:'cross-source-synthesis'},
 {id:'007-w3c-privacy-principles',classification:'direct-source'},
 {id:'001-human-control-inheritance',classification:'product-heuristic'}
];



export const DECISION_DASHBOARD_ENGINE_VERSION='008.1.0';
export type DashboardMetric={id:string;label:string;value:string;source:string;freshness:string;comparison:string;uncertainty:string;decisionUse:string};
export type ActionState={decision:string;owner:string;trigger:string;action:string;deadline:string;authority:string;nextState:string;escalation:string};
export type DashboardAssessment={status:'DECISION READY'|'INFORMATION ONLY'|'DECISION BLOCKED';metricReadiness:number;humanControl:{score:number;grade:'Strong'|'Partial'|'Weak'};gaps:string[];actionState:string[];engineVersion:string};
export function assessDecisionDashboard(metrics:DashboardMetric[],state:ActionState):DashboardAssessment{
 const complete=(value:string)=>value.trim().length>=6;
 const metricReady=(m:DashboardMetric)=>m.value.trim().length>0&&[m.label,m.source,m.freshness,m.comparison,m.uncertainty,m.decisionUse].every(complete);
 const completeMetrics=metrics.filter(metricReady);
 const metricReadiness=metrics.length?Math.round((completeMetrics.length/metrics.length)*100):0;
 const dimensions=[
  state.owner,state.trigger,state.decision,state.authority,
  state.escalation,state.nextState,state.deadline,state.action
 ].map(value=>({score:(complete(value)?2:0) as 0|2}));
 const score=humanReviewScore(dimensions);const grade=humanReviewGrade(score);
 const gaps:string[]=[];
 if(!metrics.length)gaps.push('Add only the metrics needed to resolve the named decision.');
 else if(metricReadiness<100)gaps.push('Give every retained metric a source, freshness state, comparison, uncertainty note, and explicit decision use.');
 if(!complete(state.decision))gaps.push('Name the decision the dashboard must resolve.');
 if(!complete(state.owner))gaps.push('Name one accountable decision owner.');
 if(!complete(state.trigger))gaps.push('Define the threshold or event that requires review.');
 if(!complete(state.authority))gaps.push('Define what the owner may approve, change, pause, or escalate.');
 if(!complete(state.action)||!complete(state.deadline))gaps.push('Connect the decision to a concrete action and time boundary.');
 if(!complete(state.nextState))gaps.push('Define the observable state after action.');
 if(!complete(state.escalation))gaps.push('Define what happens when evidence conflicts, risk rises, or authority is insufficient.');
 const status:DashboardAssessment['status']=metricReadiness===100&&grade==='Strong'?'DECISION READY':metrics.length&&complete(state.decision)&&grade!=='Weak'?'INFORMATION ONLY':'DECISION BLOCKED';
 const actionState=[
  'Decision: '+(state.decision||'not defined'),
  'Owner: '+(state.owner||'not defined'),
  'Trigger: '+(state.trigger||'not defined'),
  'Action: '+(state.action||'not defined'),
  'Next state: '+(state.nextState||'not defined')
 ];
 return {status,metricReadiness,humanControl:{score,grade},gaps,actionState,engineVersion:DECISION_DASHBOARD_ENGINE_VERSION};
}
export const DECISION_DASHBOARD_PROVENANCE:ProvenanceRef[]=[
 {id:'008-cdc-dashboard-guidance',classification:'direct-source'},
 {id:'008-cdc-chart-guidance',classification:'direct-source'},
 {id:'008-wcag-2.2-distinguishable-reflow',classification:'direct-source'},
 {id:'001-human-control-inheritance',classification:'product-heuristic'},
 {id:'008-decision-readiness-rubric',classification:'product-heuristic'}
];


export const PLACE_READINESS_ENGINE_VERSION='009.1.0';
export type PlaceConstraintKey='connectivity'|'power'|'devices'|'environment'|'accessibility'|'governance'|'workforce'|'data'|'maintenance'|'community';
export type PlaceConstraint={key:PlaceConstraintKey;label:string;requirement:number;localCapacity:number;evidence:string;owner:string;mitigation:string};
export type PlaceReadinessInput={technology:string;place:string;decision:string;frequency:number;consequence:number;ambiguity:number;fragmentation:number;sourceCount:number;constraints:PlaceConstraint[];pilot:string;fallback:string;stopCondition:string;communityAuthority:string};
export type PlaceReadinessAssessment={status:'PLACE READY'|'CONDITIONAL'|'NOT READY';fitScore:number;decisionGap:{score:number;tier:ReturnType<typeof decisionGapTier>};blocking:string[];unknowns:string[];mitigations:string[];engineVersion:string};
export function assessPlaceReadiness(input:PlaceReadinessInput):PlaceReadinessAssessment{
 const complete=(value:string)=>value.trim().length>=8;
 const evaluated=input.constraints.filter(c=>c.localCapacity>0&&complete(c.evidence));
 const fitScore=input.constraints.length?Math.round(input.constraints.reduce((sum,c)=>sum+Math.min(1,c.localCapacity/Math.max(1,c.requirement)),0)/input.constraints.length*100):0;
 const blocking=input.constraints.filter(c=>c.requirement>=4&&c.localCapacity<c.requirement).map(c=>c.label);
 const unknowns=input.constraints.filter(c=>!complete(c.evidence)||!complete(c.owner)).map(c=>c.label);
 const mitigations=input.constraints.filter(c=>c.localCapacity<c.requirement&&complete(c.mitigation)).map(c=>`${c.label}: ${c.mitigation}`);
 const controlsReady=[input.pilot,input.fallback,input.stopCondition,input.communityAuthority].every(complete);
 const status:PlaceReadinessAssessment['status']=fitScore>=85&&!blocking.length&&!unknowns.length&&controlsReady?'PLACE READY':evaluated.length>=Math.ceil(input.constraints.length/2)&&fitScore>=50&&complete(input.pilot)&&complete(input.fallback)?'CONDITIONAL':'NOT READY';
 const gapScore=decisionGapScore({frequency:input.frequency,consequence:input.consequence,ambiguity:input.ambiguity,fragmentation:input.fragmentation},input.sourceCount,input.decision);
 return {status,fitScore,decisionGap:{score:gapScore,tier:decisionGapTier(gapScore)},blocking,unknowns,mitigations,engineVersion:PLACE_READINESS_ENGINE_VERSION};
}
export const PLACE_READINESS_PROVENANCE:ProvenanceRef[]=[
 {id:'009-nist-community-resilience',classification:'cross-source-synthesis'},
 {id:'009-ntia-local-coordination',classification:'cross-source-synthesis'},
 {id:'009-w3c-accessibility-context',classification:'cross-source-synthesis'},
 {id:'003-decision-gap-inheritance',classification:'product-heuristic'},
 {id:'009-place-readiness-rubric',classification:'product-heuristic'}
];


export const IDEA_SKELETON_ENGINE_VERSION='010.1.0';
export type SkeletonField={id:string;label:string;type:'text'|'number'|'date'|'boolean'|'reference';required:boolean;sourceRule:string};
export type SkeletonEntity={id:string;label:string;description:string;fields:SkeletonField[]};
export type SkeletonRelationship={id:string;from:string;to:string;label:string;cardinality:'one-to-one'|'one-to-many'|'many-to-many';required:boolean};
export type SkeletonSource={id:string;label:string;authority:string;locatorRule:string;freshnessRule:string};
export type IdeaSkeleton={idea:string;entities:SkeletonEntity[];relationships:SkeletonRelationship[];sources:SkeletonSource[]};
export type SkeletonAssessment={status:'VALID SKELETON'|'PARTIAL SKELETON'|'LOOSE LANGUAGE';score:number;errors:string[];warnings:string[];engineVersion:string};
export function assessIdeaSkeleton(input:IdeaSkeleton):SkeletonAssessment{
 const complete=(v:string)=>v.trim().length>=3;const errors:string[]=[];const warnings:string[]=[];
 if(!complete(input.idea))errors.push('Name the concept this skeleton represents.');
 if(input.entities.length<2)errors.push('Define at least two distinct entity types.');
 const entityIds=input.entities.map(e=>e.id.trim());if(new Set(entityIds).size!==entityIds.length)errors.push('Entity IDs must be unique.');
 for(const e of input.entities){if(!complete(e.id)||!complete(e.label)||!complete(e.description))errors.push('Every entity needs a stable ID, label, and definition.');if(!e.fields.length)errors.push(`${e.label||e.id||'Entity'} needs at least one field.`);const ids=e.fields.map(x=>x.id.trim());if(new Set(ids).size!==ids.length)errors.push(`${e.label||e.id}: field IDs must be unique.`);for(const field of e.fields){if(!complete(field.id)||!complete(field.label))errors.push(`${e.label||e.id}: every field needs an ID and label.`);if(!complete(field.sourceRule))warnings.push(`${e.label||e.id}.${field.id||'field'} needs a source rule.`)}}
 const known=new Set(entityIds);for(const rel of input.relationships){if(!known.has(rel.from)||!known.has(rel.to))errors.push(`${rel.label||rel.id||'Relationship'} references an unknown entity.`);if(!complete(rel.id)||!complete(rel.label))errors.push('Every relationship needs an ID and label.');}
 if(!input.relationships.length)errors.push('Define at least one relationship between entities.');
 if(!input.sources.length)warnings.push('Add source classes so facts have authority, locator, and freshness rules.');
 for(const source of input.sources){if(![source.id,source.label,source.authority,source.locatorRule,source.freshnessRule].every(complete))warnings.push(`${source.label||source.id||'Source'} needs complete authority, locator, and freshness rules.`)}
 const checks=5;const passed=[complete(input.idea),input.entities.length>=2,input.relationships.length>0,input.sources.length>0,errors.length===0&&warnings.length===0].filter(Boolean).length;const score=Math.round(passed/checks*100);
 const status:SkeletonAssessment['status']=errors.length===0&&warnings.length===0?'VALID SKELETON':input.entities.length>=2&&input.relationships.length>0?'PARTIAL SKELETON':'LOOSE LANGUAGE';
 return {status,score,errors,warnings,engineVersion:IDEA_SKELETON_ENGINE_VERSION};
}
export const IDEA_SKELETON_PROVENANCE:ProvenanceRef[]=[
 {id:'010-json-schema-2020-12',classification:'direct-source'},
 {id:'010-w3c-shacl',classification:'direct-source'},
 {id:'010-w3c-prov-o',classification:'cross-source-synthesis'},
 {id:'010-skeleton-rubric',classification:'product-heuristic'}
];


export const ENTITY_RESOLUTION_ENGINE_VERSION='011.1.0';
export type ResolutionSignal={id:string;label:string;kind:'unique-id'|'exact-attribute'|'similar-attribute'|'relationship'|'conflict';weight:number;evidence:string;sourceAuthority:'self-asserted'|'credible'|'authoritative'};
export type ResolutionRecord={id:string;entityType:string;label:string;source:string;attributes:Record<string,string>};
export type EntityResolutionInput={left:ResolutionRecord;right:ResolutionRecord;signals:ResolutionSignal[];model:IdeaSkeleton;reviewer:string;rationale:string;minimized:boolean};
export type EntityResolutionAssessment={status:'MERGE CANDIDATE'|'HUMAN REVIEW'|'KEEP SEPARATE';confidence:number;modelStatus:SkeletonAssessment['status'];supporting:string[];conflicts:string[];gaps:string[];engineVersion:string};
export function assessEntityResolution(input:EntityResolutionInput):EntityResolutionAssessment{
 const model=assessIdeaSkeleton(input.model);const complete=(v:string)=>v.trim().length>=6;
 const supporting=input.signals.filter(s=>s.kind!=='conflict'&&complete(s.evidence));const conflicts=input.signals.filter(s=>s.kind==='conflict'&&complete(s.evidence));
 const authority=(a:ResolutionSignal['sourceAuthority'])=>a==='authoritative'?1.25:a==='credible'?1:0.6;
 const positive=supporting.reduce((n,s)=>n+s.weight*authority(s.sourceAuthority),0);const negative=conflicts.reduce((n,s)=>n+s.weight*authority(s.sourceAuthority),0);
 const confidence=Math.max(0,Math.min(100,Math.round(50+positive-negative)));
 const hardConflict=conflicts.some(s=>s.sourceAuthority==='authoritative'&&s.weight>=25);const uniqueSupport=supporting.some(s=>s.kind==='unique-id'&&s.sourceAuthority==='authoritative');
 const reviewReady=complete(input.reviewer)&&complete(input.rationale)&&input.minimized;
 const status:EntityResolutionAssessment['status']=hardConflict?'KEEP SEPARATE':confidence>=85&&uniqueSupport&&model.status==='VALID SKELETON'&&reviewReady?'MERGE CANDIDATE':confidence<=30&&conflicts.length?'KEEP SEPARATE':'HUMAN REVIEW';
 const gaps:string[]=[];if(model.status!=='VALID SKELETON')gaps.push('Repair the inherited Build 010 entity skeleton before resolving records.');if(!supporting.length)gaps.push('Add source-linked supporting evidence.');if(!complete(input.reviewer)||!complete(input.rationale))gaps.push('Name the human reviewer and record the decision rationale.');if(!input.minimized)gaps.push('Minimize attributes to those necessary for resolution in this context.');
 return {status,confidence,modelStatus:model.status,supporting:supporting.map(s=>s.label),conflicts:conflicts.map(s=>s.label),gaps,engineVersion:ENTITY_RESOLUTION_ENGINE_VERSION};
}
export const ENTITY_RESOLUTION_PROVENANCE:ProvenanceRef[]=[
 {id:'011-nist-800-63a-4',classification:'cross-source-synthesis'},
 {id:'011-nist-minimum-attributes',classification:'direct-source'},
 {id:'010-skeleton-inheritance',classification:'product-heuristic'},
 {id:'011-resolution-rubric',classification:'product-heuristic'}
];


export const AI_CONTROL_MAPPER_ENGINE_VERSION='012.1.0';
export type ConsequenceKey='severity'|'scale'|'reversibility'|'rights'|'vulnerability'|'autonomy'|'essential-service'|'data-sensitivity'|'uncertainty';
export type ConsequenceDimension={key:ConsequenceKey;label:string;score:1|2|3|4|5;evidence:string};
export type AIUseControl={owner:string;reviewTrigger:string;authority:string;evidence:string;testing:string;monitoring:string;appeal:string;stopRule:string;incidentResponse:string;record:string;notice:string};
export type AIUseMapInput={useName:string;purpose:string;affectedPeople:string;dimensions:ConsequenceDimension[];controls:AIUseControl;model:IdeaSkeleton};
export type AIUseMapAssessment={status:'LOWER CONSEQUENCE'|'CONTROLLED USE'|'ESCALATE / DO NOT DEPLOY';consequenceScore:number;controlCoverage:number;requiredControls:string[];gaps:string[];humanReview:{score:number;grade:'Strong'|'Partial'|'Weak'};modelStatus:SkeletonAssessment['status'];engineVersion:string};
export function assessAIUseControls(input:AIUseMapInput):AIUseMapAssessment{
 const model=assessIdeaSkeleton(input.model);const complete=(v:string)=>v.trim().length>=8;
 const values=Object.entries(input.controls) as Array<[keyof AIUseControl,string]>;const present=values.filter(([,v])=>complete(v));const controlCoverage=Math.round(present.length/values.length*100);
 const consequenceScore=input.dimensions.length?Math.round(input.dimensions.reduce((n,d)=>n+d.score,0)/input.dimensions.length*20):0;
 const severe=input.dimensions.some(d=>['severity','rights','essential-service'].includes(d.key)&&d.score>=5);
 const humanDimensions=[input.controls.owner,input.controls.reviewTrigger,input.controls.authority,input.controls.evidence,input.controls.appeal,input.controls.stopRule,input.controls.incidentResponse,input.controls.record].map(v=>({score:(complete(v)?2:0) as 0|2}));
 const humanScore=humanReviewScore(humanDimensions),grade=humanReviewGrade(humanScore);
 const required:Record<keyof AIUseControl,string>={owner:'accountable owner',reviewTrigger:'review trigger',authority:'human authority',evidence:'evidence standard',testing:'pre-use testing',monitoring:'outcome monitoring',appeal:'appeal or contest path',stopRule:'stop and rollback rule',incidentResponse:'incident response',record:'decision record',notice:'affected-person notice'};
 const requiredKeys=(consequenceScore>=70||severe?Object.keys(required):consequenceScore>=40?['owner','reviewTrigger','authority','evidence','testing','monitoring','stopRule','record']:['owner','evidence','testing','monitoring','record']) as Array<keyof AIUseControl>;
 const gaps:string[]=[];for(const key of requiredKeys)if(!complete(input.controls[key]))gaps.push(`Define the ${required[key]}.`);
 if(model.status!=='VALID SKELETON')gaps.push('Repair the inherited Build 010 use, actor, outcome, and source structure.');
 if(!complete(input.useName)||!complete(input.purpose)||!complete(input.affectedPeople))gaps.push('Name the use, bounded purpose, and affected people.');
 if(input.dimensions.length<5)gaps.push('Assess at least five consequence dimensions with evidence.');
 const ready=gaps.length===0&&grade==='Strong';const status:AIUseMapAssessment['status']=(consequenceScore>=70||severe)&&!ready?'ESCALATE / DO NOT DEPLOY':consequenceScore>=40||severe?'CONTROLLED USE':'LOWER CONSEQUENCE';
 return {status,consequenceScore,controlCoverage,requiredControls:requiredKeys.map(k=>required[k]),gaps,humanReview:{score:humanScore,grade},modelStatus:model.status,engineVersion:AI_CONTROL_MAPPER_ENGINE_VERSION};
}
export const AI_CONTROL_MAPPER_PROVENANCE:ProvenanceRef[]=[
 {id:'012-nist-ai-rmf-1.0',classification:'cross-source-synthesis'},
 {id:'012-oecd-ai-classification',classification:'cross-source-synthesis'},
 {id:'001-human-review-inheritance',classification:'product-heuristic'},
 {id:'010-skeleton-inheritance',classification:'product-heuristic'},
 {id:'012-consequence-control-rubric',classification:'product-heuristic'}
];


export const AI_WORKFLOW_SCANNER_ENGINE_VERSION='013.1.0';
export type WorkflowStageKind='intake'|'data'|'model'|'decision'|'action'|'monitoring';
export type WorkflowRisk={id:string;label:string;entryStage:string;severity:1|2|3|4|5;likelihood:1|2|3|4|5;evidence:string};
export type WorkflowStage={id:string;label:string;kind:WorkflowStageKind;owner:string;input:string;output:string;control:string;stopAuthority:string;monitoring:string};
export type WorkflowEdge={from:string;to:string};
export type AIWorkflowInput={name:string;purpose:string;affectedPeople:string;stages:WorkflowStage[];edges:WorkflowEdge[];risks:WorkflowRisk[];useMap:AIUseMapInput};
export type PropagatedRisk={riskId:string;label:string;path:string[];uncontrolledStages:string[];exposure:number};
export type AIWorkflowAssessment={status:'RISK CONTAINED'|'CONTROL GAPS'|'UNCONTROLLED PROPAGATION';consequenceStatus:AIUseMapAssessment['status'];workflowCoverage:number;propagated:PropagatedRisk[];gaps:string[];engineVersion:string};
export function scanAIWorkflow(input:AIWorkflowInput):AIWorkflowAssessment{
 const inherited=assessAIUseControls(input.useMap);const complete=(v:string)=>v.trim().length>=8;const known=new Map(input.stages.map(s=>[s.id,s]));const next=new Map<string,string[]>();for(const e of input.edges){if(known.has(e.from)&&known.has(e.to))next.set(e.from,[...(next.get(e.from)||[]),e.to]);}
 const controlled=(s:WorkflowStage)=>[s.owner,s.control,s.stopAuthority,s.monitoring].every(complete);const propagated:PropagatedRisk[]=input.risks.map(risk=>{const path:string[]=[];const seen=new Set<string>();const queue=[risk.entryStage];while(queue.length){const id=queue.shift()!;if(seen.has(id)||!known.has(id))continue;seen.add(id);path.push(id);for(const id2 of next.get(id)||[])queue.push(id2)}const uncontrolledStages=path.filter(id=>!controlled(known.get(id)!));const exposure=Math.min(100,Math.round(risk.severity*risk.likelihood*4*(1+uncontrolledStages.length/Math.max(1,path.length))));return {riskId:risk.id,label:risk.label,path,uncontrolledStages,exposure}});
 const completeStages=input.stages.filter(controlled).length;const workflowCoverage=input.stages.length?Math.round(completeStages/input.stages.length*100):0;const gaps:string[]=[];
 if(!complete(input.name)||!complete(input.purpose)||!complete(input.affectedPeople))gaps.push('Name the workflow, bounded purpose, and affected people.');
 if(input.stages.length<4)gaps.push('Map at least four real workflow stages.');
 if(!input.risks.length)gaps.push('Add evidence-bearing risks and their entry stages.');
 for(const s of input.stages){if(!controlled(s))gaps.push(`${s.label}: define owner, control, stop authority, and monitoring.`)}
 if(inherited.gaps.length)gaps.push('Close the inherited Build 012 consequence and control gaps.');
 const worst=Math.max(0,...propagated.map(r=>r.exposure));const anyUncontrolled=propagated.some(r=>r.uncontrolledStages.length>0);
 const status:AIWorkflowAssessment['status']=inherited.status==='ESCALATE / DO NOT DEPLOY'||(worst>=80&&anyUncontrolled)?'UNCONTROLLED PROPAGATION':gaps.length||anyUncontrolled?'CONTROL GAPS':'RISK CONTAINED';
 return {status,consequenceStatus:inherited.status,workflowCoverage,propagated,gaps,engineVersion:AI_WORKFLOW_SCANNER_ENGINE_VERSION};
}
export const AI_WORKFLOW_SCANNER_PROVENANCE:ProvenanceRef[]=[
 {id:'013-nist-ai-rmf-core',classification:'cross-source-synthesis'},
 {id:'013-nist-ssdf-800-218a',classification:'cross-source-synthesis'},
 {id:'012-consequence-control-inheritance',classification:'product-heuristic'},
 {id:'013-propagation-rubric',classification:'product-heuristic'}
];


export const LEGAL_JUDGMENT_ENGINE_VERSION='014.1.0';
export type LegalWorkKind='research'|'interpretation'|'inference'|'strategy'|'approval'|'attorney-judgment';
export type LegalWorkAllocation='ai-assist'|'draft-under-supervision'|'lawyer-only'|'client-decision';
export type LegalWorkLayer={id:string;label:string;kind:LegalWorkKind;allocation:LegalWorkAllocation;input:string;output:string;sourceRule:string;reviewer:string;authority:string;record:string;confidentiality:string};
export type LegalJudgmentInput={matter:string;clientObjective:string;jurisdiction:string;layers:LegalWorkLayer[];useMap:AIUseMapInput};
export type LegalJudgmentAssessment={status:'SUPERVISED ARCHITECTURE'|'JUDGMENT LEAK'|'UNDEFINED RESPONSIBILITY';humanReview:{score:number;grade:'Strong'|'Partial'|'Weak'};aiControlStatus:AIUseMapAssessment['status'];leaks:string[];gaps:string[];allocations:Record<LegalWorkAllocation,string[]>;engineVersion:string};
export function assessLegalJudgment(input:LegalJudgmentInput):LegalJudgmentAssessment{
 const inherited=assessAIUseControls(input.useMap);const complete=(v:string)=>v.trim().length>=8;const leaks:string[]=[];const gaps:string[]=[];
 const nondelegable=new Set<LegalWorkKind>(['strategy','approval','attorney-judgment']);
 for(const layer of input.layers){
  if(nondelegable.has(layer.kind)&&!['lawyer-only','client-decision'].includes(layer.allocation))leaks.push(`${layer.label}: consequential professional judgment is allocated to AI assistance.`);
  if(layer.kind==='interpretation'&&layer.allocation==='ai-assist')leaks.push(`${layer.label}: legal interpretation lacks explicit lawyer supervision.`);
  if(![layer.input,layer.output,layer.sourceRule,layer.reviewer,layer.authority,layer.record,layer.confidentiality].every(complete))gaps.push(`${layer.label}: define input, output, source rule, reviewer, authority, record, and confidentiality rule.`);
 }
 if(!complete(input.matter)||!complete(input.clientObjective)||!complete(input.jurisdiction))gaps.push('Name the matter, client objective, and governing jurisdiction.');
 const reviewDims=input.layers.slice(0,8).map(l=>({score:([l.reviewer,l.authority,l.record].every(complete)?2:0) as 0|2}));const score=humanReviewScore(reviewDims),grade=humanReviewGrade(score);
 if(inherited.gaps.length)gaps.push('Close inherited Build 012 AI-use control gaps.');
 const allocations={'ai-assist':[],'draft-under-supervision':[],'lawyer-only':[],'client-decision':[]} as Record<LegalWorkAllocation,string[]>;for(const l of input.layers)allocations[l.allocation].push(l.label);
 const status:LegalJudgmentAssessment['status']=leaks.length?'JUDGMENT LEAK':gaps.length||grade==='Weak'?'UNDEFINED RESPONSIBILITY':'SUPERVISED ARCHITECTURE';
 return {status,humanReview:{score,grade},aiControlStatus:inherited.status,leaks,gaps,allocations,engineVersion:LEGAL_JUDGMENT_ENGINE_VERSION};
}
export const LEGAL_JUDGMENT_PROVENANCE:ProvenanceRef[]=[
 {id:'014-aba-formal-opinion-512',classification:'cross-source-synthesis'},
 {id:'014-aba-model-rule-2.1',classification:'direct-source'},
 {id:'014-aba-model-rule-5.3',classification:'direct-source'},
 {id:'001-human-review-inheritance',classification:'product-heuristic'},
 {id:'012-ai-control-inheritance',classification:'product-heuristic'},
 {id:'014-judgment-allocation-rubric',classification:'product-heuristic'}
];

export const LEGAL_PRODUCT_ENGINE_VERSION='015.1.0';
export type LegalTaskCandidate={id:string;label:string;frequency:1|2|3|4|5;consistency:1|2|3|4|5;reviewability:1|2|3|4|5;reuseValue:1|2|3|4|5;judgmentIntensity:1|2|3|4|5;confidentialityRisk:1|2|3|4|5;matterSpecificity:1|2|3|4|5;evidence:string;owner:string;reviewGate:string;safeOutput:string};
export type LegalProductDisposition='PRODUCT CANDIDATE'|'INTERNAL SYSTEM ONLY'|'KEEP AS SUPERVISED SERVICE'|'DO NOT PRODUCTIZE';
export type LegalProductCandidateResult={id:string;label:string;score:number;disposition:LegalProductDisposition;reasons:string[];safeOutput:string};
export type LegalProductAssessment={status:'SAFE CANDIDATES IDENTIFIED'|'SUPERVISION REQUIRED'|'NO SAFE PRODUCT CANDIDATE';candidates:LegalProductCandidateResult[];gaps:string[];humanReview:{score:number;grade:'Strong'|'Partial'|'Weak'};engineVersion:string};
export function assessLegalProductCandidates(tasks:LegalTaskCandidate[]):LegalProductAssessment{
 const complete=(v:string)=>v.trim().length>=8;const gaps:string[]=[];
 const candidates=tasks.map(task=>{const positive=task.frequency+task.consistency+task.reviewability+task.reuseValue;const risk=task.judgmentIntensity+task.confidentialityRisk+task.matterSpecificity;const score=Math.max(0,Math.min(100,Math.round((positive/20)*65+((15-risk)/12)*35)));const reasons:string[]=[];
  if(task.judgmentIntensity>=4)reasons.push('High professional-judgment intensity.');if(task.confidentialityRisk>=4)reasons.push('High confidentiality or privilege risk.');if(task.matterSpecificity>=4)reasons.push('Materially matter-specific.');if(task.consistency>=4&&task.reviewability>=4)reasons.push('Stable structure with an inspectable review gate.');if(task.frequency>=4&&task.reuseValue>=4)reasons.push('Repeated work with material reuse value.');
  const blocked=task.judgmentIntensity===5||task.confidentialityRisk===5;const disposition:LegalProductDisposition=blocked?'DO NOT PRODUCTIZE':risk>=11?'KEEP AS SUPERVISED SERVICE':task.confidentialityRisk>=3||task.matterSpecificity>=3?'INTERNAL SYSTEM ONLY':score>=65?'PRODUCT CANDIDATE':'KEEP AS SUPERVISED SERVICE';return {id:task.id,label:task.label,score,disposition,reasons,safeOutput:task.safeOutput};});
 for(const task of tasks)if(![task.evidence,task.owner,task.reviewGate,task.safeOutput].every(complete))gaps.push(`${task.label}: define evidence, owner, review gate, and bounded output.`);
 const dimensions=tasks.slice(0,8).flatMap(t=>[
  {score:([t.owner,t.reviewGate].every(complete)?2:0) as 0|2},
  {score:([t.evidence,t.safeOutput].every(complete)?2:0) as 0|2}
 ]);const score=humanReviewScore(dimensions),grade=humanReviewGrade(score);
 const safe=candidates.some(c=>['PRODUCT CANDIDATE','INTERNAL SYSTEM ONLY'].includes(c.disposition));const status:LegalProductAssessment['status']=gaps.length||grade==='Weak'?'SUPERVISION REQUIRED':safe?'SAFE CANDIDATES IDENTIFIED':'NO SAFE PRODUCT CANDIDATE';return {status,candidates,gaps,humanReview:{score,grade},engineVersion:LEGAL_PRODUCT_ENGINE_VERSION};
}
export const LEGAL_PRODUCT_PROVENANCE:ProvenanceRef[]=[
 {id:'015-aba-model-rule-1.1',classification:'direct-source'},
 {id:'015-aba-model-rule-1.6',classification:'direct-source'},
 {id:'015-aba-model-rule-5.3',classification:'direct-source'},
 {id:'005-service-product-inheritance',classification:'product-heuristic'},
 {id:'006-form-selection-inheritance',classification:'product-heuristic'},
 {id:'014-judgment-allocation-inheritance',classification:'product-heuristic'},
 {id:'015-product-candidate-rubric',classification:'product-heuristic'}
];

export const LEGAL_WORKFLOW_ENGINE_VERSION='016.1.0';
export type LegalWorkflowNodeKind='actor'|'document'|'authority'|'deadline'|'decision'|'risk'|'record';
export type LegalWorkflowNode={id:string;label:string;kind:LegalWorkflowNodeKind;owner:string;source:string;freshness:string;confidentiality:string};
export type LegalWorkflowHandoff={id:string;from:string;to:string;payload:string;sender:string;receiver:string;trigger:string;deadline:string;acceptance:string;authority:string;record:string;escalation:string};
export type LegalWorkflowMapInput={matter:string;jurisdiction:string;objective:string;nodes:LegalWorkflowNode[];handoffs:LegalWorkflowHandoff[]};
export type LegalWorkflowAssessment={status:'MAPPED AND ACCOUNTABLE'|'HANDOFF GAPS'|'WORKFLOW UNDEFINED';coverage:number;orphanNodes:string[];handoffGaps:string[];sequence:string[];humanReview:{score:number;grade:'Strong'|'Partial'|'Weak'};engineVersion:string};
export function assessLegalWorkflow(input:LegalWorkflowMapInput):LegalWorkflowAssessment{
 const complete=(v:string)=>v.trim().length>=6;const known=new Map(input.nodes.map(n=>[n.id,n]));const handoffGaps:string[]=[];const linked=new Set<string>();
 for(const h of input.handoffs){if(!known.has(h.from)||!known.has(h.to)){handoffGaps.push(`${h.id}: handoff references an unknown workflow node.`);continue}linked.add(h.from);linked.add(h.to);const missing=[['payload',h.payload],['sender',h.sender],['receiver',h.receiver],['trigger',h.trigger],['deadline',h.deadline],['acceptance',h.acceptance],['authority',h.authority],['record',h.record],['escalation',h.escalation]].filter(([,v])=>!complete(v)).map(([k])=>k);if(missing.length)handoffGaps.push(`${h.id}: define ${missing.join(', ')}.`)}
 const orphanNodes=input.nodes.filter(n=>!linked.has(n.id)).map(n=>n.label);for(const n of input.nodes)if(![n.owner,n.source,n.freshness,n.confidentiality].every(complete))handoffGaps.push(`${n.label}: define owner, source, freshness, and confidentiality.`);
 if(![input.matter,input.jurisdiction,input.objective].every(complete))handoffGaps.push('Define the matter, jurisdiction, and workflow objective.');
 const total=Math.max(1,input.nodes.length+input.handoffs.length);const completeNodes=input.nodes.filter(n=>[n.owner,n.source,n.freshness,n.confidentiality].every(complete)).length;const completeHandoffs=input.handoffs.filter(h=>[h.payload,h.sender,h.receiver,h.trigger,h.deadline,h.acceptance,h.authority,h.record,h.escalation].every(complete)&&known.has(h.from)&&known.has(h.to)).length;const coverage=Math.round((completeNodes+completeHandoffs)/total*100);
 const dims=input.handoffs.slice(0,8).flatMap(h=>[{score:([h.sender,h.receiver,h.authority].every(complete)?2:0) as 0|2},{score:([h.acceptance,h.record,h.escalation].every(complete)?2:0) as 0|2}]);const score=humanReviewScore(dims),grade=humanReviewGrade(score);const sequence=input.handoffs.map(h=>`${known.get(h.from)?.label||h.from} → ${known.get(h.to)?.label||h.to}: ${h.payload||'undefined payload'}`);
 const status:LegalWorkflowAssessment['status']=!input.nodes.length||!input.handoffs.length?'WORKFLOW UNDEFINED':handoffGaps.length||orphanNodes.length?'HANDOFF GAPS':'MAPPED AND ACCOUNTABLE';return {status,coverage,orphanNodes,handoffGaps,sequence,humanReview:{score,grade},engineVersion:LEGAL_WORKFLOW_ENGINE_VERSION};
}
export const LEGAL_WORKFLOW_PROVENANCE:ProvenanceRef[]=[{id:'016-aba-model-rule-1.1',classification:'direct-source'},{id:'016-aba-model-rule-1.3',classification:'direct-source'},{id:'016-aba-model-rule-1.4',classification:'direct-source'},{id:'010-skeleton-inheritance',classification:'product-heuristic'},{id:'014-judgment-inheritance',classification:'product-heuristic'},{id:'016-workflow-handoff-rubric',classification:'product-heuristic'}];

export const REGULATED_HANDOFF_ENGINE_VERSION='017.1.0';
export type RegulatedOrganization={id:string;name:string;role:string;authority:string;accountableOwner:string;governingSource:string};
export type RegulatedHandoff={id:string;from:string;to:string;subject:string;responsibility:string;evidencePackage:string;permissionBasis:string;acceptanceTest:string;deadline:string;incidentDuty:string;record:string;recourse:string};
export type RegulatedHandoffInput={market:string;regulatedActivity:string;affectedPeople:string;organizations:RegulatedOrganization[];handoffs:RegulatedHandoff[]};
export type RegulatedHandoffAssessment={status:'ACCOUNTABILITY INTACT'|'RESPONSIBILITY GAPS'|'CHAIN UNDEFINED';coverage:number;responsibilityGaps:string[];orphanOrganizations:string[];inheritedWorkflowStatus:LegalWorkflowAssessment['status'];engineVersion:string};
export function assessRegulatedHandoffs(input:RegulatedHandoffInput):RegulatedHandoffAssessment{
 const complete=(v:string)=>v.trim().length>=8;const known=new Map(input.organizations.map(o=>[o.id,o]));const responsibilityGaps:string[]=[];const linked=new Set<string>();
 for(const o of input.organizations)if(![o.role,o.authority,o.accountableOwner,o.governingSource].every(complete))responsibilityGaps.push(`${o.name}: define role, authority, accountable owner, and governing source.`);
 for(const h of input.handoffs){if(!known.has(h.from)||!known.has(h.to)){responsibilityGaps.push(`${h.id}: references an unknown organization.`);continue}linked.add(h.from);linked.add(h.to);const missing=[['responsibility',h.responsibility],['evidence package',h.evidencePackage],['permission basis',h.permissionBasis],['acceptance test',h.acceptanceTest],['deadline',h.deadline],['incident duty',h.incidentDuty],['record',h.record],['recourse',h.recourse]].filter(([,v])=>!complete(v)).map(([k])=>k);if(missing.length)responsibilityGaps.push(`${h.id}: define ${missing.join(', ')}.`)}
 if(![input.market,input.regulatedActivity,input.affectedPeople].every(complete))responsibilityGaps.push('Define the regulated market, bounded activity, and affected people.');
 const orphanOrganizations=input.organizations.filter(o=>!linked.has(o.id)).map(o=>o.name);
 const inheritedNodes:LegalWorkflowNode[]=input.organizations.map(o=>({id:o.id,label:o.name,kind:'actor',owner:o.accountableOwner,source:o.governingSource,freshness:'Reverify before the regulated transfer or material change',confidentiality:'Apply the governing access, confidentiality, and retention controls'}));
 const inheritedHandoffs:LegalWorkflowHandoff[]=input.handoffs.map(h=>({id:h.id,from:h.from,to:h.to,payload:h.subject,sender:known.get(h.from)?.accountableOwner||'',receiver:known.get(h.to)?.accountableOwner||'',trigger:h.permissionBasis,deadline:h.deadline,acceptance:h.acceptanceTest,authority:h.responsibility,record:h.record,escalation:h.incidentDuty}));
 const inherited=assessLegalWorkflow({matter:input.regulatedActivity,jurisdiction:input.market,objective:`Protect ${input.affectedPeople} across organizational transfers`,nodes:inheritedNodes,handoffs:inheritedHandoffs});
 const total=Math.max(1,input.organizations.length+input.handoffs.length);const completeOrganizations=input.organizations.filter(o=>[o.role,o.authority,o.accountableOwner,o.governingSource].every(complete)).length;const completeHandoffs=input.handoffs.filter(h=>[h.subject,h.responsibility,h.evidencePackage,h.permissionBasis,h.acceptanceTest,h.deadline,h.incidentDuty,h.record,h.recourse].every(complete)&&known.has(h.from)&&known.has(h.to)).length;const coverage=Math.round((completeOrganizations+completeHandoffs)/total*100);
 const status:RegulatedHandoffAssessment['status']=!input.organizations.length||!input.handoffs.length?'CHAIN UNDEFINED':responsibilityGaps.length||orphanOrganizations.length||inherited.status!=='MAPPED AND ACCOUNTABLE'?'RESPONSIBILITY GAPS':'ACCOUNTABILITY INTACT';
 return {status,coverage,responsibilityGaps,orphanOrganizations,inheritedWorkflowStatus:inherited.status,engineVersion:REGULATED_HANDOFF_ENGINE_VERSION};
}
export const REGULATED_HANDOFF_PROVENANCE:ProvenanceRef[]=[{id:'017-fda-quality-agreements',classification:'direct-source'},{id:'017-45-cfr-164.504',classification:'direct-source'},{id:'016-workflow-inheritance',classification:'product-heuristic'},{id:'017-responsibility-gap-rubric',classification:'product-heuristic'}];

export const INSTITUTIONAL_FRICTION_ENGINE_VERSION='018.1.0';
export type InstitutionalProcessStep={id:string;label:string;from:string;to:string;actor:string;action:string;requiredEvidence:string;owner:string;observedWaitHours:number;targetWaitHours:number;retryCount:number;exitRule:string;acceptance:string;recourse:string;record:string};
export type InstitutionalFrictionInput={service:string;outcome:string;affectedPeople:string;organizations:RegulatedOrganization[];handoffs:RegulatedHandoff[];steps:InstitutionalProcessStep[]};
export type FrictionFinding={stepId:string;kind:'BOTTLENECK'|'REPEATED LOOP'|'DEAD END'|'DUPLICATE DEMAND'|'OWNER GAP';severity:number;detail:string};
export type InstitutionalFrictionAssessment={status:'ACCESSIBLE PATH'|'FRICTION HOTSPOTS'|'PROCESS UNDEFINED';frictionScore:number;findings:FrictionFinding[];repairOrder:string[];inheritedWorkflowStatus:LegalWorkflowAssessment['status'];inheritedHandoffStatus:RegulatedHandoffAssessment['status'];engineVersion:string};
export function assessInstitutionalFriction(input:InstitutionalFrictionInput):InstitutionalFrictionAssessment{
 const complete=(v:string)=>v.trim().length>=8;const findings:FrictionFinding[]=[];const known=new Map(input.organizations.map(o=>[o.id,o]));
 const inheritedHandoffs=assessRegulatedHandoffs({market:'Institutional service delivery',regulatedActivity:input.service,affectedPeople:input.affectedPeople,organizations:input.organizations,handoffs:input.handoffs});
 const nodes:LegalWorkflowNode[]=input.organizations.map(o=>({id:o.id,label:o.name,kind:'actor',owner:o.accountableOwner,source:o.governingSource,freshness:'Reverify before a process or policy change',confidentiality:'Apply the governing access, privacy, and retention controls'}));
 const workflowHandoffs:LegalWorkflowHandoff[]=input.steps.map(s=>({id:s.id,from:s.from,to:s.to,payload:s.action,sender:known.get(s.from)?.accountableOwner||s.actor,receiver:known.get(s.to)?.accountableOwner||s.owner,trigger:s.requiredEvidence,deadline:`Target completion within ${s.targetWaitHours} hours`,acceptance:s.acceptance,authority:s.owner,record:s.record,escalation:s.recourse}));
 const inheritedWorkflow=assessLegalWorkflow({matter:input.service,jurisdiction:'Institutional process',objective:input.outcome,nodes,handoffs:workflowHandoffs});
 const evidenceSeen=new Map<string,string>();for(const step of input.steps){
  if(step.observedWaitHours>Math.max(1,step.targetWaitHours))findings.push({stepId:step.id,kind:'BOTTLENECK',severity:Math.min(100,Math.round(step.observedWaitHours/Math.max(1,step.targetWaitHours)*35)),detail:`Observed wait ${step.observedWaitHours}h exceeds the ${step.targetWaitHours}h target.`});
  if(step.retryCount>=2)findings.push({stepId:step.id,kind:'REPEATED LOOP',severity:Math.min(100,35+step.retryCount*12),detail:`People repeat this step ${step.retryCount} times before progressing.`});
  if(!complete(step.exitRule)||!complete(step.recourse))findings.push({stepId:step.id,kind:'DEAD END',severity:85,detail:'The next-state rule or usable recourse path is missing.'});
  if(!complete(step.owner))findings.push({stepId:step.id,kind:'OWNER GAP',severity:90,detail:'No accountable owner is named for this process state.'});
  const evidence=step.requiredEvidence.trim().toLowerCase();if(evidence&&evidenceSeen.has(evidence))findings.push({stepId:step.id,kind:'DUPLICATE DEMAND',severity:65,detail:`The same evidence was already requested at ${evidenceSeen.get(evidence)}.`});else if(evidence)evidenceSeen.set(evidence,step.id);
 }
 if(inheritedHandoffs.status!=='ACCOUNTABILITY INTACT')findings.push({stepId:'CHAIN',kind:'OWNER GAP',severity:90,detail:'Close inherited Build 017 responsibility, permission, acceptance, incident, record, and recourse gaps.'});
 if(inheritedWorkflow.status!=='MAPPED AND ACCOUNTABLE')findings.push({stepId:'WORKFLOW',kind:'DEAD END',severity:85,detail:'Close inherited Build 016 workflow and handoff gaps.'});
 const frictionScore=findings.length?Math.min(100,Math.round(findings.reduce((n,f)=>n+f.severity,0)/Math.max(1,input.steps.length))):0;
 const repairOrder=[...findings].sort((a,b)=>b.severity-a.severity).map(f=>`${f.stepId} · ${f.kind}: ${f.detail}`);
 const status:InstitutionalFrictionAssessment['status']=!input.steps.length||!input.organizations.length?'PROCESS UNDEFINED':findings.length?'FRICTION HOTSPOTS':'ACCESSIBLE PATH';
 return {status,frictionScore,findings,repairOrder,inheritedWorkflowStatus:inheritedWorkflow.status,inheritedHandoffStatus:inheritedHandoffs.status,engineVersion:INSTITUTIONAL_FRICTION_ENGINE_VERSION};
}
export const INSTITUTIONAL_FRICTION_PROVENANCE:ProvenanceRef[]=[{id:'018-omb-a11-section-280',classification:'cross-source-synthesis'},{id:'018-omb-administrative-burden',classification:'cross-source-synthesis'},{id:'016-workflow-inheritance',classification:'product-heuristic'},{id:'017-handoff-inheritance',classification:'product-heuristic'},{id:'018-friction-rubric',classification:'product-heuristic'}];


export const ESCALATION_ROUTER_ENGINE_VERSION='019.1.0';
export type EscalationSeverity='INFO'|'ATTENTION'|'URGENT'|'CRITICAL';
export type EscalationEvent={id:string;correlationKey:string;label:string;consequence:number;urgency:number;confidence:number;detectedAt:number;ownerRole:string;requiredAuthority:string;channels:string[];acknowledgementMinutes:number;suppressible:boolean;evidence:string};
export type EscalationResponder={id:string;name:string;role:string;authority:string;channels:string[];available:boolean;backupId:string};
export type EscalationRouteInput={events:EscalationEvent[];responders:EscalationResponder[];now:number;aiUse:AIUseMapInput;handoff:RegulatedHandoffInput;friction:InstitutionalFrictionInput};
export type RoutedEscalation={eventIds:string[];correlationKey:string;label:string;severity:EscalationSeverity;score:number;primary:string;backup:string;channel:string;deadline:number;reason:string;state:'SUPPRESSED'|'ROUTED'|'ESCALATED'|'UNROUTABLE'};
export type EscalationRouteAssessment={status:'ROUTES READY'|'ESCALATION REQUIRED'|'ROUTING GAPS';routes:RoutedEscalation[];suppressedCount:number;gaps:string[];inherited:{aiControls:AIUseMapAssessment['status'];handoffs:RegulatedHandoffAssessment['status'];friction:InstitutionalFrictionAssessment['status']};engineVersion:string};
export function assessEscalationRoutes(input:EscalationRouteInput):EscalationRouteAssessment{
 const ai=assessAIUseControls(input.aiUse),handoffs=assessRegulatedHandoffs(input.handoff),friction=assessInstitutionalFriction(input.friction);const responders=new Map(input.responders.map(r=>[r.id,r]));const grouped=new Map<string,EscalationEvent[]>();
 for(const event of input.events)(grouped.get(event.correlationKey)||grouped.set(event.correlationKey,[]).get(event.correlationKey)!).push(event);
 const routes:RoutedEscalation[]=[];const gaps:string[]=[];let suppressedCount=0;
 for(const [key,events] of grouped){const lead=[...events].sort((a,b)=>(b.consequence+b.urgency+b.confidence)-(a.consequence+a.urgency+a.confidence))[0];suppressedCount+=Math.max(0,events.length-1);const score=Math.max(0,Math.min(100,Math.round(lead.consequence*.45+lead.urgency*.35+lead.confidence*.2)));const severity:EscalationSeverity=score>=85?'CRITICAL':score>=65?'URGENT':score>=40?'ATTENTION':'INFO';const primary=responders.get(lead.ownerRole);const backup=primary?responders.get(primary.backupId):undefined;const acknowledgedBy=input.now<=lead.detectedAt+lead.acknowledgementMinutes*60000;let state:RoutedEscalation['state']='ROUTED';let target=primary;
  if(severity==='INFO'&&lead.suppressible){state='SUPPRESSED';target=undefined}
  else if(!primary||!primary.authority.includes(lead.requiredAuthority)){state='UNROUTABLE';gaps.push(`${lead.label}: no available responder has the required ${lead.requiredAuthority} authority.`)}
  else if(!primary.available||!acknowledgedBy){state='ESCALATED';target=backup;if(!backup?.available){state='UNROUTABLE';gaps.push(`${lead.label}: primary did not acknowledge and no available backup exists.`)}}
  const channel=target?.channels.find(c=>lead.channels.includes(c))||target?.channels[0]||'none';routes.push({eventIds:events.map(e=>e.id),correlationKey:key,label:lead.label,severity,score,primary:target?.name||'UNASSIGNED',backup:backup?.name||'UNASSIGNED',channel,deadline:lead.detectedAt+lead.acknowledgementMinutes*60000,reason:`${severity}: consequence ${lead.consequence}, urgency ${lead.urgency}, confidence ${lead.confidence}; ${events.length} correlated event(s); requires ${lead.requiredAuthority} authority.`,state});
 }
 if(ai.status!=='CONTROL PLAN READY')gaps.push('Close inherited Build 012 consequence-control gaps.');if(handoffs.status!=='ACCOUNTABILITY INTACT')gaps.push('Close inherited Build 017 cross-organization handoff gaps.');if(friction.status==='PROCESS UNDEFINED')gaps.push('Close inherited Build 018 process-definition gaps.');
 const status:EscalationRouteAssessment['status']=gaps.length||routes.some(r=>r.state==='UNROUTABLE')?'ROUTING GAPS':routes.some(r=>r.state==='ESCALATED')?'ESCALATION REQUIRED':'ROUTES READY';return {status,routes,suppressedCount,gaps,inherited:{aiControls:ai.status,handoffs:handoffs.status,friction:friction.status},engineVersion:ESCALATION_ROUTER_ENGINE_VERSION};
}
export const ESCALATION_ROUTER_PROVENANCE:ProvenanceRef[]=[{id:'019-nist-sp-800-61r3',classification:'cross-source-synthesis'},{id:'019-nist-csf-2.0',classification:'cross-source-synthesis'},{id:'019-cisa-situational-awareness',classification:'cross-source-synthesis'},{id:'012-consequence-control-inheritance',classification:'product-heuristic'},{id:'017-handoff-inheritance',classification:'product-heuristic'},{id:'018-friction-inheritance',classification:'product-heuristic'},{id:'019-routing-rubric',classification:'product-heuristic'}];
