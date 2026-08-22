'use client';
import { useState } from 'react';
import { buildComparativeImplementationIndex, IMPLEMENTATION_DIMENSIONS, IMPLEMENTATION_INDEX_ENGINE_VERSION, IMPLEMENTATION_INDEX_PRESETS, type ComparisonLens } from '../../../../../../packages/release/src/comparative-implementation-index-engine';
import s from '../implementation-index.module.css';
const lensIds = Object.keys(IMPLEMENTATION_INDEX_PRESETS) as ComparisonLens[];
const readable = (value: string) => value.replaceAll('-', ' ');

export default function AccessImplementationIndex() {
  const [lens, setLens] = useState<ComparisonLens>('ENACTMENT-LED');
  const input = IMPLEMENTATION_INDEX_PRESETS[lens];
  const result = buildComparativeImplementationIndex(input);
  function download() {
    const snapshot = {
      build: '074', version: IMPLEMENTATION_INDEX_ENGINE_VERSION, fixture: input.fixtureId,
      canonical: { uses: ['047', '063', '069'], creates: 'cap:074' },
      artifacts: ['Comparative Implementation Index', 'Evidence Scoring Rules'],
      admission: { syntheticJurisdictionsOnly: true, exactJurisdictionCount: 5, containsRealJurisdictionData: false, currentLawClaim: false, legalAuthorizationDetermined: false, implementationMaturityDetermined: false, operationalAvailabilityDetermined: false, affordabilityDetermined: false, workforceReadinessDetermined: false, equityCertified: false, safetyDetermined: false, outcomesDetermined: false, realJurisdictionRanked: false, decisionClaim: false, legalAdvice: 'NONE', medicalAdvice: 'NONE', transparentWeights: true, transparentScoringRules: true, failClosed: true },
      input: structuredClone(input), result: structuredClone(result), replay: { presetId: lens, engineVersion: IMPLEMENTATION_INDEX_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'synthetic-comparative-implementation-index.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  return <section className={s.explorer} aria-labelledby="implementation-status" data-lens={lens}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>SYNTHETIC COMPARISON LENS · {readable(lens)}</small><h2 id="implementation-status">{result.status}</h2><p>{result.alerts[0] ?? result.nonClaims[0]}</p></header>
    <div className={s.controls} aria-label="Synthetic implementation index controls">
      <label htmlFor="comparison-lens">COMPARISON LENS<select id="comparison-lens" value={lens} onChange={(event) => setLens(event.target.value as ComparisonLens)}>{lensIds.map((id) => <option key={id} value={id}>{readable(id)}</option>)}</select></label>
      <button type="button" onClick={() => setLens('ENACTMENT-LED')}>RESTORE BASELINE</button><button type="button" onClick={download}>EXPORT COMPARATIVE INDEX</button>
    </div>
    <aside className={s.warning} aria-label="Interpretation boundary"><h3>Comparison organizes synthetic evidence. It does not rank reality.</h3><p>Change the exposed lens to see how assumptions reorder five fixed invented records. This is not a real ranking or readiness determination and does not establish current law, access, equity, safety, or outcomes.</p></aside>
    <div className={s.tableWrap} tabIndex={0} role="region" aria-label="Comparative Implementation Index" aria-describedby="table-help"><p id="table-help" className={s.srOnly}>Scrollable comparison table. Scores from zero to four are synthetic.</p><table><caption>Five synthetic jurisdiction records under the {readable(lens)} lens</caption><thead><tr><th scope="col">Order</th><th scope="col">Synthetic jurisdiction</th>{IMPLEMENTATION_DIMENSIONS.map((d) => <th scope="col" key={d}>{readable(d)}</th>)}<th scope="col">Demo score</th></tr></thead><tbody>{result.orderedJurisdictions.map((item) => <tr key={item.id}><td>{item.position}</td><th scope="row">{item.label}</th>{IMPLEMENTATION_DIMENSIONS.map((d) => <td key={d}>{item.scores[d]}<span className={s.srOnly}> out of 4</span></td>)}<td>{item.weightedDemoScore.toFixed(1)}</td></tr>)}</tbody></table></div>
    <div className={s.evidence} aria-label="Evidence scoring rules and model boundaries">
      <article data-group="evidenceScoringRules"><small>EVIDENCE SCORING RULES</small><ul>{result.evidenceScoringRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></article>
      <article data-group="weights"><small>EXPOSED LENS WEIGHTS</small><ul>{IMPLEMENTATION_DIMENSIONS.map((d) => <li key={d}>{readable(d)}: {result.weights[d]}%</li>)}</ul></article>
      <article data-group="alerts"><small>ALERTS</small><ul>{result.alerts.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article data-group="nonClaims"><small>NON-CLAIMS</small><ul>{result.nonClaims.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </div>
    <section className={s.audit} aria-label="Evidence scoring audit"><h3>Evidence scoring audit</h3><ol>{result.audit.map((entry, index) => <li key={entry}><span>{String(index + 1).padStart(2, '0')}</span><b>{entry}</b></li>)}</ol></section>
    <p className={s.note}><b>Boundary:</b> Fixed synthetic jurisdictions only. No real jurisdiction data. Not legal or medical advice; no current-law, authorization, implementation, readiness, availability, affordability, workforce, equity, safety, outcomes, ranking, or decision determination.</p>
  </section>;
}
