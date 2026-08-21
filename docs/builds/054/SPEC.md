# Build 054 — Make the Space Adapt to the Person

## Canon

- Job: Generate explainable environmental configurations based on person, task, context and constraints.
- B-Web: An adaptive room model recomputes configurations and tradeoffs.
- Uses: 049, 050, 053.
- Creates: `cap:054`.
- Direct consumers: 055, 097.

## Product and contract

Version A moves between two fully exact-bound synthetic scenarios: one focus task with one occupant and one conversation task with four occupants. Version B makes the resulting human-review conflict visible. Engine `054.1.0` returns proposed light, quiet-zone, and seating settings with rationales, tradeoffs, unresolved conditions, and explicit non-actions.

The product is a configuration-review surface, not an actuator. It does not collect a person profile, read sensors, control equipment, decide an accommodation, infer a protected trait, or determine accessibility or safety. Export is atomic and state-only.

## Boundaries

Not medical or design advice, diagnosis, treatment, accessibility or compliance determination, accommodation decision, safety clearance, facilities authorization, or proof of an environmental effect. Real implementation requires person/facilities authority, preview/consent/override/fallback controls, multi-person conflict governance, and architecture, facilities, environmental-psychology, occupational-safety, disability-justice, accessibility, privacy, security, ethics, and human-factors review.
