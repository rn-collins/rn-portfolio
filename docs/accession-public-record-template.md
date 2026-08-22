# Public Accession Record — Canonical Template

Status: REQUIRED FOR EVERY PUBLIC BUILD

## Purpose
Every accession must work for three public audiences without exposing raw internal production notes:
1. person who wants to use the thing;
2. person who wants to understand the idea;
3. person who wants to learn from how it was made.

The internal team has a fourth audience — itself — served by the private Lab Record in /docs, tests, issues and release tooling.

## Public route anatomy

### 1. VIEW — orientation / wall label
Must answer in plain language:
- What is this?
- Who might care?
- What problem does it address?
- What can I do here?
- What is its status?

Do not require prior knowledge of the series, RN, or the domain.

### 2. USE — A / functional system
The primary product experience. Default path must be understandable across education and technical-literacy ranges. Expert depth is progressively disclosed.

Required qualities:
- immediate first value;
- no unnecessary account/setup;
- concrete examples before abstraction;
- actionable output;
- accessibility and mobile support;
- save/copy/export/revisit path where appropriate;
- clear limitations and uncertainty;
- no internal build instructions in the user path.

### 3. WATCH / EXPLORE — B / visual build
The bespoke visual communication artifact. It should reveal the tension/question that made A necessary, not merely advertise A.

Required qualities:
- silent comprehension;
- motion/interaction carries meaning;
- intentional pacing;
- intellectual souvenir worth saving when appropriate;
- LinkedIn-native derivative defined;
- accessible alternative/reduced motion strategy.

### 4. WHY — proposition + research question
Public intellectual context:
- what RN noticed;
- why existing approaches felt insufficient;
- what question the build is testing;
- who could be affected.

### 5. MAKING — Behind the Build
Translate development history into public learning.

Show:
- meaningful versions;
- what failed;
- what changed;
- why it changed;
- user/comprehension discoveries;
- technical decisions only when they teach something useful.

Never dump internal acceptance checklists or raw backlog here.

### 6. METHOD — Use this in your own work
Extract portable principles from the build.

Each lesson should be useful even to someone who never uses A.
Examples: layered comprehension, evidence-to-interface translation, complexity budgeting, local-first privacy, progressive disclosure, provenance design.

### 7. EVIDENCE — basis + limitations
Show enough evidence architecture to let a skeptical visitor understand:
- what sources or data informed the system;
- what claims the system is and is not making;
- important assumptions;
- limitations;
- jurisdiction/time sensitivity when relevant;
- validation status.

### 8. LINEAGE — inherited + created infrastructure
Show real implementation lineage only.
- inherited primitives/modules/data schemas;
- new infrastructure created by this accession;
- later builds that actually import/use it.
No conceptual lineage may be represented as code lineage.

### 9. VERSIONS — change over time
For mature builds, expose major public versions and why they changed. This is not a raw git log.

### 10. PRACTICE — contextual conversion
Only after value has been delivered. Ask whether the visitor is facing a related system problem and route them to the relevant practice/contact surface. No generic sales banner inside the core product flow.

## Internal Lab Record — NOT a public route by default
Contains:
- acceptance gates;
- architecture decisions;
- exact QA fixtures;
- unresolved bugs;
- analytics hypotheses;
- production/export instructions;
- commercial hypotheses;
- backlog;
- deployment information;
- private research notes;
- release checklist.

Material may move from Lab Record to MAKING/METHOD only after it is rewritten for external usefulness.

## Education-range rule
Primary experience should work for a motivated early-secondary reader without sounding childish to a domain expert. Test conceptually across:
- early-secondary / roughly middle-school comprehension;
- high school;
- general adult;
- college-educated non-specialist;
- domain professional;
- expert/technical user.

One product, layered comprehension — never six separate patronizing versions.

## Governing product rule
**Maximum warranted technical sophistication behind the interface. Minimum necessary cognitive burden in front of it.**
