'use client';

import { useState } from 'react';
import { buildPsychedelicRegulatoryLifecycleTracker, PSYCHEDELIC_LIFECYCLE_SCENARIOS } from '../../../../../../packages/release/src/psychedelic-regulatory-lifecycle-engine';
import s from '../regulatory-lifecycle.module.css';

const stages = [
  ['ADVOCACY', 'ADVOCACY'], ['PROPOSAL-BALLOT', 'PROPOSAL / BALLOT'], ['ENACTMENT', 'ENACTMENT'],
  ['EFFECTIVE-DATE', 'EFFECTIVE DATE'], ['RULEMAKING', 'RULEMAKING'], ['LICENSING', 'LICENSING'],
  ['WORKFORCE', 'WORKFORCE'], ['OPERATIONS', 'OPERATIONS'], ['ENFORCEMENT', 'ENFORCEMENT'],
  ['LITIGATION', 'LITIGATION'], ['EVALUATION', 'EVALUATION'], ['REVISION', 'REVISION'],
] as const;

export default function LegalizationLifecycleStory() {
  const [index, setIndex] = useState(0);
  const result = buildPsychedelicRegulatoryLifecycleTracker(PSYCHEDELIC_LIFECYCLE_SCENARIOS['EVALUATION-REVISION-DUE']);
  const [stageId, stageLabel] = stages[index];
  const entry = result.audit.find((item) => item.stage === stageId);
  return <section className={s.story} data-lifecycle-stage={stageId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>LIFECYCLE CHECKPOINT {index + 1}/{stages.length}</small><h2>{stageLabel}</h2>
      <p>{entry ? `${entry.event} · ${entry.outcome}` : 'No stage-specific evidence appears in this fictional fixture.'}</p>
    </header>
    <ol className={s.path} aria-label="Regulatory lifecycle pathway">
      {stages.map(([id, label], position) => <li key={id} data-reached={position <= index} aria-current={position === index ? 'step' : undefined}>
        <span aria-hidden="true">{String(position + 1).padStart(2, '0')}</span><b>{label}</b><i aria-hidden="true" />
      </li>)}
    </ol>
    <div className={s.storyAction}>
      <button type="button" onClick={() => setIndex((value) => (value + 1) % stages.length)}>ADVANCE ONE STAGE</button>
      <p>{entry?.claimScope ?? 'Absence of evidence remains visible.'} A later stage cannot manufacture proof for an earlier one.</p>
    </div>
    <div className={s.equation} aria-label="A vote is not implementation, access, equity, safety, effectiveness, legitimacy, or completion">
      <span>VOTE</span><b aria-hidden="true">≠</b><span>IMPLEMENTATION</span><b aria-hidden="true">≠</b><span>ACCESS</span><b aria-hidden="true">≠</b><span>COMPLETION</span>
    </div>
    <aside className={s.warning}><h3>The lifecycle stays open.</h3><p>Rules, licensing, workforce, operations, enforcement, litigation, evaluation, revision, evidence, blockers, and unknowns remain separately inspectable—even after a fictional measure passes.</p></aside>
    <p className={s.note}>Fictional policy and jurisdiction only. This is not legal advice or current-law information, legal authority, compliance, prediction, access, equity, safety, effectiveness, legitimacy, completion, or a real-world claim.</p>
  </section>;
}
