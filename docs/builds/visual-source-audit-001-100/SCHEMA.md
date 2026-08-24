# Canonical recognizable-entity and visual-source schema

Version 2.1 normalizes all 100 records to one fail-closed editorial and release contract.

- Public hook and alt text preserve the actual opening-frame wording without invented authority prefixes or malformed terminal punctuation.
- Every record contains at least one candidate-search log. A research-open log may document a limited negative first-party inventory check, but must state its breadth and next external research step; it may not claim exhaustive completion.
- Each candidate requires nonempty source page, locator, issuer/creator, rights statement, permission decision, credit, crop guidance, claim scope, context, query, result and decision.
- Permission and decision fields must explicitly say HOLD, REJECT or not-cleared. Positive cleared/approved/authorized semantics fail validation.
- When `exactAssetUrl` is null, alt and dimensions may remain null. A selected exact asset requires complete asset-level alt, orientation and numeric dimensions.
- Context pages are not cleared assets. No external asset is selected in this audit.
- Every build has unique LinkedIn, Instagram, X, carousel and Canva editorial assignments.
- `canva.generationAuthorized` is always false.
- Canonical production status: `CURRENT COVER READY / EXTERNAL VISUAL HOLD / CANVA NOT AUTHORIZED`.

Run:

- `node scripts/validate-visual-source-packages.mjs`
- `node scripts/test-visual-source-validator.mjs`
