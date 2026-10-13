# RN Builds

A public portfolio and evidence registry of shipped digital products, research tools,
monitoring systems and governance prototypes.

**Live:** https://rn-portfolio-khaki.vercel.app

## What this establishes

That the builds listed exist, are deployed, and can be opened and inspected. Each entry
carries its own live URL, so the claim and the artefact are never separated.

## What it does not establish

It is an exhibition, not an audit. A build appearing here is not a statement that it is
finished, maintained, or in production use, and the registry does not rank the work or
measure its effect. The reasoned index — what each build establishes, what it does not,
and what is deliberately held back — is at
[rn-selected-work.vercel.app/builds](https://rn-selected-work.vercel.app/builds).

## Repository

Next.js and TypeScript. The archived `80-builds` and `100-builds` directories are earlier
milestone snapshots of the exhibition, kept rather than overwritten so the sequence stays
legible.

## Release gate

The public site shows a build only once it is released. `data/releases.json` is the one place that decides this, with one entry per build: `id` (for example `builds/001`), `title`, `releasedAt` (a date in Pacific/Honolulu, or empty), `hold`, `postUrls`, `longFormUrl` and `sourcePageUrl`.

- A build is released when `releasedAt` is today or earlier in Hawaii and `hold` is false. An empty date means unreleased.
- Every build is held today, because no build has a posting date on record. To release one, set its `releasedAt` to the day its post went live, set `hold` to false and add the post links to `postUrls`.
- `pnpm --filter @rn/web build` (what Vercel runs) builds the static export, removes every page, film, transcript, poster, cover, archive document, sitemap entry and script that belongs to a held build, then checks the result and fails if anything held is left or any link is broken. A held build's address returns 404.
- Carousel slides, carousel operations, Canva packages and platform export bundles stay private until they have release records of their own. Program pages that describe all 100 builds (the program archive and the Netherlands 2026 studio) open once every build is released.
- `.github/workflows/daily-release.yml` runs every day at 00:05 Hawaii time. On a day when a build is released it pushes an empty commit to `main`, which makes Vercel rebuild and redeploy.
- The browser tests run the dev server with `RELEASE_GATE_PREVIEW=1`, which shows every build locally. Run `RELEASE_GATE_PREVIEW=1 pnpm dev` to preview the same way. A production build refuses that setting.
