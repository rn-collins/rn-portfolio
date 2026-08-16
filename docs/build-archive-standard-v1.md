# Build Archive Standard v1

## Purpose
The public gallery is the durable system of record for The 100. Conversation, scratch work, local runtime files and temporary previews may help create the work, but no material part of a build may depend on those surfaces for long-term retrieval.

## Standing rule
For every active numbered build, the website must preserve enough of the work that a future reviewer can reconstruct what was researched, planned, built, rejected, tested, generated and left forward without reading the originating chat.

## Required archive classes
1. **Question / problem** — the public question, job to be done, thesis and intended user value.
2. **Research / evidence** — source families, provenance boundaries, domain research, evidence status, research gaps and relevant freshness notes.
3. **Created artifacts** — A-Web, B-Web, B-LinkedIn, exports, reusable engines/components, schemas, datasets or other durable outputs created by the cycle.
4. **Architecture / decisions** — consequential design and engineering choices, technological-ceiling survey, rejected approaches, heuristics, thresholds, tradeoffs and non-claims.
5. **Audit / release** — acceptance matrix, adversarial fixtures, browser evidence, accessibility/manual distinctions, privacy/support, resilience/performance, security and release records as applicable.
6. **Media** — downloadable final social/media derivatives plus format, version/checksum and production/QA record when such derivatives are part of the cycle.
7. **Lineage** — concrete inherited artifacts and newly created reusable infrastructure, with implementation evidence rather than thematic similarity.
8. **Canonical source inventory** — repository paths that preserve the implementation and governance record.
9. **Plans / open threads** — only forward work that materially explains what a later build is expected to inherit, validate or resolve.
10. **Limits** — what the build cannot claim, what remains manual, and what evidence or capability would be required to strengthen it.

## Public information architecture
- `/100-builds/archive` — program-level archive and archive policy.
- `/100-builds/{id}/archive` — complete durable archive for a numbered build.
- `/100-builds/{id}/record` — concise Making / Method / Evidence / Limits record.
- `/100-builds/{id}/a` — functional artifact.
- `/100-builds/{id}/b` — interactive visual master.
- Build room — links all of the above and exposes downloadable media when durable ingest is complete.

## Chat-independence acceptance test
A build fails archive completeness if a material statement such as “we researched X,” “we rejected Y,” “this threshold came from Z,” “the film was generated,” “this remains manual,” or “the next build must inherit Q” can only be recovered from conversation history.

## No folder-dump rule
Archive completeness does not mean exposing private repository internals indiscriminately. The public archive must organize the substance into understandable research, creation, decision, audit, media, lineage and plan layers, while retaining canonical repository paths for implementation traceability.

## Sensitive information
Secrets, private credentials, personal data, privileged/confidential client material and information that cannot lawfully or ethically be made public are excluded from the public surface. Their existence/status may be recorded at an appropriate abstraction level when needed for provenance or release truthfulness.

## Release integration
Beginning with Build 007, archive completeness is a standing release requirement. A cycle should not move to its final public state while material build knowledge remains only in chat, local runtime storage, or an unlinked repository file.

## Required cycle-start scaffold
Beginning with Build 007, start the durable record with:

```bash
pnpm scaffold:archive 007 "Build title"
```

The command creates both a human-readable working archive record and a machine-readable archive ledger, refuses to overwrite an existing record, and includes all required archive, media, lineage, limitation, and certification fields. These records must be updated during research, planning, building, media generation, and audit—not reconstructed after release.

The scaffold is an intake boundary, not evidence of completion. Release still requires public archive registration, allowlisted full records where appropriate, durable A/B/media artifacts, current canonical source paths, and an exact-head Chromium/WebKit certification.

