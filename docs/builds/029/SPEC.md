# Build 029 — Change & Consequence Explorer

Canonical job: Show what changed between versions and what downstream records or decisions are affected.

Canonical B-Web: A semantic diff propagates consequences through a dependency graph.

Canonical lineage: uses 010 and 020; creates cap:029.

## Derived implementation

Engine 029.2.0 implements the canonical “semantic diff” phrase as a schema-bound exact-value comparison. It does not infer meaning, renamed fields, causation, or legal effect. Each field has a stable registered identity, type, label, and derived materiality; unknown fields and type mismatches block interpretation.

The version event requires a stable ID, actor, ordered date, reason, bounded authority, and current evidence for both reason and authority.

Direct field-use nodes are followed across every simple registered downstream path in deterministic order. Multiple paths to one node remain visible. Cycles, self-dependencies, unregistered nodes, and unknown field dependencies block impact interpretation rather than being silently skipped.

Outputs say “registered potentially affected.” They do not claim that a change caused a downstream outcome, that an affected decision must change, or that the dependency registry is complete.

The export contains the schema, versions, event, registry, exact changes, every path, deterministic ordering rules, and schema/graph fingerprints for replay.

029-B exposes graph state as accessible ordered text rather than a hidden visual alone.

All fixture data, field definitions, materiality labels, graph, traversal, statuses, and copy are derived. A mapped path does not establish causation, legal effect, actual materiality, change validity, or complete discovery.
