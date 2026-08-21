'use client';

import { useState } from 'react';
import { buildHawaiiCannabisAccessSystemsMap, HAWAII_ACCESS_SCENARIOS, type HawaiiAccessScenarioId } from '../../../../../../packages/release/src/hawaii-cannabis-access-systems-engine';
import s from '../hawaii-access.module.css';

const scenarioIds = Object.keys(HAWAII_ACCESS_SCENARIOS) as HawaiiAccessScenarioId[];
const readable = (value: string) => value.replaceAll('-', ' ');

export default function AccessChangesByIsland() {
  const [index, setIndex] = useState(0);
  const scenarioId = scenarioIds[index];
  const result = buildHawaiiCannabisAccessSystemsMap(HAWAII_ACCESS_SCENARIOS[scenarioId]);
  return <section className={s.story} data-scenario={scenarioId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>FICTIONAL CONTEXT {index + 1}/{scenarioIds.length}</small>
      <h2>{result.status}</h2><p>{result.islandDifference[0]}</p>
    </header>
    <ol className={s.islands} aria-label="Synthetic island comparison">
      {scenarioIds.map((id, position) => {
        const snapshot = buildHawaiiCannabisAccessSystemsMap(HAWAII_ACCESS_SCENARIOS[id]);
        return <li key={id} data-revealed={position <= index} aria-current={position === index ? 'step' : undefined}>
          <span aria-hidden="true">{String(position + 1).padStart(2, '0')}</span><b>{readable(id)}</b><small>{snapshot.status}</small>
        </li>;
      })}
    </ol>
    <div className={s.storyAction}>
      <button type="button" onClick={() => setIndex((value) => (value + 1) % scenarioIds.length)}>REVEAL NEXT ISLAND</button>
      <p>{result.alerts[0] ?? result.unknowns[0] ?? result.nonClaims[0]}</p>
    </div>
    <div className={s.reality} aria-label="Statewide policy becomes distinct local access conditions">
      <span>ONE POLICY RECORD</span><b aria-hidden="true">→</b><span>DIFFERENT TRANSPORT</span><b aria-hidden="true">+</b><span>DIFFERENT PROVIDER NETWORK</span><b aria-hidden="true">+</b><span>DIFFERENT INFRASTRUCTURE</span>
    </div>
    <aside className={s.warning}><h3>Comparison without flattening.</h3><p>Each fictional island context keeps its own barriers and unknowns. No scenario asserts Native Hawaiian cultural authority, community consent, or representativeness.</p></aside>
    <p className={s.note}>Fully synthetic generalized contexts only; not a portrait of a real island or community. No real patient or provider data. Not medical or legal advice, and no current-law, eligibility, access, care, safety, cultural-authority, consent, or representativeness determination.</p>
  </section>;
}
