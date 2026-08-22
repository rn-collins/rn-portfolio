'use client';
import { useState } from 'react';
import {
  compareJurisdictionLaw,
  REGULATORY_INTELLIGENCE_ENGINE_VERSION,
  REGULATORY_INTELLIGENCE_JURISDICTIONS,
  REGULATORY_INTELLIGENCE_PRESETS,
  REGULATORY_INTELLIGENCE_QUERIES,
  type ComparativeQueryId,
} from '../../../../../../packages/release/src/cross-jurisdiction-regulatory-intelligence-engine';
import s from '../jurisdiction-intelligence.module.css';

const readable = (value: string) => value.replaceAll('-', ' ');

export default function RegulatoryIntelligencePlatform() {
  const [queryId, setQueryId] = useState<ComparativeQueryId>('Q-WHO-MAY-ACT');
  const input = REGULATORY_INTELLIGENCE_PRESETS[queryId];
  const result = compareJurisdictionLaw(input);

  function download() {
    const snapshot = {
      build: '076', version: REGULATORY_INTELLIGENCE_ENGINE_VERSION,
      canonical: { uses: ['028', '029', '058', '059', '069', '075'], creates: 'cap:076' },
      artifacts: ['Jurisdiction Registry', 'Comparative Query Layer'],
      admission: { syntheticJurisdictionsOnly: true, exactJurisdictionCount: 5, fixedSourcesOnly: true, sourceLevelDifferencesPreserved: true, effectiveAndAsOfDatesPreserved: true, unknownsPreserved: true, conflictsPreserved: true, containsRealLaw: false, currentLawClaim: false, legalAdvice: 'NONE', complianceDetermined: false, globalCoverageClaim: false, completenessClaim: false, authoritativeCoverageClaim: false, failClosed: true },
      input: structuredClone(input), result: structuredClone(result),
      replay: { queryId, engineVersion: REGULATORY_INTELLIGENCE_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'synthetic-cross-jurisdiction-query.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section className={s.platform}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>ACTIVE FIXED SYNTHETIC QUERY</small><h2>{result.status}</h2><p>{result.query?.concreteQuestion} Source records, effective dates, as-of dates, conflicts, and unknowns remain visible.</p></header>
    <div className={s.controls} aria-label="Comparative query controls">
      <label htmlFor="comparative-question">COMPARATIVE QUESTION<select id="comparative-question" value={queryId} onChange={(event) => setQueryId(event.target.value as ComparativeQueryId)}>{REGULATORY_INTELLIGENCE_QUERIES.map((query) => <option key={query.id} value={query.id}>{query.label}</option>)}</select></label>
      <button type="button" onClick={() => setQueryId('Q-WHO-MAY-ACT')}>RESTORE WHO MAY ACT</button>
      <button type="button" onClick={download}>EXPORT COMPARATIVE QUERY</button>
    </div>
    <aside className={s.boundary} aria-label="Interpretation boundary"><b>This comparison is not current law.</b><p>Five named jurisdictions and every source are fictional. The platform does not provide legal advice, determine compliance, or claim complete, authoritative, or global coverage. It performs no real-law lookup.</p></aside>
    <div className={s.registry} aria-label="Jurisdiction Registry">{REGULATORY_INTELLIGENCE_JURISDICTIONS.map((jurisdiction) => <article key={jurisdiction.id}><small>{jurisdiction.id}</small><h3>{jurisdiction.label}</h3><p><b>Registry as of</b><br />{jurisdiction.registryAsOf}</p><p>{jurisdiction.sources.length} fixed synthetic sources</p></article>)}</div>
    <article className={s.queryCard}><small>COMPARATIVE QUERY LAYER · {result.query?.field}</small><h3>{result.query?.label}</h3><p>{result.query?.concreteQuestion}</p></article>
    <div className={s.tableWrap} role="region" aria-label="Source-level jurisdiction comparison" tabIndex={0}><table><caption>Five synthetic jurisdictions; source order preserved; unknowns are not imputed</caption><thead><tr><th scope="col">Jurisdiction</th><th scope="col">Answer</th><th scope="col">Evidence status</th><th scope="col">Fixed synthetic sources</th><th scope="col">Date context</th></tr></thead><tbody>{result.rows.map((row) => <tr key={row.jurisdictionId}><th scope="row">{row.jurisdictionLabel}<br /><small>{row.jurisdictionId}</small></th><td><b>{row.answer ?? row.conflict ?? 'UNKNOWN'}</b>{row.unknown && <p>{row.unknown}</p>}</td><td>{readable(row.status)}</td><td>{row.sourceRecords.map((source) => <span className={s.sourceLink} key={source.id}><small>{source.id} · {source.locator}</small><b>{source.title}</b><span>{source.proposition}</span></span>)}</td><td><b>Effective:</b> {row.effectiveOn ?? 'UNRESOLVED'}<br /><b>As of:</b> {row.asOf}</td></tr>)}</tbody></table></div>
    <div className={s.panels}><article><small>DIFFERENCES PRESERVED</small><ul>{result.diffFields.map((field) => <li key={field}>{field}</li>)}</ul></article><article><small>METHOD AUDIT</small><ol>{result.audit.map((item) => <li key={item}>{item}</li>)}</ol></article></div>
    <p className={s.note}><b>Boundary:</b> Synthetic demonstration only. No current-law, real-jurisdiction, legal-advice, compliance, completeness, authority, or global-coverage claim.</p>
  </section>;
}
