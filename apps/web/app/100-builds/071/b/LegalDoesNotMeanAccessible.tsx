'use client';

import { useState } from 'react';
import { buildMedicalCannabisAccessIntelligenceDashboard, MEDICAL_CANNABIS_ACCESS_SCENARIOS } from '../../../../../../packages/release/src/medical-cannabis-access-intelligence-engine';
import s from '../access-intelligence.module.css';

const gates = [
  ['POLICY', 'Policy status'], ['ELIGIBILITY', 'Eligibility evidence'], ['CLINICIAN', 'Clinician availability'],
  ['GEOGRAPHY', 'Geography and travel'], ['SUPPLY', 'Supply and products'], ['COST', 'Cost and payment'],
  ['ACCESSIBILITY', 'Disability, language, digital'], ['CONSENT', 'Consent'], ['PRIVACY', 'Privacy'],
  ['EVIDENCE', 'Evidence'], ['UNKNOWN', 'Unknowns remain'],
] as const;

export default function LegalDoesNotMeanAccessible() {
  const [index, setIndex] = useState(0);
  const result = buildMedicalCannabisAccessIntelligenceDashboard(MEDICAL_CANNABIS_ACCESS_SCENARIOS['ACCOMMODATION-PRIVACY-REVIEW']);
  const [gateId, gateLabel] = gates[index];
  const entry = result.audit[index];
  return <section className={s.story} data-access-gate={gateId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>ACCESS GATE {index + 1}/{gates.length}</small><h2>{gateLabel}</h2>
      <p>{entry ? `${entry.event} · ${entry.outcome}` : 'This gate has no verified evidence in the fictional fixture.'}</p>
    </header>
    <ol className={s.path} aria-label="Practical access pathway">
      {gates.map(([id, label], position) => <li key={id} data-inspected={position <= index} aria-current={position === index ? 'step' : undefined}>
        <span aria-hidden="true">{String(position + 1).padStart(2, '0')}</span><b>{label}</b><i aria-hidden="true" />
      </li>)}
    </ol>
    <div className={s.storyAction}>
      <button type="button" onClick={() => setIndex((value) => (value + 1) % gates.length)}>REVEAL NEXT BARRIER</button>
      <p>{entry?.claimScope ?? 'Unknown remains the honest status.'} Evidence at one gate does not transfer to another.</p>
    </div>
    <div className={s.equation} aria-label="Legal status is not eligibility, practical access, or care">
      <span>LEGAL STATUS</span><b aria-hidden="true">≠</b><span>ELIGIBILITY</span><b aria-hidden="true">≠</b><span>PRACTICAL ACCESS</span><b aria-hidden="true">≠</b><span>CARE</span>
    </div>
    <aside className={s.warning}><h3>The gap is the story.</h3><p>Clinicians, distance, supply, cost, disability, language, digital access, consent, privacy, evidence, and unknowns stay visible instead of collapsing into a “legal” label.</p></aside>
    <p className={s.note}>Fictional program and synthetic records only; no real patient data. Not medical or legal advice, diagnosis, treatment, dosage, product recommendation, clinician verification, or an eligibility, access, current-law, compliance, safety, or effectiveness determination.</p>
  </section>;
}
