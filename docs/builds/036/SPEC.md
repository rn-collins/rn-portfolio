# Build 036 — Resilience Mode / Offline Survival Test

## Frozen canon
- Job: Show what still works when internet, cloud or upstream services disappear.
- B-Web: The user severs dependencies and watches functions degrade and recover.
- Uses: 023, 024, 029, 035. Creates: cap:036.

## Integrity model — engine 036.2.0

The interface changes synthetic dependency states; it does not sever live services or prove browser offline execution. Dependencies declare available, slow, intermittent, or unavailable state, direct upstream requirements, evidence identity, and freshness. The engine expands transitive dependencies and blocks duplicates, missing nodes, self-links, and cycles.

Capability states are explicitly `MODELED WORKS`, `MODELED DEGRADED`, or `MODELED UNAVAILABLE`. Modeled works means only that every declared direct/transitive dependency is available and the declared cache is fresh. Stale cache degrades; corrupt/missing cache blocks fallback. Hidden dependencies, partial latency, intermittent failure, eviction, quota, device behavior, and upstream vendor behavior remain untested.

Queued recovery declares idempotency and conflict strategy. Service-worker, client, and queue schema versions must match. Reconnect still requires reconciliation and data-loss checks; last-write-wins is not silently treated as safe. Offline processing must remain inside the Build 023 consent snapshot and Build 024 minimization record. Build 029 change trace and Build 035 portable exit are required lineage.

The export preserves exact dependency/capability order, direct/transitive inputs, cache and queue controls, versions, consent/privacy lineage, original and derived state, exact replay input, engine version, and limitations. No persistent offline store or service worker is installed by this fixture.

A/B provide native reversible keyboard controls, live status, described network, focus visibility, 320px layout, and reduced-motion handling. Real browser/device offline tests, service-worker lifecycle/version upgrades, cache eviction/corruption, partial network simulation, production queue/idempotency/conflict/reconciliation/data-loss tests, privacy/security review, authenticated browser, physical-device/manual accessibility, hosted CI, and LinkedIn verification remain external gates.
