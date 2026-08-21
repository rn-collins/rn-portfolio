export type AgentAction='CONTINUE'|'ASK'|'ABSTAIN'|'FALLBACK'|'ESCALATE'|'STOP';
export type ControlRecord={id:string;build:'019'|'032'|'038'|'039';version:string;scope:string;evidenceId:string;reviewedAt:string;expiresAt:string;revoked:boolean};
export type StopInput={evaluatedAt:string;consequence:'low'|'medium'|'high';uncertainty:number;evidenceCompleteness:number;toolFailed:boolean;requiredTool:boolean;humanAvailable:boolean;safeFallback:boolean;fallbackVerified:boolean;timeCritical:boolean;policyVersion:string;policyReviewedAt:string;policyExpiresAt:string;records:ControlRecord[]};
export type StopResult={action:AgentAction;reasons:string[];blockers:string[];status:'CONTROL GAPS'|'MODELED ACTION SELECTED';engineVersion:string;ruleId:string};
export const STOP_ESCALATE_ENGINE_VERSION='040.3.0';
export const STOP_CONTROL_SCOPE='synthetic stop-policy fixture';
export const REQUIRED_STOP_CONTROLS={
 '019':{id:'ROUTE-019-STOP',version:'019.2.0',evidenceId:'EVIDENCE-019-STOP'},
 '032':{id:'RELEASE-032-STOP',version:'032.2.0',evidenceId:'EVIDENCE-032-STOP'},
 '038':{id:'EVAL-038-STOP',version:'038.2.0',evidenceId:'EVIDENCE-038-STOP'},
 '039':{id:'TRACE-039-STOP',version:'039.2.0',evidenceId:'EVIDENCE-039-STOP'}
} as const;
const REQUIRED_BUILDS=Object.keys(REQUIRED_STOP_CONTROLS) as Array<keyof typeof REQUIRED_STOP_CONTROLS>;
function validDate(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const [y,m,d]=value.split('-').map(Number);const date=new Date(Date.UTC(y,m-1,d));return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d;}
function currentOn(date:string,reviewedAt:string,expiresAt:string){return reviewedAt<=date&&date<=expiresAt;}
function blocked(reason:string):StopResult{return{action:'STOP',reasons:['The bounded fixture cannot select an action.'],blockers:[reason],status:'CONTROL GAPS',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'BLOCK'};}
export function decideAgentAction(input:StopInput):StopResult{
 if(!Number.isFinite(input.uncertainty)||input.uncertainty<0||input.uncertainty>100||!Number.isFinite(input.evidenceCompleteness)||input.evidenceCompleteness<0||input.evidenceCompleteness>100)return blocked('Uncertainty and evidence completeness must be finite values from 0 to 100.');
 if(!validDate(input.evaluatedAt))return blocked('A valid evaluation date is required.');
 if(input.policyVersion!=='040-policy-3'||!validDate(input.policyReviewedAt)||!validDate(input.policyExpiresAt)||!currentOn(input.evaluatedAt,input.policyReviewedAt,input.policyExpiresAt))return blocked('The exact current versioned policy contract is required.');
 if(input.records.length!==REQUIRED_BUILDS.length||new Set(input.records.map(r=>r.build)).size!==REQUIRED_BUILDS.length)return blocked('Exactly one inherited control record from Builds 019, 032, 038, and 039 is required.');
 for(const build of REQUIRED_BUILDS){const r=input.records.find(x=>x.build===build);const expected=REQUIRED_STOP_CONTROLS[build];if(!r||r.id!==expected.id||r.version!==expected.version||r.scope!==STOP_CONTROL_SCOPE||r.evidenceId!==expected.evidenceId||!validDate(r.reviewedAt)||!validDate(r.expiresAt)||!currentOn(input.evaluatedAt,r.reviewedAt,r.expiresAt)||r.revoked)return blocked(`Build ${build} control record does not match the current synthetic contract.`);}
 if(input.toolFailed&&input.requiredTool){if(input.safeFallback&&input.fallbackVerified)return{action:'FALLBACK',reasons:['A required tool failed; the declared verified fallback is selected.'],blockers:[],status:'MODELED ACTION SELECTED',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'R1-REQUIRED-TOOL'};return{action:'STOP',reasons:['A required tool failed without a verified fallback.'],blockers:[],status:'MODELED ACTION SELECTED',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'R1-REQUIRED-TOOL'};}
 if(input.consequence==='high'&&(input.uncertainty>=40||input.evidenceCompleteness<80)){return{action:input.humanAvailable?'ESCALATE':'ABSTAIN',reasons:['High consequence requires stronger evidence and lower uncertainty; urgency does not relax this boundary.'],blockers:[],status:'MODELED ACTION SELECTED',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'R2-HIGH-CONSEQUENCE'};}
 if(input.evidenceCompleteness<50)return{action:input.humanAvailable?'ASK':'ABSTAIN',reasons:['Evidence is too incomplete to continue.'],blockers:[],status:'MODELED ACTION SELECTED',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'R3-EVIDENCE'};
 if(input.uncertainty>=70)return{action:input.humanAvailable?'ESCALATE':'ABSTAIN',reasons:['Uncertainty exceeds the declared policy boundary.'],blockers:[],status:'MODELED ACTION SELECTED',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'R4-UNCERTAINTY'};
 return{action:'CONTINUE',reasons:['The declared synthetic fixture remains within this versioned policy boundary.'],blockers:[],status:'MODELED ACTION SELECTED',engineVersion:STOP_ESCALATE_ENGINE_VERSION,ruleId:'R5-CONTINUE'};
}
