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
 const metricFields=(m:DashboardMetric)=>[m.label,m.value,m.source,m.freshness,m.comparison,m.uncertainty,m.decisionUse];
 const completeMetrics=metrics.filter(m=>metricFields(m).every(complete));
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
