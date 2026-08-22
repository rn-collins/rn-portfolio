# Build 028 — Finding Is Part of Knowing

Canonical job: Search a corpus by keyword, meaning, facets and evidence relevance without hiding ranking logic.

Canonical B-Web: Results reorganize around the actual question and ranking rationale.

Canonical lineage: uses 010 and 026; creates cap:028; consumed by 045, 047, 050, 051, 052, 058, 059, 062, 063, 064, 066, 069, 076, 079, 081, 082, 090, and 099.

## Derived implementation

028-A searches four synthetic Build-026.2.0-normalized records. Engine 028.2.0 defines keyword as normalized exact-token matching and “meaning” as a small, disclosed, deterministic concept map—not embeddings, inference, semantic understanding, or intent detection. Unknown query terms receive no concept-map match.

Topic and evidence facets filter eligibility before scoring. Evidence-level bonuses require current classification records but do not establish source quality or sufficiency. Source freshness is displayed with zero ranking weight. Every result exposes each score part, the stable document-ID tie-break key, normalization provenance, and evidence basis.

Empty, punctuation-only, and connective-word-only queries return no corpus. Queries over 200 characters or 20 substantive tokens are rejected. Corpus provenance blockers withhold all ranking.

The export contains the complete corpus and input, normalized query, concept expansions, weights, tie-break, corpus fingerprint, ranked IDs, and score parts for deterministic engine replay.

028-B exposes its illustrative order to assistive technology as both an ordered list and live text.

All corpus content, queries, concept map, weights, filters, limits, thresholds, tie-break, B title, and copy are derived. Relevance does not establish truth, authority, completeness, endorsement, legal status, scientific quality, or sufficiency.
