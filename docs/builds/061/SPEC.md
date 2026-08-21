# Build 061 — Why Did We Decide That?

## Canon
- Job: Recover evidence, assumptions, alternatives, dissent and outcomes behind an important decision.
- B-Web: A decision time machine compares what was known then versus now.
- Uses: 020, 029, 058.
- Creates: `cap:061`.
- Consumers: 071, 088, 089.

## Contract
Engine `061.1.0` uses fixed synthetic decision events. Then-known evidence, assumptions, alternatives, dissent, authority and timestamps remain separated from later outcomes, evidence and append-only corrections. The original record is never overwritten. Later evidence cannot be attributed backward as hindsight.

Exact inherited contracts: `020.2.0` linked decision ledger and append corrections; `029.2.0` exact-value/registered-impact limits; `058.1.0` claim-support linkage limits. Recursive structural validation is serialization-free and no-throw for malformed, duplicate, reordered, extra, non-finite, BigInt, proxy/accessor and serialization-hook inputs.

## Boundaries
All records are synthetic. Not proof of truth, causation, reasonableness, valid authority, completeness, correctness, legality, negligence, intent, accountability, knowledge, belief or outcome attribution. Sequence does not establish cause. Authority labels are assertions. Real use requires source and timestamp verification, access/retention governance, correction provenance, competent domain review, affected-party/dissent review, and legal review where relevant.
