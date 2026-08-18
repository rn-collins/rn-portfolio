# Build 019 archive

Build 019 turns a wall of alerts into an inspectable chain: correlated event, consequence, evidence, required authority, named owner, compatible channel, acknowledgement deadline, backup, suppression state, and reason.

The synthetic fixture contains three signals describing one failed decision-notice delivery plus one routine summary. The router correlates the failure signals, suppresses the low-consequence summary, and escalates after the primary owner misses the acknowledgement deadline. A bounded simulation moves the clock back inside the acknowledgement window and restores the primary route.

The public demonstration is local-only and synthetic. It does not determine legal duties, emergency severity, clinical priority, employment obligations, regulatory reporting, or whether any real person should be contacted. Those decisions require the governing context, verified evidence, valid contact paths, accessible communication, competent reviewers, and the people affected.

## LinkedIn film production

- Production record and full transcript: `docs/builds/019/LINKEDIN-PRODUCTION.md`
- Canonical film source: Build 019 in `data/linkedin-film-specs-v1.json`
- Renderer and workflow: `scripts/render-linkedin-films.py` and `.github/workflows/render-linkedin-films.yml`
- Candidate assets: MP4 and poster remain pending workflow execution; checksums, workflow identifiers, sampled-frame review, phone-size readability, and upload/compression QA are not yet certified.
