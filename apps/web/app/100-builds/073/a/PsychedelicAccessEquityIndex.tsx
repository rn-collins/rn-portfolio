'use client';

import { useState } from 'react';
import {
  buildPsychedelicAccessEquityIndex,
  PSYCHEDELIC_EQUITY_SCENARIOS,
  PSYCHEDELIC_EQUITY_ENGINE_VERSION,
  type PsychedelicEquityScenarioId,
} from '../../../../../../packages/release/src/psychedelic-access-equity-index-engine';
import s from '../psychedelic-equity.module.css';

const scenarioIds = Object.keys(PSYCHEDELIC_EQUITY_SCENARIOS) as PsychedelicEquityScenarioId[];
const dimensions = [
  ['COST', 'cost'], ['GEOGRAPHY', 'geography'], ['ELIGIBILITY', 'eligibility'],
  ['CULTURE', 'culture'], ['DISABILITY', 'disability'], ['LANGUAGE', 'language'],
  ['WORKFORCE', 'workforce'], ['LEGAL RISK', 'legalRisk'],
  ['EQUITY INDICATOR SET', 'indicatorSet'], ['INDEX METHODOLOGY', 'indexMethodology'],
  ['UNKNOWNS', 'unknowns'], ['ALERTS', 'alerts'], ['NON-CLAIMS', 'nonClaims'],
] as const;
const readable = (value: string) => value.replaceAll('-', ' ');

export default function PsychedelicAccessEquityIndex() {
  const [scenarioId, setScenarioId] = useState<PsychedelicEquityScenarioId>(scenarioIds[0]);
  const input = PSYCHEDELIC_EQUITY_SCENARIOS[scenarioId];
  const result = buildPsychedelicAccessEquityIndex(input);

  function download() {
    const snapshot = {
      build: '073', version: PSYCHEDELIC_EQUITY_ENGINE_VERSION,
      fixture: 'SYNTHETIC-PSYCHEDELIC-EQUITY-073', exportedAt: input.assessedAt,
      canonical: { uses: ['030', '045', '047', '063'], creates: 'cap:073' },
      artifacts: ['Equity Indicator Set', 'Index Methodology'],
      admission: {
        syntheticGeneralizedContexts: true, exactScenarioCount: 5,
        containsRealPersonData: false, containsRealPatientData: false,
        containsRealProviderData: false, containsRealJurisdictionData: false,
        protectedTraitInference: false, currentLawClaim: false,
        eligibilityDetermined: false, accessDetermined: false, equityCertified: false,
        jurisdictionRanked: false, clinicalDetermination: false, safetyDetermined: false,
        culturalAuthorityClaim: false, communityConsentClaim: false,
        representativenessClaim: false, legalAdvice: 'NONE', medicalAdvice: 'NONE', failClosed: true,
      },
      input: structuredClone(input), result: structuredClone(result),
      replay: { scenarioId, engineVersion: PSYCHEDELIC_EQUITY_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'synthetic-psychedelic-access-equity-index.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section className={s.explorer} aria-labelledby="equity-status" data-scenario={scenarioId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>SYNTHETIC ACCESS CONTEXT · {readable(scenarioId)}</small>
      <h2 id="equity-status">{result.status}</h2>
      <p>{result.alerts[0] ?? result.unknowns[0] ?? result.nonClaims[0]}</p>
    </header>
    <div className={s.controls} aria-label="Synthetic equity index controls">
      <label htmlFor="equity-scenario">EQUITY SCENARIO
        <select id="equity-scenario" value={scenarioId} onChange={(event) => setScenarioId(event.target.value as PsychedelicEquityScenarioId)}>
          {scenarioIds.map((id) => <option key={id} value={id}>{readable(id)}</option>)}
        </select>
      </label>
      <button type="button" onClick={() => setScenarioId(scenarioIds[0])}>RESTORE BASELINE</button>
      <button type="button" onClick={download}>EXPORT EQUITY INDEX</button>
    </div>
    <aside className={s.warning} aria-label="Interpretation boundary">
      <h3>An index can reveal questions. It cannot certify equity.</h3>
      <p>These fixed synthetic contexts do not rank jurisdictions or establish current law, eligibility, access, clinical suitability, safety, cultural authority, community consent, or representativeness.</p>
    </aside>
    <div className={s.indicators} aria-label="Equity Indicator Set">
      {dimensions.map(([title, key]) => <article key={key} data-group={key}>
        <small>{title}</small>
        <ul>{result[key].length ? result[key].map((item: string) => <li key={item}>{item}</li>) : <li>Unknown — this fixture supplies no evidence.</li>}</ul>
      </article>)}
    </div>
    <section className={s.audit} aria-label="Index methodology audit">
      <h3>Methodology audit</h3>
      <ol>{result.audit.map((entry) => <li key={entry.sequence}>
        <span>{String(entry.sequence).padStart(2, '0')}</span><b>{entry.stage}</b><span>{entry.event}</span><em>{entry.outcome}</em><small>{entry.claimScope}</small>
      </li>)}</ol>
    </section>
    <p className={s.note}><b>Boundary:</b> Fixed synthetic generalized contexts only. No protected-trait inference and no real person, patient, provider, or jurisdiction data. Not medical or legal advice; no law, eligibility, access, equity, rank, clinical, safety, authority, consent, or representativeness determination.</p>
  </section>;
}
