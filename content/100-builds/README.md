# The 100 content system

The 100 is a research corpus and an executable method—not a queue of 100 mandatory posts.

The governing editorial rule is:

> Every build may produce content, but no build is owed a post.

This directory is the durable source of truth for deciding what the corpus can honestly become.

## Files

- `content-opportunity-map.json` — machine-readable decisions and content opportunities for all 100 builds.
- `content-opportunity-map.md` — the same 100-build map in a human-readable audit.
- `series-architecture.md` — the project thesis, ten phase chapters, seven cross-build series and DDW × AI & Big Data lens.
- `editorial-operating-model.md` — atoms, evidence levels, hard publication gates, merge rules and release workflow.
- `series.json` — structured definitions for the seven cross-build public series.

## Public architecture

1. One manifesto: **RN makes invisible decision systems inspectable.**
2. Two reconstructed pilots: Builds 001 and 030.
3. Four to eight later flagships promoted only after evidence advances.
4. Seven cross-build series organized around real audience questions.
5. Ten phase chapters showing how the method develops.
6. One preserved 100-build atlas containing provenance, status, lineage and evidence boundaries.

Build numbers are provenance. They do not create a publication obligation.

## Release rule

`data/releases.json` remains the final binary gate for public build pages. All current builds remain held. Supporting and merged builds may contribute credited atoms to a parent case without receiving a standalone release.

Before any piece enters production, it must pass the eight non-compensable gates documented in `editorial-operating-model.md`: distinct question, audience job, RN proposition, technical truth, evidence sufficiency, boundary integrity, non-duplication and format fitness.

Run `pnpm validate:content-system` after changing this system.
