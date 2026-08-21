export type LegalKnowledgeScenarioId =
  | 'MEMORY-CONNECTED'
  | 'AUTHORITY-UNVERIFIED'
  | 'ACCESS-RESTRICTED'
  | 'CONFLICTING-OUTCOME'
  | 'LESSON-UNREVIEWED';

type LegalNodeKind = 'MATTER'|'AUTHORITY'|'ARGUMENT'|'DOCUMENT'|'EXPERT'|'OUTCOME'|'WORKFLOW'|'LESSON';
type LegalNode = { id:string; kind:LegalNodeKind; label:string; matterId:string|null; source:string; access:'OPEN-FIXTURE'|'RESTRICTED'; verification:'FIXED-VERIFIED'|'UNVERIFIED'|'NOT-APPLICABLE'; review:'REVIEWED'|'UNREVIEWED' };
type LegalEdge = { id:string; from:string; to:string; relation:'CITES'|'SUPPORTS'|'CONTESTS'|'PRODUCED'|'INFORMED'|'RESULTED-IN'|'REUSED-IN'|'DERIVED-FROM'; evidence:string; state:'ACTIVE'|'CONTESTED'|'RESTRICTED'|'UNREVIEWED' };

export type LegalKnowledgeGraphInput = {
  fixtureId:'SYNTHETIC-LEGAL-MEMORY-066'; scenarioId:LegalKnowledgeScenarioId; assessedAt:'2026-08-21';
  graph:{ graphId:'GRAPH-066-01'; ontologyVersion:'legal-knowledge-066-v1'; nodes:readonly LegalNode[]; edges:readonly LegalEdge[] };
  inherited:{ provenance:'cap:028'; changeEngine:'029.2.0'; researchRepository:'cap:063'; evidenceGraph:'cap:058'; knowledgeGraph:'cap:059'; limits:readonly string[] };
};

export type LegalKnowledgeGraphResult = {
  status:'MEMORY CONNECTED'|'AUTHORITY REVIEW'|'ACCESS HOLD'|'CONFLICT REVIEW'|'LESSON REVIEW'|'INVALID';
  matters:readonly string[]; authorities:readonly string[]; arguments:readonly string[]; documents:readonly string[]; experts:readonly string[];
  outcomes:readonly string[]; workflows:readonly string[]; lessons:readonly string[]; relationships:readonly string[]; provenance:readonly string[];
  unknowns:readonly string[]; nonClaims:readonly string[]; engineVersion:string;
};

export const LEGAL_KNOWLEDGE_GRAPH_ENGINE_VERSION='066.1.0';
const limits=[
  'PROVENANCE DOES NOT ESTABLISH AUTHENTICITY ADMISSIBILITY PRIVILEGE CONFIDENTIALITY OR COMPLETENESS',
  'CHANGE PROPAGATION DOES NOT DETERMINE MATERIALITY DUTY NOTICE OR CURRENT LAW',
  'EVIDENCE CONNECTIONS DO NOT ESTABLISH TRUTH WEIGHT SUFFICIENCY OR LEGAL EFFECT',
  'A KNOWLEDGE GRAPH DOES NOT CREATE LEGAL ADVICE AN ATTORNEY CLIENT RELATIONSHIP OR A CONFLICT CHECK',
  'A RESEARCH RECORD DOES NOT ESTABLISH CITATION VALIDITY PRECEDENTIAL VALUE OR CURRENT AUTHORITY',
] as const;
const inherited={provenance:'cap:028',changeEngine:'029.2.0',researchRepository:'cap:063',evidenceGraph:'cap:058',knowledgeGraph:'cap:059',limits} as const;
const nodes:readonly LegalNode[]=[
 {id:'MATTER-066-A',kind:'MATTER',label:'SYNTHETIC ALPHA MATTER',matterId:'MATTER-066-A',source:'synthetic://066/matter-a',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
 {id:'MATTER-066-B',kind:'MATTER',label:'SYNTHETIC BETA MATTER',matterId:'MATTER-066-B',source:'synthetic://066/matter-b',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
 {id:'AUTH-066-01',kind:'AUTHORITY',label:'SYNTHETIC AUTHORITY — NOT REAL LAW',matterId:null,source:'synthetic://066/authority-01',access:'OPEN-FIXTURE',verification:'FIXED-VERIFIED',review:'REVIEWED'},
 {id:'ARG-066-01',kind:'ARGUMENT',label:'SYNTHETIC ARGUMENT MAP',matterId:'MATTER-066-A',source:'synthetic://066/argument-01',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
 {id:'DOC-066-01',kind:'DOCUMENT',label:'SYNTHETIC WORK PRODUCT',matterId:'MATTER-066-A',source:'synthetic://066/document-01',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
 {id:'EXPERT-066-ROLE',kind:'EXPERT',label:'SYNTHETIC EXPERT ROLE — NO PERSON',matterId:'MATTER-066-A',source:'synthetic://066/expert-role',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
 {id:'OUTCOME-066-A',kind:'OUTCOME',label:'SYNTHETIC OUTCOME A',matterId:'MATTER-066-A',source:'synthetic://066/outcome-a',access:'OPEN-FIXTURE',verification:'FIXED-VERIFIED',review:'REVIEWED'},
 {id:'WORKFLOW-066-01',kind:'WORKFLOW',label:'SYNTHETIC REVIEW WORKFLOW',matterId:null,source:'synthetic://066/workflow-01',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
 {id:'LESSON-066-01',kind:'LESSON',label:'SYNTHETIC LESSON: VERIFY BEFORE REUSE',matterId:null,source:'synthetic://066/lesson-01',access:'OPEN-FIXTURE',verification:'NOT-APPLICABLE',review:'REVIEWED'},
] as const;
const edges:readonly LegalEdge[]=[
 {id:'EDGE-01',from:'ARG-066-01',to:'AUTH-066-01',relation:'CITES',evidence:'synthetic://066/edge-01',state:'ACTIVE'},
 {id:'EDGE-02',from:'DOC-066-01',to:'ARG-066-01',relation:'SUPPORTS',evidence:'synthetic://066/edge-02',state:'ACTIVE'},
 {id:'EDGE-03',from:'EXPERT-066-ROLE',to:'ARG-066-01',relation:'INFORMED',evidence:'synthetic://066/edge-03',state:'ACTIVE'},
 {id:'EDGE-04',from:'MATTER-066-A',to:'OUTCOME-066-A',relation:'RESULTED-IN',evidence:'synthetic://066/edge-04',state:'ACTIVE'},
 {id:'EDGE-05',from:'LESSON-066-01',to:'OUTCOME-066-A',relation:'DERIVED-FROM',evidence:'synthetic://066/edge-05',state:'ACTIVE'},
 {id:'EDGE-06',from:'LESSON-066-01',to:'MATTER-066-B',relation:'REUSED-IN',evidence:'synthetic://066/edge-06',state:'ACTIVE'},
 {id:'EDGE-07',from:'WORKFLOW-066-01',to:'LESSON-066-01',relation:'PRODUCED',evidence:'synthetic://066/edge-07',state:'ACTIVE'},
] as const;
const make=(scenarioId:LegalKnowledgeScenarioId,n:readonly LegalNode[],e:readonly LegalEdge[]):LegalKnowledgeGraphInput=>({fixtureId:'SYNTHETIC-LEGAL-MEMORY-066',scenarioId,assessedAt:'2026-08-21',graph:{graphId:'GRAPH-066-01',ontologyVersion:'legal-knowledge-066-v1',nodes:n,edges:e},inherited});
const patchNode=(id:string,patch:Partial<LegalNode>)=>nodes.map(n=>n.id===id?{...n,...patch}:n);
const patchEdge=(id:string,patch:Partial<LegalEdge>)=>edges.map(e=>e.id===id?{...e,...patch}:e);
export const LEGAL_KNOWLEDGE_SCENARIOS:Readonly<Record<LegalKnowledgeScenarioId,LegalKnowledgeGraphInput>>={
 'MEMORY-CONNECTED':make('MEMORY-CONNECTED',nodes,edges),
 'AUTHORITY-UNVERIFIED':make('AUTHORITY-UNVERIFIED',patchNode('AUTH-066-01',{verification:'UNVERIFIED'}),edges),
 'ACCESS-RESTRICTED':make('ACCESS-RESTRICTED',patchNode('DOC-066-01',{access:'RESTRICTED'}),patchEdge('EDGE-02',{state:'RESTRICTED'})),
 'CONFLICTING-OUTCOME':make('CONFLICTING-OUTCOME',nodes,patchEdge('EDGE-05',{state:'CONTESTED'})),
 'LESSON-UNREVIEWED':make('LESSON-UNREVIEWED',patchNode('LESSON-066-01',{review:'UNREVIEWED'}),patchEdge('EDGE-06',{state:'UNREVIEWED'})),
};
const invalid=():LegalKnowledgeGraphResult=>({status:'INVALID',matters:[],authorities:[],arguments:[],documents:[],experts:[],outcomes:[],workflows:[],lessons:[],relationships:[],provenance:[],unknowns:[],nonClaims:['INVALID SYNTHETIC INPUT'],engineVersion:LEGAL_KNOWLEDGE_GRAPH_ENGINE_VERSION});
const exact=(a:unknown,e:unknown):boolean=>{if(e===null||typeof e!=='object')return a===e;if(!a||typeof a!=='object')return false;if(Array.isArray(e))return Array.isArray(a)&&a.length===e.length&&e.every((v,i)=>exact(a[i],v));if(Array.isArray(a))return false;const aa=a as Record<string,unknown>,ee=e as Record<string,unknown>,ks=Object.keys(ee);return Object.keys(aa).length===ks.length&&ks.every(k=>Object.prototype.hasOwnProperty.call(aa,k)&&exact(aa[k],ee[k]));};
function evaluate(candidate:unknown):LegalKnowledgeGraphResult{
 if(!candidate||typeof candidate!=='object'||Array.isArray(candidate))return invalid(); const o=candidate as Record<string,unknown>;
 if(typeof o.scenarioId!=='string'||!Object.prototype.hasOwnProperty.call(LEGAL_KNOWLEDGE_SCENARIOS,o.scenarioId))return invalid(); const input=LEGAL_KNOWLEDGE_SCENARIOS[o.scenarioId as LegalKnowledgeScenarioId]; if(!exact(o,input))return invalid();
 const ns=input.graph.nodes,es=input.graph.edges,status:LegalKnowledgeGraphResult['status']=ns.some(n=>n.access==='RESTRICTED')?'ACCESS HOLD':ns.some(n=>n.kind==='AUTHORITY'&&n.verification==='UNVERIFIED')?'AUTHORITY REVIEW':es.some(e=>e.state==='CONTESTED')?'CONFLICT REVIEW':ns.some(n=>n.kind==='LESSON'&&n.review==='UNREVIEWED')?'LESSON REVIEW':'MEMORY CONNECTED';
 const group=(kind:LegalNodeKind)=>ns.filter(n=>n.kind===kind).map(n=>`${n.id} · ${n.label} · ${n.access} · ${n.verification} · ${n.review}`);
 return{status,matters:group('MATTER'),authorities:group('AUTHORITY'),arguments:group('ARGUMENT'),documents:group('DOCUMENT'),experts:group('EXPERT'),outcomes:group('OUTCOME'),workflows:group('WORKFLOW'),lessons:group('LESSON'),relationships:es.map(e=>`${e.id} · ${e.from} ${e.relation} ${e.to} · ${e.state}`),provenance:[...ns.map(n=>n.source),...es.map(e=>e.evidence)],unknowns:['WHETHER ANY REAL MATTER AUTHORITY ARGUMENT DOCUMENT EXPERT OUTCOME WORKFLOW OR LESSON EXISTS OR IS ACCURATELY REPRESENTED','CURRENT LAW CITATION VALIDITY PRECEDENTIAL VALUE JURISDICTION PROCEDURAL POSTURE AND SUBSEQUENT HISTORY','PRIVILEGE CONFIDENTIALITY WORK PRODUCT ACCESS AUTHORIZATION CONFLICTS ETHICAL DUTIES AND RETENTION REQUIREMENTS','WHETHER A PATTERN OR LESSON TRANSFERS TO ANY OTHER MATTER FACTS CLIENT FORUM OR TIME'],nonClaims:['FIXED-VERIFIED MEANS MATCHED TO THIS SYNTHETIC FIXTURE ONLY','NO REAL CLIENT MATTER PERSON COURT LAW FIRM EXPERT DOCUMENT AUTHORITY OR LEGAL OUTCOME IS REPRESENTED','THIS GRAPH DOES NOT PROVIDE LEGAL ADVICE OR CREATE AN ATTORNEY CLIENT RELATIONSHIP','ACCESS STATES DO NOT DETERMINE PRIVILEGE CONFIDENTIALITY WORK PRODUCT AUTHORIZATION OR LAWFUL DISCLOSURE','AUTHORITY STATES DO NOT CLAIM CURRENT LAW VALID CITATIONS PRECEDENTIAL VALUE OR LEGAL EFFECT','RELATIONSHIPS AND LESSONS ARE NAVIGATION AIDS NOT LEGAL CONCLUSIONS PREDICTIONS OR PROOF'],engineVersion:LEGAL_KNOWLEDGE_GRAPH_ENGINE_VERSION};
}
export function buildLegalKnowledgeGraph(candidate:unknown):LegalKnowledgeGraphResult{try{return evaluate(candidate)}catch{return invalid()}}
