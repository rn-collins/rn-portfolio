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
