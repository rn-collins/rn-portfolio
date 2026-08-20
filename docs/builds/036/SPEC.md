# Build 036 — Resilience Mode / Offline Survival Test

## Frozen canon
- Job: Show what still works when internet, cloud or upstream services disappear.
- B-Web: The user severs dependencies and watches functions degrade and recover.
- Uses: 023, 024, 029, 035. Creates: cap:036.

036-A cuts synthetic dependencies and deterministically marks each capability WORKS, DEGRADED, or UNAVAILABLE, tests queued fallbacks, and exports locally. 036-B severs and partially recovers a dependency field. Native controls, live status, visible focus, 44px actions, 320px layout, and reduced motion are supported.

This is not a disaster-recovery certification, uptime promise, load test, security review, or proof of real offline behavior. No live service is cut and no persistent offline store is installed.
