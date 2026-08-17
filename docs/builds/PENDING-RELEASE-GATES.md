# Pending release gates

Updated: 2026-08-17

These gates remain open and must not be represented as passed, certified, or waived.

| Build | GitHub-hosted CI | LinkedIn/media render and certification | Cause | Completed evidence that remains valid |
|---|---|---|---|---|
| 014 | Pending | Pending | GitHub Actions included minutes exhausted; Actions budget is $0 with stop usage enabled. | Local gates, Vercel READY deployment, and live browser verification. |
| 015 | Pending | Pending | GitHub Actions included minutes exhausted; Actions budget is $0 with stop usage enabled. | Lineage, archive validation, TypeScript, ESLint, 278-page production build, Vercel READY deployment, live interaction verification, and zero observed runtime errors. |
| 016 | Pending | Pending | GitHub Actions included minutes exhausted; Actions budget is $0 with stop usage enabled. | Lineage, archive validation, TypeScript, ESLint, 281-page production build, and Vercel READY deployment. Live interaction verification is recorded separately when complete. |

## Closure rule

After Actions capacity returns, rerun the canonical CI and media workflows against each build's exact recorded head. Record workflow run IDs, job results, artifact identity, media SHA-256, deployment identity, and exact-head correspondence before changing either gate to passed.
