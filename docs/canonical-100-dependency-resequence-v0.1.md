# Canonical 100 — Dependency Resequencing v0.1

Status: ACTIVE / freeze construction

## Decision: preserve numbering wherever dependency order already works
The original 10×10 scaffold was intentionally progressive and, after the deep audit, still provides a workable dependency spine. Renumbering all 100 merely to make the sequence look newly designed would create churn without adding technical value.

Therefore the convergence pass uses **minimal necessary resequencing**:
- Build 001 remains 001.
- Build 100 remains the culmination.
- A build moves only when a hard prerequisite would otherwise appear after it, or when an eliminated duplicate creates a strategically better slot for a missing capability.
- Public variety is handled through editorial scheduling and domain rotation where possible; numbering remains primarily an engineering lineage.

## Locked consolidation
### 045 absorbs former 071
The former `Cannabis Patient Journey Mapper` and `Medical Cannabis Access Intelligence Dashboard` become one stronger public product:

**045 — Cannabis Care Access Journey**
Public job: Can I realistically get cannabis care here, and what will the whole path require from first question through ongoing support?

The merged A inherits:
- patient journey and barrier modeling;
- jurisdiction-aware eligibility/rules;
- geospatial access/provider layers;
- travel-time and island/location constraints;
- cost/accessibility/supply scenarios;
- provenance/freshness;
- privacy-preserving user context;
- non-prescriptive medical boundaries.

The former 071 slot is therefore free.

## Locked replacement
### 071 — Collaborative Decision Room
The freed slot becomes the new multi-user capability missing from the original canon.

Public job: **Can a group make a decision without hiding disagreement, evidence, assumptions or tradeoffs?**

Primary A capabilities:
- real-time multi-user collaboration;
- CRDT/shared-state architecture or equivalent conflict-safe synchronization;
- structured options, criteria and evidence;
- source/provenance attachment;
- disagreement/argument topology;
- named or privacy-preserving participation modes where warranted;
- asynchronous participation;
- assumption and tradeoff tracking;
- decision rules and explicit unresolved disagreement;
- version/history/audit trail;
- accessible keyboard/non-spatial alternative;
- exportable decision record.

B-Web mechanism: a live decision field in which participants alter evidence, priorities, assumptions and criteria while consensus/disagreement topology recomputes in real time.

B-LinkedIn mechanism: apparent consensus is shown first, then hidden disagreements, assumptions and missing evidence become visible; the final frame shows a decision that preserves the disagreement instead of erasing it.

Saveable payload: `OPTIONS → EVIDENCE → ASSUMPTIONS → DISAGREEMENT → TRADEOFFS → DECISION`.

### Why 071 is the correct location
By 071, the sequence has already created the major prerequisites:
- 020-style evidence/audit lineage;
- consent/privacy/access controls from the 20s;
- version/change history;
- accessibility/inclusive interaction;
- provenance/evidence systems in the 50s;
- decision memory and living research in the 60s.

071 then creates reusable collaboration infrastructure before later systems that benefit from it:
- access/equity comparison;
- regulatory comparison;
- benefit-sharing and power analysis;
- governance observatory;
- island-data governance;
- Build 100 collaborative decision room.

## Dependency spine after convergence
The canon is organized by earned capability rather than by superficial topic similarity.

### 001–010 — Understand the problem and structure it
Human review, audience translation, unmet decisions, research workflow, service/software boundary, product-worthiness, learning loops, decision-ready interfaces, design principles, structured data/schema.

### 011–020 — Represent actors, consequence and governed workflow
Entity/ownership resolution, consequence/control mapping, workflow risk, legal judgment, reusable legal work, workflow/handoffs, institutional friction, escalation and defensible decision evidence.

### 021–030 — Govern access/data and make systems inclusive
Vendor/procurement claims, human-consequence mapping, consent/data rights, minimization, implementation readiness, messy-data trust, creator ownership, retrieval, change consequence, inclusive experience transformation.

### 031–040 — Test truth, reliability and AI behavior
Evidence strength, release readiness, adversarial/neurotechnology claims, incident/failure reconstruction, portability, offline survival, feedback governance, domain AI evaluation, agent trace inspection, stop/escalate.

### 041–050 — Apply the stack to organizations, regulation, place and embodied experience
AI ownership/jobs/teams, reusable regulated patterns, cannabis care access journey, island dependencies, place readiness, governance experience, personal sensory profile, neuroaesthetic evidence.

### 051–060 — Learn/adapt while preserving provenance and rights
Adaptive education, cautious personalization, N-of-1 experiments, environmental adaptation, safe smart-environment action, defensibility/moat, content/source/legal provenance, founder IP capture.

### 061–070 — Build durable memory and context
Decision memory, interview knowledge, living research, cannabis institutional memory, psychedelic continuity record, legal institutional memory, personal knowledge model, governed action runtime, implementation-aware law, regulatory lifecycle.

### 071–080 — Make shared decisions, compare systems and navigate consequences/evidence
Collaborative Decision Room, Hawaiʻi island cannabis access, psychedelic access/equity, implementation maturity, regulatory-design comparison, cross-jurisdiction legal intelligence, change-consequence engine, evidence translation, psychedelic evidence navigation, journalism-to-infrastructure.

### 081–090 — Turn signals, audiences, work, relationships and publishing into operating intelligence
Unmet needs, audience intelligence, work-to-public-proof, benefit sharing, power/influence, content-as-prototype, creator operating system, relationship/opportunity intelligence, founder intelligence, governed research-agent architecture.

### 091–100 — Govern memory/action at ecosystem scale and converge
Agent memory, orchestration, regulated execution, proof, human-experience observatory, cannabis experience intelligence, transparent personalization, psychedelic continuity orchestration, island resilience data commons, island resilience scenario/decision platform.

## Hard dependency checks that must remain true at freeze
- 013 consumes 012 consequence/control primitives.
- 031 consumes provenance infrastructure rather than duplicating it later; 058 remains the canonical claim-source provenance layer and is generalized backward as an infrastructure contract during implementation.
- 033 consumes 031 claim-defensibility logic.
- 039 consumes trace/observability primitives established in Lab and 034.
- 045 consumes geospatial/place primitives as they mature; no later dependency is required for a minimal v1, but later updates may deepen it.
- 050 → 054 → 055 remains evidence → recommendation → actuation.
- 057 → 058 → 059 remains content provenance → claim provenance → legal authority verification.
- 061/063/088 feed 089; 089 must not reimplement their functions.
- 065 feeds 098 record continuity; 098 adds orchestration/handoff.
- 067 feeds 091 permissioned memory and 097 personalization.
- 071 collaboration primitives feed 084/095/099/100 where warranted.
- 090 research-agent governance precedes 091–092 organization/agent runtime integration.
- 092 general orchestration precedes 093 regulated execution; 093 precedes 094 proof/compliance reconstruction.
- 099 governed commons precedes 100 scenario/decision platform.

## Remaining pre-freeze work
1. Produce exact 100-row freeze table from the ten admission records plus these convergence decisions.
2. For every row, lock final public title + technical descriptor separately so public comprehension does not erase expert specificity.
3. Lock A first-value path and technical ceiling.
4. Lock B-Web mechanism and B-LinkedIn MP4 concept.
5. Lock `usesInfrastructure` / `createsInfrastructure` edges.
6. Validate no hard dependency points backward incorrectly.
7. Validate domain/public-interest balance after 045/071 consolidation.
8. Mark Canonical 100 v1.0 FROZEN.
9. Only then rewrite the runtime registry and Exhibition.