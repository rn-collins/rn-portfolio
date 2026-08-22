export type TwinActionScenarioId=
 |'PROPOSAL-AWAITS-APPROVAL'
 |'APPROVAL-DENIED'
 |'CONTEXT-UNAVAILABLE'
 |'TOOL-OUT-OF-SCOPE'
 |'APPROVED-SIMULATION-RECORDED';

type ContextRecord={id:string;source:string;scope:'SYNTHETIC-TASK-068';state:'AVAILABLE'|'UNAVAILABLE';content:string};
type Recommendation={id:string;basis:readonly string[];text:string;state:'BOUNDED'|'HELD'};
type ProposedAction={id:string;kind:'PREPARE-SYNTHETIC-SUMMARY';target:'LOCAL-SIMULATION';sideEffects:'NONE';state:'PROPOSED'|'HELD'};
type ApprovalGate={id:'GATE-068-01';required:true;decision:'PENDING'|'DENIED'|'APPROVED';decidedBy:'NONE'|'SYNTHETIC-APPROVER';scope:'THIS-PROPOSAL-ONLY'};
type ToolRequest={id:'TOOL-068-01';tool:'LOCAL-SYNTHETIC-RENDERER'|'EXTERNAL-UNAVAILABLE';requestedUse:string;allowlisted:boolean;sideEffects:'NONE';state:'NOT-REQUESTED'|'READY'|'REFUSED'|'SIMULATED'};
type LedgerEntry={sequence:number;stage:'CONTEXT-RETRIEVAL'|'DRAFT'|'RECOMMENDATION'|'PROPOSED-ACTION'|'APPROVAL'|'TOOL-USE'|'EXECUTION'|'REFUSAL-OR-EXCEPTION';event:string;outcome:'RECORDED'|'HELD'|'REFUSED'|'SIMULATED';sideEffects:'NONE'};

export type TwinActionRuntimeInput={
 fixtureId:'SYNTHETIC-TWIN-ACTION-068';scenarioId:TwinActionScenarioId;assessedAt:'2026-08-21';
 runtime:{runtimeId:'TWIN-RUNTIME-068-01';authority:'NONE';identity:'UNVERIFIED SYNTHETIC SUBJECT';persistence:'NONE';externalAccess:'NONE'};
 task:{taskId:'TASK-068-01';instruction:'PREPARE A SYNTHETIC TEXT SUMMARY FOR LOCAL REVIEW';domain:'GENERIC SYNTHETIC WORK';advice:'NONE'};
 context:readonly ContextRecord[];recommendation:Recommendation;proposedAction:ProposedAction;approvalGate:ApprovalGate;toolRequest:ToolRequest;
 inherited:{workflowEngine:'cap:039';humanApproval:'cap:040';personalModel:'cap:067';limits:readonly string[]};
};

export type TwinActionRuntimeResult={
 status:'AWAITING APPROVAL'|'APPROVAL DENIED'|'CONTEXT HOLD'|'TOOL REFUSED'|'SIMULATION RECORDED'|'INVALID';
 retrievedContext:readonly string[];draft:readonly string[];recommendations:readonly string[];proposedActions:readonly string[];approval:readonly string[];toolUse:readonly string[];execution:readonly string[];refusalsAndExceptions:readonly string[];ledger:readonly LedgerEntry[];unknowns:readonly string[];nonClaims:readonly string[];engineVersion:string;
};

export const TWIN_ACTION_RUNTIME_ENGINE_VERSION='068.1.0';
const limits=[
 'NO REAL PERSON PERSONAL DATA ACCOUNT CREDENTIAL TOOL OR EXTERNAL SYSTEM IS USED',
 'CONTEXT RETRIEVAL DRAFT RECOMMENDATION PROPOSAL APPROVAL TOOL USE EXECUTION AND REFUSAL REMAIN SEPARATE LEDGER STAGES',
 'APPROVAL IS A SYNTHETIC FIXTURE EVENT NOT VALID CONSENT AUTHORITY CAPACITY IDENTITY OR LEGAL RIGHTS',
 'APPROVAL APPLIES ONLY TO THE EXACT PROPOSAL AND NEVER CREATES GENERAL OR AUTONOMOUS AUTHORITY',
 'EXECUTION MEANS LOCAL DETERMINISTIC SIMULATION WITH ZERO SIDE EFFECTS',
 'NO MEDICAL LEGAL FINANCIAL OR OTHER PROFESSIONAL ADVICE IMPERSONATION SURVEILLANCE PERSISTENCE OR CREDENTIAL HANDLING',
] as const;
const inherited={workflowEngine:'cap:039',humanApproval:'cap:040',personalModel:'cap:067',limits} as const;
const context:readonly ContextRecord[]=[{id:'CTX-068-01',source:'synthetic://068/context-01',scope:'SYNTHETIC-TASK-068',state:'AVAILABLE',content:'FIXED SYNTHETIC PROJECT ALPHA STATUS'}];
const recommendation:Recommendation={id:'REC-068-01',basis:['CTX-068-01'],text:'PREPARE A THREE-LINE SYNTHETIC TEXT SUMMARY FOR REVIEW',state:'BOUNDED'};
const action:ProposedAction={id:'ACT-068-01',kind:'PREPARE-SYNTHETIC-SUMMARY',target:'LOCAL-SIMULATION',sideEffects:'NONE',state:'PROPOSED'};
const gate:ApprovalGate={id:'GATE-068-01',required:true,decision:'PENDING',decidedBy:'NONE',scope:'THIS-PROPOSAL-ONLY'};
const tool:ToolRequest={id:'TOOL-068-01',tool:'LOCAL-SYNTHETIC-RENDERER',requestedUse:'RENDER THE FIXED SUMMARY LOCALLY',allowlisted:true,sideEffects:'NONE',state:'READY'};
const make=(scenarioId:TwinActionScenarioId,c:readonly ContextRecord[],r:Recommendation,a:ProposedAction,g:ApprovalGate,t:ToolRequest):TwinActionRuntimeInput=>({fixtureId:'SYNTHETIC-TWIN-ACTION-068',scenarioId,assessedAt:'2026-08-21',runtime:{runtimeId:'TWIN-RUNTIME-068-01',authority:'NONE',identity:'UNVERIFIED SYNTHETIC SUBJECT',persistence:'NONE',externalAccess:'NONE'},task:{taskId:'TASK-068-01',instruction:'PREPARE A SYNTHETIC TEXT SUMMARY FOR LOCAL REVIEW',domain:'GENERIC SYNTHETIC WORK',advice:'NONE'},context:c,recommendation:r,proposedAction:a,approvalGate:g,toolRequest:t,inherited});
export const TWIN_ACTION_SCENARIOS:Readonly<Record<TwinActionScenarioId,TwinActionRuntimeInput>>={
 'PROPOSAL-AWAITS-APPROVAL':make('PROPOSAL-AWAITS-APPROVAL',context,recommendation,action,gate,tool),
 'APPROVAL-DENIED':make('APPROVAL-DENIED',context,recommendation,{...action,state:'HELD'},{...gate,decision:'DENIED',decidedBy:'SYNTHETIC-APPROVER'},{...tool,state:'NOT-REQUESTED'}),
 'CONTEXT-UNAVAILABLE':make('CONTEXT-UNAVAILABLE',context.map(c=>({...c,state:'UNAVAILABLE'})),{...recommendation,state:'HELD'},{...action,state:'HELD'},gate,{...tool,state:'NOT-REQUESTED'}),
 'TOOL-OUT-OF-SCOPE':make('TOOL-OUT-OF-SCOPE',context,recommendation,{...action,state:'HELD'},{...gate,decision:'APPROVED',decidedBy:'SYNTHETIC-APPROVER'},{...tool,tool:'EXTERNAL-UNAVAILABLE',allowlisted:false,state:'REFUSED'}),
 'APPROVED-SIMULATION-RECORDED':make('APPROVED-SIMULATION-RECORDED',context,recommendation,action,{...gate,decision:'APPROVED',decidedBy:'SYNTHETIC-APPROVER'},{...tool,state:'SIMULATED'}),
};
const entry=(sequence:number,stage:LedgerEntry['stage'],event:string,outcome:LedgerEntry['outcome']):LedgerEntry=>({sequence,stage,event,outcome,sideEffects:'NONE'});
const invalid=():TwinActionRuntimeResult=>({status:'INVALID',retrievedContext:[],draft:[],recommendations:[],proposedActions:[],approval:[],toolUse:[],execution:[],refusalsAndExceptions:['INVALID SYNTHETIC INPUT'],ledger:[],unknowns:[],nonClaims:['NO ACTION TAKEN'],engineVersion:TWIN_ACTION_RUNTIME_ENGINE_VERSION});
const exact=(a:unknown,e:unknown):boolean=>{if(e===null||typeof e!=='object')return a===e;if(!a||typeof a!=='object')return false;if(Array.isArray(e))return Array.isArray(a)&&a.length===e.length&&e.every((v,i)=>exact(a[i],v));if(Array.isArray(a))return false;const aa=a as Record<string,unknown>,ee=e as Record<string,unknown>,ks=Object.keys(ee);return Object.keys(aa).length===ks.length&&ks.every(k=>Object.prototype.hasOwnProperty.call(aa,k)&&exact(aa[k],ee[k]));};
function evaluate(candidate:unknown):TwinActionRuntimeResult{
 if(!candidate||typeof candidate!=='object'||Array.isArray(candidate))return invalid();const o=candidate as Record<string,unknown>;
 if(typeof o.scenarioId!=='string'||!Object.prototype.hasOwnProperty.call(TWIN_ACTION_SCENARIOS,o.scenarioId))return invalid();const input=TWIN_ACTION_SCENARIOS[o.scenarioId as TwinActionScenarioId];if(!exact(o,input))return invalid();
 const unavailable=input.context.some(c=>c.state==='UNAVAILABLE'),denied=input.approvalGate.decision==='DENIED',refused=!input.toolRequest.allowlisted||input.toolRequest.state==='REFUSED',simulated=input.toolRequest.state==='SIMULATED';
 const status:TwinActionRuntimeResult['status']=unavailable?'CONTEXT HOLD':denied?'APPROVAL DENIED':refused?'TOOL REFUSED':simulated?'SIMULATION RECORDED':'AWAITING APPROVAL';
 const ledger:LedgerEntry[]=[entry(1,'CONTEXT-RETRIEVAL','REQUEST FIXED SYNTHETIC CONTEXT',unavailable?'HELD':'RECORDED')];
 const draft=!unavailable?['DRAFT-068-01 · THREE-LINE SYNTHETIC SUMMARY · NOT AN ACTION']:[];if(!unavailable)ledger.push(entry(2,'DRAFT','PREPARE REVIEWABLE DRAFT','RECORDED'),entry(3,'RECOMMENDATION','FORM BOUNDED RECOMMENDATION','RECORDED'),entry(4,'PROPOSED-ACTION','PROPOSE LOCAL ZERO-SIDE-EFFECT SIMULATION',input.proposedAction.state==='HELD'?'HELD':'RECORDED'));
 ledger.push(entry(5,'APPROVAL',`GATE ${input.approvalGate.decision}`,denied?'REFUSED':input.approvalGate.decision==='APPROVED'?'RECORDED':'HELD'));
 if(refused)ledger.push(entry(6,'TOOL-USE','TOOL NOT ALLOWLISTED','REFUSED'),entry(7,'REFUSAL-OR-EXCEPTION','REFUSE OUT-OF-SCOPE TOOL','REFUSED'));
 else if(simulated)ledger.push(entry(6,'TOOL-USE','LOCAL RENDERER SIMULATED','SIMULATED'),entry(7,'EXECUTION','LOCAL OUTPUT SIMULATED','SIMULATED'));
 else ledger.push(entry(6,'TOOL-USE','NO TOOL INVOCATION','HELD'),entry(7,'EXECUTION','NO EXECUTION','HELD'));
 const refusal=unavailable?['CONTEXT UNAVAILABLE · DRAFT RECOMMENDATION ACTION TOOL AND EXECUTION HELD']:denied?['APPROVAL DENIED · TOOL AND EXECUTION NOT REQUESTED']:refused?['TOOL OUT OF SCOPE · EXECUTION REFUSED']:input.approvalGate.decision==='PENDING'?['APPROVAL REQUIRED · TOOL AND EXECUTION HELD']:[];
 return{status,retrievedContext:input.context.filter(c=>c.state==='AVAILABLE').map(c=>`${c.id} · ${c.content} · ${c.source}`),draft,recommendations:unavailable?[]:[`${input.recommendation.id} · ${input.recommendation.text} · ${input.recommendation.state}`],proposedActions:unavailable?[]:[`${input.proposedAction.id} · ${input.proposedAction.kind} · ${input.proposedAction.state} · SIDE EFFECTS NONE`],approval:[`${input.approvalGate.id} · REQUIRED · ${input.approvalGate.decision} · ${input.approvalGate.scope}`],toolUse:simulated?['TOOL-068-01 · LOCAL-SYNTHETIC-RENDERER · SIMULATED · SIDE EFFECTS NONE']:refused?['TOOL-068-01 · EXTERNAL-UNAVAILABLE · REFUSED']:[],execution:simulated?['EXEC-068-01 · LOCAL DETERMINISTIC SIMULATION RECORDED · SIDE EFFECTS NONE']:[],refusalsAndExceptions:refusal,ledger,unknowns:['ANY REAL PERSON IDENTITY INTENT PREFERENCE AUTHORITY CAPACITY CONSENT OR LEGAL RIGHT','ANY REAL ACCOUNT CREDENTIAL TOOL CONTENT SYSTEM STATE OR EXTERNAL CONSEQUENCE','WHETHER ANY REAL-WORLD ACTION WOULD BE ACCURATE APPROPRIATE SAFE LAWFUL OR AUTHORIZED'],nonClaims:['NO REAL PERSON PERSONAL DATA ACCOUNT CREDENTIAL TOOL OR EXTERNAL ACTION','NO IDENTITY AUTHORITY CAPACITY CONSENT OWNERSHIP OR LEGAL-RIGHTS DETERMINATION','NO IMPERSONATION AUTONOMOUS AUTHORITY PERSISTENCE SURVEILLANCE OR ACTUAL SIDE EFFECT','NO MEDICAL LEGAL FINANCIAL OR OTHER PROFESSIONAL ADVICE','SIMULATED EXECUTION IS A FIXTURE LEDGER EVENT NOT REAL EXECUTION'],engineVersion:TWIN_ACTION_RUNTIME_ENGINE_VERSION};
}
export function buildTwinActionRuntime(candidate:unknown):TwinActionRuntimeResult{try{return evaluate(candidate)}catch{return invalid()}}
