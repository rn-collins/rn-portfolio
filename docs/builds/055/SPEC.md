# Build 055 — Let the Smart Home Explain Itself

## Canon

- Job: Let a smart environment act while preserving explanation, authorization, override and recovery.
- B-Web: An interactive environment simulates actuation, conflicts, outages and rollback.
- Uses: 036, 040, 054.
- Creates: `cap:055`.
- Direct consumer: 097.

## Product and contract

Version A moves through four exact-bound synthetic states: authorized change, authority conflict, modeled dependency outage, and rollback request. Version B makes the explanation → authorization → override → recovery path visible. Engine `055.1.0` produces only a modeled policy action: `CONTINUE`, `ASK`, `FALLBACK`, or `STOP`. No device command, network request, persistence, recognition, or real-world action exists.

The fixture reconciles Build 036 engine `036.2.0` and its offline queue/idempotency/conflict/version/reconciliation/data-loss limits; Build 040 engine `040.3.0`, policy `040-policy-3`, and its exact action vocabulary; and Build 054 engine `054.2.0`. Modeled outage is not a live outage. Modeled fallback is not evidence that a fallback works. Urgency never relaxes authority, consent, override, stop, or recovery boundaries.

Recursive exact comparison validates every object, key, ordered array, primitive, and inherited contract without serialization. Missing, duplicate, extra, reordered, mismatched, non-finite, BigInt, accessor/proxy, or serialization-hook-bearing state fails closed without throwing. Export is atomic, complete, and state-only.

## Boundaries

Synthetic/non-operational demonstration only. Not a real smart-home controller, identity or presence system, authorization or consent verifier, safety system, accessibility or accommodation determination, security control, privacy guarantee, legal conclusion, outage test, recovery test, or proof of fallback effectiveness. It does not infer a person, disability, health, mood, preference, behavior, occupancy, risk, or protected trait.

Real implementation requires verified device and facilities authority; granular revocable consent; visible preview and explanation; local/manual override and stop; tested rollback, offline behavior, idempotency, conflict resolution, reconciliation, recovery and data-loss handling; authentication, authorization, least privilege, secure update and logging controls; data minimization and retention controls; multi-person rights governance; and security, privacy, safety, accessibility, disability-justice, facilities, legal, human-factors, and incident-response review.
