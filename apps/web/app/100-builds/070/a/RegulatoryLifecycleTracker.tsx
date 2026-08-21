'use client';

import { useState } from 'react';
import {
  buildPsychedelicRegulatoryLifecycleTracker,
  PSYCHEDELIC_LIFECYCLE_SCENARIOS,
  PSYCHEDELIC_LIFECYCLE_ENGINE_VERSION,
  type PsychedelicLifecycleScenarioId,
} from '../../../../../../packages/release/src/psychedelic-regulatory-lifecycle-engine';
import s from '../regulatory-lifecycle.module.css';

const scenarioIds: PsychedelicLifecycleScenarioId[] = ['ADVOCACY-PROPOSAL-ONLY', 'BALLOT-WIN-RULEMAKING-PENDING', 'LICENSING-OPERATIONS-BLOCKED', 'ENFORCEMENT-LITIGATION-ACTIVE', 'EVALUATION-REVISION-DUE'];
const groups = [
  ['ADVOCACY', 'advocacy'], ['PROPOSAL / BALLOT', 'proposalBallot'], ['ENACTMENT', 'enactment'],
  ['EFFECTIVE DATE', 'effectiveDate'], ['RULEMAKING', 'rulemaking'], ['LICENSING', 'licensing'],
  ['WORKFORCE', 'workforce'], ['OPERATIONS', 'operations'], ['ENFORCEMENT', 'enforcement'],
  ['LITIGATION', 'litigation'], ['EVALUATION', 'evaluation'], ['REVISION', 'revision'],
  ['EVIDENCE', 'evidence'], ['AUTHORITY VERIFICATION', 'authorityVerification'], ['BLOCKERS', 'blockers'],
  ['UNKNOWNS', 'unknowns'], ['ALERTS', 'alerts'], ['NON-CLAIMS', 'nonClaims'],
] as const;
const label = (value: string) => value.replaceAll('-', ' ');

export default function RegulatoryLifecycleTracker() {
  const [scenarioId, setScenarioId] = useState<PsychedelicLifecycleScenarioId>('ADVOCACY-PROPOSAL-ONLY');
  const input = PSYCHEDELIC_LIFECYCLE_SCENARIOS[scenarioId];
  const result = buildPsychedelicRegulatoryLifecycleTracker(input);

  function download() {
    const snapshot = {
      build: '070', version: PSYCHEDELIC_LIFECYCLE_ENGINE_VERSION,
      fixture: 'synthetic fictional psychedelic policy and jurisdiction', exportedAt: input.assessedAt,
      canonical: { uses: ['058', '059', '063', '069'], creates: 'cap:070' },
      artifacts: ['Regulatory Lifecycle Model', 'Milestone Tracker'],
      admission: {
        fictionalJurisdiction: true, fictionalMeasure: true, containsRealLaw: false, currentLawClaim: false,
        legalAuthorityClaim: false, legalEffectDetermined: false, complianceDetermined: false,
        accessDetermined: false, safetyDetermined: false, equityDetermined: false,
        implementationDetermined: false, predictsOutcome: false, legalAdvice: 'NONE', failClosed: true,
      },
      input: structuredClone(input), result: structuredClone(result),
      replay: { scenarioId, engineVersion: PSYCHEDELIC_LIFECYCLE_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'synthetic-regulatory-lifecycle-record.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section className={s.lab} aria-labelledby="lifecycle-status" data-lifecycle-state={scenarioId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>FICTIONAL LIFECYCLE STATE · {label(scenarioId)}</small>
      <h2 id="lifecycle-status">{result.status}</h2>
      <p>{result.alerts[0] ?? result.blockers[0] ?? result.nonClaims[0]}</p>
    </header>
    <div className={s.controls} aria-label="Synthetic regulatory lifecycle controls">
      <label htmlFor="lifecycle-state">LIFECYCLE STATE
        <select id="lifecycle-state" value={scenarioId} onChange={(event) => setScenarioId(event.target.value as PsychedelicLifecycleScenarioId)}>
          {scenarioIds.map((id) => <option key={id} value={id}>{label(id)}</option>)}
        </select>
      </label>
      <button type="button" onClick={() => setScenarioId('ADVOCACY-PROPOSAL-ONLY')}>RESTORE ADVOCACY</button>
      <button type="button" onClick={download}>EXPORT LIFECYCLE RECORD</button>
    </div>
    <aside className={s.warning} aria-label="Regulatory lifecycle limitations">
      <h3>Legalization does not complete the lifecycle.</h3>
      <p>A proposal, vote, enactment, or effective date does not prove implementation, access, equity, safety, effectiveness, legitimacy, or completion. Every stage requires its own evidence.</p>
    </aside>
    <div className={s.workGrid}>
      {groups.map(([title, key]) => <article key={key} data-group={key}>
        <small>{title}</small>
        <ul>{result[key].length > 0 ? result[key].map((item) => <li key={item}>{item}</li>) : <li>None evidenced in this fixture.</li>}</ul>
      </article>)}
    </div>
    <section className={s.audit} aria-label="Synthetic lifecycle audit">
      <h3>Audit trail</h3>
      <ol>{result.audit.map((entry) => <li key={entry.sequence}>
        <span>{String(entry.sequence).padStart(2, '0')}</span><b>{entry.stage}</b><span>{entry.event}</span><em>{entry.outcome}</em><small>{entry.claimScope}</small>
      </li>)}</ol>
    </section>
    <p className={s.note}><b>Boundary:</b> Fixed synthetic fixtures describe a fictional psychedelic policy and jurisdiction only. This is not legal advice or current-law information, authority, a compliance or implementation determination, a prediction, or a real-world claim.</p>
  </section>;
}
