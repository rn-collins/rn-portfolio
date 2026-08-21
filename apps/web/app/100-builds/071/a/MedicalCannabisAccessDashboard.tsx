'use client';

import { useState } from 'react';
import {
  buildMedicalCannabisAccessIntelligenceDashboard,
  MEDICAL_CANNABIS_ACCESS_SCENARIOS,
  MEDICAL_CANNABIS_ACCESS_ENGINE_VERSION,
  type MedicalCannabisAccessScenarioId,
} from '../../../../../../packages/release/src/medical-cannabis-access-intelligence-engine';
import s from '../access-intelligence.module.css';

const scenarioIds: MedicalCannabisAccessScenarioId[] = ['POLICY-RECORD-RULE-UNKNOWN', 'RULE-MATCH-CLINICIAN-GAP', 'CLINICIAN-RECORDED-TRAVEL-BARRIER', 'SUPPLY-COST-CONSTRAINTS', 'ACCOMMODATION-PRIVACY-REVIEW'];
const groups = [
  ['POLICY / LEGAL STATUS', 'policyLegalStatus'], ['ELIGIBILITY', 'eligibilityRule'],
  ['CLINICIAN AVAILABILITY', 'clinicianAvailability'], ['GEOGRAPHY / TRAVEL', 'geographyTravel'],
  ['SUPPLY / PRODUCTS', 'supplyProductAvailability'], ['COST / PAYMENT', 'costPayment'],
  ['DISABILITY / LANGUAGE / DIGITAL', 'disabilityLanguageDigital'], ['CONSENT / PRIVACY', 'consentPrivacy'],
  ['EVIDENCE / DATES', 'evidenceDates'], ['BARRIERS', 'barriers'], ['UNKNOWNS', 'unknowns'], ['ALERTS', 'alerts'], ['NON-CLAIMS', 'nonClaims'],
] as const;
const label = (value: string) => value.replaceAll('-', ' ');

export default function MedicalCannabisAccessDashboard() {
  const [scenarioId, setScenarioId] = useState<MedicalCannabisAccessScenarioId>('POLICY-RECORD-RULE-UNKNOWN');
  const input = MEDICAL_CANNABIS_ACCESS_SCENARIOS[scenarioId];
  const result = buildMedicalCannabisAccessIntelligenceDashboard(input);

  function download() {
    const snapshot = {
      build: '071', version: MEDICAL_CANNABIS_ACCESS_ENGINE_VERSION,
      fixture: 'synthetic fictional medical cannabis program', exportedAt: input.assessedAt,
      canonical: { uses: ['008', '020', '023', '029', '030', '035', '036', '058', '061', '063'], creates: 'cap:071' },
      artifacts: ['Access Signal Model', 'Barrier Dashboard'],
      admission: {
        fictionalJurisdiction: true, fictionalProgram: true, fictionalPersona: true,
        containsRealPatientData: false, containsHealthData: false, currentLawClaim: false,
        legalStatusDetermined: false, complianceDetermined: false, eligibilityDetermined: false,
        accessDetermined: false, clinicianVerified: false, diagnosisProvided: false,
        treatmentRecommended: false, dosageRecommended: false, productRecommended: false,
        safetyDetermined: false, effectivenessDetermined: false, consentValidityDetermined: false,
        privacyComplianceDetermined: false, legalAdvice: 'NONE', medicalAdvice: 'NONE', failClosed: true,
      },
      input: structuredClone(input), result: structuredClone(result),
      replay: { scenarioId, engineVersion: MEDICAL_CANNABIS_ACCESS_ENGINE_VERSION },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'synthetic-medical-cannabis-access-record.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return <section className={s.dashboard} aria-labelledby="access-status" data-access-state={scenarioId}>
    <header className={s.status} role="status" aria-live="polite" aria-atomic="true">
      <small>FICTIONAL ACCESS STATE · {label(scenarioId)}</small>
      <h2 id="access-status">{result.status}</h2>
      <p>{result.alerts[0] ?? result.unknowns[0] ?? result.nonClaims[0]}</p>
    </header>
    <div className={s.controls} aria-label="Synthetic access dashboard controls">
      <label htmlFor="access-scenario">ACCESS SIGNAL
        <select id="access-scenario" value={scenarioId} onChange={(event) => setScenarioId(event.target.value as MedicalCannabisAccessScenarioId)}>
          {scenarioIds.map((id) => <option key={id} value={id}>{label(id)}</option>)}
        </select>
      </label>
      <button type="button" onClick={() => setScenarioId('POLICY-RECORD-RULE-UNKNOWN')}>RESTORE POLICY RECORD</button>
      <button type="button" onClick={download}>EXPORT ACCESS RECORD</button>
    </div>
    <aside className={s.warning} aria-label="Access intelligence limitations">
      <h3>A legal category is not an access determination.</h3>
      <p>Policy status cannot establish eligibility, locate a clinician, shorten travel, create supply, cover cost, remove access barriers, secure consent, protect privacy, or prove safety or effectiveness.</p>
    </aside>
    <div className={s.grid}>
      {groups.map(([title, key]) => <article key={key} data-group={key}>
        <small>{title}</small>
        <ul>{result[key].length ? result[key].map((item) => <li key={item}>{item}</li>) : <li>Unknown — no evidence in this fixture.</li>}</ul>
      </article>)}
    </div>
    <section className={s.audit} aria-label="Synthetic access audit">
      <h3>Audit trail</h3>
      <ol>{result.audit.map((entry) => <li key={entry.sequence}>
        <span>{String(entry.sequence).padStart(2, '0')}</span><b>{entry.stage}</b><span>{entry.event}</span><em>{entry.outcome}</em><small>{entry.claimScope}</small>
      </li>)}</ol>
    </section>
    <p className={s.note}><b>Boundary:</b> Fixed synthetic fixtures describe a fictional medical cannabis program only. No real patient data. This does not provide medical or legal advice, diagnosis, treatment, dosage, a product recommendation, clinician verification, or any eligibility, access, current-law, compliance, safety, or effectiveness determination.</p>
  </section>;
}
