# Canonical recognizable-entity and visual-source schema

Version 2 normalizes all 100 records to one editorial and release contract.

- `entityLedHook` must equal the visible opening-frame headline/body. A contextual authority that is absent from the cover may not be prepended to the public hook.
- `cover.altText` must transcribe the visible opening-frame text and identify the current asset as creator-owned typography.
- `recognizableEntity` is either a directly relevant contextual authority with a documented source search or an explicit `research-open subject`. Fame alone is never sufficient.
- Empty candidate arrays are permitted only for explicit research-open records.
- Context pages are not cleared assets. Every candidate remains on HOLD until an exact asset URL, creator, rights statement, permission, credit, alt text, dimensions, crop and claim scope are complete.
- Every build has a unique platform package and Canva editorial template/slide assignment.
- `canva.generationAuthorized` is always false in this audit.
- Canonical production status is `CURRENT COVER READY / EXTERNAL VISUAL HOLD / CANVA NOT AUTHORIZED`.

Run `node scripts/validate-visual-source-packages.mjs`.
