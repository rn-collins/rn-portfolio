# Build 002 — Release Record

Status: ACTIVE PROTOTYPE / release candidate pending visual QA

## A — Multi-Audience Meaning Architecture
Public job: explain one defensible idea to different audiences without moving the underlying factual core.

Implemented in v0.1:
- source-claim input;
- audience profiles: general public, teenager, customer, regulator, investor, patient, lawyer;
- register/tone controls;
- explicit locked-fact input;
- independent preservation audit for numbers, negation, uncertainty, named anchors, and locked facts;
- word-level transformation visualization;
- source/output comparison;
- browser-local multilingual progressive enhancement using the Translator API when available;
- no server transmission required for the working prototype.

Important limitation: anchor preservation is not semantic-equivalence proof. Translation is not cultural-equivalence proof. Consequential legal/scientific/clinical/regulatory/multilingual communication requires competent human review.

## B-Web — Same Truth, Different Doors
Public proposition: different people may need different language; the factual anchors do not get permission to drift.

Implemented:
- passive auto-play story;
- pause/play;
- selectable audience doors;
- door-opening spatial transition;
- audience-specific expression;
- fixed factual anchors;
- explicit changed / did-not-change readout;
- responsive layout;
- reduced-motion handling.

## B-LinkedIn — 4:5 silent-first MP4
Format: 720×900, 24 fps, ~14 seconds in current prototype.

Storyboard:
1. ONE TRUE THING / different people need to understand it.
2. Fixed factual-core sentence appears.
3. TEENAGER / PUBLIC / REGULATOR / LAWYER doors appear and cycle.
4. Audience versions appear one at a time.
5. WHAT CHANGED: language, emphasis, detail.
6. WHAT DID NOT: factual anchors.
7. End frame: CHANGE THE LANGUAGE. NOT THE TRUTH.

The film is not a screen recording of B-Web; it choreographs the same mechanism for passive feed viewing.

## Technology-ceiling review
Current v0.1 intentionally separates adaptation from verification. The deterministic/local layer keeps the product usable without model credentials and provides an independent checker that future generative systems cannot grade themselves with.

Next ceiling candidates before v1 release:
- structured claim decomposition into proposition / scope / conditions / uncertainty / evidence / prohibited shifts;
- stronger semantic entailment and contradiction evaluation via an independently selected model/evaluation layer;
- model-based constrained rewriting behind the existing anchor contract;
- richer multilingual semantic-drift checks across language pairs;
- cultural-context profiles with explicit human-review boundaries;
- exportable transformation provenance manifest;
- saved comparison cards / shareable result state;
- accessibility audit of B-Web interactions at touch, keyboard, screen reader, and reduced-motion states.

## Release gate
Do not label Build 002 final v1 until the technological-ceiling candidates have been evaluated and the strongest warranted feasible architecture has either been implemented or explicitly rejected with rationale.