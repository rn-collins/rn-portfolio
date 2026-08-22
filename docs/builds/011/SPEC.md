# Build 011 — Entity / Ownership Resolution X-Ray

## Frozen canon

- Job: Determine when records refer to the same person, organization, product, policy, owner or relationship.
- A: Compare two records, inspect source-linked evidence and conflicts, validate the inherited entity model, and record a human resolution.
- B: Duplicate identities merge and split as evidence and confidence change.
- Uses: Build 010.
- Creates: `cap:011`.
- Consumers: 021, 026, 027, 041, 046, 056, 060, 062, 082, 084, 085, 088, 099.

## Concrete inheritance

The resolver directly calls Build 010's `assessIdeaSkeleton`. A merge candidate is blocked unless the entity model is a valid skeleton.

## Evidence boundary

NIST identity guidance supports resolving identity within a defined context, validating attributes against credible or authoritative sources, collecting additional evidence when conflicts remain, and limiting personal information to the minimum necessary. The numeric weights and thresholds are product heuristics.

The artifact does not prove legal identity, ownership, authority, beneficial ownership, fraud, or entitlement. It does not perform biometric matching or query external identity systems.

## Privacy

Working state stays in browser memory. The tool models attribute minimization and warns against unnecessary identifying data. Export is explicit and local.
