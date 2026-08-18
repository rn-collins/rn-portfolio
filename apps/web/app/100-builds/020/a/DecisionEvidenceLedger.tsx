'use client';

import {useMemo,useState} from 'react';
import s from '../ledger.module.css';

type Evidence={id:string;label:string;source:string;recordedAt:string;required:boolean;included:boolean};
const initialEvidence:Evidence[]=[
 {id:'EV-01',label:'Severity assessment',source:'Consequence mapper / Build 012',recordedAt:'2026-08-17T09:02:00Z',required:true,included:true},
 {id:'EV-02',label:'Escalation acknowledgement',source:'Escalation router / Build 019',recordedAt:'2026-08-17T09:06:00Z',required:true,included:true},
 {id:'EV-03',label:'Customer-impact estimate',source:'Service operations',recordedAt:'2026-08-17T09:04:00Z',required:true,included:true}
];
const originalDecision=Object.freeze({
 id:'DEC-020-001',
 question:'Should the service enter bounded recovery mode?',
 decidedAt:'2026-08-17T09:08:00Z',
 decidedBy:'Duty officer',
 authority:'Incident command delegation IC-4',
 outcome:'Enter bounded recovery mode',
 alternatives:['Continue monitoring','Full shutdown'],
 acknowledgement:{event:'INC-019-042',acknowledgedAt:'2026-08-17T09:06:00Z'},
 result:{observedAt:'2026-08-17T09:24:00Z',state:'Service stabilized; review remains open'}
});
const correction={id:'COR-020-001',corrects:'DEC-020-001',field:'authority',previousValue:'Incident command delegation IC-4',correctedValue:'Incident command delegation IC-4, recovery actions only',reason:'Clarify the bounded scope of delegated authority.',recordedAt:'2026-08-17T10:01:00Z',recordedBy:'Review officer'};

export default function DecisionEvidenceLedger(){
 const [evidence,setEvidence]=useState(initialEvidence);
 const [corrections,setCorrections]=useState<typeof correction[]>([]);
 const included=evidence.filter(item=>item.included);
 const missingRequired=evidence.filter(item=>item.required&&!item.included);
 const complete=missingRequired.length===0;
 const exportRecord=useMemo(()=>({
  schema:'rn.decision-evidence-ledger',
  schemaVersion:'020.2.0',
  syntheticData:true,
  originalDecision,
  evidenceLinks:included.map(({id,label,source,recordedAt,required})=>({id,label,source,recordedAt,required})),
  missingRequiredEvidence:missingRequired.map(({id,label})=>({id,label})),
  correctionHistory:corrections
 }),[included,missingRequired,corrections]);
 function download(){
  const url=URL.createObjectURL(new Blob([JSON.stringify(exportRecord,null,2)],{type:'application/json'}));
  const anchor=document.createElement('a');
  anchor.href=url;anchor.download='decision-evidence-ledger.json';anchor.click();
  setTimeout(()=>URL.revokeObjectURL(url),0);
 }
 function appendCorrection(){setCorrections(current=>current.length?current:[correction])}
 return <section className={s.lab}>
  <div className={s.status} role="status" aria-live="polite" aria-atomic="true">
   <span>{complete?'LEDGER RECONSTRUCTED':'EVIDENCE GAP'}</span>
   <h2>{included.length} / {evidence.length} required evidence records linked</h2>
   <p>{complete?'The required links are present. This does not prove that the evidence or decision was correct.':`Missing required record${missingRequired.length===1?'':'s'}: ${missingRequired.map(item=>item.label).join(', ')}.`}</p>
  </div>
  <div className={s.grid}>
   <article><h3>ORIGINAL DECISION</h3><dl>
    <dt>Question</dt><dd>{originalDecision.question}</dd><dt>Decision maker</dt><dd>{originalDecision.decidedBy}</dd>
    <dt>Authority</dt><dd>{originalDecision.authority}</dd><dt>Outcome</dt><dd>{originalDecision.outcome}</dd>
    <dt>Observed result</dt><dd>{originalDecision.result.state}</dd>
   </dl></article>
   <fieldset className={s.evidenceGroup}><legend>EVIDENCE LINKS</legend>
    {evidence.map((item,index)=><label className={s.evidence} key={item.id}><input type="checkbox" checked={item.included} onChange={()=>setEvidence(current=>current.map(candidate=>candidate.id===item.id?{...candidate,included:!candidate.included}:candidate))}/><span><b>{index+1}. {item.label}</b><small>{item.id} · required · {item.source}<br/>{item.recordedAt}</small></span></label>)}
   </fieldset>
  </div>
  <div className={s.timeline}><h3>APPEND-ONLY HISTORY</h3><ol>
   <li><time dateTime="2026-08-17T09:02:00Z">09:02</time> Consequence assessment recorded</li>
   <li><time dateTime="2026-08-17T09:06:00Z">09:06</time> Escalation acknowledged</li>
   <li><time dateTime="2026-08-17T09:08:00Z">09:08</time> Original decision recorded</li>
   <li><time dateTime="2026-08-17T09:24:00Z">09:24</time> Result observed</li>
   {corrections.map(item=><li key={item.id}><time dateTime={item.recordedAt}>10:01</time> Correction {item.id} appended; original authority retained</li>)}
  </ol></div>
  <div className={s.actions}><button onClick={appendCorrection} disabled={corrections.length>0}>APPEND CORRECTION</button><button onClick={()=>{setEvidence(initialEvidence);setCorrections([])}}>RESET DEMO</button><button onClick={download}>EXPORT SYNTHETIC LEDGER</button></div>
  <p className={s.note}>All displayed records are synthetic and remain in this browser until you reset or leave. Export creates a local JSON download; nothing is submitted or retained by this site. Provenance does not establish legality, truth, causation, or substantive correctness.</p>
 </section>;
}
