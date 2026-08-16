# Build 007 — Complete Build Archive

## Canon
- A: Feedback Loop Product Architecture
- B-Web: The Product That Learns
- Job: Design how use, corrections, unmet needs, and outcomes improve a product over time.
- Lifecycle: IN THE LAB
- Version: 007.1.0

## Observation
Most products are one-way systems: teams ship, observe fragments, and maintain a request list. Collection is often mistaken for learning. The missing architecture is the accountable path by which different feedback events are qualified, routed, decided, changed, validated, communicated, and monitored.

## Retained research
1. NIST AI RMF 1.0 — lifecycle monitoring, measurement, roles, oversight, and accountable risk response.
2. Microsoft Research, *Guidelines for Human-AI Interaction* — granular feedback, correction, user control, and notification patterns.
3. GOV.UK Service Standard and performance guidance — combine metrics with user research and iterate services.
4. W3C Privacy Principles — purpose limitation, data minimization, and retention boundaries.

These sources ground design requirements. They do not prove the engine's thresholds, product quality, compliance, safety, demand, causality, or representativeness.

## Product infrastructure inherited
Build 007 concretely imports Build 001's `humanReviewScore` and `humanReviewGrade`. A feedback queue is not treated as governed merely because a person is present; timing, evidence, authority, escalation, validation, records, notification, and capacity remain visible.

## Product infrastructure created
- Feedback Event Schema v1: use, outcome, correction, unmet need.
- Feedback Loop Assessment Engine v1.
- Improvement Backlog Rules v1.
- Governed Loop Field visual primitive.

## Decisions
- A correction is a first-class event, not a generic request.
- Urgent corrections enter human triage before the ordinary backlog.
- A closed diagram is insufficient: the reviewer needs real authority and capacity.
- Validation and communication occur before the loop returns to monitoring.
- Consent and retention gaps block the strongest status.
- No model, analytics service, network call, automated deployment, or hidden ranking is required.

## Rejected approaches
- A generic feedback form: captures messages but does not design learning.
- A dashboard-only build: observation without authority and change control.
- Automatic AI clustering/prioritization: would introduce opacity before the schema and governance contract are validated.
- A decorative circular animation: visually closes a loop without proving operational closure.
- Individual-level behavioral surveillance: conflicts with minimization and is not needed for the build's value.

## Working artifacts
- `/100-builds/007/a` — functional architecture lab.
- `/100-builds/007/b` — interactive governed-loop visual.
- `data/build-007-engine-v1.json` — engine/evidence boundary.
- `data/build-007-archive-v1.json` — machine-readable archive record.
- `docs/builds/007/SPEC.md` — acceptance contract.

## Privacy and security
State is local and ephemeral. Export is user-initiated. The interface warns against personal, identifying, confidential, or sensitive feedback. Real deployments require domain-specific consent, access, deletion, security, incident, and legal review.

## QA state
Implementation is in progress. Automated Chromium/WebKit, responsive 320px, accessibility, reduced-motion, archive exposure, media, deployed-preview, and exact-head certification evidence must be added before release claims.

## Forward lineage
Canonical future consumers: Builds 037, 086, and 087.
