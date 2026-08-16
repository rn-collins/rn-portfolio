# Builds 001–006 Archive + Media Backfill — Certified Integration Record

Status: CERTIFIED
Certified code head: `2558b8cc7927f450721be956e3a1f84e1b198e4d`
RN Builds Platform CI: `31948225262`
Certification date: 2026-08-16

## Scope certified
- Program archive and complete Builds 001–006 archives
- Seven public durable record classes per build
- Allowlisted full retained-record reader and arbitrary-path denial
- Canonical generated B-LinkedIn MP4s and posters for Builds 001–006
- Manifest v2 as the sole media authority
- Downloadable/previewable media in archives and build rooms
- Builds 005 and 006 public IN THE LAB rooms with A, B, archive, public-record, lineage, program-archive, and film routes
- Desktop Chromium and mobile WebKit behavior
- 320px archive usability
- Real MP4 and poster body retrieval
- Reusable archive scaffold for Build 007+
- Archive-scaffold validity enforced by CI

## Automated result
The exact certified head passed:
- `pnpm validate:lineage`
- `pnpm validate:archive-scaffold`
- `pnpm typecheck`
- `pnpm lint`
- production build
- Chromium + WebKit installation
- the complete Playwright E2E matrix

## Deployed-preview verification
The exact-head Vercel preview was inspected across the main gallery, program archive, Builds 001/005/006 archives, Builds 005/006 canonical rooms, allowlisted retained-record reader, MP4s, and posters. The manipulated non-allowlisted route `/100-builds/archive/source/package.json` returned the public 404.

## Integration decision
The certified branch is a strict descendant of `workstream/build-006` and of the archive-backfill workstream. It is not merged into `main`, because `main` is a materially diverged obsolete lineage. Build 007 must branch from this certified integrated workstream so archive, media, reader, release, and lineage infrastructure are inherited intact.

## Infrastructure left forward
- `docs/build-archive-standard-v1.md`
- `scripts/scaffold-build-archive.mjs`
- `pnpm scaffold:archive <ID> "Build title"`
- `pnpm validate:archive-scaffold`
- `data/linkedin-film-specs-v1.json`
- `scripts/render-linkedin-films.py`
- `.github/workflows/render-linkedin-films.yml`
- `docs/builds/linkedin-media-manifest-v2.json`
- `apps/web/app/100-builds/_archive/public-documents.ts`
- `tests/archive-backfill.spec.ts`

## Closure
The 001–006 archive/media backfill is complete. Build 007 may begin only from the integrated descendant branch created after this record is committed and its administrative head remains green.
