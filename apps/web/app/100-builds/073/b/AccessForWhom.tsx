'use client';

import { useState } from 'react';
import { buildPsychedelicAccessEquityIndex, PSYCHEDELIC_EQUITY_SCENARIOS, type PsychedelicEquityScenarioId } from '../../../../../../packages/release/src/psychedelic-access-equity-index-engine';
import s from '../psychedelic-equity.module.css';

const scenarioIds = Object.keys(PSYCHEDELIC_EQUITY_SCENARIOS) as PsychedelicEquityScenarioId[];
const readable = (value: string) => value.replaceAll('-', ' ');

export default function AccessForWhom() {
  const [index, setIndex] = useState(0);
  const scenarioId = scenarioIds[index];
  const result = buildPsychedelicAccessEquityIndex(PSYCHEDELIC_EQUITY_SCENARIOS[scenarioId]);
  return <section className={s.story} data-scenario={scenarioId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>SYNTHETIC CONTEXT {index + 1}/{scenarioIds.length}</small>
      <h2>{result.status}</h2><p>{result.alerts[0] ?? result.unknowns[0] ?? result.nonClaims[0]}</p>
    </header>
    <ol className={s.scenarios} aria-label="Synthetic access comparison">
      {scenarioIds.map((id, position) => {
        const snapshot = buildPsychedelicAccessEquityIndex(PSYCHEDELIC_EQUITY_SCENARIOS[id]);
        return <li key={id} data-revealed={position <= index} aria-current={position === index ? 'step' : undefined}>
          <span aria-hidden="true">{String(position + 1).padStart(2, '0')}</span><b>{readable(id)}</b><small>{snapshot.status}</small>
        </li>;
      })}
    </ol>
    <div className={s.storyAction}>
      <button type="button" onClick={() => setIndex((value) => (value + 1) % scenarioIds.length)}>REDRAW ACCESS MAP</button>
      <p>{result.indicatorSet[0] ?? result.indexMethodology[0]}</p>
    </div>
    <div className={s.reframe} aria-label="Reform visibility compared with practical accessibility">
      <span>REFORM SIGNAL</span><b aria-hidden="true">≠</b><span>PRACTICAL ACCESS</span>
      <i>COST</i><i>PLACE</i><i>LANGUAGE</i><i>DISABILITY</i><i>WORKFORCE</i><i>LEGAL RISK</i>
    </div>
    <aside className={s.warning}><h3>Access for whom?</h3><p>A celebratory reform signal is not evidence that a person can afford, reach, understand, qualify for, or safely navigate a service. No synthetic context stands in for a real person, community, or jurisdiction.</p></aside>
    <p className={s.note}>Synthetic generalized contexts only. No real people, protected-trait inference, jurisdiction ranking, equity certification, or current-law claim. Not medical or legal advice; no eligibility, access, care, safety, authority, consent, or representativeness determination.</p>
  </section>;
}
