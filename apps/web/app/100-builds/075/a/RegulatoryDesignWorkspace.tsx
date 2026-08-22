'use client';
import { useState } from 'react';
import { compareRegulatoryDesigns, REGULATORY_DESIGN_DIMENSIONS, REGULATORY_DESIGN_ENGINE_VERSION, REGULATORY_DESIGN_PRESETS, type RegulatoryDesignPresetId } from '../../../../../../packages/release/src/regulatory-design-comparison-engine';
import s from '../regulatory-design.module.css';

const presetIds = Object.keys(REGULATORY_DESIGN_PRESETS) as RegulatoryDesignPresetId[];
const readable = (value: string) => value.replaceAll('-', ' ');

export default function RegulatoryDesignWorkspace() {
  const [preset, setPreset] = useState<RegulatoryDesignPresetId>('MODEL-ALPHA-BASELINE');
  const input = REGULATORY_DESIGN_PRESETS[preset];
  const result = compareRegulatoryDesigns(input);

  function download() {
    const snapshot = {
      build: '075', version: REGULATORY_DESIGN_ENGINE_VERSION,
      canonical: { uses: ['010', '058', '059', '069'], creates: 'cap:075' },
      artifacts: ['Regulatory Design Ontology', 'Comparison Workspace'],
      admission: { syntheticModelsOnly: true, exactModelCount: 5, sharedGoalIsIllustrative: true, containsRealJurisdictionData: false, currentLawClaim: false, legalAdvice: 'NONE', complianceDetermined: false, modelRanked: false, superiorityDetermined: false, effectivenessDetermined: false, rightsAdequacyDetermined: false, enforcementOutcomeDetermined: false, equityDetermined: false, safetyDetermined: false, accessDetermined: false, outcomesDetermined: false, scoresModels: false, failClosed: true },
      input: structuredClone(input), result: structuredClone(result), replay: { presetId: preset, engineVersion: REGULATORY_DESIGN_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'synthetic-regulatory-design-comparison.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section className={s.workspace} aria-labelledby="design-status">
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true"><small>ACTIVE SYNTHETIC BASELINE</small><h2 id="design-status">{result.status}</h2><p>{result.alerts[1]}</p></header>
    <div className={s.controls} aria-label="Regulatory design controls">
      <label htmlFor="design-baseline">DESIGN BASELINE<select id="design-baseline" value={preset} onChange={(event) => setPreset(event.target.value as RegulatoryDesignPresetId)}>{presetIds.map((id) => <option key={id} value={id}>{readable(id)}</option>)}</select></label>
      <button type="button" onClick={() => setPreset('MODEL-ALPHA-BASELINE')}>RESTORE ALPHA</button>
      <button type="button" onClick={download}>EXPORT COMPARISON WORKSPACE</button>
    </div>
    <aside className={s.boundary} aria-label="Interpretation boundary"><b>Comparison is not current law.</b><p>These five fixed synthetic models expose categorical design tradeoffs. They do not describe a real jurisdiction, rank a model, establish compliance, or determine legal adequacy, effectiveness, equity, access, safety, or outcomes.</p></aside>
    <div className={s.modelStrip} aria-label="Five synthetic regulatory models">{result.displayedModels.map((model) => <article key={model.id} data-focal={model.id === result.focalModel?.id}><small>{model.id}</small><h3>{model.label}</h3><p>{model.id === result.focalModel?.id ? 'FOCAL DESIGN' : 'COMPARISON DESIGN'}</p></article>)}</div>
    <div className={s.tableWrap} role="region" aria-label="Regulatory Design Ontology comparison" tabIndex={0}><table><caption>Eight categorical dimensions; source order preserved; no ranking</caption><thead><tr><th scope="col">Ontology dimension</th><th scope="col">Focal choice</th><th scope="col">Other synthetic choices</th><th scope="col">Variation</th></tr></thead><tbody>{result.rows.map((row) => <tr key={row.dimension}><th scope="row">{readable(row.dimension)}</th><td><b>{readable(row.focalChoice)}</b></td><td>{row.comparisonChoices.map((choice) => <span className={s.choice} key={choice.modelId}><small>{choice.modelId}</small>{readable(choice.choice)}</span>)}</td><td>{readable(row.observedVariation)}</td></tr>)}</tbody></table></div>
    <div className={s.panels}>
      <article><small>DESIGN TRADEOFFS</small><ul>{result.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article><small>METHOD AUDIT</small><ol>{result.audit.map((item) => <li key={item}>{item}</li>)}</ol></article>
      <article><small>NON-CLAIMS</small><ul>{result.nonClaims.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </div>
    <p className={s.note}><b>Boundary:</b> Synthetic demonstration only. Not legal or medical advice; no real-law, compliance, ranking, superiority, effectiveness, rights-adequacy, enforcement-outcome, equity, safety, access, or outcome determination.</p>
  </section>;
}
