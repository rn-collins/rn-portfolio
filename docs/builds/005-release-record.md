# Build 005 — Release Record

Status: AUTOMATED RELEASE CERTIFIED / manual physical-device checks remain explicit

Version: 005.1.0
Date: 2026-08-16
Branch: `workstream/build-005`

## Public job
Decide which repeated service steps should become software, remain expert judgment, or disappear.

## A — Service-to-Software Discovery
Implemented:
- explicit service-step mapping before technology choice;
- nine visible signals: frequency, consequence, ambiguity, fragmentation, value, repeatability, rule clarity, expert judgment, and exceptions;
- direct reuse of Build 003's `decisionGapScore` and `decisionGapTier` as visible inherited context;
- three bounded candidate dispositions: `AUTOMATE`, `KEEP HUMAN`, and `REMOVE`;
- removal guard that prevents low-value repetition from being mislabeled as an automation opportunity;
- human-responsibility guard for high judgment, frequent exceptions, and high-consequence/high-ambiguity work;
- automation candidate only after the removal and human guards, when repeatability, rule clarity, and recurrence are strong enough;
- reason strings that expose why a disposition was produced;
- service-level portfolio view showing all steps across the three dispositions;
- local JSON export preserving signals, disposition reasons, inherited decision-gap score and version;
- RESET / START OVER;
- explicit boundary that the instrument does not establish demand, ROI, safety, legal permission, or implementation readiness.

## B-Web — Service Path Split
Implemented as an interactive explanatory master rather than a recording of A. Scenario controls change the conditions around one service and reveal how the path separates into software candidates, expert judgment, and removable work. The argument remains understandable in text and is not dependent on animation alone.

## B-LinkedIn
A real silent-first 4:5 MP4 has been generated from the explanatory mechanism rather than recorded from B-Web.

Production record: `docs/builds/005-linkedin-production.md`

Recorded asset spec:
- 720 × 900;
- H.264 MP4;
- 24 fps;
- 18 seconds;
- no audio;
- SHA-256 `3ae0f0d33b514a167eefbbbd3f23804f6f6997d2701027c2da6025830e6810fc`.

Opening, split-state, gate-state and final frames were generated and sampled in the production runtime. Physical phone-size playback/platform-compression QA and repository/media transfer remain manual.

## Technological-ceiling review
Evaluated stronger-looking approaches:
- model-based classification of service steps;
- automatic process mining from logs or meeting transcripts;
- task-mining browser/desktop instrumentation;
- workflow integrations that immediately generate automations;
- agentic service decomposition;
- ROI prediction and implementation-cost scoring.

Decision: defer them from the core of Build 005. This cycle exists to make the disposition logic inspectable before instrumentation or automated classification can hide why a step was selected. The strongest warranted implementation is therefore a deterministic local classifier that reuses the earlier decision-gap engine and exposes every new rule. Future process-mining or automation builds can inherit this contract once they can preserve the same human/automation/removal boundaries.

## Evidence and provenance
The new disposition rules are product heuristics, not externally validated thresholds. Their governed source is `data/build-005-engine-v1.json`.

Concrete inherited implementation:
- Build 003 `decisionGapScore` and `decisionGapTier` from `packages/release/src/decision-engines.ts`, imported directly by `apps/web/app/100-builds/005/a/ServiceSoftwareLab.tsx`.

No legal, labor, safety, procurement, financial, or product-market conclusion is represented as externally validated evidence.

## Verification/evaluation
Release fixtures cover:
- the seed workflow exposes all three candidate dispositions;
- low-value repeated work remains a removal candidate rather than becoming an automation candidate;
- high-judgment work remains human;
- new steps enter as inspectable candidates;
- JSON export is explicit and local;
- B-Web scenario controls change the visual/service-path state while preserving the explanatory argument.

The final frozen release-package candidate passed the complete automated release pipeline in GitHub Actions run `31928444353` on commit `adaed223a9f649ed6ed79166339c7334071bdd0c`: dependency installation, lineage validation, typecheck, lint, production build, Chromium/WebKit installation, and the complete Playwright E2E matrix all passed. The earlier strict-mode failures were test-locator ambiguity between selector badges and disposition headings; the correction targeted the semantic heading and the final candidate passed with no remaining automated blocker.

## Accessibility / interaction QA
A and B use native controls and text labels. Automated browser coverage includes Chromium and WebKit. Physical-device, touch, zoom, screen-reader and visual acceptance remain manual and are not represented as automated WCAG certification.

## Browser/device/fallback
Core value uses standard browser HTML/JS only. No experimental browser AI or network/model capability is required.

## Privacy/security/support
See `data/build-005-privacy-support-v1.json`. Core processing is browser-local, no build-specific transmission or persistence path exists, and export occurs only on explicit user action.

## Performance/resilience/freshness
See `data/build-005-freshness-performance-v1.json`. The classifier is deterministic, has no network/model cold start, and makes no unsupported claim about very large enterprise process maps.

## State/export/share
Current state is visible in the step selector, classification detail and service portfolio lanes. JSON export preserves the full current map and inherited score. RESET / START OVER restores the demonstration workflow. No implicit URL-sharing path exists.

## Lineage
Concrete inherited infrastructure:
- `Exhibition Room Shell v1` from Build 001;
- `Decision Gap Engine v1` from Build 003 via direct imports of `decisionGapScore` and `decisionGapTier`.

Concrete artifact created:
- `Service-to-Software Discovery Method v1` at `data/build-005-engine-v1.json`.

No thematic similarity is counted as lineage.

## Discoverability / metadata
005-A and 005-B have distinct titles, descriptions, canonical routes, OpenGraph and Twitter metadata. The canonical registry exposes Build 005 as `IN THE LAB`, alongside 004, while 001–003 remain `ON VIEW` and later builds remain `COMING NEXT`.

## Automated adversarial conclusion
The final automated pass found no remaining product blocker. Earlier failures were narrowed to ambiguous selectors in the test harness rather than classifier behavior; those selectors were corrected to the semantic disposition headings, and the final frozen release-package candidate passed the complete Chromium/WebKit E2E matrix.

## Remaining manual/device requirements
- physical-device/manual accessibility, touch, zoom/screen-reader and visual acceptance;
- physical phone-size playback/platform-compression QA for B-LinkedIn;
- repository/media transfer of the generated MP4 when a binary-capable authenticated write path is available.

These remaining requirements are intentionally represented as manual/device work rather than hidden or falsely automated. There is no remaining `BLOCKING` automated gate in the Build 005 acceptance matrix.
