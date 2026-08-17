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
- Implementation head: `47c9c83dbcef8fea678a714c90b5dbdd9764fba9`
- Platform CI: run `31986626556` — SUCCESS
- Browser matrix: 198/198 Playwright tests passed across desktop Chromium and mobile WebKit.
- Static gates: lineage, archive scaffold, TypeScript, lint, and production build passed.
- Exact-head Vercel preview: `rn-portfolio-2ccdpfgec-rn-collins.vercel.app`
- Deployment: `dpl_23iAtLXTcpztKXZNtNwdzEyQs5CS` — READY
- Hosted QA: A default readiness and Build 001 inheritance; B decision-ready and conflict states; archive routes and media metadata verified.
- Canonical film: 720×900, 24 fps, 18s, 217,992 bytes, SHA-256 `40e4bbbbc266fe1508ec82c015b0ea0fdf8077020aa2027a74676b9f30142bca`.
- Release state: CERTIFIED; the certification-record commit must receive its own administrative-head CI before closure.

## Forward lineage
Build 071 explicitly consumes Build 008.
