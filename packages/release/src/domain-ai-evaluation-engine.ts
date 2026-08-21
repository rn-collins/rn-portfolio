export type EvaluationMetric={id:string;weight:number;minimum:number;direction:'higher'|'lower';unit:string;validityScope:string};
export type Evidence={id:string;method:string;observedAt:string;datasetId:string;datasetVersion:string;leakageChecked:boolean};
export type ModelSlice={modelId:string;modelVersion:string;sliceId:string;sliceKind:'common'|'rare'|'intersectional';scores:Record<string,number>;sampleSize:number;confidence95:Record<string,[number,number]>;representative:boolean;evidence:Evidence};
export type EvaluationInput={useCaseId:string;task:string;consequenceScope:string;contractVersion:string;asOf:string;metrics:EvaluationMetric[];slices:ModelSlice[];requiredSlices:string[];consequenceRecordId:string;releaseRecordId:string;decisionRecordId:string};
export type ModelEvaluation={modelId:string;weightedScore:number;worstSlice:string;worstSliceScore:number;passing:boolean};
export type EvaluationResult={status:'EVALUATION BLOCKED'|'DECLARED GATES NOT MET'|'SYNTHETIC COMPARISON COMPLETE';models:ModelEvaluation[];findings:string[];engineVersion:string};
export const DOMAIN_AI_EVALUATION_ENGINE_VERSION='038.2.0';
const date=(x:string)=>/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x));
export function evaluateDomainAI(input:EvaluationInput):EvaluationResult{
 const findings:string[]=[]; const ids=input.metrics.map(m=>m.id); const total=input.metrics.reduce((s,m)=>s+m.weight,0);
 if(!input.useCaseId.trim()||!input.task.trim()||!input.consequenceScope.trim())findings.push('Declare use case, task, and consequence scope.');
 if(!input.contractVersion.trim()||!date(input.asOf))findings.push('Pin metric contract version and valid as-of date.');
 if(!input.consequenceRecordId.trim()||!input.releaseRecordId.trim()||!input.decisionRecordId.trim())findings.push('Link consequence 012, decision 020, and release 032 records.');
 if(new Set(ids).size!==ids.length||!ids.length)findings.push('Metric IDs must be unique and non-empty.');
 if(Math.abs(total-100)>.0001||input.metrics.some(m=>m.weight<0||m.weight>100))findings.push('Frozen metric weights must be 0–100 and total exactly 100; no silent renormalization.');
 for(const m of input.metrics)if(!m.id.trim()||!m.unit.trim()||!m.validityScope.trim()||!Number.isFinite(m.minimum))findings.push(`${m.id||'metric'}: direction, unit, minimum, and validity scope are required.`);
 const required=[...new Set(input.requiredSlices)]; if(!['common','rare','intersectional'].every(k=>input.slices.some(s=>s.sliceKind===k)))findings.push('Common, rare, and intersectional slice classes are required.');
 for(const s of input.slices){
  if(s.sampleSize<40)findings.push(`${s.modelId}/${s.sliceId}: sample below declared fixture floor 40; power is not established.`);
  if(!s.representative)findings.push(`${s.modelId}/${s.sliceId}: representativeness not established.`);
  if(!s.modelVersion.trim()||!s.evidence.id.trim()||!s.evidence.method.trim()||!s.evidence.datasetId.trim()||!s.evidence.datasetVersion.trim()||!date(s.evidence.observedAt))findings.push(`${s.modelId}/${s.sliceId}: versioned evidence identity, method, dataset, and date required.`);
  if(!s.evidence.leakageChecked)findings.push(`${s.modelId}/${s.sliceId}: leakage check missing.`);
  for(const m of input.metrics){const v=s.scores[m.id],ci=s.confidence95[m.id];if(!Number.isFinite(v)||!ci||!ci.every(Number.isFinite))findings.push(`${s.modelId}/${s.sliceId}/${m.id}: score or 95% interval missing.`);}
 }
 const modelIds=[...new Set(input.slices.map(s=>s.modelId))].sort(); const contractBlocked=findings.length>0;
 const models=modelIds.map(modelId=>{const ss=input.slices.filter(s=>s.modelId===modelId);const present=required.every(id=>ss.some(s=>s.sliceId===id));if(!present)findings.push(`${modelId}: required slice missing.`);
  const rows=ss.map(s=>({id:s.sliceId,score:input.metrics.reduce((n,m)=>n+(Number.isFinite(s.scores[m.id])?s.scores[m.id]:0)*m.weight/100,0)})).sort((a,b)=>a.score-b.score||a.id.localeCompare(b.id));
  const metricPass=ss.every(s=>input.metrics.every(m=>{const v=s.scores[m.id],ci=s.confidence95[m.id];const conservative=m.direction==='higher'?ci?.[0]:ci?.[1];return Number.isFinite(v)&&Number.isFinite(conservative)&&(m.direction==='higher'?conservative>=m.minimum:conservative<=m.minimum)}));
  const weightedScore=Math.round((rows.reduce((n,r)=>n+r.score,0)/(rows.length||1))*100)/100; const worst=rows[0]??{id:'missing',score:0};
  return{modelId,weightedScore,worstSlice:worst.id,worstSliceScore:Math.round(worst.score*100)/100,passing:!contractBlocked&&present&&metricPass};
 }).sort((a,b)=>Number(b.passing)-Number(a.passing)||b.worstSliceScore-a.worstSliceScore||b.weightedScore-a.weightedScore||a.modelId.localeCompare(b.modelId));
 const dedup=[...new Set(findings)]; return{status:dedup.length?'EVALUATION BLOCKED':models.some(m=>m.passing)?'SYNTHETIC COMPARISON COMPLETE':'DECLARED GATES NOT MET',models,findings:dedup,engineVersion:DOMAIN_AI_EVALUATION_ENGINE_VERSION};
}