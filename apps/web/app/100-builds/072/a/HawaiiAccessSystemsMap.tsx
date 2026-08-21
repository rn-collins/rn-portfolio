'use client';

import { useState } from 'react';
import {
  buildHawaiiCannabisAccessSystemsMap,
  HAWAII_ACCESS_SCENARIOS,
  HAWAII_ACCESS_ENGINE_VERSION,
  type HawaiiAccessScenarioId,
} from '../../../../../../packages/release/src/hawaii-cannabis-access-systems-engine';
import s from '../hawaii-access.module.css';

const scenarioIds = Object.keys(HAWAII_ACCESS_SCENARIOS) as HawaiiAccessScenarioId[];
const sections = [
  ['PATIENT ACCESS', 'patientAccess'], ['PROVIDER AVAILABILITY', 'providerAvailability'],
  ['INTERISLAND TRANSPORT', 'interislandTransport'], ['SUPPLY CONTINUITY', 'supplyContinuity'],
  ['POLICY ADMINISTRATION', 'policyAdministration'], ['COMMUNITY CONTEXT', 'communityContext'],
  ['INFRASTRUCTURE', 'infrastructure'], ['RELATIONSHIPS', 'relationships'],
  ['ISLAND DIFFERENCE', 'islandDifference'], ['UNKNOWNS', 'unknowns'], ['ALERTS', 'alerts'], ['NON-CLAIMS', 'nonClaims'],
] as const;
const readable = (value: string) => value.replaceAll('-', ' ');

export default function HawaiiAccessSystemsMap() {
  const [scenarioId, setScenarioId] = useState<HawaiiAccessScenarioId>(scenarioIds[0]);
  const input = HAWAII_ACCESS_SCENARIOS[scenarioId];
  const result = buildHawaiiCannabisAccessSystemsMap(input);

  function download() {
    const snapshot = {
      build: '072', version: HAWAII_ACCESS_ENGINE_VERSION,
      fixture: 'fully synthetic generalized island access system', exportedAt: input.assessedAt,
      canonical: { uses: ['045', '046', '047'], creates: 'cap:072' },
      artifacts: ['Hawaiʻi Access Graph', 'Island Comparison View'],
      admission: {
        syntheticGeneralizedIslands: true, exactScenarioCount: 5, containsRealPatientData: false,
        containsRealProviderData: false, containsRealProductData: false, containsRealIslandRecords: false,
        currentLawClaim: false, eligibilityDetermined: false, accessDetermined: false,
        clinicalDetermination: false, safetyDetermined: false, culturalAuthorityClaim: false,
        communityConsentClaim: false, representativenessClaim: false,
        legalAdvice: 'NONE', medicalAdvice: 'NONE', failClosed: true,
      },
      input: structuredClone(input), result: structuredClone(result),
      replay: { scenarioId, engineVersion: HAWAII_ACCESS_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'synthetic-hawaii-cannabis-access-map.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section className={s.explorer} aria-labelledby="island-status" data-scenario={scenarioId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>SYNTHETIC ISLAND CONTEXT · {readable(scenarioId)}</small>
      <h2 id="island-status">{result.status}</h2>
      <p>{result.alerts[0] ?? result.unknowns[0] ?? result.nonClaims[0]}</p>
    </header>
    <div className={s.controls} aria-label="Synthetic island access controls">
      <label htmlFor="island-scenario">ISLAND SIGNAL
        <select id="island-scenario" value={scenarioId} onChange={(event) => setScenarioId(event.target.value as HawaiiAccessScenarioId)}>
          {scenarioIds.map((id) => <option key={id} value={id}>{readable(id)}</option>)}
        </select>
      </label>
      <button type="button" onClick={() => setScenarioId(scenarioIds[0])}>RESTORE BASELINE</button>
      <button type="button" onClick={download}>EXPORT ISLAND MAP</button>
    </div>
    <aside className={s.warning} aria-label="Interpretation boundary">
      <h3>Geography is not a footnote.</h3>
      <p>This comparison cannot establish current law, eligibility, practical access, cultural authority, community consent, or local representativeness. Its invented contexts do not stand in for any real island or community.</p>
    </aside>
    <div className={s.graph} aria-label="Hawaiʻi Access Graph">
      {sections.map(([title, key]) => <article key={key} data-group={key}>
        <small>{title}</small>
        <ul>{result[key].length ? result[key].map((item: string) => <li key={item}>{item}</li>) : <li>Unknown — this fixture supplies no evidence.</li>}</ul>
      </article>)}
    </div>
    <section className={s.audit} aria-label="Synthetic systems audit">
      <h3>Relationship audit</h3>
      <ol>{result.audit.map((entry) => <li key={entry.sequence}>
        <span>{String(entry.sequence).padStart(2, '0')}</span><b>{entry.stage}</b><span>{entry.event}</span><em>{entry.outcome}</em><small>{entry.claimScope}</small>
      </li>)}</ol>
    </section>
    <p className={s.note}><b>Boundary:</b> Fixed, fully synthetic generalized scenarios only. No real patient, provider, product, or community data. This is not medical advice and not legal advice; no current-law, eligibility, access, clinical, safety, cultural-authority, consent, or representativeness determination.</p>
  </section>;
}
