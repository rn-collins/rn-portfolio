'use client';
import { useState } from 'react';
import { buildComparativeImplementationIndex, IMPLEMENTATION_INDEX_PRESETS, type ComparisonLens } from '../../../../../../packages/release/src/comparative-implementation-index-engine';
import s from '../implementation-index.module.css';

export default function LawSaysYes() {
  const [lens, setLens] = useState<ComparisonLens>('ENACTMENT-LED');
  const result = buildComparativeImplementationIndex(IMPLEMENTATION_INDEX_PRESETS[lens]);
  return <section className={s.story} data-lens={lens}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>SYNTHETIC COMPARISON · {lens.replaceAll('-', ' ')}</small><h2>{result.orderedJurisdictions[0].label}</h2><p>{result.status}. {result.alerts[1]}</p></header>
    <ol className={s.jurisdictions} aria-label="Synthetic jurisdiction order">{result.orderedJurisdictions.map((item) => <li key={item.id}><span aria-hidden="true">{String(item.position).padStart(2, '0')}</span><b>{item.label}</b><small>Legal {item.scores['LEGAL-AUTHORIZATION']}/4 · Operational {item.scores['OPERATIONAL-AVAILABILITY']}/4</small></li>)}</ol>
    <div className={s.storyAction}><button type="button" onClick={() => setLens((value) => value === 'ENACTMENT-LED' ? 'IMPLEMENTATION-LED' : 'ENACTMENT-LED')}>SHIFT TO IMPLEMENTATION</button><p>The same five records reorder when implementation evidence carries more weight. The change is a transparent synthetic demonstration—not a real ranking.</p></div>
    <div className={s.gap} aria-label="Legal authorization compared with operational availability"><span>THE LAW SAYS<br/><b>YES</b></span><i aria-hidden="true">→</i><span>THE SYSTEM SAYS<br/><b>NOT YET</b></span><small>AUTHORIZATION</small><small>OPERATIONS</small><small>WORKFORCE</small><small>SAFETY</small><small>OUTCOMES</small></div>
    <aside className={s.warning}><h3>Permission is one layer.</h3><p>An authorization signal cannot by itself show that administrators are equipped, a workforce is available, services operate, or people can navigate them. Every jurisdiction and score here is invented.</p></aside>
    <p className={s.note}>Synthetic descriptive demonstration only. No real jurisdictions or current-law claim. Not legal or medical advice; no implementation, readiness, access, equity, safety, outcome, ranking, or decision determination.</p>
  </section>;
}
