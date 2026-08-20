# Build 029 Archive

## Canonical record

- Title: Change & Consequence Explorer
- Job: Show what changed between versions and what downstream records or decisions are affected.
- B-Web: A semantic diff propagates consequences through a dependency graph.
- Uses: Builds 010 and 020
- Creates: cap:029

## Created

- Schema-bound exact-value Version Model and Diff
- Structured evidence-bearing version event
- Direct and recursive all-simple-path dependency trace
- Explicit cycle and missing-dependency failure states
- Noncausal “registered potentially affected” language
- Deterministic replay export with schema and graph fingerprints
- Accessible interactive consequence graph

## Boundaries

“Semantic diff” is canonical language implemented here as exact-value comparison, not semantic interpretation. Registered paths identify review candidates; they do not prove causation, legal effect, materiality, actual downstream change, or completeness. The fixture is synthetic and browser-local.

Authenticated live-browser, physical-device accessibility, GitHub-hosted CI, and LinkedIn media certification remain independent gates.
