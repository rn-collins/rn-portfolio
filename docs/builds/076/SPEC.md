# Build 076 — Cross-Jurisdiction Regulatory Intelligence Platform

## Canonical contract

Build 076 uses Builds 028, 029, 058, 059, 069, and 075 and creates `cap:076`. Its exact artifacts are `Jurisdiction Registry` and `Comparative Query Layer`.

076-A is **Cross-Jurisdiction Regulatory Intelligence Platform**: it maintains comparable, updateable regulatory intelligence across jurisdictions and sectors. Registry title: **What Is Actually Different Between These Laws?** Job: **Ask a concrete cross-jurisdiction legal question and see source-linked differences that matter.** 076-B is **The Map That Knows the Difference Between Similar Laws**: a map opens into semantic legal diffs over time.

## Frozen synthetic fixture

The engine admits exactly five fictional jurisdictions in fixed order: Ember, Harbor, Lattice, Mesa, and Orbit. It admits exactly three concrete questions: who may act, what authority controls, and when the rule is effective. Each jurisdiction has two fixed fictional source records with a source ID, title, locator, issue date, effective date (including explicit null), as-of date, proposition, and synthetic-source-check status.

Every displayed answer remains attached to its source records. The comparative layer preserves source locators, issue/effective/as-of dates, conflicts, and unknowns. For the effective-date query, Mesa deliberately preserves a conflict between `2042-05-01` and `2042-06-01`; Orbit remains unknown. The engine does not reconcile, average, infer, impute, or silently omit either state.

Only the three byte-for-byte frozen presets are admitted. Additional, mutated, real, authority-bearing, hostile, or unrecognized input returns `INVALID`, empty rows, and no comparison. There is no free text, network dependency, live legal feed, geolocation, random behavior, inference about people or places, or fallback to an apparently similar question.

## UI and export contract

076-A uses native select label `COMPARATIVE QUESTION` and buttons `RESTORE WHO MAY ACT` and `EXPORT COMPARATIVE QUERY`. The exact export filename is `synthetic-cross-jurisdiction-query.json`. The payload contains version `076.1.0`, exact lineage, exact artifacts, full admission block, input, result, and replay data.

076-B starts closed and uses `OPEN SEMANTIC DIFF`; its live status says `Similar labels separate into source-level differences`. The visual transformation must preserve every source, locator, effective/as-of date, conflict, and unknown rather than converting comparison into map-color equivalence.

Both routes require semantic native controls, visible keyboard focus, live status, reduced-motion support, print support, and no horizontal document overflow at 320 CSS pixels. Color is never the only carrier of status.

## Evidence, legal, and coverage boundaries

Every jurisdiction, law, rule, authority, source, date, proposition, and conflict is fictional. “Verified” means only that the fixed synthetic record passed fixture validation; it is not verification of any real law. The build is not current law, legal research, legal advice, or a compliance determination. It makes no claim of completeness, authoritative status, global coverage, equivalence, legal effect, enforceability, rights, safety, equity, access, or outcome.

No fixture is a proxy for a real jurisdiction, sector, regulator, community, or legal regime. The demonstration cannot be used for legal, policy, licensing, enforcement, investment, funding, procurement, eligibility, clinical, or resource-allocation decisions. A qualified professional must inspect primary authorities and current facts for any real question.

## LinkedIn boundary contract

The silent-first 18-second asset may communicate only that superficially similar fictional rules can separate into source-level differences over time. It must visibly say `FICTIONAL JURISDICTIONS — NOT CURRENT LAW` and `NO LEGAL ADVICE, COMPLIANCE, COMPLETENESS, AUTHORITY, OR GLOBAL-COVERAGE CLAIM`, with the same boundary in caption and alt text.

No real maps, borders, flags, seals, agencies, officials, laws, citations, statistics, people, facilities, or protected-trait proxies. No global heatmap, green/red compliance coloring, authoritative checkmarks, winners, grades, scores, or “complete coverage” language.

## Acceptance

Playwright asserts exact jurisdiction/question/source counts, deterministic query outputs, source/date preservation, conflict and unknown behavior, no imputation, hostile-input fail closure, exact export admission/artifacts/lineage, legal and coverage boundaries, 320-pixel containment, and the B-side semantic-diff status.
