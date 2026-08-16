# RN Builds — Release Standard v1.1

Status: REQUIRED / applies to every numbered build before the next cycle begins

Core law: maximum warranted technical sophistication behind the interface; minimum necessary cognitive burden in front of it.

A build is not complete because it compiles, looks polished, or has an A and B route. Every numbered cycle must pass all applicable gates below. Any intentionally inapplicable item must be recorded with rationale.

## 1. Public-value gate
- One plain-language human job/problem.
- First useful result without specialist vocabulary, account creation, prompt engineering, or reading project documentation.
- Progressive disclosure for expert depth.
- Clear limitations and non-goals.
- Static-document test: interaction/software must materially change the result or understanding.

## 2. Technological-ceiling gate
- Explicit survey of stronger relevant architectures before release.
- Implement strongest feasible approach that materially improves capability, trust, privacy, explanation, or experience.
- Record evaluated-but-rejected approaches and why.
- No complexity theater: advanced technology must earn its inclusion.
- Distinguish locally complete capability from later shared infrastructure that is legitimately unavailable until a dependency build exists.

## 3. Evidence + provenance gate
- Every consequential factual/product rule classified as: direct source requirement, cross-source synthesis, research inference, or product heuristic.
- Exact source title, issuing body/author, URL/identifier, publication/version/effective date when available, retrieval/check date, and relevant section/article/page.
- Claim/rule → source mapping.
- Source freshness/status warning when guidance is under revision or superseded.
- Machine-readable evidence manifest where evidence materially drives product behavior.
- No source-family-only placeholders in a release build.

## 4. Verification/evaluation gate
- Test corpus/fixtures covering normal, boundary, contradictory, adversarial, missing-data, and misleading-but-plausible cases.
- Expected behavior recorded before/with testing.
- Deterministic logic unit-tested where practical.
- AI-generated output evaluated separately from the generator; no model grading itself as sole verifier.
- False-positive/false-negative tradeoffs documented for scoring/classification.
- Human-review requirements stated for consequential use.

## 5. Accessibility gate — WCAG 2.2 AA target
- Semantic HTML before ARIA.
- Entire functionality keyboard operable.
- Visible focus and focus not obscured.
- Pointer targets at least WCAG 2.2 minimum or compliant spacing/equivalent control.
- No drag-only functionality.
- 320 CSS px reflow / 400% zoom without information/function loss where applicable.
- Text resize and long-content/collision testing.
- Reduced-motion mode removes nonessential animation and automatic motion where motion itself is not essential.
- Screen-reader names, roles, states, relationships, announcements, and reading order tested.
- Color never sole carrier of meaning; contrast checked.
- Touch/mobile interaction tested.
- Errors and status changes perceivable without relying only on vision.

## 6. Interaction + visual QA gate
- No overlapping text, controls, labels, motion objects, or safe-area violations at supported widths.
- Every B-Web interaction explains/reveals the idea rather than decorating it.
- Passive path remains understandable without interaction when the concept requires social/feed translation.
- All hover effects have keyboard/touch equivalents where functional.
- Long strings, localization expansion, and extreme user input tested.

## 7. Browser/device/fallback gate
- Support matrix recorded for core experience and progressive enhancements.
- Core value works without experimental/limited-availability browser APIs unless the build's public job inherently requires them.
- Feature detection + graceful fallback for optional capabilities.
- Mobile limitations explicitly surfaced when APIs are desktop-only.
- No silent failure when model/device/network requirements are unmet.

## 8. Privacy/security/safety gate
- Data-flow inventory: what is processed, where, whether transmitted, retained, logged, exported, or shared.
- Data minimization by default.
- Sensitive input warning where warranted.
- No misleading “local/private” claims unless every relevant path supports them.
- Input/output escaping and injection-aware design where text is rendered or model prompts are composed.
- Least privilege for external tools/integrations.
- No secrets in client code/repo.
- Appropriate abuse/misuse boundaries for consequential systems.

## 9. Performance/resilience gate
- Core interaction remains usable on reasonable low-end conditions.
- Loading/cold-start states are explicit.
- Heavy models/assets lazy-loaded only after intent where appropriate.
- No unnecessary dependency or CDN payload added solely for sophistication.
- Offline/local-first behavior tested when claimed.
- Failure and recovery states are designed, not left as exceptions.

## 10. State/export/share gate
- User can understand current state and reset/start over.
- Export/share state is available when the build's value reasonably benefits from reuse or evidence.
- Export includes provenance/version metadata where consequential.
- No share mechanism leaks sensitive text by default.

## 11. Public build-record gate
Every cycle publishes/records:
- A / working product;
- B-Web / interactive visual master;
- B-LinkedIn / silent-first 4:5 MP4 (or explicit warranted alternative);
- making / meaningful versions, failures, rejected approaches;
- method / transferable lessons;
- evidence / sources, claims, limitations;
- release record / ceiling decisions + acceptance status;
- lineage / what it actually inherited and what it actually leaves behind.
Internal production chatter is not automatically public content.

## 12. Lineage gate
- `uses` means actual implementation reuse or a specific inherited rule/capability, not thematic similarity.
- `creates` identifies reusable code, schema, evaluator, design pattern, research asset, or governance primitive.
- Later builds must be able to point to the concrete inherited artifact/capability.
- Reimplementation without reuse must be labeled honestly.

## 13. Discoverability/metadata gate
- Unique page title/description where public.
- Social/OG metadata when the page is intended to circulate publicly.
- Canonical route stable.
- Meaningful link text.
- Public status (prototype/release) is truthful.

## 14. Release engineering gate
Required record before moving to next number:
- Vercel/production build compiles cleanly.
- No known blocking runtime errors.
- Acceptance matrix marked PASS / DEFERRED WITH RATIONALE / NOT APPLICABLE.
- Known limitations documented.
- Release version/date/commit recorded.
- No placeholder copy stating that a required release layer “will be completed later.”

## 15. B-LinkedIn gate
- 4:5 feed-native composition unless another LinkedIn-native format is intentionally superior.
- Silent-first; complete argument with audio off.
- Not a raw screen recording of B-Web.
- Safe typography and pacing at phone size.
- Each frame remains long enough to read but does not falsely signal the film has ended.
- Final saveable proposition/payload.
- File/production spec linked from the release record.

## 16. Archive-completeness gate
- `/100-builds/{id}/archive` exists for every active cycle and is reachable from the build room.
- Material research/evidence, architecture decisions, rejected approaches, technological-ceiling decisions, created artifacts, audit/release evidence, media metadata, lineage, source paths, limitations, and consequential forward plans are retained there in understandable form.
- `/100-builds/archive` preserves the program-level syllabus, feasibility/strategy/canon audits, design/release standards, lineage architecture and archive policy.
- No material build fact should be recoverable only from chat history, local runtime storage, or an unlinked working file.
- The archive includes a canonical implementation/source inventory without exposing secrets, credentials, privileged/confidential material, or unnecessary personal data.
- Required media derivatives are downloadable from the build/archive surface once durable ingest is complete.
- Full requirements are defined in `docs/build-archive-standard-v1.md`.

## 17. Final adversarial question
Before release, answer:
“If a senior product engineer, creative technologist, accessibility specialist, security/privacy reviewer, domain expert, researcher, and skeptical first-time user each inspected this today, is there a materially stronger relevant feasible implementation or a category of evidence/QA we have simply failed to perform?”

If yes, the build does not pass.
