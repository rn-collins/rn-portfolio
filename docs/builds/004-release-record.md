# Build 004 — Release Record

Status: RELEASE CANDIDATE / automated release gates in progress; manual accessibility/visual QA and B-LinkedIn remain required

Version: 004.1.0
Date: 2026-08-15
Branch: `workstream/build-004`

## Public job
Turn disciplined human research into a repeatable intelligence workflow before deciding what should be automated.

## A — Manual Intelligence Engine Method
Implemented:
- explicit COLLECT → SEPARATE → VERIFY protocol;
- source register with title, location, date, source type and collection note;
- analyst claims represented separately from source records;
- claim-level verification queue with `unverified`, `verified`, `contradicted`, and `uncertain` states;
- dependent-claim deletion when a source is removed;
- intelligence brief derived from verification states rather than source volume;
- separate verified findings, contradictions, uncertainty and open-verification sections;
- explicit local JSON research-record export;
- plain-language evidence boundary stating that the tool records human verification rather than determining truth.

## B-Web — Before the Automation
Implemented as a standalone explanatory master rather than a screen recording of A. It moves from raw research material through four visible gates—COLLECT, SEPARATE, VERIFY, BRIEF—and ends with the proposition that verified findings must remain distinct from contradiction, uncertainty and unresolved questions.

## Technological-ceiling review
Evaluated stronger-looking approaches:
- automatic web retrieval/search;
- model-generated source summaries;
- automatic claim extraction;
- embeddings/vector retrieval;
- model-based truth or credibility scoring;
- agentic research orchestration.

Decision: reject them from the core of Build 004. The build's purpose is to expose and stabilize the human intelligence method *before* automation. Automating collection or synthesis here would obscure the exact source/claim/verification contract this cycle exists to make inspectable. The strongest warranted implementation is therefore a deterministic local research operating system with durable state semantics and export. Later retrieval/agent builds may inherit the method once they can preserve these invariants.

## Evidence and provenance
This build does not claim that a source is true because it was collected, nor that a claim is true because it is linked to a source. Its consequential product rules are product/governance rules grounded in the canonical Build 004 definition and the governed engine contract:
- `data/100-builds.js` — canonical title, purpose and component inventory;
- `data/build-004-engine-v1.json` — machine-readable invariants and evidence boundary;
- `tests/build004.spec.ts` — adversarial release fixtures.

No external factual authority drives a score, legal conclusion, health conclusion, or truth classification in 004.

## Verification/evaluation
Expected invariant behavior is encoded before release:
- an unverified claim cannot enter verified findings;
- a human can explicitly promote a claim to verified;
- a contradicted claim remains visible but does not enter verified findings;
- removing a source removes claims dependent on it;
- new claims enter as unverified;
- the UI states that it does not perform source verification itself.

Full-branch CI must pass after all release files are committed before `releaseEngineering` or `adversarialFinal` can move to PASS.

## Privacy/security/support
See `data/build-004-privacy-support-v1.json`. Core processing is browser-local, no account or external model is required, there is no build-specific transmission/storage path, and export occurs only on explicit action. This does not imply the surrounding device/browser is secure; users should not enter restricted material without authorization.

## Performance/resilience/freshness
See `data/build-004-freshness-performance-v1.json`. Core behavior is deterministic and has no model/network cold start. No broader offline/PWA availability claim is made.

## State/export/share
State is visible in the source register, verification queue and derived brief. JSON export preserves sources, claims, statuses, notes, version and derived buckets. 004 intentionally has no URL-sharing feature, avoiding implicit leakage of source material.

## Lineage
Concrete inherited infrastructure:
- `Exhibition Room Shell v1` from Build 001, evidenced by the CSS import in 004-A.

Concrete artifact created:
- `Manual Intelligence Engine Method v1` at `data/build-004-engine-v1.json`.

No thematic or conceptual similarity is represented as code reuse.

## Remaining release requirements
- physical-device/manual accessibility and visual/touch QA;
- unique public metadata/OG verification for the 004 routes;
- B-LinkedIn silent-first 4:5 MP4 generation, checksum/production metadata and phone-size QA;
- final full-branch CI after those changes;
- final multidisciplinary adversarial question.

These are release gates, not deferred product ideas. Build 005 must not begin while any applicable blocking gate remains.
