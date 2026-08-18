# Build 020 — Decision Evidence Ledger

## Canonical record

- Title: Decision Evidence Ledger
- Job: Reconstruct who decided what, when, from which evidence, with what result.
- B-web: A decision opens into a temporal provenance and evidence chain.
- Uses: 001, 010, 019
- Creates: cap:020

## Implementation copy

Question: Why was this decision made, and can its evidence and result be reconstructed?

Thesis: A decision is accountable only when its actor, authority, time, evidence, alternatives, acknowledgement, result, and correction history remain linked without silently replacing earlier records.

The question and thesis above are implementation copy derived from the canonical job and B-web; they were not stored as separate canonical fields.

## Functional contract

020-A reconstructs a synthetic decision through linked actor, authority, evidence, alternatives, acknowledgement, result and correction records. Removing evidence exposes a gap. Corrections append and supersede rather than erase. Export is client-local JSON.

020-B progressively opens the decision into the canonical temporal provenance chain.

## Boundaries

Provenance does not itself prove truth, causation, legal authority, compliance, or substantive correctness. Real deployments require access controls, record schedules, source authentication, privacy review and competent domain review.
