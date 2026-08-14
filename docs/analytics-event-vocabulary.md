# RN Builds minimal analytics vocabulary

Foundation principle: collect only events needed to understand whether a public build is usable; do not introduce identity, fingerprinting, keystroke capture, raw form-content capture or sensitive-data analytics as a default.

## Program events
- `exhibition_view`
- `build_detail_view`
- `build_a_open`
- `build_a_start`
- `build_a_complete`
- `build_b_open`
- `build_b_advance`
- `build_b_complete`
- `build_error`

Permitted default properties: build ID, A/B artifact, version, phase, anonymous session-scoped interaction count, viewport class, completion/error state. User-entered build content is excluded unless a future build has an explicit, justified, consented data design.
