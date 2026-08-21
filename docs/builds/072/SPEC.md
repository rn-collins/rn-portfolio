# Build 072 — Hawaiʻi Cannabis Access Systems Map

`072-A` maps patient access, provider availability, interisland transport, supply continuity, policy administration, community context, and infrastructure relationships across exactly five wholly synthetic generalized island scenarios. `072-B` shows how one fictional statewide administrative signal can fracture into different island-level operational signals without describing real conditions.

## Canonical contract

- Uses: `045`, `046`, `047`
- Creates: `cap:072`
- Artifacts: `Hawaiʻi Access Graph`; `Island Comparison View`
- Engine: `072.1.0`
- Export: `synthetic-hawaii-cannabis-access-map.json`

## Frozen scenarios

1. `ISLAND-NORTH-PROVIDER-GAP` → `PROVIDER GAP SIGNAL`
2. `ISLAND-EAST-TRANSPORT-CONSTRAINT` → `TRANSPORT CONSTRAINT SIGNAL`
3. `ISLAND-SOUTH-SUPPLY-DISCONTINUITY` → `SUPPLY DISCONTINUITY SIGNAL`
4. `ISLAND-WEST-INFRASTRUCTURE-OUTAGE` → `INFRASTRUCTURE OUTAGE SIGNAL`
5. `ISLAND-CENTRAL-COMMUNITY-REVIEW` → `COMMUNITY REVIEW SIGNAL`

The directional island labels are invented interface labels, not substitutes for or claims about any real island.

## Admission and boundaries

Only the exact five frozen fixtures are admitted. Unknown keys, mutations, getters, proxies, real-record flags, authority claims, lineage drift, malformed values, and unknown scenarios fail closed to `INVALID` without throwing. Every person, provider, program, product, transport path, supply signal, policy record, community-context placeholder, and infrastructure condition is synthetic.

The engine does not state current law, determine eligibility or access, give legal or medical advice, verify providers, recommend products, or make clinical, safety, effectiveness, diagnosis, treatment, or dosage claims. `COMMUNITY-CONTEXT` preserves a review boundary only. It never claims Native Hawaiian cultural authority, knowledge, consent, endorsement, consultation, or representativeness. No single statewide record is treated as proof of an island-specific operational reality.

## Determinism

Every valid result preserves seven dimensions, explicit relationships, island difference, unknowns, non-claims, and an ordered ten-stage audit. Exact deep comparison admits only the frozen scenario object. Any error returns the stable `INVALID` result.
