# GitHub Estate Audit and Classification

**Owner:** `rn-collins`  
**Audit date:** 2026-07-16  
**Scope:** 61 repositories owned by RN Collins and visible to the connected GitHub App.  
**Purpose:** determine what should be public, private, consolidated, archived, or elevated as flagship proof of work.

## Executive finding

The estate is not weak; it is over-fragmented. The main risk is not lack of output but that strong work is split across many small, similarly named repositories, while several client- or prospect-specific builds contain context that should not be made public without sanitization. The estate currently has **4 public repositories and 57 private repositories**. No repositories are archived.

The recommended public-facing shape is:

- 8–10 flagship repositories;
- 8–15 supporting repositories;
- sanitized public case-study shells for private or prospect-specific work;
- one NSAG monorepo or umbrella repository instead of presenting 15 module repositories as separate flagship projects;
- a private incubator for undeployed concepts and landing-page stubs;
- immediate archival of clear test, duplicate, and placeholder repositories.

## Classification vocabulary

| Class | Meaning | Default action |
|---|---|---|
| **Flagship** | Best evidence of RN’s technical, research, legal, product, and systems capability | Polish, document, test, then make public where safe |
| **Supporting** | Valuable proof that strengthens a flagship narrative | Keep or make public after documentation |
| **Showcase shell** | Full repository should stay private, but the work deserves a sanitized public case study | Keep source private; create a separate public case-study repo/page |
| **Internal** | Operational, administrative, sensitive, or proprietary infrastructure | Keep private and remove from public-facing GitHub narrative |
| **Consolidate** | Useful work split into too many repositories or superseded versions | Merge into a parent repo or monorepo; archive originals afterward |
| **Incubator** | Early concept, landing page, or undeployed experiment | Keep private until evidence of use or a real build exists |
| **Archive/retire** | Duplicate, ambiguous, obsolete, or non-credible in its present form | Archive after confirming no active deployment depends on it |

## Portfolio-level findings

### 1. The estate is dominated by deployment repositories

Many repositories are extremely small—often 3–20 KB—and appear to exist primarily to deploy a single static application or assessment. That is acceptable operationally, but it is not an effective public GitHub narrative. A reviewer sees dozens of tiny repositories rather than several coherent systems.

### 2. NSAG is structurally fragmented

NSAG currently spans:

- `nsag-site`;
- `nsag-admin`;
- `nsag-api`;
- `nsag-m1` through `nsag-m15`;
- `narch-advisory`;
- `gapi-governance`;
- `sport-nsag`;
- `wnh-guide`;
- related work in `dru-assessment` and `nervous-system-studio`.

This is a product family, not twenty unrelated projects. It should be presented as one governed platform with modules, shared methodology, shared design system, and deployment documentation.

### 3. Aloha AI has both genuine flagships and prospect-specific artifacts

The strongest public candidates are the repeatable intelligence and governance systems. Client/prospect-specific builds—such as culture, restaurant, creator-rights, and EOLPC demonstrations—should generally remain private and be represented through sanitized case studies.

### 4. Public visibility is currently misaligned with quality

Only four repositories are public: `aloha-ai-consulting`, `flexjd-site`, `myelin-ce`, and `zero-to-frontier`. Several stronger portfolio candidates remain private, while `myelin-ce` is public despite being described as upcoming. Public status should follow evidence and documentation, not historical accident.

### 5. There is no retirement discipline yet

No repository is archived. Placeholder and test repositories therefore occupy the same conceptual level as serious systems. Archiving is useful: it preserves history while signaling that a repository is no longer active.

---

# Repository-by-repository classification

## A. Flagship candidates

| Repository | Current visibility | Recommendation | Why it matters | Required before public launch |
|---|---:|---|---|---|
| `rn-portfolio` | Private | **Flagship / make public after public-data split** | Central registry and proof-of-work interface; can become the portfolio control plane | Remove internal fields, add schema, tests, screenshots, case-study pages, deployment docs |
| `aloha-ai-consulting` | Public | **Flagship / retain public** | Parent commercial and systems narrative for AI, governance, and regulatory work | Rewrite README as technical/product case study; document architecture and boundaries |
| `aloha-suppression-sweep` | Private | **Flagship candidate** | Clear problem, evidence registry, monitoring workflow, public-interest relevance | Sanitize datasets, document verification methodology, disclose update cadence and limits |
| `aloha-ai-governance` | Private | **Flagship candidate** | Strong legal-tech and regulatory-intelligence signal; repeatable jurisdiction monitor | Document sources, authority hierarchy, update process, tests, and non-legal-advice boundary |
| `psych-ops-directory` | Private | **Flagship candidate** | Structured ecosystem data product with verification tiers and search | Publish sanitized sample data; document taxonomy, verification, submissions, and moderation |
| `transform-observatory` | Private | **Flagship candidate** | Demonstrates policy framework translation into a scored intelligence system | Document scoring methodology, source provenance, and distinction between analysis and advocacy |
| `nsag-site` | Private | **Flagship umbrella** | Most distinctive original framework and strongest interdisciplinary identity | Convert into umbrella monorepo or documentation hub; connect modules and methodology |
| `flexjd-site` | Public | **Flagship / retain public** | Real-user civic/student platform with content, advocacy, and operational utility | Add governance, privacy, contributor, deployment, and maintenance documentation |
| `law-communication-library` | Private | **Flagship candidate, rights review required** | Large legal-education corpus and clear legal knowledge-system signal | Confirm ownership/permission, remove confidential material, document editorial and legal review |
| `zero-to-frontier` | Public | **Flagship candidate, inspect deeply** | Public and sizeable enough to signal a substantive system | Clarify purpose, authorship, status, and technical architecture before featuring |

## B. Strong supporting repositories

| Repository | Recommendation | Role in public narrative |
|---|---|---|
| `ai-budget-calc` | Supporting; likely public after cleanup | Demonstrates scoping logic, pricing models, lead capture, and implementation planning |
| `aloha-dea-tracker` | Supporting; public architecture or sanitized repo | Supports regulatory monitoring family and demonstrates recurring ingestion |
| `aloha-legal-ai-monitor` | Supporting | Legal-AI professional-responsibility monitoring proof |
| `legal-risk-monitor` | Supporting | Startup legal-risk monitoring example; avoid implying legal advice |
| `psychops-intel` | Supporting | Jurisdiction-specific regulatory monitor; pair with `psych-ops-directory` |
| `fadiman-atlas` | Supporting / showcase | Knowledge-atlas architecture and research annotation system |
| `entheogen-atlas` | Supporting | Public education/content architecture; requires scientific-source and claims audit |
| `psychonaut-bookworm` | Supporting | Content taxonomy, filtering, and knowledge curation proof |
| `destig-toolkit` | Supporting / rights review | Multi-audience legal and clinical communication toolkit; confirm Antithesis rights and attribution |
| `dru-assessment` | Supporting | Measurement and research-assessment capability; document consent and data handling |
| `set-for-life` | Supporting | Education product, gated content, conversion and analytics workflows |
| `clerking-site` | Supporting | Legal-career platform and operational workflow proof; privacy review required |
| `aiapc-site` | Supporting | Public education/newsletter system; useful but not a core technical flagship |
| `nervous-system-studio` | Supporting / possible flagship later | Strong brand and interdisciplinary thesis; currently too small to feature without fuller documentation |
| `myelin-ce` | Public but **move to incubator/supporting until actually launched** | Public status currently overstates maturity; retain only with accurate “prototype/pre-launch” labeling |
| `aloha-build-club` | Internal/supporting | Could become the public “build in public” layer later, but presently keep private |

## C. Private source, public showcase-shell candidates

These repositories appear closely tied to a prospect, client concept, or bespoke pitch. Their source should remain private unless RN owns all rights and removes identifying context.

| Repository | Recommendation | Public treatment |
|---|---|---|
| `aloha-behavioral-intelligence` | **Showcase shell** | Sanitized case study on behavioral/cultural intelligence architecture |
| `aloha-creator-rights` | **Showcase shell** | Generic creator-rights decision-tree case study without prospect-specific context |
| `aloha-culture-monitor` | **Showcase shell** | Demonstrate signal-monitoring architecture with sample or synthetic data |
| `aloha-encoding-effect` | **Showcase shell** | Publish methodology and selected sourced analysis, not full prospect package |
| `aloha-governance-audit` | **Showcase shell** | Generic AI/synthetic-media governance assessment example |
| `aloha-third-asset` | **Showcase shell** | Publish as a strategic case study only after removing prospect and credential-sensitive claims |
| `bm-intel` | **Showcase shell** | Generic hospitality competitor-intelligence case study; keep prospect data private |
| `eolpc-demo` | **Showcase shell / consolidate** | Merge conceptually with v5 and publish architecture/sample only |
| `eolpc-demo-v5` | **Showcase shell / consolidate** | Choose one canonical EOLPC system; archive the superseded repository after migration |

## D. NSAG consolidation group

### Core infrastructure

| Repository | Recommendation |
|---|---|
| `nsag-admin` | Keep **internal/private**; document access controls and data responsibilities |
| `nsag-api` | Keep **internal/private** until API contracts, authentication, and threat model are documented |
| `nsag-site` | Canonical public umbrella and flagship |

### Module repositories

`nsag-m1` through `nsag-m15` should be treated as **deployment artifacts of one product family**, not fifteen independent flagship repositories.

Recommended end state:

```text
nsag/
  apps/
    public-site/
    admin/
    api/
    modules/
      m01-trauma-informed-legal-space/
      ...
      m15-extreme-environment-governance/
  packages/
    design-system/
    assessment-engine/
    scoring/
    content-schema/
  docs/
    methodology/
    governance/
    evidence/
    module-specifications/
```

Keep individual repositories temporarily if Vercel deployments depend on them. Once migration is proven, archive them with a notice pointing to the canonical NSAG repository.

| Repositories | Classification | Action |
|---|---|---|
| `nsag-m1`–`nsag-m15` | **Consolidate** | Migrate to NSAG monorepo; archive originals after deployment cutover |

## E. Incubator / pre-launch concepts

| Repository | Recommendation | Reason |
|---|---|---|
| `narch-advisory` | Incubator | 3 KB placeholder; not yet credible as a public repo |
| `gapi-governance` | Incubator | 3 KB placeholder |
| `sport-nsag` | Incubator | 3 KB placeholder |
| `wnh-guide` | Incubator | 3 KB placeholder |
| `provenance-verify` | Incubator with strong future potential | Important concept, but present repository is too small and pre-deployment |
| `regac-academy` | Incubator | Landing-page stage |
| `opfos-firm` | Incubator | Landing-page stage |
| `kids-developing-brains` | Incubator | High-stakes child-development topic requires evidence, privacy, and safety review before public elevation |

These should be moved conceptually under a private `rn-incubator` registry or organization rather than appearing as peers of shipped systems.

## F. Archive or retire candidates

| Repository | Recommendation | Rationale |
|---|---|---|
| `y` | **Archive immediately after confirming no deployment dependency** | Ambiguous name, no public narrative, likely test or accidental repository |
| one of `eolpc-demo` / `eolpc-demo-v5` | **Archive after consolidation** | Duplicate/superseded product versions |
| `nsag-m1`–`nsag-m15` | **Archive after monorepo migration** | Preserve history but stop presenting deployment fragmentation as project breadth |
| stale pre-launch repositories that remain unchanged after 90 days | **Archive or return to incubator** | Prevent “coming soon” accumulation |

No repository should be deleted as part of the first cleanup. Archive first, verify deployments, then decide whether deletion is warranted.

---

# Recommended public GitHub lineup

## First-wave flagship set

1. `rn-portfolio`
2. `aloha-ai-consulting`
3. `aloha-suppression-sweep`
4. `aloha-ai-governance`
5. `psych-ops-directory`
6. `transform-observatory`
7. canonical `nsag` umbrella repository
8. `flexjd-site`
9. `law-communication-library` after rights review
10. `zero-to-frontier` after code/content audit

## First-wave supporting set

- `ai-budget-calc`
- `aloha-dea-tracker`
- `aloha-legal-ai-monitor`
- `psychops-intel`
- `fadiman-atlas`
- `entheogen-atlas`
- `psychonaut-bookworm`
- `dru-assessment`
- `set-for-life`
- `nervous-system-studio`

## Keep private by default

- admin/API infrastructure;
- prospect-specific builds;
- internal Slack/lead-routing logic;
- client or employer material;
- private datasets;
- repositories containing unpublished pricing, outreach, or acquisition strategy;
- anything with confidential legal, research-participant, or educational data.

---

# Priority risks to investigate before changing visibility

1. **Secrets and credentials:** scan all history, not only current files, for API keys, tokens, webhooks, database URLs, PINs, and private endpoints.
2. **Client/prospect confidentiality:** bespoke repositories may reveal targeting strategy, pricing, or nonpublic work.
3. **Copyright and ownership:** Antithesis, Fat Nugs, Northeastern, employer, and collaborator-linked work requires explicit rights review.
4. **Legal-advice boundary:** legal monitors, trackers, and communication tools need clear educational/informational disclaimers.
5. **Scientific and medical claims:** neuroscience, psychedelics, cannabis, child development, and CE products need source and claim audits.
6. **Personal data:** assessment, lead-capture, admin, analytics, student, and directory systems require privacy documentation.
7. **Deployment dependencies:** do not archive or consolidate a repository until Vercel and any scheduled jobs are mapped.

---

# Execution plan

## Stage 1 — Estate control data

Create `data/repositories.internal.json` containing for every repository:

- classification;
- current visibility;
- recommended visibility;
- canonical product family;
- live deployment;
- deployment dependency;
- README status;
- license status;
- secrets-scan status;
- rights-review status;
- documentation score;
- reproducibility level;
- archive decision;
- next action.

## Stage 2 — Safety and rights gate

Before making anything public:

- run secret scanning across full history;
- inspect `.env`, config, webhook, and API files;
- identify client/employer/collaborator ownership;
- separate internal from public registry data;
- add legal, privacy, scientific, and AI-use disclosures.

## Stage 3 — Consolidation

- build canonical NSAG monorepo;
- choose canonical EOLPC repository;
- create one `rn-incubator` or private concepts registry;
- archive `y` and superseded repos after dependency checks.

## Stage 4 — Flagship production

For each first-wave flagship, require:

- serious README;
- architecture diagram;
- screenshots;
- sample or synthetic data;
- local setup or reproducibility statement;
- methodology;
- data provenance;
- limitations and risk boundaries;
- changelog;
- license or rights notice;
- deployment and maintenance status.

## Stage 5 — Public profile orchestration

Create `rn-collins/rn-collins` profile README and pin only the repositories that establish the intended identity. RN Builds should render from the same canonical project registry so GitHub, the portfolio, and case studies cannot drift apart.

---

# Bottom-line classification counts

| Recommended class | Repository count |
|---|---:|
| Flagship candidates | 10 |
| Supporting | 16 |
| Showcase shells | 9 |
| NSAG module consolidation | 15 |
| Incubator concepts | 8 |
| Internal core infrastructure | 2 |
| Immediate standalone archive candidate | 1 |

Some repositories appear in a future archive category after consolidation; counts above classify their current primary treatment.

## Final judgment

RN’s GitHub should not communicate “I made 61 unrelated websites.” It should communicate:

> I architect product families and evidence systems across law, governance, neuroscience, public health, education, and regulated markets. Each system has a defined problem, methodology, architecture, provenance model, risk boundary, and maintenance state.

The next operational task is the **repository control registry plus secrets/rights/readme audit**, beginning with the ten flagship candidates and all repositories currently public.