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
