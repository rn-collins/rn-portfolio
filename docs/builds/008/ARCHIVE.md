# Build 008 — Complete Build Archive

## Canon
Decision-Ready Dashboard Standard / Data Is Not a Decision.

## Retained thesis
A dashboard becomes decision-ready only when its evidence resolves into a named decision, accountable owner, review trigger, authorized action, time boundary, escalation path, and observable next state. More charts are not the optimization target.

## Research retained
- CDC COVE dashboard guidance: dashboards are appropriate when multiple visualizations work together; not all data needs a dashboard.
- CDC COVE data-bite guidance: a highlighted value requires context and can mislead when isolated.
- W3C WCAG 2.2 understanding guidance: information cannot rely on color alone and must survive contrast, resizing, and reflow.
- Build 001: accountable human review needs evidence, authority, escalation, records, and capacity.

## Infrastructure
Inherited: Build 001 human-control score and grade.

Created: Decision Readiness Rubric v1; Action-State Component v1; Decision Dashboard Assessment Engine v1.

## Decisions
- Start with the decision, not available data.
- Every metric must state why it can change the decision.
- Source, freshness, comparison, and uncertainty remain adjacent to the metric.
- One accountable owner is distinguishable from viewers or contributors.
- The result names the action and next observable state.
- No live integration is needed for first value.

## Rejected
- Generic KPI gallery.
- Decorative chart wall.
- Live connectors before the decision contract is validated.
- AI-generated recommendations without inspectable evidence and authority.
- Color-only status.

## Records
- `docs/builds/008/SPEC.md`
- `data/build-008-engine-v1.json`
- `packages/release/src/decision-engines.ts`

## QA state
Implementation, media, deployed-preview QA, and exact-head certification are pending and must not be represented as complete.

## Forward lineage
Build 071 explicitly consumes Build 008.
