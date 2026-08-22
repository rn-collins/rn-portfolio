# RN Builds — Release Templates v1.0

These records are mandatory per build unless explicitly N/A with rationale.

## Browser/device support
Record: core supported browsers/devices; optional APIs; feature-detection behavior; desktop/mobile restrictions; network/model requirements; failure message; fallback that preserves first value.

## Privacy/data flow
Record each input/output: collected data; processing location (browser/server/external); transmission; persistence; logs/telemetry; URL/share exposure; export; deletion/reset; sensitivity warning; third parties. A claim such as “stays in your browser” is allowed only when every relevant path is verified.

## Artifact manifest
For A, B-Web, B-LinkedIn, evidence manifest and release record: route/path, version, commit, content hash when file-based, dimensions/fps/duration for film, generator/source spec, QA status, accessibility status, known limitations.

## Freshness/revalidation
Evidence/API dependencies receive `checkedAt`, `status`, and a recheck trigger. Trigger examples: source superseded/revised; law effective-date change; browser API compatibility change; dependency/security advisory; build behavior changes. Consequential source-driven builds may not imply timelessness.

## Acceptance matrix values
`PASS`, `BLOCKING`, `DEVICE_MANUAL`, `DEFERRED_WITH_RATIONALE`, `NOT_APPLICABLE`.
No blank cells. `PASS` requires evidence reference (test, manifest, commit, manual record, or source record).

## Public record
Each build exposes Making, Method, Evidence, Release/Status and Lineage from the build room. Shared rendering/template is preferred so omissions are structurally difficult.
