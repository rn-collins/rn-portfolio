'use client';
import { useState } from 'react';
import { CONSEQUENCE_ENGINE_VERSION, REGULATORY_CHANGE_PRESETS, REGULATORY_CHANGE_SCENARIOS, traceRegulatoryConsequences, type ChangeScenarioId } from '../../../../../../packages/release/src/regulatory-change-consequence-engine';
import s from '../change-impact.module.css';

export default function ChangeImpactExplorer() {
  const [scenarioId, setScenarioId] = useState<ChangeScenarioId>('CHANGE-CEDAR');
  const input = REGULATORY_CHANGE_PRESETS[scenarioId];
  const result = traceRegulatoryConsequences(input);
  const change = result.change!;
  function download() {
    const snapshot = { build:'077', version:CONSEQUENCE_ENGINE_VERSION, canonical:{uses:['016','017','022','029','058','059','069','076'],creates:'cap:077'}, artifacts:['Change Impact Graph','Consequence Rules'], admission:{syntheticChangesOnly:true,exactScenarioCount:5,fixedSourcesActorsOnly:true,clauseSourceEffectiveAsOfDatesPreserved:true,actorsObligationsDeadlinesDependenciesRisksUnknownsPreserved:true,containsRealLaw:false,currentLawClaim:false,legalAdvice:'NONE',complianceDetermined:false,deadlineRelianceAllowed:false,rightsLiabilityEnforcementOutcomeDetermined:false,failClosed:true}, input:structuredClone(input), result:structuredClone(result), replay:{scenarioId,engineVersion:CONSEQUENCE_ENGINE_VERSION} };
    const url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)],{type:'application/json'})); const a=document.createElement('a'); a.href=url; a.download='synthetic-regulatory-consequence-trace.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),0);
  }
  return <section className={s.explorer}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>ACTIVE FIXED SYNTHETIC CHANGE</small><h2>{result.status}</h2><p>{change.summary} Every source date, unknown, and unassessed condition remains attached.</p></header>
    <div className={s.controls} aria-label="Consequence trace controls"><label htmlFor="change-scenario">CHANGE NOTICE<select id="change-scenario" value={scenarioId} onChange={e=>setScenarioId(e.target.value as ChangeScenarioId)}>{REGULATORY_CHANGE_SCENARIOS.map(x=><option value={x.id} key={x.id}>{x.label}</option>)}</select></label><button type="button" onClick={()=>setScenarioId('CHANGE-CEDAR')}>RESTORE CEDAR CHANGE</button><button type="button" onClick={download}>EXPORT CONSEQUENCE TRACE</button></div>
    <aside className={s.boundary} aria-label="Interpretation boundary"><b>This trace is not current law or legal guidance.</b><p>All sources, actors, dates, systems, risks, and opportunities are fictional. A displayed date cannot be calendared or relied upon. Do not use it for compliance, rights, liability, enforcement, or outcome decisions.</p></aside>
    <article className={s.provision}><small>{change.sourceRecord.id} · {change.sourceRecord.locator} · {change.sourceRecord.status}</small><h3>{change.sourceRecord.clause}</h3><p>Issued {change.sourceRecord.issuedOn} · Effective {change.sourceRecord.effectiveOn ?? 'UNKNOWN'} · As of {change.sourceRecord.asOf}</p></article>
    <div className={s.graph} aria-label="Change impact graph"><section><small>01 · AFFECTED ACTORS</small>{change.actors.map(x=><article key={x.id}><b>{x.label}</b><span>{x.role}</span></article>)}</section><span className={s.arrow} aria-hidden="true">→</span><section><small>02 · OBLIGATIONS + TIMELINES</small>{change.obligations.map(x=><article key={x.id}><b>{x.action}</b><span>{x.trigger}<br />Due: {x.dueOn ?? 'UNKNOWN—NOT INFERRED'}</span></article>)}{change.deadlines.map(x=><article key={x.id}><b>{x.label}</b><span>{x.basis}</span></article>)}</section><span className={s.arrow} aria-hidden="true">→</span><section><small>03 · CONDITIONAL CONSEQUENCES</small>{change.risks.map(x=><article key={x.id}><b>{x.label}</b><span>{x.condition} · {x.severity}</span></article>)}{change.opportunities.map(x=><article key={x.id}><b>{x.label}</b><span>{x.condition} · {x.status}</span></article>)}</section></div>
    <div className={s.audit}><article><small>DEPENDENCIES</small><ul>{change.dependencies.map(x=><li key={x.id}><b>{x.label}</b> · {x.system}{x.unknown ? ` · UNKNOWN: ${x.unknown}` : ''}</li>)}</ul></article><article><small>UNRESOLVED QUESTIONS</small><ul>{change.unknowns.length?change.unknowns.map(x=><li key={x}>{x}</li>):<li>NONE RECORDED IN FIXTURE</li>}</ul></article><article><small>TRACE AUDIT</small><ol>{result.audit.map(x=><li key={x}>{x}</li>)}</ol></article></div>
    <p className={s.note}><b>Boundary:</b> Fixed synthetic systems trace only. No current-law, real-policy, legal-advice, compliance, deadline-reliance, rights, liability, enforcement, or outcome claim.</p>
  </section>;
}
