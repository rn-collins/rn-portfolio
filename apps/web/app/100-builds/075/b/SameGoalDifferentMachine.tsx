'use client';
import { useState } from 'react';
import { compareRegulatoryDesigns, REGULATORY_DESIGN_DIMENSIONS, REGULATORY_DESIGN_PRESETS } from '../../../../../../packages/release/src/regulatory-design-comparison-engine';
import s from '../regulatory-design.module.css';

const readable = (value: string) => value.replaceAll('-', ' ');

export default function SameGoalDifferentMachine() {
  const [swapped, setSwapped] = useState(false);
  const result = compareRegulatoryDesigns(REGULATORY_DESIGN_PRESETS[swapped ? 'ALPHA-WITH-BETA-LICENSING' : 'MODEL-ALPHA-BASELINE']);
  const focal = result.focalModel!;
  return <section className={s.story} data-swapped={swapped}>
    <header className={s.machineStatus} role="status" aria-live="polite" aria-atomic="true">
      <small>{swapped ? 'ONE DIMENSION CHANGED' : 'MODEL ALPHA · BASELINE'}</small>
      <h2>{swapped ? 'Licensing changed from OPEN-ENTRY to LIMITED-PERMITS' : 'Eight design choices form the baseline machine'}</h2>
      <p>{swapped ? result.tradeoffs.slice(1).join('. ') : 'Select the control to borrow only Model Beta’s licensing choice. All seven other dimensions remain fixed.'}</p>
    </header>
    <div className={s.machine} aria-label="Model Alpha regulatory machine">
      {REGULATORY_DESIGN_DIMENSIONS.map((dimension, index) => <article key={dimension} data-changed={swapped && dimension === 'LICENSING'}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{dimension}</small><b>{readable(focal.choices[dimension])}</b></div></article>)}
    </div>
    <div className={s.storyAction}><button type="button" onClick={() => setSwapped(value => !value)}>{swapped ? 'RESTORE OPEN-ENTRY' : 'SWAP LICENSING MACHINE'}</button><p><b>Shared goal stays fixed.</b> The models are fictional; the swap exposes design work, not a recommendation.</p></div>
    <section className={s.tradeoff} aria-label="Tradeoffs revealed"><small>TRADEOFF TRACE</small><ul>{result.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <aside className={s.boundary}><b>What this cannot tell you</b><p>This is synthetic and not current law. It cannot establish compliance, rank or endorse a machine, or determine effectiveness, rights adequacy, enforcement outcomes, equity, safety, access, or outcomes. It is not legal advice.</p></aside>
  </section>;
}
