# Build 001 — SPEC

## Identity
- **001-A:** Human Review Design Framework
- **001-B:** Human in the Loop
- **Phase:** 01 — Human judgment, communication & product discovery
- **Status:** platform migration
- **Version:** 0.2-foundation

## Observation
“Human in the loop” is often treated as if the presence of a person automatically creates meaningful oversight.

## Missing system
A practical way to specify who reviews an AI-assisted decision, what they review, against which standard, at what point, and what happens when review fails.

## Intended users
Teams introducing AI-assisted work where human review is claimed as a control; demo examples may include legal, research, regulated and business workflows.

## Inputs
Review object; qualified reviewer; trigger; review standard; evidence set; reviewer authority; failure/escalation path.

## Logic
Deterministic form validation and explicit control-gap fallbacks. No model call is required for the MVP.

## Outputs
A structured human-review protocol and visible warnings when a meaningful control element is unspecified.

## Limitations / prohibited claims
The artifact is a design aid. It is not legal advice, a compliance certification, a substitute for competent professional judgment, or proof that a review system is effective in practice.

## Infrastructure created
- Form Engine v1 → `packages/forms/src/index.tsx`
- Conditional Logic v1 → deterministic fallback/rule behavior in `packages/forms/src/index.tsx`
- Results Renderer v1 → `packages/results/src/index.tsx`
- Visual Reveal Primitive v1 → `packages/visuals/src/index.tsx` (lab infrastructure/visual lineage; not an original canonical registry claim)

## Verifiable lineage
Build 001 is the root and therefore has no numbered-build dependency. Build 002 must import/reuse at least one Build 001 primitive before the program may claim infrastructure inheritance.

## Functional acceptance criteria
- [ ] Inputs can be completed by keyboard
- [ ] Protocol renders after submit
- [ ] Missing standard/evidence/failure fields generate explicit control-gap language
- [ ] Mobile/desktop routes render
- [ ] Critical path passes Playwright

## B visual acceptance criteria
- [ ] Three-state reveal works by pointer and keyboard
- [ ] Questions remain legible at LinkedIn/mobile dimensions
- [ ] Final state explicitly connects 001-A and 001-B

## Analytics events
`build_view`, `build_a_start`, `build_a_complete`, `build_b_advance`, `build_b_complete`; implementation deferred until privacy-conscious telemetry foundation is configured.

## Later dependents
Risk-tiering, AI workflow risk, legal judgment architecture, exception/escalation, regulated workflow systems and any later build that uses human approval gates.
