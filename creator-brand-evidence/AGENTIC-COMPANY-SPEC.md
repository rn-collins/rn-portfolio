# Evidence·Studio — Agentic Brand Management Company
## Architecture & Build Spec (v1, for approval before building)

> **Correction from the last pass.** The previous build treated the agent stack as back-office
> tooling for a human consultant. This spec re-centers the thesis: **the agents *are* the company.**
> A human (you) provides judgment, guardrails, and sign-off — but the audits, monitoring, evidence
> grading, disclosure/claims/risk analysis, and governance are executed by a coordinated system of
> AI agents. Nothing here is built yet; this is the plan to approve.

---

## 1. Thesis

**An evidence-based *agentic* brand management company for trust-sensitive markets.**

We run continuous, evidence-graded brand and creator management for brands where credibility is part
of the product (cannabis, wellness, psychedelics, health-adjacent, legal, education, AI, founder/expert-led
firms). The work — monitoring, evidence collection, disclosure and claims analysis, brand-fit scoring,
measurement, and governance — is performed by AI agents, with a human accountable for judgment and
sign-off. The claim is not "we post for you"; it is **"we make brand decisions with graded evidence,
continuously, at a scale a human team can't match — and a human stands behind every recommendation."**

Why this is defensible: regulated/expert-led brands cannot use a generic agency playbook, and most
"AI marketing tools" ignore disclosure, claims substantiation, and consumer-protection risk. Agentic +
compliance-first + evidence-graded is the wedge.

---

## 2. Product model — phased (approved: all three, phased)

| Phase | Product | What it is | Human role | Revenue |
|---|---|---|---|---|
| **P1** | **Agent-run Audit** (productized one-off) | The Creator + Brand Evidence Audit executed end-to-end by agents; delivered as a report + evidence/risk maps + roadmap | **Human-approved** — you review & sign off every deliverable | Per-audit fee |
| **P2** | **Continuous Agent Service** (done-for-you) | Subscription; agents run ongoing monitoring, evidence-grading, disclosure/claims/risk + governance; monthly review | **Human-approved** for external outputs; **client-in-the-loop** dashboard for findings | Retainer / MRR |
| **P3** | **Self-serve Agentic SaaS** | Clients log in; agents run audits/monitoring on their own brands with configurable guardrails | **Client-in-the-loop**; **autonomous** only for low-risk tasks | Seats / usage |

Human-in-the-loop is **not one setting** — it's a policy that varies by risk (see §5). All three modes
exist; which one applies is decided per task by the risk tier.

---

## 3. Agent architecture

A supervisor/orchestrator coordinates specialist agents that map 1:1 to the six audit layers and the
EVIDENCE framework. Each agent has narrow scope, its own tools, and must return graded, cited output.

```
                         ┌─────────────────────────┐
   watchlist / brief ──▶ │   Orchestrator (Studio)  │  plans, routes, sequences,
                         │   — supervisor agent      │  aggregates, applies confidence
                         └─────────────┬────────────┘
        ┌───────────────┬──────────────┼───────────────┬───────────────┐
        ▼               ▼              ▼               ▼               ▼
  Collection      Disclosure      Claims-Risk      Brand-Fit       Measurement
    agent           agent           agent            agent            agent
 (Apify/BD/         (material      (express/        (fit score       (KPIs, trust,
  Playwright/        connection,    implied,          vs brief,        conversion,
  Phyllo/            clarity)       category, risk)   parasocial,      risk metrics)
  Brandwatch/                                         audience)
  Whisper)
        └───────────────┴──────────────┬───────────────┴───────────────┘
                                        ▼
                              Governance agent
                     (SOPs, approval workflow, escalation,
                      AI-content policy, guardrail checks)
                                        ▼
                        Evidence-grading + Confidence layer
                (strong/weak, direct/indirect, current/stale, representative;
                 high / moderate-test / exploratory confidence on every finding)
                                        ▼
                     Human review & sign-off  ──▶  Client deliverables
                                        ▼
                        Memory: Postgres + pgvector (evidence store)
```

### Agent roster

| Agent | Job | Tools | Output |
|---|---|---|---|
| **Orchestrator** | Plan the audit/monitoring run; route to specialists; sequence; assemble; apply confidence | LLM + workflow engine | Assembled findings, priority matrix, roadmap |
| **Collection** | Gather public/permissioned content for the watchlist | Apify, Bright Data, Playwright, Phyllo, Brandwatch, Whisper | Normalized `posts` rows |
| **Disclosure** | Detect sponsorship/affiliate/material connection + disclosure presence/clarity | LLM + FTC rule pack | Disclosure findings + risk flags |
| **Claims-Risk** | Extract express/implied claims; category + risk; substantiation gaps | LLM + category claim libraries | Claims list + risk flags |
| **Brand-Fit** | Score creators/content vs client brief; trust/parasocial/audience-vulnerability signals | LLM + brief + embeddings | Fit scores + rationale |
| **Measurement** | Assemble metrics beyond vanity: awareness/engagement/trust/conversion/compliance/learning | SQL over evidence store | Measurement framework values |
| **Governance** | Check against SOPs, approval workflow, AI-content policy; raise escalations | Policy pack | Governance gaps + escalations |
| **Evidence-grading (layer, not a chat agent)** | Grade every input's strength; attach recommendation confidence | Deterministic rules + LLM | Graded, cited findings |

**Design rules:** every finding must carry (1) provenance (source + captured_at), (2) an evidence
grade, and (3) a confidence level. No un-cited assertions reach a client. The LLM stays **local
(Ollama)** so creator content + client context never leave the environment.

---

## 4. Tech stack (proposed — to confirm)

- **Agent framework:** start pragmatic. **n8n + local LLM (Ollama)** for P1 to ship fast and keep it
  inspectable; migrate the orchestrator to a code-based agent SDK (e.g. an agent loop with tool-calling)
  in P2 when multi-step reasoning and retries matter. (Open question — see §9.)
- **Collection:** Apify (MVP) → Bright Data (scale) → Playwright/Browser Use (bespoke) → Phyllo
  (permissioned) → Brandwatch/Talkwalker (listening) → Whisper (video).
- **Memory / evidence store:** Postgres + pgvector (schema already drafted in `creator-lurker/db/schema.sql`;
  extends cleanly with `agent_runs`, `findings`, `confidence`).
- **Deliverables:** report generator (Markdown → PDF/DOCX) driven by the assembled findings.
- **Client dashboard (P2/P3):** web app over the evidence store with review/approve actions.
- **Compliance guardrails:** public/permissioned collection only; not legal advice; human sign-off gate.

---

## 5. Human-in-the-loop policy (risk-tiered — approved: all modes)

Which mode applies is decided per task by risk, not globally:

| Risk tier | Examples | Mode |
|---|---|---|
| **High** | Health/efficacy/disease claims, undisclosed paid promotion, testimonial risk, anything client-facing & regulated | **Human-approved** — you sign off before it leaves |
| **Medium** | Vague disclosure, ambiguous affiliate language, borderline fit | **Client-in-the-loop** — surfaced in dashboard for review |
| **Low** | Clean disclosure, on-brand neutral content, internal logging | **Autonomous** — agents proceed, logged for audit |

This is itself a selling point for regulated brands: *the system knows what it's not allowed to decide
on its own.*

---

## 6. Revised site positioning (rebuild target)

The existing 13-page site is good bones but sells a **consultancy**. Re-cast to sell the **agentic
service**:

- **Hero:** "Continuous, evidence-based brand management — run by agents, signed off by a human."
- **New/added pages:** *How the agents work* (the roster + evidence-grading + human sign-off);
  *Live Evidence* (sample agent-generated audit snapshot); *Pricing/Plans* (audit → subscription → platform).
- **Reframed:** the Audit becomes "an agent-run diagnostic, delivered in days"; Governance/Retainer
  become "your always-on agent team."
- **Keep:** Method (6-phase + EVIDENCE), the trust/compliance framing, the who-it's-for.
- **Curriculum dashboard:** repositioned as *internal* — how the human operator stays sharp enough to
  supervise the agents (or dropped from the public site).

---

## 7. Phased roadmap

**Phase 0 — Prove the engine (2–3 wks).** Build ONE agent end-to-end: the **Disclosure + Claims-Risk
agent** against real public posts. Output graded, cited flags. This de-risks the whole thesis before
building breadth.

**Phase 1 — Agent-run Audit (4–6 wks).** Orchestrator + Collection + all six specialist agents +
evidence-grading + report generator. Human-approved delivery. Re-cast the site to sell it. Sell 1–3 audits.

**Phase 2 — Continuous Agent Service (6–10 wks).** Scheduling, monitoring loop, risk register,
client-in-the-loop dashboard, monthly review. Move orchestrator to a code agent framework. Retainer MRR.

**Phase 3 — Self-serve SaaS (later).** Multi-tenant, client-configurable guardrails, seats/usage billing,
autonomous low-risk tasks.

---

## 8. What we reuse from the last build

- `creator-lurker/` scaffold → becomes the **Collection agent + evidence store** (promoted from back-office to core).
- `db/schema.sql` → extend with `agent_runs`, `findings`, `confidence`, `deliverables`.
- `llm/extraction-prompt.md` + `output.schema.json` → become the **Disclosure/Claims agent contracts**.
- The 13-page site → re-skinned/re-copied for agentic positioning (not thrown away).
- Method + EVIDENCE framework → the reasoning spine the agents must follow.

---

## 9. Open questions to resolve before/while building

1. **Agent framework:** n8n-first (fast, visual, inspectable) vs. a code agent SDK from day one
   (better multi-step reasoning, retries, evals). Recommendation: n8n for Phase 0/1, migrate at Phase 2.
2. **Local vs hosted LLM:** local (Ollama) protects client data + supports the compliance story, but is
   weaker at complex reasoning. Hybrid? (local for collection/extraction, stronger model for the
   orchestrator with data-handling controls.)
3. **Brand name:** "Evidence·Studio" is a placeholder — keep, or something that signals *agentic*?
4. **Legal posture:** we surface disclosure/claims risk for human/counsel review; we do **not** give
   legal advice. Confirm this boundary in all copy.
5. **First target vertical:** pick ONE to tune the claims libraries (wellness/supplement, cannabis/hemp,
   or expert-led legal/advisory) rather than all at once.
6. **Validation:** who are the first 3 prospective clients, and what would they pay for the agent-run
   audit? Worth testing before Phase 1 breadth.

---

## 10. Recommended immediate next step

Approve this spec, then I build **Phase 0**: the Disclosure + Claims-Risk agent, run against real public
posts, producing graded and cited flags — the smallest thing that proves the agents actually work.
