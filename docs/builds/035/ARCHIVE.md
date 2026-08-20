# Build 035 archive contract

Replay with engine `035.2.0`, `data/build-035-engine-v1.json`, and an explicit local `data-portability-test-record`.

- Frozen: canonical title, job, B-Web sentence, sequence, lineage.
- Derived: schemas, fixture fields, optional/required semantics, mappings, types, null/order/reference behavior, rights, losses, round trips, statuses, copy.
- Lineage: 010 schema, 026 provenance, 029 change trace.
- Blockers/findings: duplicate IDs, required omission, incompatible version, absent mapping/type, type change, lost null/order/reference, stale provenance, uncleared rights, lossy conversion, missing round trip, CSV structural loss.
- Boundary: parseable is not reusable; modeled package is not real movement; source deletion never occurs.
- Privacy: synthetic client-local transient state, no collection/persistence/submission, explicit download only.

Real imports, production scale, attachments, compatibility, rights/legal review, deletion verification, authenticated browser, physical-device/manual accessibility, hosted CI, and LinkedIn platform behavior remain independent gates.
