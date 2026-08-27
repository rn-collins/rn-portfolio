# Acquisition verification tranche — 2026-08-27

## Scope and control state

- 24 `CLEARED-NOT-SUBSTITUTED` records verified against exact official URLs.
- 9 unique network assets after content deduplication.
- 24 records remain not substituted; live RN-created covers remain unchanged.
- No external asset is selected or staged.
- HTML hashes are point-in-time capture hashes and require a frozen capture timestamp and viewport before production use.

## Verified unique assets

| Asset | Used by builds | Media | Bytes | Geometry/pages | SHA-256 |
|---|---|---:|---:|---|---|
| NIST AI RMF 1.0 | 001, 007–009, 012–013, 017, 021–022, 025, 028, 032 | PDF | 1,946,127 | 48 pages; page 1 612×792 pt | `7576edb531d9848825814ee88e28b1795d3a84b435b4b797d3670eafdc4a89f1` |
| GOV.UK user needs | 002–003 | HTML | 79,329 | responsive | `bc974a558d3674855a49847825dc62ddd48628bef616a8e81369e29092092d59` |
| NIST AI RMF Playbook | 004 | HTML | 79,932 | responsive | `5aaba73cdba8c1636dd886f977204f708f2772764b4a5263224e7774bca15931` |
| GOV.UK Service Standard | 005, 018 | HTML | 65,077 | responsive | `edde6a2381208099a50f57e8b8c8f60d03aea096a6d0a569cd489e7a0754a638` |
| GOV.UK assisted digital support | 006 | HTML | 69,792 | responsive | `5b592b8872bcf0c9e59237f28453b3f922e473d9f4164b154252402f142b2232` |
| W3C PROV Primer | 011, 020, 029 | HTML | 109,524 | responsive | `4db54135a6f06bbee1983e079c6d9bd3d54e5b45eb6ed0f5686e922c665b8c4a` |
| NIST SP 800-61r3 | 019 | PDF | 1,040,566 | 48 pages; page 1 612×792 pt | `e5593d6bb85daecec7e8d9549400c7b3473bcc3f06e469c82218073afa7fba2d` |
| W3C PROV-O | 026 | HTML | 464,179 | responsive | `6b96671ab84faf12ce3f041aca12c3f93a6df2ed242348810743179a68e69555` |
| NIST Privacy Framework 1.0 | 031 | PDF | 827,885 | 43 pages; page 1 612×792 pt | `58e1f2373e1c8a5782f7ddfce677fa9fc15e2d920ec0ab97ee754697e91bc2f0` |

Build 006 redirected from the obsolete assisted-digital route to the current canonical GOV.UK page; the canonical ledger URL was reconciled in this tranche.

## NIST/W3C hold review

### Acquisition-ready, not acquired, not substituted

010, 030, 033, 034, 036, 038, 039, 040, 041, 049, 055, 057, 058.

These records have an exact official document route plus a supportable creator/version/date/reuse/credit/crop/alt/no-endorsement chain. They still require an exact fixed render, dimensions, checksum, and visual QA before promotion beyond acquisition-ready.

### Remain HOLD — claim fit insufficient

037, 042, 043, 054, 067.

The reusable official document is not sufficiently specific to support the build proposition. A more directly relevant item-level source is required.

### Remain HOLD — research open

068, 083, 089, 090, 091, 092, 094, 097, 099.

The canonical ledger has no NIST/W3C candidate for these builds. Editorial selection of a relevant official entity/source must precede asset research.

## Public-route QA

- Sitemap returned HTTP 200 and enumerated 302 URLs.
- Archive and lineage create a 304-route intended QA scope.
- `/100-builds/archive` returned HTTP 200 with one matching canonical and no visible `noindex`.
- The exhaustive 304-route crawl did not complete; no claim of complete route health is made.
- No broken URL, duplicate canonical, media failure, or access-control bypass was confirmed in the bounded pass.
- Archive exposure needs an explicit product decision because the public page intentionally links retained source records and describes Builds 001–044 as publicly structured/certified to differing degrees.
