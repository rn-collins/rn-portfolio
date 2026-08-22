# Build 079 — Psychedelic Evidence Navigation System

## Canonical contract

Build 079 uses Builds 028, 058, and 063 and creates `cap:079`. Its exact artifacts are `Evidence Navigation Taxonomy` and `Applicability Filters`.

079-A is **Psychedelic Evidence Navigation System**: it helps users locate, compare, understand, and qualify psychedelic evidence without treating all sources or claims as equivalent. Registry title: **Find the Psychedelic Evidence That Actually Answers Your Question**. Job: **Retrieve and qualify evidence by question, population, context, outcome, quality and applicability.** 079-B is **A Search Result Is Not an Evidence Map**: a results page reorganizes by question, evidence type, quality, and applicability. On the web, search results reorganize into an evidence map as question parameters change.

## Frozen synthetic fixture

The engine admits exactly five fictional evidence records in fixed order: Cedar, Harbor, Lattice, Mesa, and Orbit. They demonstrate controlled-study, qualitative, observational, implementation, and synthesis source types. It admits exactly three fixed navigation questions: preparation outcome, context and support, and implementation evidence.

Every record preserves source type, explicit quality basis, claim, population, context, outcome, limitations, uncertainty, as-of date, locator, and synthetic status. Every question returns all five records in source order with a mechanical applicability label, reason, matched parameters, unmatched parameters, and explicit unknowns. `DIRECT`, `PARTIAL`, and `OUTSIDE` describe only matching inside the invented fixture. They are not evidence grades, recommendations, relevance scores, or real-world suitability judgments. Out-of-scope results remain visible; nothing is silently discarded.

Only the three byte-for-byte frozen presets are admitted. Additional, mutated, real, authority-bearing, hostile, or unrecognized input returns `INVALID`, empty rows, and no map. There is no free text, live search, network dependency, real evidence corpus, randomness, model inference, numeric scoring, ranking, or fallback to an apparently similar question.

## UI and export contract

079-A uses native select label `NAVIGATION QUESTION` and buttons `RESTORE PREPARATION QUESTION` and `EXPORT EVIDENCE MAP`. The exact export filename is `synthetic-psychedelic-evidence-map.json`. The payload contains version `079.1.0`, exact lineage, exact artifacts, full admission block, input, result, and replay data.

079-B starts closed and uses `REORGANIZE RESULTS`; its live status says `Search results became a qualified evidence map`. The transformation must retain all five records, source-quality descriptions, limits, uncertainty, out-of-scope states, and unknowns. It cannot imply a ranking.

Both routes require semantic native controls, visible keyboard focus, live status, reduced-motion support, print support, and no horizontal document overflow at 320 CSS pixels. Color is never the only carrier of source type, quality, applicability, limitation, or uncertainty.

## Evidence, legal, and clinical boundaries

Every study, dataset, interview, participant, site, context, measure, claim, source, and date is fictional. `SYNTHETIC-SOURCE-CHECKED` means only that a fixed invented record passed fixture validation. It is not verification of real psychedelic evidence.

The build is not a literature review, systematic review, clinical evidence database, medical advice, legal advice, or a substitute for qualified research or care. It provides no diagnosis, treatment, dosage, eligibility, product, safety, effectiveness, risk-benefit, legal, compliance, applicability, or outcome determination. It cannot support clinical care, self-treatment, policy, legal, regulatory, purchasing, investment, funding, or resource-allocation decisions.

## LinkedIn boundary contract

The silent-first 18-second asset may communicate only that fictional search results become more understandable when organized by an explicit question, evidence type, quality basis, and applicability. It must visibly say `SYNTHETIC EVIDENCE — NO REAL PEOPLE OR STUDIES` and `NO MEDICAL OR LEGAL ADVICE, DIAGNOSIS, TREATMENT, DOSAGE, SAFETY, EFFECTIVENESS, OR APPLICABILITY CLAIM`, with the same boundary in caption and alt text.

No real psychedelic substances, products, dosing, consumption, people, clinicians, facilities, agencies, laws, citations, studies, statistics, or testimonials. No medical imagery, authoritative checkmarks, quality grades, relevance scores, ranked results, treatment language, recommendations, or guaranteed outcomes.

## Acceptance

Playwright asserts exact record/question order, deterministic navigation, complete field preservation, out-of-scope and unknown preservation, no ranking or scoring, hostile-input fail closure, exact export admission/artifacts/lineage, safety boundaries, 320-pixel containment, and the B-side reorganization status.
