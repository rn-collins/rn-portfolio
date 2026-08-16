# Build 007 — SPEC

## Identity
- Functional build: Feedback Loop Product Architecture
- Visual build: The Product That Learns
- Phase: 01 — Understand & structure the problem
- Status: IN THE LAB
- Version: 007.1.0

## Observation
Products often collect usage analytics or invite feedback without defining how a signal becomes an accountable improvement. That creates two failure modes: a one-way product that never learns, or an opaque product that changes without adequate evidence, authority, validation, privacy boundaries, or notice.

## Missing system
A legible feedback architecture that connects four signal classes—use, outcome, correction, and unmet need—to governed capture, qualification, routing, decision, change, validation, communication, and monitoring.

## Intended users
Product owners, service designers, founders, researchers, governance teams, and domain experts. No technical or AI background is required for the novice path.

## Inputs
- Product or feature description
- Feedback signals and their event kind, source, affected group, urgency, and consent state
- Named product owner and review trigger
- Evidence standard and change authority
- Validation, escalation, notification, retention, and review-capacity rules

## Logic
The engine checks event-kind coverage, then imports Build 001's human-control scoring to test whether the person responsible for learning can actually evaluate and affect the product. It separately checks privacy/retention readiness. Output is GOV​ERNED LOOP, PARTIAL LOOP, or ONE-WAY PRODUCT with visible priorities and backlog rules.

## Outputs
- Feedback-loop status
- Covered and missing event kinds
- Human-control score and grade
- Prioritized architecture gaps
- Improvement backlog rules
- Local JSON export preserving inputs, assessment, evidence boundary, and engine version

## Evidence requirements
- NIST AI RMF 1.0 for lifecycle monitoring, measurement, role, and oversight grounding
- Microsoft Research Guidelines for Human-AI Interaction for granular feedback, correction, control, and notification patterns
- GOV.UK Service Standard/performance guidance for combining metrics and user research in iterative improvement
- W3C Privacy Principles for purpose limitation and data minimization
- Build 001 is an explicit product-infrastructure dependency, not external evidence

## Limitations / prohibited claims
- Does not prove product quality, safety, compliance, demand, causality, or representativeness
- Does not connect to analytics, train a model, rank users, or deploy changes
- Does not determine whether consent is legally sufficient
- A complete-looking text field does not prove the operational process exists

## Infrastructure inherited
- Build 001 human-control score and grade
- Exhibition room shell
- Local JSON export pattern
- Archive and media pipeline inherited from the certified 001–006 integration

## Infrastructure created
- Feedback Event Schema v1
- Feedback Loop Assessment Engine v1
- Improvement Backlog Rules v1
- Governed Loop Field visual primitive

## Verifiable lineage
`assessFeedbackLoop` imports and invokes `humanReviewScore` and `humanReviewGrade` from the Build 001 engine module. Tests must exercise this inherited control boundary.

## Functional acceptance criteria
- [ ] Public 007 room is IN THE LAB
- [ ] A route works without network or hidden intervention
- [ ] Users can add, edit, and remove each feedback-event kind
- [ ] Missing coverage and weak controls remain visible
- [ ] Privacy/retention gaps prevent GOV​ERNED LOOP
- [ ] Local JSON export works
- [ ] Reset works
- [ ] Empty, invalid, and high-consequence states are handled
- [ ] Desktop Chromium, WebKit, and 320px QA pass
- [ ] Keyboard and semantic accessibility pass
- [ ] Critical path and inheritance are tested

## B visual acceptance criteria
- [ ] One-way product visibly becomes a closed learning loop
- [ ] Scenario controls change the actual loop state
- [ ] Human review/control is an explicit node, not decorative copy
- [ ] Validation and communication occur before feedback returns to the product
- [ ] Reduced motion and keyboard behavior are addressed
- [ ] 4:5 LinkedIn master can be derived from the same data

## Analytics events
No third-party analytics in the build. Suggested future vocabulary: `feedback_signal_added`, `loop_assessed`, `record_exported`, `scenario_changed`.

## Security/privacy/data notes
All state is local and ephemeral. Export is user-initiated. The tool asks for architecture descriptions, not real personal data. The interface warns against entering identifying or confidential feedback.

## Research/domain review needed
Representative user-research and domain validation are necessary before adapting the event schema or prioritization rules to a consequential real product.

## Later dependents
Builds 037, 086, and 087 explicitly inherit Build 007 in the canonical lineage.

## Build log
- 2026-08-16: Canon resolved; evidence boundary and engine v1 created; archive-first workflow initiated.
