# Build 004 — Release Record

Status: RELEASE CANDIDATE / final automated certification pending; manual physical-device checks remain explicit

Version: 004.1.0
Date: 2026-08-15
Branch: `workstream/build-004`

## Public job
Turn disciplined human research into a repeatable intelligence workflow before deciding what should be automated.

## A — Manual Intelligence Engine Method
Implemented:
- explicit COLLECT → SEPARATE → VERIFY protocol;
- source register with separate title, issuer/author, URL/location, publication/version, source date, checked/retrieved date, relevant section/page/locator, source type and collection-note fields;
- source title plus checked/retrieved date required before a source enters the register;
- analyst claims represented separately from source records;
- claim-level verification queue with `unverified`, `verified`, `contradicted`, and `uncertain` states;
- a non-empty verification note required before `verified` becomes available;
- automatic demotion to `unverified` if a verified claim's verification note is cleared;
- dependent-claim deletion when a source is removed;
- intelligence brief derived from verification states rather than source volume;
- separate verified findings, contradictions, uncertainty and open-verification sections;
- explicit local JSON research-record export preserving provenance and verification state;
- RESET / START OVER for the full working state;
- plain-language evidence boundary stating that the tool records human verification rather than determining truth;
- long-string/reflow hardening for source titles, claims, locators and metadata.

## B-Web — Before the Automation
Implemented as the interactive visual master rather than a static poster or screen recording of A. Five named, keyboard/touch-operable stages—RAW, COLLECT, SEPARATE, VERIFY, BRIEF—change the visual model itself: raw source objects become provenance records; source and analyst claim split into different objects; four verification states remain distinct; and the final brief preserves verified findings beside contradiction, uncertainty and open questions. `aria-pressed` communicates active stage, focus-visible styling is explicit, controls exceed minimum pointer-target dimensions, and a passive four-gate summary plus complete-method sentence keeps the argument understandable without interaction.

## B-LinkedIn
A real silent-first 4:5 MP4 has been generated from the explanatory mechanism rather than recorded from B-Web.

Production record: `docs/builds/004-linkedin-production.md`

Recorded asset spec:
- 720 × 900;
- H.264 MP4;
- 24 fps;
- 21.125 seconds;
- no audio;
- SHA-256 `4bf7c7c0a99b600787c3f7a20bbff500cbb912feed09b5cf221f7d136469a273`.

Opening, verification-state and final saveable frames were visually inspected in the production runtime. The current GitHub connector has no binary-upload write action and the runtime has no authenticated `gh` client, so repository transfer of the exact MP4 remains accurately open rather than falsely represented as complete. Physical phone-size playback/platform-compression QA also remains manual.

## Technological-ceiling review
Evaluated stronger-looking approaches:
- automatic web retrieval/search;
- model-generated source summaries;
- automatic claim extraction;
- embeddings/vector retrieval;
- model-based truth or credibility scoring;
- agentic research orchestration.

Decision: reject them from the core of Build 004. The build's purpose is to expose and stabilize the human intelligence method *before* automation. Automating collection or synthesis here would obscure the exact source/claim/verification contract this cycle exists to make inspectable. The strongest warranted implementation is therefore a deterministic local research operating system with explicit provenance, durable state semantics and export. Later retrieval/agent builds may inherit the method once they can preserve these invariants.

## Evidence and provenance
This build does not claim that a source is true because it was collected, nor that a claim is true because it is linked to a source. Its consequential product rules are product/governance rules grounded in the canonical Build 004 definition and governed engine contract:
- `data/100-builds.js` — canonical title, purpose and component inventory;
- `data/build-004-engine-v1.json` — machine-readable provenance and verification invariants;
- `tests/build004.spec.ts` — adversarial workflow, provenance and extreme-input fixtures;
- `tests/build004-story.spec.ts` — interactive B-Web stage and passive-path fixtures;
- `tests/build004-routing.spec.ts` — active-state, route and metadata fixtures;
- `tests/accessibility-release.spec.ts` — 004 A/B narrow-width overflow and accessible-name baseline.

No external factual authority drives a score, legal conclusion, health conclusion, or truth classification in 004.

## Verification/evaluation
Expected invariant behavior is encoded before release:
- an unverified claim cannot enter verified findings;
- verified is unavailable until a reviewer records what was checked;
- clearing that verification note demotes a verified claim;
- a contradicted claim remains visible but does not enter verified findings;
- removing a source removes claims dependent on it;
- new claims enter as unverified;
- a source cannot enter the register without a checked/retrieved date;
- explicit source provenance survives into the registered record;
- pathological unbroken source/claim strings cannot create horizontal overflow at 320 CSS px;
- reset clears source, claim and derived-brief state;
- the UI states that it does not perform source verification itself;
- B-Web stage controls reveal the correct methodological state and the passive path communicates the complete sequence without interaction.

Full-branch CI must pass after all release files are committed before `releaseEngineering` or `adversarialFinal` can move to PASS.

## Accessibility / interaction QA
Automated baseline now includes both 004-A and 004-B at 320 CSS px and checks that visible interactive elements have accessible names. Semantic/native controls are used for inputs, textareas, selects, buttons and links. B-Web stage state is exposed through native buttons and `aria-pressed`; active meaning is also written in text rather than conveyed by color alone. Physical touch, screen-reader, zoom and real-device visual acceptance remain `DEVICE_MANUAL`; automated coverage is not mislabeled as full WCAG certification.

## Browser/device/fallback
Core value uses standard browser HTML/JS only. No experimental browser AI or network/model feature is required. The build therefore has no hidden limited-availability enhancement that can silently fail.

## Privacy/security/support
See `data/build-004-privacy-support-v1.json`. Core processing is browser-local, no account or external model is required, there is no build-specific transmission/storage path, and export occurs only on explicit action. This does not imply the surrounding device/browser is secure; users should not enter restricted material without authorization.

## Performance/resilience/freshness
See `data/build-004-freshness-performance-v1.json`. Core behavior is deterministic and has no model/network cold start. No broader offline/PWA availability claim is made.

## State/export/share
State is visible in the source register, verification queue and derived brief. RESET / START OVER is available. JSON export preserves source provenance, claims, statuses, verification notes, version and derived buckets. 004 intentionally has no URL-sharing feature, avoiding implicit leakage of source material.

## Lineage
Concrete inherited infrastructure:
- `Exhibition Room Shell v1` from Build 001, evidenced by the CSS import in 004-A.

Concrete artifact created:
- `Manual Intelligence Engine Method v1` at `data/build-004-engine-v1.json`.

No thematic or conceptual similarity is represented as code reuse.

## Discoverability / metadata
Build 004 is activated as `ON VIEW` on the canonical object route rather than falling through to the planned/future state. The object route has registry-driven title/description/canonical/OG/Twitter metadata, while 004-A and 004-B have distinct descriptive titles, canonical routes and social metadata. Regression fixtures protect this state.

## Remaining release requirements
- final full-branch CI on the frozen release candidate;
- physical-device/manual accessibility, touch, zoom/screen-reader and visual acceptance;
- physical phone-size playback/platform-compression QA for B-LinkedIn;
- binary transfer of the already-generated MP4 to the repository/media delivery path when a binary-capable authenticated write surface is available;
- final multidisciplinary adversarial question after automated results return.

These are release gates, not deferred product ideas. Build 005 must not begin while any applicable blocking gate remains.
