# Build 008 — SPEC

## Identity
- A: Decision-Ready Dashboard Standard
- B: Data Is Not a Decision
- Job: Turn information displays into an actual accountable decision path.
- Status: IN THE LAB
- Version: 008.1.0

## Observation
Dashboards often maximize visible metrics while leaving the user to infer the decision, threshold, accountable owner, authority, action, deadline, and next observable state.

## Missing system
A standard that removes decision-irrelevant display, makes every retained metric inspectable, and connects evidence to a named action state.

## Inputs
- Dashboard purpose and decision
- Metrics with value, source, freshness, comparison, uncertainty, and decision use
- Owner, trigger, action, deadline, authority, next state, and escalation

## Engine
`assessDecisionDashboard` evaluates metric readiness and concretely reuses Build 001's `humanReviewScore` and `humanReviewGrade`. It returns DECISION READY, INFORMATION ONLY, or DECISION BLOCKED with visible gaps and an Action-State summary.

## Outputs
- Decision-readiness status
- Metric readiness percentage
- Build 001 human-control score and grade
- Prioritized gaps
- Decision → owner → trigger → action → next-state record
- User-initiated local JSON export

## Evidence boundary
CDC dashboard/chart guidance supports coherent, contextualized visualization and warns against unnecessary or incomplete displays. WCAG 2.2 supports contrast, non-color distinction, resize, reflow, and non-text contrast. The rubric, labels, thresholds, and action-state contract are product heuristics.

## Prohibited claims
The build does not prove data quality, causal attribution, metric validity, organizational authority, legal compliance, accessibility conformance, or decision correctness. It does not connect to live systems or execute action.

## A acceptance
- Add, edit, and remove metrics.
- Incomplete provenance, freshness, comparison, uncertainty, or decision use remains visible.
- Decision and Action-State controls are explicit.
- Build 001 inheritance is displayed and tested.
- Export and reset are local.
- Empty, information-only, and decision-ready states work.
- Keyboard, semantics, 320px, Chromium, WebKit, and reduced motion pass.

## B acceptance
- A chart wall visually resolves into decision, owner, action, and next state.
- Scenario controls alter the actual state.
- Color is never the only status cue.
- An accountable human-control node is explicit.
- 4:5 silent-first film derives from the same argument.

## Creates
Decision Readiness Rubric; Action-State Component.

## Later consumer
Build 071 explicitly inherits Build 008.
