'use client';
import { useState } from 'react';
import { REGULATORY_CHANGE_PRESETS, REGULATORY_CHANGE_SCENARIOS, traceRegulatoryConsequences, type ChangeScenarioId } from '../../../../../../packages/release/src/regulatory-change-consequence-engine';
import s from '../change-impact.module.css';

export default function OneSentenceStory() {
  const [selected,setSelected]=useState<ChangeScenarioId>('CHANGE-CEDAR'); const [open,setOpen]=useState(false);
  const result=traceRegulatoryConsequences(REGULATORY_CHANGE_PRESETS[selected]); const change=result.change!;
  return <section className={s.story}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>{open?'CONSEQUENCE LINES ACTIVE':'NOTICE VIEW · CONSEQUENCES HELD'}</small><h2>{open?'One clause now reaches actors, deadlines, risks, and systems.':'The notice looks self-contained.'}</h2><p>{open?`${change.actors.length} actors, ${change.obligations.length} obligations, ${change.deadlines.length} deadlines, and ${change.risks.length} unassessed risks are explicitly retained.`:'Choose a fictional notice, then propagate it through the fixed ecosystem.'}</p></header>
    <div className={s.scenarioTabs} aria-label="Fictional change scenarios">{REGULATORY_CHANGE_SCENARIOS.map((x,i)=><button type="button" key={x.id} aria-pressed={selected===x.id} onClick={()=>{setSelected(x.id);setOpen(false)}}><span>{String(i+1).padStart(2,'0')}</span><b>{x.label}</b><small>{selected===x.id?'NOTICE SELECTED':'FICTIONAL NOTICE'}</small></button>)}</div>
    <article className={s.sentence}><small>{change.sourceRecord.title} · {change.sourceRecord.locator}</small><blockquote>{change.sourceRecord.clause}</blockquote><p>Effective {change.sourceRecord.effectiveOn??'UNKNOWN—NOT INFERRED'} · As of {change.sourceRecord.asOf}</p><button type="button" onClick={()=>setOpen(v=>!v)}>{open?'RESET CONSEQUENCE LINES':'PROPAGATE CHANGE'}</button></article>
    {open&&<div className={s.reveal}><article><small>ACTORS</small><ul>{change.actors.map(x=><li key={x.id}><b>{x.label}</b><span>{x.role}</span></li>)}</ul></article><article><small>OBLIGATIONS + DEADLINES</small><ol>{change.obligations.map(x=><li key={x.id}><b>{x.action}</b><span>{x.trigger} · {x.dueOn??'DATE UNKNOWN'}</span></li>)}</ol></article><article><small>RISKS + SYSTEMS</small><ul>{change.risks.map(x=><li key={x.id}><b>{x.label}</b><span>{x.severity} · {x.condition}</span></li>)}{change.dependencies.map(x=><li key={x.id}><b>{x.system}</b><span>{x.unknown??x.label}</span></li>)}</ul></article></div>}
    <aside className={s.boundary}><b>Consequence lines are not current law or legal conclusions.</b><p>This fixed synthetic story gives no legal advice, determines no compliance, and provides no deadline that can be calendared or relied upon. It establishes no rights or liability and predicts no enforcement or outcomes.</p></aside>
  </section>;
}
