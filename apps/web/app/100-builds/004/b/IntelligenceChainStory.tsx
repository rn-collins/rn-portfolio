'use client';
import {useState} from 'react';
import s from './manual-intelligence-story.module.css';

const stages=[
 {key:'raw',label:'RAW',title:'A pile of sources',description:'Reports, interviews, datasets and notes are material—not yet intelligence.'},
 {key:'collect',label:'COLLECT',title:'Give every source a provenance record',description:'Identity, issuer, version, dates, location and relevant locator make the research set inspectable.'},
 {key:'separate',label:'SEPARATE',title:'Do not let interpretation borrow provenance',description:'The source record and the analyst claim become different objects.'},
 {key:'verify',label:'VERIFY',title:'Every claim needs a review state',description:'Verified, contradicted, uncertain and unverified remain distinct instead of collapsing into one confident summary.'},
 {key:'brief',label:'BRIEF',title:'Only cleared material becomes a finding',description:'Contradictions, uncertainty and open questions survive beside the verified findings.'}
] as const;
const raw=['REPORT','PDF','INTERVIEW','DATA','ARTICLE','NOTE'];
export default function IntelligenceChainStory(){
 const [active,setActive]=useState(0);const stage=stages[active];
 return <section className={s.interactive} aria-label="Interactive manual intelligence chain">
  <div className={s.stageControls} role="group" aria-label="Intelligence chain stages">{stages.map((x,i)=><button key={x.key} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}><span>{String(i).padStart(2,'0')}</span>{x.label}</button>)}</div>
  <div className={s.stageCanvas} data-stage={stage.key} aria-live="polite">
   <div className={s.stageText}><span>{stage.label}</span><h2>{stage.title}</h2><p>{stage.description}</p></div>
   {stage.key==='raw'&&<div className={s.rawObjects}>{raw.map(x=><b key={x}>{x}</b>)}</div>}
   {stage.key==='collect'&&<div className={s.register}><div><b>SOURCE 01</b><span>issuer</span><span>version</span><span>checked date</span><span>section / page</span></div><div><b>SOURCE 02</b><span>issuer</span><span>version</span><span>checked date</span><span>section / page</span></div></div>}
   {stage.key==='separate'&&<div className={s.split}><article><b>SOURCE RECORD</b><p>What the evidence is and where it came from.</p></article><span aria-hidden="true">≠</span><article><b>ANALYST CLAIM</b><p>What a human says the evidence supports.</p></article></div>}
   {stage.key==='verify'&&<div className={s.stateGrid}>{['VERIFIED','CONTRADICTED','UNCERTAIN','UNVERIFIED'].map(x=><div key={x}><b>{x}</b><span>{x==='VERIFIED'?'note required':x==='UNVERIFIED'?'stays open':'stays visible'}</span></div>)}</div>}
   {stage.key==='brief'&&<div className={s.briefBuckets}>{['VERIFIED FINDINGS','CONTRADICTIONS','UNCERTAINTY','OPEN QUESTIONS'].map((x,i)=><div key={x} data-primary={i===0?'true':'false'}><b>{x}</b><span>{i===0?'decision-ready':'preserved, not erased'}</span></div>)}</div>}
  </div>
  <p className={s.passive}>The sequence remains the same no matter which stage you inspect: collect the evidence, separate it from interpretation, verify the claim, then brief only what the record can support.</p>
 </section>
}
