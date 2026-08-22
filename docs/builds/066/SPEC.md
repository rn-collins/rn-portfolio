# Build 066 — Legal Knowledge Graph / Institutional Memory System

## Public contract

066-A connects fixed synthetic matters, authorities, arguments, documents, expert roles, outcomes, workflows, and lessons through typed, source-addressable relationships. 066-B shows disconnected matter folders assembling into institutional memory. The created artifacts are the **Legal Knowledge Ontology** and **Matter Relationship Graph**.

Canonical lineage is exact: `028`, `029`, `058`, `059`, `063` → `cap:066`. Engine version: `066.1.0`.

## Ontology

Node kinds are `MATTER`, `AUTHORITY`, `ARGUMENT`, `DOCUMENT`, `EXPERT`, `OUTCOME`, `WORKFLOW`, and `LESSON`. Edge relations are `CITES`, `SUPPORTS`, `CONTESTS`, `PRODUCED`, `INFORMED`, `RESULTED-IN`, `REUSED-IN`, and `DERIVED-FROM`. Every node and edge has a synthetic source locator. Access, verification, review, and relationship states are declarations within the fixture—not legal determinations.

## Deterministic states

| Scenario | Result | Required behavior |
| --- | --- | --- |
| `MEMORY-CONNECTED` | `MEMORY CONNECTED` | Exposes the complete fixed graph. |
| `AUTHORITY-UNVERIFIED` | `AUTHORITY REVIEW` | Blocks unqualified reuse of the authority node. |
| `ACCESS-RESTRICTED` | `ACCESS HOLD` | Keeps the restricted document and affected edge visible but held. |
| `CONFLICTING-OUTCOME` | `CONFLICT REVIEW` | Preserves a contested lesson/outcome relationship. |
| `LESSON-UNREVIEWED` | `LESSON REVIEW` | Distinguishes extracted knowledge from reviewed institutional learning. |

Precedence is access → authority → conflict → lesson → connected. Input must recursively exactly equal one exported fixture. Unknown scenarios, missing/extra/drifted fields, hostile getters/proxies, and malformed values return `INVALID` and never throw.

## Export schema

The UI export must contain `build`, `version`, `fixture`, `exportedAt`, exact `canonical.uses`, `canonical.creates`, `admission`, cloned `input`, cloned `result`, and `replay`. Recommended filename: `synthetic-legal-knowledge-graph.json`. Export must say synthetic-only, no persistence, no real people/clients/matters/authorities, and must preserve access/review holds.

## Non-claims

This is not legal advice and creates no attorney-client relationship. It does not determine privilege, confidentiality, work product, authorization, conflicts, ethical duties, admissibility, authenticity, truth, current law, citation validity, precedential value, legal effect, or transferability to another matter. It contains no real client, matter, person, firm, expert, document, authority, court, or outcome data.
