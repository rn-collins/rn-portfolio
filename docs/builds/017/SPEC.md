# Build 017 — Regulated-Market Handoff Mapper

## Question
Where does responsibility disappear between organizations?

## Thesis
A regulated process is not accountable merely because each participant has its own policies. The transfer itself needs an explicit subject, retained responsibility, evidence package, permission basis, acceptance test, deadline, incident duty, record, and recourse path.

## Inheritance and output
- Uses Build 016 / `cap:016`: workflow nodes, accountable handoffs, orphan detection, coverage, and the `assessLegalWorkflow` engine.
- Creates `cap:017`: Cross-Organization Handoff Model and Responsibility Gap Detector.

## A / functional artifact
The public lab maps a synthetic regulated product and health-data chain across a product owner, contract operation, data service, authorized provider, and affected person. Visitors can remove controls from the data transfer, observe the responsibility-gap state, reset the chain, and export the full record locally.

## B / visual artifact
“The Risk Lives Between the Boxes” holds two apparently controlled organizations apart and lets the visitor reveal the questions hidden inside work, evidence, permission, incident, and recourse transfers.

## Evidence boundary
- FDA’s final quality-agreement guidance describes defining, establishing, and documenting manufacturing activities between parties in contract drug manufacturing.
- 45 CFR 164.504(e) provides a concrete organizational-handoff example involving permitted uses, safeguards, reporting, downstream restrictions, records, return or destruction, cure, and termination.
- These sources ground the control categories; they do not make the fixture universally applicable or prove compliance.

## Privacy, accessibility, and resilience
- Client-local, deterministic, no storage, no network calls after load.
- Synthetic fixture only; no regulated, health, client, or personal data.
- Text labels accompany every state; keyboard-visible controls; responsive at 320 CSS pixels.
- Core value remains available without AI, external APIs, accounts, or connectivity after load.

## Non-claims
The artifact is not legal advice, compliance certification, product-quality approval, consent validation, authorization to act, or a substitute for competent legal, regulatory, quality, privacy, security, or professional review.
