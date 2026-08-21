# Build 036 archive contract

Replay with engine `036.2.0`, `data/build-036-engine-v1.json`, and an explicitly downloaded `offline-survival-record`.

- Frozen: canonical title, job, B-Web sentence, sequence, lineage.
- Derived: dependency graph/states, capabilities, caches, queues, versions, reconciliation flags, statuses, copy.
- Lineage: 023 consent, 024 minimization, 029 change trace, 035 portable exit.
- Checks: unique/complete acyclic transitive dependencies; current evidence; fresh/stale/corrupt/missing cache; slow/intermittent/unavailable upstream; idempotency/conflict control; version compatibility; consent; reconciliation/data loss.
- Boundary: modeled state changes are not real outages, offline runtime, service-worker, uptime, load, or disaster-recovery evidence.
- Privacy: synthetic client-local state; no installed persistent store/service worker; no collection/persistence/submission; explicit download only.

Real outage/browser/device tests, service-worker upgrades, cache behavior, production queues and reconciliation, privacy/security review, authenticated browser, physical-device/manual accessibility, hosted CI, and LinkedIn platform behavior remain independent gates.
