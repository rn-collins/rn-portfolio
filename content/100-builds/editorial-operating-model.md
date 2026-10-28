# The 100 — unforced editorial operating model

## Executive decision

The 100 is a **source system**, not a 100-post queue. A build may produce zero, one, or several public pieces. No build is owed a post, carousel, video, case study, or release merely because it has a number.

The operating rule is:

> Publish when a distinct audience need, an inspectable RN proposition, sufficient evidence, and a format that earns its cost coincide. Otherwise merge, support, hold, or archive.

The existing `data/releases.json` remains the final build-level public switch. It should not be the planning database. It currently records 100 builds, 100 held, 0 released. That is accurate: no build has a verified release date or published-post URL. The new editorial ledger should sit upstream and create release records only after a piece passes all gates.

## Reconciled portfolio hierarchy

| Tier | Builds | Default editorial treatment | Standalone presumption |
|---|---:|---|---|
| Launch pilots | 2: 001, 030 | Complete product/case-study validation first | Possible, not approved yet |
| Method anchors | 2: 012, 014 | Embed into 001's authority/consequence analysis | No |
| Other public candidates | 15 | Compete through evidence or editorial labs | No |
| Support or merge | 53 | Supply atoms and modules to parent stories | No |
| Explicit cuts | 10 of the 53 | Merge into named destinations | Explicitly no |
| Other supporting | 21 | Retain as methods, examples, or future candidates | No |
| Archive concepts | 7 | Preserve as synthetic thought experiments | No, unless new field evidence changes status |

This accounts for all 100 without deleting work or manufacturing 100 releases.

## The editorial unit: content atoms

A build is a container. An atom is the smallest truthful, reusable unit that may feed a piece.

| Atom | What it contains | Evidence floor |
|---|---|---|
| Question | The exact uncertainty the build tests | Clear scope |
| Observation | A real pattern, tension, or problem | Source or clearly labeled RN observation |
| System map | Actors, authority, inputs, rules, handoffs, outputs | Inspectable implementation or sourced workflow |
| Decision rule | A deterministic rule or explicit heuristic | Code/spec and heuristic label |
| Demonstration | Observable prototype behavior | Reproducible path/test |
| Failure mode | How the mechanism can fail or mislead | Counterexample, test, source, or bounded analysis |
| Boundary | What is synthetic, missing, prohibited, or unproven | Explicit claim classification |
| Evidence | Primary source or exact material support | Locator, date, scope |
| Counterevidence | Material that narrows or challenges the proposition | Exact source or observed contradiction |
| Revision | What changed and why | Diff, decision record, or before/after artifact |
| User finding | What a person did, understood, or misunderstood | Observed session; never invented |
| Field finding | What happened in a real context | Rights-cleared field evidence |
| Reusable method | A process another person can repeat | Steps, inputs, limits, expected output |
| Visual proof | A diagram, interface state, source image, or result that carries meaning | Rights and claim-to-visual fit |
| Receipt | Test, deployment, checksum, or release evidence | Verifiable record; never used as proof of usefulness |

A piece should normally combine at least three atom types. A receipt alone is not a story. A question plus unsupported opinion is not a case study.

## Piece archetypes

Formats follow the audience job; they do not create the job.

| Archetype | Audience job | Natural source atoms | Typical formats |
|---|---|---|---|
| Flagship case study | Understand the problem, intervention, proof, and limits | Question, system, demonstration, evidence, failures, user findings | Long-form page, tool demo, LinkedIn document, talk |
| Working-tool release | Perform a bounded task | System, decision rule, demo, boundary, reconstruction | Interactive page, short demo, operator guide |
| Method explainer | Reuse RN's way of thinking | Question, system map, reusable method, example, boundary | Essay, diagram, narrated walkthrough |
| Evidence note | Understand what a source changes | Evidence, counterevidence, revision, boundary | Short post, annotated source, newsletter note |
| Failure teardown | See why a plausible system fails | Failure mode, system map, counterexample, repair | Carousel/document, article, video walkthrough |
| Build diary | Follow a consequential design decision | Revision, rejected approach, receipt, boundary | Field note, post, changelog story |
| Comparison | Choose between architectures or interpretations | Two or more system maps, evidence, tradeoffs | Table, interactive comparison, essay |
| Reconstruction tutorial | Rebuild the capability | Method, materials, steps, tests, limits | Tutorial, workshop, repository guide |
| Series synthesis | Understand a pattern across builds | Atoms from multiple builds | Essay, visual atlas, talk, phase retrospective |
| Supporting insert | Strengthen another story without a standalone episode | One or two high-value atoms | Section, sidebar, diagram, example, source note |

## Zero, one, or many pieces

### Zero pieces

The default when the build is duplicative, generic, synthetic without a useful thought experiment, unsupported, rights-blocked, or unable to perform a clear audience job. Preserve its code and record. It may still feed a parent later.

### One piece

Use when the build has one distinct public proposition and its evidence, demonstration, and limitations belong together. Splitting would repeat the same thesis.

### Multiple pieces

Allowed only when each piece has a different audience job or materially different evidence. For example, a flagship may support:

1. a tool release for operators;
2. a method explainer for designers;
3. a source/counterevidence note for governance professionals;
4. a retrospective after observed-user findings.

Changing format or platform is distribution, not a new piece. A LinkedIn document, newsletter excerpt, and short video that carry the same thesis are derivatives of one canonical piece and share one piece ID.

## The eight hard qualification gates

A candidate must pass all eight before production begins.

1. **Distinct question** — Can the question be stated precisely, and is it meaningfully different from existing pieces?
2. **Audience job** — Who needs this, and what can they understand, decide, test, or do afterward?
3. **RN proposition** — Does it reveal a distinctive RN method, observation, synthesis, or design decision rather than a generic topic?
4. **Technical truth** — Does the proposed language match what the code/artifact actually does?
5. **Evidence sufficiency** — Are every material factual and outcome claim supported at the level asserted?
6. **Boundary integrity** — Are synthetic inputs, heuristics, missing validation, prohibited claims, and counterevidence visible?
7. **Non-duplication** — Does this earn a separate piece instead of becoming a section or derivative of another?
8. **Format fitness** — Does the proposed format make the idea clearer or more usable, and are rights/accessibility requirements feasible?

If a gate fails, do not average it away with a score.

## Evidence ladder and permitted language

| Level | Evidence state | Permitted claim |
|---|---|---|
| E0 | Idea only | “A question/concept RN is exploring” |
| E1 | Synthetic prototype | “The prototype demonstrates this declared behavior on a synthetic fixture” |
| E2 | Code/test verified | “The implementation deterministically does X under tested conditions” |
| E3 | Primary-source grounded | “The design translates/synthesizes these exact sources within this scope” |
| E4 | Observed user evidence | “In these bounded sessions, participants did/understood/misunderstood X” |
| E5 | Field/operational evidence | “In this named real context, this bounded result occurred” |
| E6 | Outcome evidence | “Under the stated method and limitations, the intervention changed Y” |

No piece may use language from a higher level than its evidence. Most current builds are E1–E3. The two pilots need E4 before flagship release. None of the audit establishes E5–E6 broadly.

Every material claim should have:

- `claimId`
- claim text
- claim class: observed / source-derived / RN synthesis / heuristic / aspiration
- evidence level
- source or artifact locator
- scope limit
- counterevidence or uncertainty
- review date

## Decision rules when a gate fails

| Failure | Default action |
|---|---|
| Same thesis as another build | Merge into the stronger parent |
| Useful mechanism, weak headline | Supporting module |
| Topic is compelling, evidence incomplete | Evidence sprint; no production |
| Strong explanation, no real example | Editorial lab using one rights-cleared case |
| Synthetic concept with no current audience job | Archive |
| Rights unclear | Block until cleared or replace the asset/source |
| Technical capability overstated | Rewrite to observable behavior or stop |
| No distinct RN proposition | Do not publish standalone |
| Format adds no comprehension | Use the canonical piece only; no derivative |
| Human finding required but absent | Mark “not observed”; keep gate open |
| New evidence materially changes status | Requalify; prior classification is not permanent |

## Prioritization after the hard gates

Only qualified opportunities are ranked. Use five 0–2 signals, not a fake universal quality score:

- **Portfolio signal** — shows a capability or RN method not already visible;
- **Audience pull** — solves a recognizable problem for a named audience;
- **Evidence readiness** — required proof is already available and current;
- **Strategic timing** — connects to RN's real current work, field reporting, law/AI/design conversations, or a genuine external moment;
- **Production leverage** — canonical work can generate useful derivatives without distortion.

Use production burden and claim/rights risk as tie-breakers. A lower-effort piece does not outrank a necessary flagship validation step, and timeliness never overrides truth.

## Editorial states

`discovered → qualified → developing → evidence-review → creative-review → approved → scheduled → released → monitored`

Exit states:

- `merged` — atoms move to a named parent;
- `supporting` — available for inserts, not standalone;
- `blocked` — named missing evidence, rights, validation, or dependency;
- `archived` — preserved with reason;
- `retired` — superseded or no longer truthful.

No status called “complete” should exist before `released`, and released means a verified canonical URL plus any platform URLs.

## Cadence without quotas

Use evidence-triggered publishing rather than “one build per week.”

- **Flagships:** release only after product, evidence, observed-user, accessibility, and creative gates pass.
- **Methods and evidence notes:** publish when a new source, test, field observation, or design decision creates a useful delta.
- **Series syntheses:** publish after enough modules reveal a pattern; no fixed number of builds is required.
- **Derivatives:** produce after the canonical piece is approved, only for platforms where the format changes comprehension or reach.
- **Retrospectives:** publish after real use or meaningful revision, not on a calendar.

A quiet week is an acceptable editorial outcome.

## Proposed source-of-truth data model

Keep `data/releases.json` as the final build-page gate for compatibility. Add a content layer upstream.

### 1. `data/content/atoms.json`

```json
{
  "atomId": "atom-001-authority-stop",
  "sourceType": "build",
  "sourceRefs": ["001", "014"],
  "type": "system-map",
  "title": "A reviewer without stopping power is not a control",
  "summary": "...",
  "evidenceLevel": "E3",
  "claimIds": ["claim-001-07"],
  "artifactLocators": ["packages/forms/src/index.tsx"],
  "rightsState": "owned",
  "status": "available",
  "updatedAt": "YYYY-MM-DD"
}
```

### 2. `data/content/opportunities.json`

```json
{
  "opportunityId": "opp-human-presence-vs-control",
  "sourceType": "cluster",
  "sourceRefs": ["001", "012", "014", "019", "032", "038", "039", "040"],
  "workingThesis": "Human presence is not the same as intervention authority.",
  "audience": ["AI product teams", "legal and governance teams"],
  "audienceJob": "Inspect whether review can alter a consequential outcome.",
  "treatment": "flagship-case-study",
  "parentOpportunityId": null,
  "atomIds": ["atom-001-authority-stop"],
  "qualificationGates": {
    "distinctQuestion": "pass",
    "audienceJob": "pass",
    "rnProposition": "pass",
    "technicalTruth": "pass",
    "evidence": "pass",
    "boundaries": "pass",
    "nonDuplication": "pass",
    "formatFitness": "pass"
  },
  "blockers": ["Observed first-time-user testing"],
  "status": "blocked",
  "decisionReason": "Flagship proposition is strong; E4 evidence remains open."
}
```

### 3. `data/content/pieces.json`

```json
{
  "pieceId": "piece-001-human-review-case",
  "opportunityId": "opp-human-presence-vs-control",
  "canonicalTitle": "When is a human actually a control?",
  "canonicalFormat": "interactive-case-study",
  "derivatives": [
    {"platform": "linkedin", "format": "document", "status": "not-started"},
    {"platform": "newsletter", "format": "excerpt", "status": "not-started"}
  ],
  "claimIds": ["claim-001-07"],
  "sourceRefs": ["001", "012", "014", "019", "032", "038", "039", "040"],
  "status": "blocked",
  "releaseRequirements": ["E4 comprehension evidence", "accessibility review"],
  "canonicalUrl": "",
  "scheduledAt": "",
  "releasedAt": "",
  "platformUrls": [],
  "provenance": {"createdBy": "", "createdAt": "", "updatedAt": ""}
}
```

### 4. `data/content/series.json`

```json
{
  "seriesId": "series-inspectable-systems",
  "title": "Make the Invisible Decision System Inspectable",
  "promise": "Show how evidence, authority and consequence move through systems.",
  "opportunityIds": ["opp-human-presence-vs-control"],
  "orderingRule": "editorial-arc",
  "status": "developing"
}
```

### 5. `data/content/claims.json`

Claim-level evidence ledger using the fields specified above.

## Relationship to `data/releases.json`

Do not automatically unhold a build when an opportunity is approved.

A build record changes from held to released only when:

1. at least one canonical piece using that build is `approved`;
2. the build's public overview, A/B routes, long-form record, archive, claims, and links are truthful for public view;
3. the canonical piece and build page are scheduled together or already live;
4. `releasedAt`, `postUrls`, `longFormUrl`, and `sourcePageUrl` contain verified values;
5. final build/export verification passes.

Supporting and merged builds may remain held as standalone routes while their credited atoms appear inside a released parent case. Their contribution should be named in the parent record.

## Immediate population decisions

1. Create two blocked flagship opportunities for 001 and 030; record the exact human-validation blockers rather than producing slides.
2. Create method atoms from 012 and 014 and attach them to the 001 opportunity.
3. Create opportunity shells for the remaining 15 candidates, retaining their evidence-sprint or editorial-lab blocker.
4. Convert all 53 support/merge builds into atoms attached to named parent opportunities; no standalone pieces.
5. Mark the 10 explicit cuts `merged` with their existing destinations.
6. Mark 7 archive concepts `archived` unless new field evidence exists.
7. Preserve the other 21 as `supporting` until a distinct opportunity passes all eight gates.
8. Keep all 100 build release records held until an actual canonical piece is approved and scheduled.

## Governance checks

- Every public derivative points to one canonical piece ID.
- Every piece points to its opportunity, claims, atoms, and source builds.
- Every material claim has an evidence level and scope limit.
- Every merge has a named destination; no orphaned work.
- Every block has a specific condition for reopening.
- Every release has a verified date and URL.
- Every change preserves the history; no silent reclassification.
- No dashboard metric equates file count, route count, tests, HTTP 200, or posts published with audience value or real-world effectiveness.

