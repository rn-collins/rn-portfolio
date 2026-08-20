# Build 026 — Messy Data Trust X-Ray

Canonical job: Show what happened to messy data before anyone relies on it.

Canonical B-Web: Records normalize, deduplicate and retain reversible provenance.

Canonical lineage: uses 010, 011, and 020; creates cap:026; consumed by 028, 031, 035, and 099.

## Derived implementation

026-A applies explicit version 026.2.0 rules to a synthetic fixture. Every normalized record retains its complete raw snapshot, source locator, source identity, before and after values, named rule, and rule version. Empty or malformed amounts are not silently coerced. Only structurally valid normalized emails can create duplicate candidates.

A duplicate candidate remains a group of separate source records. Closing review requires the exact candidate set, decision, reviewer, date, evidence reference, and rationale. A confirmed-same-entity decision additionally requires a Build 011 identity-resolution record. No decision merges, overwrites, or deletes a source record.

026-B moves records through RAW, NORMALIZE, REVIEW, and TRACE stages.

The question, thesis, fixture, rules, duplicate grouping, statuses, public explanation, and B-page title are derived. TRACEABLE means the displayed changes and review decisions can be reconstructed; it does not establish truth, identity, legality, statistical validity, migration safety, or fitness for a real decision.
