# Build 068 — AI Digital Twin Action Runtime

## Public contract

068-A lets a governed synthetic digital twin retrieve fixed context, prepare a draft, make a bounded recommendation, propose an action, stop at an approval gate, request an allowlisted tool, record a zero-side-effect local simulation, or refuse. 068-B shows the change from passive context to accountable action runtime. It creates the **Twin Action Planner**, **Approval Gates**, and **Action Ledger**.

Canonical lineage is exact: `039`, `040`, `067` → `cap:068`. Engine version: `068.1.0`.

## Stage separation

Context retrieval, draft preparation, recommendation, proposed action, approval, tool use, execution, and refusal/exception are different typed fields and different ledger stages. A draft is not a recommendation; a recommendation is not an action; a proposal is not approval; approval is neither tool use nor execution. The only “execution” is a deterministic local fixture event with `sideEffects: NONE`.

## Deterministic states

| Scenario | Result | Required behavior |
| --- | --- | --- |
| `PROPOSAL-AWAITS-APPROVAL` | `AWAITING APPROVAL` | Forms a bounded proposal, then holds tool use and execution. |
| `APPROVAL-DENIED` | `APPROVAL DENIED` | Records denial; no tool request or execution follows. |
| `CONTEXT-UNAVAILABLE` | `CONTEXT HOLD` | Stops before draft, recommendation, action, tool use, or execution. |
| `TOOL-OUT-OF-SCOPE` | `TOOL REFUSED` | Records fixture approval but refuses a non-allowlisted tool and execution. |
| `APPROVED-SIMULATION-RECORDED` | `SIMULATION RECORDED` | Records fixture approval, allowlisted local simulated tool use, and zero-side-effect simulated execution. |

Precedence is context unavailable → approval denied → tool refused → simulation recorded → approval pending. Input must recursively exactly equal one exported fixture. Unknown scenarios, missing/extra/drifted fields, malformed values, hostile getters, and hostile proxies return `INVALID` without throwing or acting.

## Export and admission

The UI export must include `build`, `version`, `fixture`, `exportedAt`, exact `canonical.uses`, `canonical.creates`, `artifacts`, `admission`, cloned `input`, cloned `result`, and `replay`. Recommended filename: `synthetic-twin-action-ledger.json`. Admission must say synthetic-only; no real people, personal data, accounts, credentials, external tools, external actions, or side effects; no verified identity, authority, consent, or legal rights; no persistence, surveillance, or professional advice.

## Non-claims

This runtime does not impersonate or act for a real person. Synthetic fixture approval is not valid consent or authority and applies only to the exact fixture proposal. The system does not handle credentials, persist, surveil, access accounts, call external tools, or perform real actions. It gives no medical, legal, financial, or other professional advice.
