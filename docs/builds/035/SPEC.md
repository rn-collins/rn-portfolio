# Build 035 — Data Exit & Portability Test

## Frozen canon
- Job: Test whether exported data is complete, readable, reusable and actually movable elsewhere.
- B-Web: Data attempts to leave one system and survive another.
- Uses: 010, 026, 029. Creates: cap:035.

## Integrity model — engine 035.2.0

The engine separates schema-required, use-case-required, and optional fields. Completeness covers required and declared-use fields; omission of optional data is visible but not silently scored as required. Unique field identity, source/target schema versions, tested compatibility, mapping, and type are explicit.

Included fields preserve null semantics, ordering where meaningful, identifiers, references, provenance identity/freshness, transfer-rights status, attachment structure, and declared loss. CSV is blocked for arrays/references/attachments without explicit reversible encoding. A deterministic round trip is required per included field.

`PACKAGE STRUCTURALLY REPLAYABLE` means only that declared synthetic values round-trip under the tested mapping and versions. Machine-readable means parseable—not understandable, reusable, semantically equivalent, compatible, legally portable, or successfully migrated. This feature does not call a target, transfer bytes, validate attachments, exercise scale, or delete source data.

Lineage covers Build 010 schema, Build 026 provenance, and Build 029 change trace. Export preserves ordered original/derived state, schemas, mappings, types, null/order/reference rules, rights, loss, provenance, exact replay input, engine version, privacy, and limitations. Do not enter real account, personal, confidential, privileged, or licensed data.

A/B provide native reversible keyboard controls, live status, a described journey, visible focus, 320px layout, and reduced-motion handling. Real target import/round trip, attachment checksums, vendor/version compatibility, rights/legal review, source deletion verification, privacy/security review, authenticated browser, physical-device/manual accessibility, hosted CI, and LinkedIn verification remain external gates.
