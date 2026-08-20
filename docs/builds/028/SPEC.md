# Build 028 — Finding Is Part of Knowing

Canonical job: Search a corpus by keyword, meaning, facets and evidence relevance without hiding ranking logic.

Canonical B-Web: Results reorganize around the actual question and ranking rationale.

Canonical lineage: uses 010 and 026; creates cap:028; consumed by 045, 047, 050, 051, 052, 058, 059, 062, 063, 064, 066, 069, 076, 079, 081, 082, 090, and 099.

## Derived implementation

028-A searches four synthetic, schema-valid, Build-026-normalized document records. Keyword, deterministic concept expansion, topic/evidence facets, evidence-priority weights, stable tie-breaking, and the full per-result score breakdown are visible. An empty query returns no results rather than quietly returning the corpus.

028-B changes the question and visibly reorders a small result stack while explaining the ranking rationale.

The corpus, queries, concept map, source fixtures, weights, filters, thresholds, tie-break, B-page title, and explanatory copy are derived. Ranking relevance does not establish truth, authority, completeness, endorsement, legal status, scientific quality, or sufficiency for a decision.
