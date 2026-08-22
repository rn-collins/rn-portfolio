'use client';
import{useState}from'react';
import{buildCannabisInstitutionalMemoryArchive,CANNABIS_MEMORY_SCENARIOS,type ScenarioId}from'../../../../../../packages/release/src/cannabis-institutional-memory-engine';
import s from'../memory.module.css';

const ids:ScenarioId[]=['RECORD-CURRENT','POLICY-SUPERSEDED','CLAIM-CONTESTED','RIGHTS-RESTRICTED','CONTEXT-MISSING'];
const layers=['EVENT','POLICY','ACTOR','TERM','CLAIM','SOURCE','CORRECTION','RIGHTS','CONTEXT'];

export default function MemoryStory(){
  const[index,setIndex]=useState(0),id=ids[index],result=buildCannabisInstitutionalMemoryArchive(CANNABIS_MEMORY_SCENARIOS[id]);
  return <section className={s.story} data-memory-state={id}>
    <div className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>MEMORY STATE {index+1}/5 · {id}</small><h2>{result.status}</h2><p>{result.nonClaims[0]}</p></div>
    <ol className={s.layers} aria-label="Institutional memory layers">{layers.map((layer,n)=><li key={layer}><span aria-hidden="true">{String(n+1).padStart(2,'0')}</span>{layer}</li>)}</ol>
    <div className={s.storyAction}><button type="button" onClick={()=>setIndex(value=>(value+1)%ids.length)}>ADVANCE ARCHIVE CLOCK</button><p>{result.corrections[0]??result.rights[0]??result.contexts[0]??'The fixed record has no open review state.'}</p></div>
    <div className={s.memoryEquation} aria-label="Memory is more than storage"><span>RECORD</span><b aria-hidden="true">+</b><span>VERSION</span><b aria-hidden="true">+</b><span>CONTEXT</span><b aria-hidden="true">+</b><span>LIMIT</span></div>
    <p className={s.note}>Institutional memory preserves a record of what was recorded and how its state changed. It does not convert institutional possession into truth, authority, consent, ownership, cultural permission, medical validity, or current law.</p>
  </section>
}
