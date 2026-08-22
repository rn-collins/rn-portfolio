# Builds 001–003 — Certification Ledger

Governing standard: `docs/build-release-standard-v1.md`
Status: FORCED COMPLETION PASS. Do not begin Build 004 construction until all BLOCKING items are PASS or explicitly DEFERRED because the required shared infrastructure belongs to a later canonical build.

Legend: PASS = evidenced now. FIXING = active remediation. BLOCKING = missing release requirement. DEVICE/MANUAL = cannot be truthfully certified from compilation alone. DEFERRED = technically evaluated and deliberately postponed with rationale.

## Cross-build findings we previously missed
1. Public Making/Method/Evidence pages were implemented only for 001; 002/003 need equivalent build records.
2. Source provenance was treated as prose rather than a machine-readable product dependency in 001.
3. We did not have one release standard covering evidence, accessibility, security/privacy, browser fallback, performance, state/export, metadata, test fixtures, and lineage.
4. Compilation/READY deployments were sometimes treated as stronger QA evidence than they really are.
5. B-LinkedIn files/specs were not governed as first-class release artifacts for every cycle.
6. Actual infrastructure reuse was named but not always proven by concrete imports/shared schemas/components.
7. We did not define a freshness/revalidation rule for changing sources, browser APIs, or standards.
8. We did not define automated adversarial/boundary fixtures as mandatory for scoring/classification tools.
9. We did not formally record data flows and privacy claims for each build.
10. We did not require social/SEO metadata and stable public artifact status for every public room.

# BUILD 001
## Product/value
PASS — working quick/deep human-review diagnostic, broad-comprehension copy, explicit non-compliance limitation.

## Technological ceiling
BLOCKING — create formal 001 release/ceiling record: candidates evaluated, implemented/rejected, rationale. Evaluate stronger rule engine, evidence-linked result explanations, export/share, machine-readable diagnostic result, and whether scenario simulation materially improves 001.

## Evidence/provenance
FIXING — exact NIST/EU/ICO primary sources and claim classifications now added to public Evidence page; machine-readable `data/build-001-evidence-v1.json` added.
BLOCKING — wire rule/result explanations to evidence IDs rather than leaving provenance only on the separate Evidence page.
BLOCKING — record exact product-score formula/weights as product heuristic and test sensitivity.

## Evaluation
BLOCKING — adversarial fixture corpus and expected results. Minimum cases: human present but no authority; authority after outcome; authority without evidence; evidence without competence; nominal override never used; overloaded reviewer; contradictory intake; all-positive superficial control; missing answers; extreme consequence with weak escalation.
BLOCKING — unit/regression test deterministic scoring and priority ordering.

## Accessibility/interaction
DEVICE/MANUAL — keyboard, screen reader, 320px reflow/400% zoom, touch, long-input, focus order/visibility, target size, reduced motion, and collision acceptance.
BLOCKING — encode automated accessibility checks in CI where feasible; manual AT matrix remains required.

## Browser/fallback/privacy/security
BLOCKING — data-flow record proving what HumanReviewForm processes/stores/transmits.
BLOCKING — explicit reset/export/share behavior decision.
BLOCKING — injection/unsafe rendering review for free-text fields/results.

## B-Web/B-LinkedIn
BLOCKING — canonical 001-B LinkedIn MP4/spec/release artifact; web version exists but social derivative must be first-class.
DEVICE/MANUAL — B-Web collision + keyboard/touch/reduced-motion acceptance.

## Public record
FIXING — source provenance and remaining `ACCESSION` jargon being removed.
BLOCKING — formal release record and artifact manifest.

## Lineage
BLOCKING — prove what 002/003 actually reused from 001 versus reimplemented; correct lineage metadata accordingly.

# BUILD 002
## Product/value
PASS — source truth → audience adaptation → independent deterministic anchor/drift checks; optional local generation/translation; clear warning that preservation score is not semantic/cultural equivalence.

## Technological ceiling
PASS/DEFERRED — claim decomposition, provenance, local model enhancement, local translation, share/export implemented. Independent browser NLI evaluator evaluated and deferred until a pinned/versioned evaluator can be managed as first-class infrastructure rather than opaque CDN runtime dependency.

## Evidence/provenance
BLOCKING — public Evidence page classifying anchor checks, drift categories, and equivalence limitations as product heuristics/engineering constraints; primary provenance for limited-availability Chrome APIs belongs in technical evidence record.
BLOCKING — manifest records transformation provenance but needs schema/version contract and test fixtures.

## Evaluation
BLOCKING — adversarial meaning-drift corpus: changed number, inverted negation, removed uncertainty, entity substitution, scope expansion, causal inflation, correlation→causation, legal certainty inflation, omitted condition, translated-name/number preservation, long/ambiguous input.
BLOCKING — deterministic verifier regression tests.
DEFERRED — independent semantic entailment model until governed evaluator infrastructure exists.

## Accessibility/interaction
FIXING/PARTIAL — native controls, pressed states, live-region semantics, focus styling, reduced-motion autoplay removal and responsive constraints implemented.
DEVICE/MANUAL — screen reader, touch, 320px reflow/400% zoom, long text/localization expansion, keyboard order, local-model download states.

## Browser/fallback/privacy/security
PASS/PARTIAL — core experience does not require Chrome AI; feature detection and fallback exist; processing designed browser-local.
BLOCKING — public support matrix: Translator desktop limitation; Prompt API hardware/Chrome requirements; no misleading universal-local-AI claim.
BLOCKING — data-flow/security record and sensitive-text warning/URL-share leakage review.

## B-Web/B-LinkedIn
PASS/PARTIAL — both exist conceptually/physically; MP4 generated outside repo.
BLOCKING — artifact manifest with file hash, dimensions, fps, duration, production source/spec and QA status.
DEVICE/MANUAL — phone-size readability/timing/collision acceptance.

## Public record
BLOCKING — Making / Method / Evidence public pages equivalent to 001, plus update build detail to expose them.

## Lineage
BLOCKING — distinguish principles inherited from 001 from actual shared implementation. Current A reuses the 001 Exhibition shell but substantial engine logic is new.

# BUILD 003
## Product/value
PASS/PARTIAL — explicit decision object, substitutes, gap dimensions, deterministic heuristic, bounded hypotheses, optional local AI, strong “discovery ≠ validation” limitation.

## Technological ceiling
BLOCKING — finish 003 ceiling decisions. Current architectural direction: public evidence/search should inherit from 004 rather than duplicate retrieval infrastructure; scoring should remain explicitly heuristic until a labeled dataset exists.
BLOCKING — implement 002-derived export/share/provenance pattern before release.

## Evidence/provenance
BLOCKING — public Evidence page: explain why frequency/consequence/ambiguity/fragmentation are product-discovery heuristics, not validated market-demand measures; cite any external methodology only where actually used.
BLOCKING — machine-readable score formula/version and hypothesis provenance.

## Evaluation
BLOCKING — fixture corpus: lots of info/no decision; low consequence; one-off decision; high consequence but clear rule; fragmented information but trivial choice; fake high scores; contradictory text; empty decision; misleading model hypothesis; multiple substitutes with no actual pain.
BLOCKING — deterministic score regression tests and sensitivity analysis.

## Accessibility/interaction
PARTIAL — native controls/responsive workbench and reduced-motion layer exist.
DEVICE/MANUAL — keyboard, screen reader, range-control labels/announcements, touch, 320px/400%, collision/long text, B-Web autoplay/reduced-motion acceptance.

## Browser/fallback/privacy/security
PASS/PARTIAL — local AI is optional and deterministic hypotheses remain.
BLOCKING — support matrix, data-flow record, local-model failure/cold-start acceptance, input length/resource limits.

## B-Web/B-LinkedIn
PASS/PARTIAL — Decision Void and 4:5 MP4 exist.
BLOCKING — first-class artifact manifest + social readability/timing acceptance.

## Public record
BLOCKING — Making / Method / Evidence public pages and final release record status.

## Lineage
BLOCKING — explicitly identify inherited 002 patterns versus new 003 code; 004 dependency contract for evidence/retrieval must be machine-readable.

# Cross-build release infrastructure still required before 004
- Machine-readable `acceptance.json` or equivalent per build.
- Artifact manifest schema for A, B-Web, B-LinkedIn, evidence manifest, release commit/version.
- Automated deterministic test harness integrated with repository scripts/CI.
- Automated accessibility/static checks where feasible; manual assistive-tech acceptance remains separate.
- Browser/device support matrix template.
- Privacy/data-flow template.
- Freshness/revalidation policy for external evidence and browser APIs.
- Shared public Making/Method/Evidence/Release page architecture so future builds do not hand-roll these records.
- Metadata/OG template for each build and B-Web artifact.
- Actual-lineage proof rule: import/schema/component/test evidence, not narrative inheritance alone.

# Freeze rule
Build 004 construction may begin only after 001–003 have no unclassified release gaps. Items requiring real assistive-tech/device testing may be marked DEVICE/MANUAL but may not be silently called PASS.