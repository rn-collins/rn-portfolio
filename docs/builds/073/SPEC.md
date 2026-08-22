# Build 073 — Psychedelic Access & Equity Index

## Canon

- **073-A:** Measures who can realistically access services across cost, geography, eligibility, culture, disability, language, workforce, and legal risk.
- **073-B:** **Access for Whom?** A celebratory reform map is redrawn by actual accessibility.
- **Creates:** `Equity Indicator Set`; `Index Methodology`.
- **Lineage:** `030`, `045`, `047`, `063` → `cap:073`.

## Functional contract

`buildPsychedelicAccessEquityIndex(candidate)` accepts only one byte-for-byte-shaped member of `PSYCHEDELIC_EQUITY_SCENARIOS`. The fixture contains exactly five deterministic, fully synthetic generalized contexts and eight disaggregated indicators: cost, geography, eligibility, culture, disability, language, workforce, and legal risk.

The methodology intentionally produces no composite score. It performs no weighting, imputation, ranking, comparison of real jurisdictions, or certification of equity. Unknown and review-required states remain visible. Any mutation, extra field, omitted field, hostile getter, unknown scenario, real-record flag, authority claim, or inherited-capability drift returns `INVALID` without throwing.

## UI and export contract

- A control label: `EQUITY SCENARIO`
- A actions: `RESTORE BASELINE`, `EXPORT EQUITY INDEX`
- B action: `REDRAW ACCESS MAP`
- Export: `synthetic-psychedelic-access-equity-index.json`
- Version: `073.1.0`
- Exact artifacts: `Equity Indicator Set`, `Index Methodology`

The export must contain the selected immutable input, deterministic result, replay metadata, exact lineage, and exact admission record from `data/build-073-engine-v1.json`.

## Safety and interpretation boundary

The build contains no real person, patient, provider, program, community, service, or jurisdiction data. It cannot establish current law, legal risk, eligibility, practical access, equity, clinical appropriateness, safety, effectiveness, cultural authority, community consent, endorsement, or representativeness. It does not infer protected traits or classify individuals. It is neither legal nor medical advice and must not recommend a psychedelic service, treatment, product, dosage, or course of action.

## Acceptance

1. Exactly five fixtures produce the five contracted statuses.
2. Eight indicators remain disaggregated; the methodology prohibits aggregation, weighting, ranking, and certification.
3. Invalid and hostile input fails closed and never throws.
4. The export matches exact version, lineage, artifacts, filename, and admission fields.
5. A and B expose boundaries, native controls, a live status, 320 px integrity, reduced-motion support, and useful print output.

