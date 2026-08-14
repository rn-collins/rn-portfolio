# RN Builds × LinkedIn Visual Builds
## 100-Build Execution Feasibility & Architecture Audit

**Status:** controlling pre-execution technical audit  
**Scope:** canonical 100-cycle syllabus; A functional builds + B LinkedIn visual builds  
**Repository:** `rn-collins/rn-portfolio`  
**Branch:** `feature/80-builds-exhibition` (legacy branch name; current program is 100 Builds)

## Executive determination

The 100-cycle program is technically conceivable and executable, but **not safely on the current static-file architecture**. The existing portfolio can remain the public shell during migration, but the 100-cycle program needs a shared application platform before Build 002 is treated as a production build.

The critical distinction is:

- **Numbered build:** a public intellectual/product artifact in the 100-cycle syllabus.
- **RN Lab Infrastructure:** unnumbered engineering machinery required to build, test, deploy, observe, and reuse the numbered artifacts.

Testing, CI, deployment, code conventions, component reuse, preview environments, telemetry plumbing, and the shared registry must exist operationally before their later numbered builds productize those capabilities. This is not a contradiction in the syllabus: Build 032 can still be the public **Automated Testing & Evaluation Harness** even though the lab already uses tests internally.

## Roles actually applied in this audit

1. Principal software architect — platform boundaries, reuse model, runtime strategy.
2. Senior full-stack engineer — feasibility of user flows, APIs, persistence, deployment.
3. Data architect — schemas, provenance, search, identity, longitudinal records.
4. AI/agent systems architect — model calls, tool use, evaluation, memory, orchestration.
5. Product architect — MVP boundaries, user value, build-vs-feature decisions.
6. Technical program manager — dependency sequencing, gates, risk, execution cadence.
7. DevOps/SRE architect — CI/CD, preview deployments, observability, rollback, cost.
8. Security/privacy architect — auth, permissions, secrets, consent, audit, data minimization.
9. QA/accessibility engineer — functional, regression, accessibility, visual and mobile QA.
10. UX/information architect — exhibition, detail-page grammar, interaction consistency.
11. Visual/motion creative director — B-artifact system and capture/export requirements.
12. Portfolio/exhibition curator — lineage, provenance, narrative of increasing capability.

## Current repository finding

The repository is presently a static HTML/CSS/JS portfolio with the 100-build prototype layered on top. There is no package manifest currently discoverable in the repository, so there is no real workspace/package system, dependency management, test runner, typed registry, component library, or build graph yet.

That is acceptable for the prototype. It is not acceptable for 100 increasingly stateful, data-heavy, authenticated, AI-assisted, and agentic artifacts.

## Platform decision

### Adopt a single monorepo, not 100 independent repositories and not 100 Vercel projects.

Recommended target:

```text
rn-portfolio/
  apps/
    web/                       # RN Builds portfolio + 100 Builds exhibition
    worker/                    # optional later durable/background execution surface
  packages/
    registry/                  # canonical build metadata, lineage, statuses
    ui/                        # RN design system
    forms/                     # form schema + conditional rendering
    results/                   # reusable result/report rendering
    data-model/                # common schema utilities
    provenance/                # source/claim/evidence primitives
    workflow/                  # states, transitions, approvals, handoffs
    authz/                     # permission abstractions when introduced
    search/                    # retrieval interfaces when introduced
    evaluation/                # shared test/eval interfaces
    agents/                    # model/tool/memory abstractions when introduced
    visual-builds/             # B-build motion/reveal primitives
    builds/
      001-human-review/
      002-multi-audience/
      ...
      100-island-resilience/
  data/
    demo/
    fixtures/
  docs/
    specs/
    adr/
    audits/
  tests/
    e2e/
    accessibility/
    visual/
```

### Tooling baseline

- **Package/workspace:** `pnpm` workspaces.
- **Build orchestration:** Turborepo.
- **Web runtime:** Next.js App Router on Vercel.
- **Language:** TypeScript with strict mode for new platform code.
- **UI:** shared React component system; preserve the current RN visual identity rather than adopting a generic component aesthetic.
- **E2E + browser QA:** Playwright.
- **Visual regression:** Playwright screenshots for stable views.
- **Accessibility regression:** semantic assertions/ARIA snapshots plus manual review where automated tests cannot establish quality.
- **Structured persistence when needed:** Postgres through a Vercel Marketplace provider; do not provision merely to satisfy early static builds.
- **Large media:** Vercel Blob only when build assets exceed repository-sensible size or uploads are required.
- **AI builds:** provider-agnostic model interface using Vercel AI SDK/AI Gateway only when a build actually requires generative or embedding capability.
- **Observability:** Vercel preview/production observability + Web Analytics/Speed Insights selectively; keep instrumentation privacy-conscious and cost-aware.

## Why one web app first

All 100 public artifacts should initially resolve beneath the RN Builds domain and inherit one navigation, one accessibility baseline, one design system, one registry, one analytics convention, one test harness, and one lineage graph.

Canonical public routes:

```text
/100-builds
/100-builds/001
/100-builds/001/a
/100-builds/001/b
...
/100-builds/100/a
/100-builds/100/b
```

A numbered build becomes a separate deployable application only when its runtime or isolation requirements genuinely demand it. Separate deployment is an engineering decision, not a portfolio convention.

## RN Lab Infrastructure — required before Build 002 production

These are mandatory but **unnumbered**:

1. Monorepo/workspace scaffold.
2. Next.js exhibition app and migration layer for the current portfolio.
3. Typed canonical 100-build registry.
4. Shared build-page shell.
5. Shared A/B artifact metadata contract.
6. Shared form primitives migrated from 001-A.
7. Shared results renderer migrated from 001-A.
8. Shared visual-reveal primitives migrated from 001-B.
9. Playwright smoke suite covering home → exhibition → 001 detail → 001-A → 001-B.
10. Mobile viewport tests.
11. Accessibility baseline.
12. CI checks on pull requests.
13. Preview-deployment gate.
14. Error boundary / not-found behavior.
15. Minimal event vocabulary (`build_opened`, `functional_started`, `functional_completed`, `visual_started`, `visual_completed`) with no sensitive payloads.
16. Architecture Decision Record (ADR) template.
17. Per-build SPEC template and completion checklist.
18. Dependency-lineage validator: later builds may reference only registered earlier infrastructure unless the dependency is explicitly classed as RN Lab Infrastructure.

## Execution gates for every numbered cycle

A cycle does not become `Live` until all gates pass:

1. **Spec gate** — user, problem, inputs, logic, outputs, limits, demo data, lineage.
2. **Dependency gate** — inherited components exist and have passing tests.
3. **MVP gate** — A does the promised job; no fake buttons or decorative-only output.
4. **Evidence gate** — claims and domain assumptions are sourced or clearly framed as design choices.
5. **Security/privacy gate** — no unnecessary sensitive data; secrets server-side; threat surface reviewed proportionately.
6. **Accessibility gate** — keyboard, semantics, labels, contrast, focus, mobile readability.
7. **Test gate** — relevant unit/integration/E2E cases pass.
8. **Visual gate** — B is a real designed artifact tied to A, not a stock template.
9. **Capture gate** — screenshots/video/demo state reproducible for the LinkedIn launch.
10. **Preview QA gate** — desktop + mobile preview manually inspected.
11. **Lineage gate** — `uses` and `creates` reflect actual code/data reuse.
12. **Release gate** — merge, production deployment, public page, launch copy.

## Feasibility tiers

- **T1 — deterministic/client-heavy:** framework, mapper, calculator, rubric, visualization. Mostly browser logic. Low infrastructure risk.
- **T2 — persisted application:** database-backed records, history, exports, account-scoped state.
- **T3 — integrated intelligence:** external APIs, search, provenance, data pipelines, comparative datasets.
- **T4 — AI/agentic:** model calls, tools, evaluations, memory, escalation, cost controls.
- **T5 — integrated/longitudinal platform:** multiple T2–T4 subsystems, permissions, durable history, reliability, governance, complex domain data.

## 100-build feasibility map

Legend: `C` client/deterministic; `P` persistence; `I` integrations/search/data; `AI` model/agent; `L` longitudinal/integrated. The runtime column describes the credible MVP, not the eventual maximum product.

| # | Functional build | Tier | Credible MVP/runtime | Critical inherited capability / principal risk |
|---:|---|:---:|---|---|
| 001 | Human Review Design Framework | T1 | C | form + conditional rules; already prototyped |
| 002 | Multi-Audience Messaging Architecture | T1 | C first; optional AI later | claim-preservation rules must be deterministic before generation |
| 003 | Unserved Decision Discovery Framework | T1 | C | scoring rubric; avoid pretending score proves market demand |
| 004 | Manual Intelligence Engine Method | T1 | C | structured collection/verification workflow |
| 005 | Service-to-Software Discovery Engine | T1 | C | decomposition taxonomy |
| 006 | Tracker-to-Company Productization Framework | T1 | C | buyer/value/moat scoring; clearly heuristic |
| 007 | Feedback Loop Product Architecture | T1 | C | event schema and loop design |
| 008 | Decision-Ready Dashboard Standard | T1 | C | dashboard rubric + action states |
| 009 | Aloha AI Design Principles Framework | T1 | C | shared design-review system; becomes lab governance |
| 010 | Canonical Data Model & Schema Designer | T1→T2 | C schema builder; export JSON | typed schema primitives |
| 011 | Entity Resolution & Relationship Registry | T2 | P | entity IDs, match confidence, merge/review |
| 012 | Risk-Tiered AI Architecture Framework | T1 | C | consequence/risk taxonomy; legal claims require jurisdictional caution |
| 013 | AI Workflow Risk Classifier | T1 | C | 012 scoring + workflow representation |
| 014 | Legal Judgment Architecture System | T1 | C | legal-task taxonomy; attorney-only boundary must be explicit |
| 015 | Repeated Legal Task → Product Engine | T1 | C | 005 + 014; must not imply unauthorized legal service |
| 016 | Legal Workflow Mapping System | T1→T2 | C/P optional | graph model + handoffs |
| 017 | Regulated-Market Handoff Mapper | T1→T2 | C/P optional | 016 generalized across organizations |
| 018 | Workflow State Machine | T2 | C engine + persisted demo | formal transitions and validation |
| 019 | Notification, Alerting & Escalation System | T2 | P + mocked delivery first | event routing; real outbound channels only after safe integration |
| 020 | Audit Log & Evidence Trail | T2 | P | append-only event semantics; do not market cryptographic immutability unless implemented |
| 021 | Identity & Authentication Layer | T2 | P/auth provider | real auth, recovery, session handling; major security gate |
| 022 | Role-Based Access & Permission System | T2 | P | 021 + authorization matrix; server-side enforcement |
| 023 | Consent & Data Rights Manager | T2 | P | auditable consent/version/withdrawal; legal framing jurisdiction-sensitive |
| 024 | Privacy & Data Minimization Engine | T1→T2 | C policy engine + optional P | data classification; avoid universal legal conclusions |
| 025 | Data Ingestion & Connector Framework | T3 | I/P | connector contract, retries, observability |
| 026 | Data Normalization & Deduplication Pipeline | T3 | I/P | 010 + 011 + 025; transformation provenance |
| 027 | API Gateway & Integration Layer | T3 | server routes | auth, rate limits, versions; real secret management |
| 028 | Search, Retrieval & Relevance Engine | T3 | P/I | lexical/faceted first, semantic later; evaluation set required |
| 029 | Versioning & Change History System | T2 | P | immutable versions/diffs/impact links |
| 030 | Accessibility, Localization & Inclusive Interaction System | T2 | web + test harness | must demonstrate real accessibility modes, not checklist theater |
| 031 | Product Analytics & Telemetry Layer | T2 | analytics | privacy-minimized events; no sensitive free-text telemetry |
| 032 | Automated Testing & Evaluation Harness | T2→T3 | CI + browser/data tests | productizes lab test system |
| 033 | Security & Threat Modeling System | T1→T2 | C/P | structured assets/threats/controls; not a vulnerability scanner unless built |
| 034 | Deployment, Reliability & Observability System | T3 | CI/CD + monitoring | productizes existing lab deployment/monitoring practice |
| 035 | Interoperability, Export & Data Portability Layer | T2→T3 | P + import/export | schemas, round-trip tests, user ownership |
| 036 | Offline & Local-First Resilience Layer | T3 | browser cache/sync demo | conflict resolution and degraded-mode semantics |
| 037 | Human Feedback & Continuous Improvement Loop | T2 | P | feedback triage, adjudication, before/after outcome record |
| 038 | Domain-Specific AI Evaluation Framework | T3→T4 | evaluation app | domain rubrics + test sets; expert validity boundary |
| 039 | Agent Evaluation & QA System | T4 | AI + trace evaluation | deterministic trace schema, replayable tests, cost metrics |
| 040 | AI Exception & Escalation Engine | T4 | AI + rules | uncertainty/tool-failure detection; safe stop + human handoff |
| 041 | Business AI Org Chart Generator | T2 | C/P | actor/responsibility graph; no claim of actual authority without user input |
| 042 | AI Agent Job Design System | T2→T4 | C; optional AI helper | bounded role/tool/authority spec |
| 043 | Multi-Agent Organization Designer | T4 | C designer + agent simulation | 042 + handoff contracts; avoid premature production autonomy |
| 044 | Regulated Systems Library | T3 | package/catalog app | reuses 014–040 patterns; versioned components |
| 045 | Cannabis Patient Journey Mapper | T2 | C/P | domain research; no medical advice or prescriptive product recommendation |
| 046 | Island Systems Dependency Mapper | T2→T3 | graph + demo dataset | data provenance and uncertainty |
| 047 | Hawaiʻi Localization / Implementation Framework | T2 | C/P | Hawaiʻi-specific evidence; cultural/legal humility |
| 048 | Governance Experience Assessment Tool | T2 | P optional | assessment validity; distinguish lived-experience measure from clinical measure |
| 049 | Personal & Cannabis Sensory Profile Engine | T2 | P | sensitive preference/health-adjacent data minimization and consent |
| 050 | Neuroaesthetic Evidence & Decision-Support System | T3 | P/search | evidence grading; avoid unsupported neuroscience determinism |
| 051 | Adaptive Cannabis Education System | T3 | rules + content | audience/jurisdiction paths; evidence and safety review |
| 052 | Beyond-Strain Cannabis Personalization Engine | T3 | rules + P | non-prescriptive recommendations; strong safety boundaries |
| 053 | N-of-1 Environmental Experimentation Platform | T2→T3 | P | repeated measures, protocol adherence, avoid clinical inference |
| 054 | Adaptive Environmental Design System | T3 | P/rules | 050 + 053; explainable recommendation rules |
| 055 | Experience-Optimizing Smart Home Layer | T3 | simulated integration first | device safety, manual override; real hardware later optional |
| 056 | Data Moat / Knowledge Moat Mapper | T1→T2 | C | business heuristic; separate evidence from strategic inference |
| 057 | Content Provenance System | T2 | P | lineage, rights, transformations, approvals |
| 058 | Source Provenance Infrastructure | T3 | P/graph | claim-source links, verification states |
| 059 | Legal AI Source Provenance & Verification Layer | T3→T4 | P/search/AI optional | legal authority status; high-stakes accuracy; authoritative sources required |
| 060 | Founder Intellectual Property Capture System | T2 | P | confidential data security; no automatic legal protection claims |
| 061 | Founder Decision Memory System | T2 | P | decision/history/assumptions |
| 062 | Interview Archive & Knowledge Graph | T3 | P/search/graph | consent/rights + entity/claim graph |
| 063 | Living Research Repository | T3 | P/search | provenance/version/update queue |
| 064 | Cannabis Institutional Memory Archive | T3 | P/search | historical/domain sourcing and rights |
| 065 | Psychedelic Care Continuity Record | T5 | P/auth/consent | sensitive health-adjacent information; demo/synthetic data first; real deployment requires major compliance review |
| 066 | Legal Knowledge Graph / Institutional Memory System | T4 | P/search/graph | confidentiality, privilege boundaries, source authority |
| 067 | Personal Knowledge Model & Digital Identity Layer | T4 | P/auth/permissions | consent, ownership, inference boundaries |
| 068 | AI Digital Twin Action Runtime | T4→T5 | AI/tools/P | 067 + approvals + action ledger; tool allowlists and human confirmation |
| 069 | Implementation-Aware Legal Tracker | T3 | P/data | legal change + operational evidence; source freshness |
| 070 | Psychedelic Regulatory Lifecycle Tracker | T3 | P/data | jurisdiction lifecycle + verified updates |
| 071 | Medical Cannabis Access Intelligence Dashboard | T3 | P/data/dashboard | freshness, geography, cost, access definitions |
| 072 | Hawaiʻi Cannabis Access Systems Map | T3 | graph/data | island-specific evidence and representational caution |
| 073 | Psychedelic Access & Equity Index | T3 | data/index | methodology transparency; weighting sensitivity |
| 074 | Access / Implementation Index | T3 | data/index | 069–073; evidence comparability |
| 075 | Regulatory Design Comparison System | T3 | P/data | ontology + jurisdiction comparability |
| 076 | Cross-Jurisdiction Regulatory Intelligence Platform | T5 | P/search/data | recurring ingestion, provenance, freshness, conflict handling |
| 077 | Regulatory Change → Consequence Engine | T4 | data/rules/AI assist | legal change parsing + actor/obligation graph; human verification |
| 078 | Cannabis Evidence Translation Layer | T4 | search/AI/rules | preserve uncertainty; source-quality constraints |
| 079 | Psychedelic Evidence Navigation System | T4 | search/embeddings | evidence hierarchy, applicability filters, retrieval evals |
| 080 | Journalism-to-Infrastructure System | T3→T4 | P/AI assist | extract structured reusable assets with confidentiality/rights controls |
| 081 | Social Listening → Unmet Need Engine | T4 | ingestion/AI | platform terms, privacy, sampling bias, validation beyond chatter |
| 082 | Audience Intelligence Knowledge Graph | T4 | P/graph/AI assist | dynamic evidence, avoid stereotyping/persona essentialism |
| 083 | Work-to-Content Capture Engine | T4 | AI/P | confidentiality filter must fail closed on uncertain material |
| 084 | Benefit-Sharing Intelligence System | T4 | P/graph/data | claims about value/communities require evidence and context |
| 085 | Corporate Capture & Power Structure Monitor | T4 | P/graph/data | defamation-safe sourcing, relationship evidence, inference labels |
| 086 | Idea Incubation Through Content System | T3 | P/analytics | experiment design; separate engagement from validated demand |
| 087 | Creator Content Operating System | T4 | P/workflow/integrations | cross-channel states, assets, approvals |
| 088 | Creator Relationship & Opportunity Intelligence System | T4 | P/graph | relationship privacy and permissions |
| 089 | Founder Intelligence Engine | T5 | P/search/graph/AI | integrates 056–088; sensitive founder data and prioritization explainability |
| 090 | Research Agent Architecture | T4 | AI/tools/search | source policy, verification, citation, evals, escalation |
| 091 | Agent Memory Governance System | T4 | AI/P/authz | retention/scope/forgetting/inference controls |
| 092 | AI Orchestration Layer for Businesses | T5 | AI/tools/workflow | people + agents + approvals + evidence; reliability and cost controls |
| 093 | Regulated Workflow State & Handoff System | T5 | P/workflow/authz | 018/022/044/092; jurisdiction/domain configuration |
| 094 | Regulated Compliance Record & Evidence System | T5 | P/provenance/audit | evidence completeness, retention, authority/version chain |
| 095 | Nervous-System-Aware Governance Observatory | T5 | P/data/index | indicator validity, cultural/clinical overreach risk, transparent methodology |
| 096 | Cannabis Experience Intelligence System | T5 | P/search/graph | longitudinal sensitive data, evidence boundaries, non-prescriptive design |
| 097 | Nervous-System-Aware Personalization Platform | T5 | P/AI/rules/auth | consent, explanation, user control, sensitive inference minimization |
| 098 | Psychedelic Continuity Layer | T5 | P/workflow/consent | high privacy/safety/compliance burden; synthetic/demo first |
| 099 | Island Resilience Data Commons | T5 | P/data/provenance | governance, interoperability, local authority, data licensing |
| 100 | Island Resilience Scenario & Decision Platform | T5 | data/simulation/P | scenario assumptions, uncertainty, accountable comparison; culmination of graph/data/workflow stack |

## Feasibility result by phase

- **001–010:** immediately feasible; mostly deterministic. Excellent platform-bootstrap phase.
- **011–020:** feasible after Postgres-ready data architecture; persistence becomes real.
- **021–030:** feasible but marks the first serious security/privacy boundary. Authentication and authorization must be real, not cosmetic.
- **031–040:** feasible and should turn internal lab disciplines into public products. AI builds begin only after evaluation and exception primitives exist.
- **041–060:** feasible with domain-research gates. Several builds are decision-support products, not scientific/medical/legal authorities.
- **061–080:** feasible but increasingly data-rights, provenance, freshness, confidentiality, and search dependent. Synthetic/demo data may be the correct public MVP for sensitive domains.
- **081–090:** feasible with integrations and AI, but must explicitly address sampling bias, privacy, defamation, confidentiality, and model evaluation.
- **091–100:** feasible as demonstrators and increasingly substantial applications. They should not be represented as production clinical/legal/government infrastructure without the additional organizational, legal, security, procurement, and human-governance work such deployments require.

## Sequencing corrections

The numbered syllabus can remain 001–100. No new numbered gap is currently required **if RN Lab Infrastructure is explicitly allowed to precede its later public productization**.

However, the following operational prerequisites must happen earlier than their numbered public counterparts:

- tests before 032;
- CI/deployment/preview environments before 034;
- minimal telemetry before 031;
- baseline security practices before 033;
- accessibility baseline before 030;
- schema conventions before 010 is complete;
- local demo-data discipline before 025;
- secrets/environment management before any external integration;
- error handling/observability before AI/API builds.

This is the central architecture correction produced by the audit.

## A/B relationship standard

B cannot be a decorative poster generated after A. Every B artifact must satisfy at least one of:

1. animate an actual state transition from A;
2. visualize A's core data/logic;
3. reveal the hidden system A makes explicit;
4. transform a real screenshot or output state from A;
5. make A's before/after mental model visible.

Preferred implementation stack for B across the series:

- semantic HTML/CSS/SVG for early reveals;
- reusable React motion primitives for transitions;
- Canvas/WebGL only when the concept genuinely needs dense simulation or graph motion;
- reproducible capture route/state per B artifact;
- export/capture at LinkedIn-friendly aspect ratios without changing the underlying design meaning.

Each B gets an internal `captureState` so the site can reproduce the exact launch visual rather than depending on manual timing.

## Definition of a real reuse claim

A registry `usesInfrastructure` field is true only when at least one of the following is verifiable:

- imports the earlier shared package/component;
- consumes its schema/type;
- calls its service/API;
- uses its test/evaluation set;
- reads/writes its canonical data model;
- invokes its workflow/rule engine.

Conceptual inspiration alone is `relatedBuilds`, not infrastructure reuse.

## Cost-control strategy

1. Keep 001–020 overwhelmingly deterministic/client-side unless persistence is the lesson.
2. Introduce one shared relational store, not a new database per build.
3. Use synthetic/demo datasets by default for sensitive-domain demonstrations.
4. Do not call an LLM where deterministic rules suffice.
5. Centralize model routing/usage accounting once AI builds begin.
6. Cache safe repeated reads and expensive derived artifacts where appropriate.
7. Avoid deploying each build as a separate Vercel project unless isolation genuinely requires it.
8. Keep visual B artifacts mostly client-rendered so they do not generate server cost merely to animate.

## Security/privacy operating rule

The public series is a demonstration laboratory. Until a build has a specific reason to accept real sensitive information, **do not collect it**. For health-adjacent, legal, personal-knowledge, relationship, psychedelic, cannabis, identity, and founder-confidentiality builds, the public demo should prefer synthetic or local-only sample data. A later production deployment for a real institution/person is a separate security/compliance project.

## Immediate execution plan

### Foundation Sprint F0 — before Build 002

1. Preserve current static production until replacement passes parity.
2. Scaffold `pnpm` + Turborepo + Next.js `apps/web` on a new platform branch based on the current 100-build feature branch.
3. Move canonical registry from untyped global JS into typed source data.
4. Rebuild `/100-builds`, `/100-builds/[id]`, `/100-builds/001/a`, `/100-builds/001/b` in the new app.
5. Extract 001 form/result/visual primitives into packages.
6. Add Playwright smoke, mobile, accessibility-structure, and visual regression tests.
7. Add CI for typecheck/lint/test/build.
8. Configure Vercel preview for `apps/web`; automatically skip unaffected builds when possible.
9. Run parity audit against the current RN Builds home and 100-build prototype.
10. Only after preview QA passes, replace the static prototype branch implementation.

### Foundation Sprint F1 — make Build 001 genuinely canonical

1. Add SPEC for 001.
2. Add unit-level rule tests for review-control gaps.
3. Add E2E happy path and missing-standard/missing-evidence cases.
4. Add keyboard/focus/mobile QA.
5. Add reproducible 001-B capture states.
6. Update registry lineage from claimed to verified reuse package names.
7. Mark 001 `Live` only after production deployment and link verification.

### Then Build 002

002-A should reuse the extracted form/results packages. Its first credible MVP should be deterministic: one core claim plus audience profiles and controlled framing transformations. Generative copy may be added only after the claim-preservation contract can be tested independently. 002-B should be generated from the actual comparison state of 002-A: one core proposition moving through multiple audience doors while an invariant claim layer remains visually fixed.

## Freeze / change-control recommendation

Do not add Builds 101+ merely because a feature was forgotten. During execution, discovered items are classified as:

- feature of an existing numbered build;
- RN Lab Infrastructure;
- required domain research/review;
- replacement of an unlaunched weak build;
- true post-100 capability only if it exceeds Build 100's ceiling.

## Audit conclusion

**GO, with architecture migration before Build 002.**

The 100-build concept is not only conceivable; it becomes more credible if the public exhibition exposes the actual code/data dependency lineage and if later systems demonstrably import the infrastructure created earlier. The largest program risk is not technical impossibility. It is allowing 100 attractive demos to become 100 disconnected one-off prototypes. The monorepo, typed registry, package boundaries, tests, preview gates, and verifiable lineage rules are the controls that prevent that failure.

## Primary implementation references consulted

- Vercel monorepos: https://vercel.com/docs/monorepos
- Vercel + Turborepo: https://vercel.com/docs/monorepos/turborepo
- Next.js static export / progressive server adoption: https://nextjs.org/docs/app/guides/static-exports
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Playwright assertions: https://playwright.dev/docs/test-assertions
- Playwright ARIA snapshots: https://playwright.dev/docs/aria-snapshots
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Vercel storage: https://vercel.com/docs/storage
- Vercel Marketplace storage: https://vercel.com/docs/marketplace-storage
- Vercel Functions: https://vercel.com/docs/functions
- Vercel AI SDK: https://vercel.com/docs/ai-sdk
- Vercel AI Gateway: https://vercel.com/docs/ai-gateway
- Vercel Observability: https://vercel.com/docs/observability
- Vercel Speed Insights: https://vercel.com/docs/speed-insights
