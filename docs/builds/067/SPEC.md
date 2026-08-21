# Build 067 — Personal Knowledge Model & Digital Identity Layer

## Public contract

067-A builds a fixed, user-controlled synthetic representation of declared knowledge, preferences, values, roles, relationships, permissions, and context. 067-B shows the model forming only around explicit boundaries and consent. The created artifacts are the **Personal Knowledge Schema** and **Identity Context Layer**.

Canonical lineage is exact: `023`, `024`, `029`, `035`, `036`, `058` → `cap:067`. Engine version: `067.1.0`.

## Schema and boundary model

Declaration kinds are `KNOWLEDGE`, `PREFERENCE`, `VALUE`, `ROLE`, `RELATIONSHIP`, `PERMISSION`, and `CONTEXT`. Every declaration is source-addressable and explicitly states ownership, consent, context, use, and inference boundaries. Edges connect declarations only through `APPLIES-IN`, `QUALIFIES`, `PERMITS`, `LIMITS`, and `RELATES-TO`. All states belong to a synthetic fixture; none verify identity or determine ownership, consent, capacity, authority, privacy, intellectual-property, contractual, or other legal rights.

## Deterministic states

| Scenario | Result | Required behavior |
| --- | --- | --- |
| `MODEL-BOUNDARIES-CLEAR` | `MODEL BOUNDED` | Exposes only the complete fixed declarations and their allowed uses. |
| `CONSENT-WITHHELD` | `CONSENT HOLD` | Blocks use governed by the withheld synthetic consent declaration. |
| `CONTEXT-EXPIRED` | `CONTEXT REVIEW` | Holds a declaration when its fixed context has expired. |
| `OWNERSHIP-UNDECLARED` | `OWNERSHIP UNKNOWN` | Treats absent ownership declaration as unknown, never as permission. |
| `INFERENCE-BLOCKED` | `INFERENCE BLOCKED` | Refuses to manufacture an attribute beyond the declared fixture. |

Precedence is consent → context → ownership → inference → bounded. Input must recursively exactly equal one exported fixture. Unknown scenarios, missing/extra/drifted fields, hostile getters/proxies, and malformed values return `INVALID` and never throw.

## Export schema

The UI export must contain `build`, `version`, `fixture`, `exportedAt`, exact `canonical.uses`, `canonical.creates`, `admission`, cloned `input`, cloned `result`, and `replay`. Recommended filename: `synthetic-personal-knowledge-model.json`. Export must say synthetic-only, no persistence, no surveillance, no real people or personal data, and preserve every consent, context, ownership, and inference hold.

## Non-claims

This fixture does not verify identity, personhood, capacity, authority, or representation. It does not determine ownership, valid consent, privacy, intellectual-property, contractual, or other legal rights. It does not infer psychology, traits, emotions, intent, diagnosis, risk, or any undeclared attribute. It does not persist, monitor, track, score, surveil, speak for, decide for, or act for anyone.
