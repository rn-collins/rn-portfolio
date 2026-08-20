# Build 026 — Messy Data Trust X-Ray

Canonical job: Show what happened to messy data before anyone relies on it.

Canonical B-Web: Records normalize, deduplicate and retain reversible provenance.

Canonical lineage: uses 010, 011, and 020; creates cap:026; consumed by 028, 031, 035, and 099.

## Derived implementation

026-A applies explicit, versioned rules to a synthetic three-record fixture. It preserves each source identity, displays before-and-after values, records reversible transformations, and holds possible duplicates for human review rather than silently merging them.

026-B moves records through RAW, NORMALIZE, REVIEW, and TRACE stages.

The question, thesis, fixture, normalization rules, duplicate grouping rule, statuses, public explanation, and B-page title are derived implementation copy. TRACEABLE means the displayed changes can be inspected and reversed; it does not establish source truth, identity, legality, statistical validity, or fitness for a real decision.
