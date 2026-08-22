'use client';
import{useState}from'react';
import{buildCannabisInstitutionalMemoryArchive,CANNABIS_MEMORY_SCENARIOS,CANNABIS_MEMORY_ENGINE_VERSION,type ScenarioId}from'../../../../../../packages/release/src/cannabis-institutional-memory-engine';
import s from'../memory.module.css';

const ids:ScenarioId[]=['RECORD-CURRENT','POLICY-SUPERSEDED','CLAIM-CONTESTED','RIGHTS-RESTRICTED','CONTEXT-MISSING'];
const label=(value:string)=>value.replaceAll('-',' ');

export default function CannabisMemoryArchive(){
  const[id,setId]=useState<ScenarioId>('RECORD-CURRENT');
  const input=CANNABIS_MEMORY_SCENARIOS[id];
  const result=buildCannabisInstitutionalMemoryArchive(input);
  const groups=[['EVENTS',result.events],['POLICIES',result.policies],['ACTORS',result.actors],['TERMS',result.terms],['CLAIMS',result.claims],['SOURCES',result.sources],['CORRECTIONS',result.corrections],['RIGHTS',result.rights],['CONTEXT',result.contexts]]as const;

  function download(){
    const snapshot={build:'064',version:CANNABIS_MEMORY_ENGINE_VERSION,fixture:'synthetic',canonical:{title:'Cannabis Institutional Memory Archive',job:'Preserve institutional cannabis history, policies, terminology, claims, corrections, rights, and context as a governed record.',bWeb:'Institutional memory becomes a reviewable, versioned archive rather than an unqualified timeline.',uses:['028','029','058','063'],creates:['cap:064']},input:structuredClone(input),result:structuredClone(result),replay:{instruction:'Run buildCannabisInstitutionalMemoryArchive(input) with engine 064.1.0; fixed synthetic archive objects only.',sideEffects:false,mode:'state-only'},boundaries:['Synthetic institutional records only; no real people, organizations, cannabis products, events, policies, legal conclusions, medical claims, community knowledge, rights, permissions, or publication approval.','This export may contain a state label for a rights or context restriction; it does not contain or grant restricted material.']};
    const url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='synthetic-cannabis-institutional-memory-archive.json';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),0);
  }

  return <section className={s.lab} aria-labelledby="memory-status" data-memory-state={id}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>ARCHIVE STATE · {label(id)}</small><h2 id="memory-status">{result.status}</h2>
      <p>{result.corrections.length?`${result.corrections.length} correction record requires attention.`:'No open correction is recorded in this fixed state.'}</p>
    </header>
    <div className={s.controls} aria-label="Archive controls">
      <label htmlFor="memory-state">ARCHIVE STATE<select id="memory-state" value={id} onChange={event=>setId(event.target.value as ScenarioId)}>{ids.map(value=><option key={value} value={value}>{label(value)}</option>)}</select></label>
      <button type="button" onClick={()=>setId('RECORD-CURRENT')}>RESTORE RECORDED ARCHIVE</button>
      <button type="button" onClick={download}>EXPORT MEMORY ARCHIVE</button>
    </div>
    <div className={s.boundaryGrid} aria-label="Archive handling boundaries">
      <article><small>LEGAL</small><p>Recorded policy is not current law, legal advice, compliance approval, or jurisdictional completeness.</p></article>
      <article><small>MEDICAL</small><p>Recorded claims are not medical advice, clinical evidence, safety guidance, or product endorsement.</p></article>
      <article><small>PRIVACY + RIGHTS</small><p>Identity, consent, access, license, and retention must be independently governed; restriction labels do not grant access.</p></article>
      <article><small>CULTURAL</small><p>Community knowledge is not extractable merely because an institution recorded or described it.</p></article>
    </div>
    <div className={s.archive} aria-label="Governed synthetic institutional memory record">{groups.map(([title,items])=><article key={title} data-record-kind={title.toLowerCase()}><small>{title}</small>{items.length?<ul>{items.map(item=><li key={item}>{item}</li>)}</ul>:<p>None recorded.</p>}</article>)}</div>
    <aside className={s.provenance} aria-label="Archive provenance"><h3>Recorded provenance</h3><ul>{result.provenance.map(item=><li key={item}>{item}</li>)}</ul></aside>
    <aside className={s.unknowns} aria-label="Archive unknowns"><h3>What this archive does not know</h3><ul>{result.unknowns.map(item=><li key={item}>{item}</li>)}</ul></aside>
    <p className={s.note}><b>Boundary:</b> This fixed archive demonstrates governed memory states. It does not establish historical truth, legal authority, medical validity, identity, consent, ownership, cultural permission, completeness, or a right to publish.</p>
  </section>
}
