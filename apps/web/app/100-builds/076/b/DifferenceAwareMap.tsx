'use client';
import { useState } from 'react';
import { compareJurisdictionLaw, REGULATORY_INTELLIGENCE_PRESETS, type JurisdictionId } from '../../../../../../packages/release/src/cross-jurisdiction-regulatory-intelligence-engine';
import s from '../jurisdiction-intelligence.module.css';

export default function DifferenceAwareMap() {
  const [selected, setSelected] = useState<JurisdictionId>('JURISDICTION-EMBER');
  const [open, setOpen] = useState(false);
  const result = compareJurisdictionLaw(REGULATORY_INTELLIGENCE_PRESETS['Q-WHAT-AUTHORITY']);
  const row = result.rows.find((item) => item.jurisdictionId === selected)!;

  return <section className={s.map}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>{open ? 'SEMANTIC DIFF OPEN' : 'LABEL VIEW · SOURCE DETAIL CLOSED'}</small><h2>{open ? 'Similar labels separate into source-level differences' : 'Five labels appear similar from a distance'}</h2><p>{open ? `${row.jurisdictionLabel} resolves to ${row.answer ?? 'an explicitly unknown answer'}, with its own locators and date context.` : 'Open the semantic diff, then select a fictional jurisdiction to inspect what its fixed sources actually say.'}</p></header>
    <div className={s.mapGrid} aria-label="Five fictional jurisdiction map">{result.rows.map((item, index) => <button type="button" key={item.jurisdictionId} aria-pressed={selected === item.jurisdictionId} onClick={() => setSelected(item.jurisdictionId)}><span>{String(index + 1).padStart(2, '0')}</span><b>{item.jurisdictionLabel}</b><small>{open ? item.answer ?? 'UNKNOWN' : 'OPERATING AUTHORITY'}</small></button>)}</div>
    <div className={s.mapAction}><button type="button" onClick={() => setOpen((value) => !value)}>{open ? 'CLOSE SEMANTIC DIFF' : 'OPEN SEMANTIC DIFF'}</button><p><b>Labels are navigation, not conclusions.</b> Only the attached fictional source records support the displayed synthetic answer.</p></div>
    {open && <><article className={s.sourceCard} aria-label={`${row.jurisdictionLabel} source record`}><small>{row.jurisdictionId} · AS OF {row.asOf}</small><h3>{row.answer ?? 'UNKNOWN IN FIXED FIXTURE'}</h3><div className={s.sourceMeta}>{row.sourceRecords.map((source) => <div key={source.id}><small>{source.id} · {source.locator}</small><b>{source.title}</b><span>Issued {source.issuedOn}<br />Effective {source.effectiveOn ?? 'UNSPECIFIED'}</span></div>)}</div></article><article className={s.difference}><small>MEANING LIVES IN THE DIFFERENCE</small><ul><li>Answer: {row.answer ?? 'UNKNOWN—NOT IMPUTED'}</li><li>Status: {row.status}</li><li>Effective date: {row.effectiveOn ?? 'UNRESOLVED'}</li><li>Conflict: {row.conflict ?? 'NONE RECORDED'}</li><li>Unknown: {row.unknown ?? 'NONE RECORDED'}</li></ul></article></>}
    <aside className={s.boundary}><b>A map is not legal authority.</b><p>This fixed synthetic story does not describe current or real law, establish equivalence, give legal advice, determine compliance, or claim complete, authoritative, or global coverage.</p></aside>
  </section>;
}
