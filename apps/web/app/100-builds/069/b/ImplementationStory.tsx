'use client';
import{useState}from'react';
import{buildImplementationAwareLegalTracker,IMPLEMENTATION_TRACKER_SCENARIOS}from'../../../../../../packages/release/src/implementation-aware-legal-tracker-engine';
import s from'../implementation-tracker.module.css';

const phases=['ENACTMENT','EFFECTIVE-DATE','RULEMAKING','FUNDING','SYSTEMS','CONTRACTS','WORKFORCE','RESPONSIBILITY','EVIDENCE','BLOCKERS','READINESS','ALERTS']as const;
export default function ImplementationStory(){const[index,setIndex]=useState(0),result=buildImplementationAwareLegalTracker(IMPLEMENTATION_TRACKER_SCENARIOS['READINESS-EVIDENCE-PACKAGE-COMPLETE']),visible=result.audit.slice(0,index+1),current=visible.at(-1);return <section className={s.story} data-implementation-stage={current?.stage}>
 <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>EVIDENCE CHECKPOINT {index+1}/{result.audit.length}</small><h2>{current?.stage??'ENACTED'}</h2><p>{current?.event} · {current?.outcome}</p></header>
 <ol className={s.path} aria-label="Implementation evidence pathway">{phases.map((phase,position)=><li key={phase} data-reached={position<=index}><span aria-hidden="true">{String(position+1).padStart(2,'0')}</span><b>{phase}</b><i aria-hidden="true"/></li>)}</ol>
 <div className={s.storyAction}><button type="button" onClick={()=>setIndex(value=>(value+1)%result.audit.length)}>ADVANCE ONE STAGE</button><p>{current?.claimScope}. Each checkpoint remains separate and must carry its own fixture evidence.</p></div>
 <div className={s.equation} aria-label="Enacted is not effective, effective is not funded, funded is not ready, and ready is not implemented"><span>ENACTED</span><b aria-hidden="true">≠</b><span>EFFECTIVE</span><b aria-hidden="true">≠</b><span>FUNDED</span><b aria-hidden="true">≠</b><span>READY</span><b aria-hidden="true">≠</b><span>IMPLEMENTED</span></div>
 <aside className={s.warning}><h3>A date does not operate a program.</h3><p>Rules, appropriations, systems, contracts, workforce, responsible owners, blockers and evidence remain separately inspectable. A later checkpoint cannot manufacture proof for an earlier one.</p></aside>
 <p className={s.note}>Fictional law and jurisdiction only. No legal advice, current-law information, validity, compliance, completeness, prediction, success or real-world implementation claim.</p>
 </section>}
