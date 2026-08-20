# Build 029 — Change & Consequence Explorer

Canonical job: Show what changed between versions and what downstream records or decisions are affected.

Canonical B-Web: A semantic diff propagates consequences through a dependency graph.

Canonical lineage: uses 010 and 020; creates cap:029; consumed by 030, 034, 035, 036, 037, 044, 046, 047, 056, 057, 058, 059, 060, 061, 063, 064, 065, 066, 067, 069, 071, 076, 077, 091, 093, 094, and 099.

## Derived implementation

029-A compares two versions of one stable synthetic entity. It requires distinct version IDs, ordered effective dates, actor, reason, and evidence. Field-level added/removed/changed records enter direct field-use dependencies, then propagate across registered node relationships. The trace exports locally.

029-B changes one semantic field at a time and illuminates its registered consequence path.

The question, thesis, fixture, materiality sets, dependency graph, propagation algorithm, status labels, B-page title, and explanatory copy are derived. A mapped path does not prove causation, legal effect, actual materiality, change validity, completeness, or that an affected decision must change.
