# Build 002 — Release Record

Status: RELEASE CANDIDATE / technical ceiling pass complete; human visual acceptance still required

## A — Multi-Audience Meaning Architecture
Public job: explain one defensible idea to different audiences without moving the underlying factual core.

Implemented:
- source-claim input;
- audience profiles: general public, teenager, customer, regulator, investor, patient, lawyer;
- register/tone controls;
- explicit locked-fact input;
- claim decomposition into proposition-level records with number, negation, uncertainty, named-entity and content-term anchors;
- deterministic independent preservation audit for numbers, negation, uncertainty, named anchors, locked facts, concept-term coverage and uncontrolled expansion;
- explicit low / review / high drift-risk state;
- word-level transformation visualization;
- source/output comparison;
- optional browser-local generative adaptation through Chrome LanguageModel when available;
- generator and verifier remain separate: the generative system does not grade itself;
- browser-local multilingual progressive enhancement through Chrome Translator when available;
- shareable URL state without an account;
- exportable JSON record containing source, audience, locks, claim graph, output, audit, translation and provenance events;
- no application server transmission required for the working A-side.

Important limitation: automated anchor/coverage checks are not proof of semantic equivalence. Translation is not proof of cultural equivalence. Consequential legal/scientific/clinical/regulatory/multilingual communication requires competent human review.

## B-Web — Same Truth, Different Doors
Public proposition: different people may need different language; the factual anchors do not get permission to drift.

Implemented:
- passive auto-play story for users without reduced-motion preference;
- pause/play;
- selectable audience doors;
- native button interaction for touch/keyboard;
- aria-pressed audience state and live-region output;
- reduced-motion preference disables autoplay and spatial transitions;
- strong focus-visible treatment;
- door-opening spatial transition;
- audience-specific expression;
- fixed factual anchors;
- explicit changed / did-not-change readout;
- responsive safe-zone layout down through narrow mobile widths;
- overflow wrapping and min-width constraints to reduce copy collisions.

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

## Technology-ceiling decisions
### Implemented now
- structured claim decomposition;
- deterministic drift/anchor evaluation independent of the generator;
- browser-managed local model-based constrained rewriting when Chrome supports LanguageModel;
- browser-managed local translation when Chrome supports Translator;
- transformation provenance;
- shareable state and portable JSON records;
- B-Web keyboard/touch/reduced-motion semantics and collision-oriented responsive constraints.

### Evaluated and deferred with rationale
**Separate browser NLI / entailment model via Transformers.js + WebGPU/WASM.** This is technically feasible and remains a strong future capability. It is not being loaded from an unpinned third-party CDN in Build 002 merely to inflate technical complexity. A trustworthy implementation needs a pinned/versioned evaluator model, model-card/evaluation record, controlled caching/download behavior, clear payload/latency UX, and repository/dependency support. When that evaluator infrastructure exists, 002 should inherit it.

**Full cultural-equivalence scoring.** Rejected as a misleading product claim. Culture is not a scalar automated equivalence test. The product can preserve facts, expose transformations and support human review; it should not pretend to certify cultural equivalence.

## Remaining acceptance checks
- human visual inspection at representative desktop and mobile widths;
- manual keyboard walkthrough in a browser;
- screen-reader spot check;
- test Chrome local LanguageModel/Translator paths on hardware that supports the required browser-managed models;
- inspect LinkedIn MP4 at actual feed size for reading pace and collision safety.

## Release gate
The code has passed compilation on the Vercel preview branch. Build 002 may be marked final v1 after the remaining human/device acceptance checks above. Future independent semantic-evaluator infrastructure should be inherited when it becomes available; its absence does not justify substituting a less-governed CDN/runtime dependency now.