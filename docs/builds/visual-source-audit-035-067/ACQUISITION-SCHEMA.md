# Builds 035–067 visual-acquisition extension

This extension sits on the canonical visual-source package and records primary-source acquisition without relaxing its fail-closed rules.

Each candidate records the exact context page and locator, issuer/creator, source date/version, rights/terms URL and evidence, permission decision, credit, crop, claim scope, entity relevance, endorsement boundary, query, result, search breadth, next step, repository suitability, and explicit selection/staging decision.

An official page is not automatically a cleared visual. An external asset may be selected only when an exact asset URL and item-level creator, rights, permission, credit, alt text, intrinsic dimensions, crop and claim scope are verified together. Logos, seals, marks, identifiable people and third-party components require separate review.

This pass selected and staged no external assets. Accordingly all `stagedAssetPath` and `provenanceSidecarPath` values remain null. The current RN-created posters remain the only repository-suitable visuals.

Run `node scripts/validate-visual-acquisition-035-067.mjs`.
