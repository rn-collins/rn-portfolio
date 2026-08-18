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

020-A reconstructs one explicitly synthetic decision through linked actor, authority, evidence, alternatives, acknowledgement, result and correction records. Completeness requires every evidence fixture declared required; a numerical threshold cannot conceal the loss of acknowledgement, consequence or impact evidence. A correction is a separately identified record that links to the original decision, names the corrected field, retains the prior value, and supplies the new value, reason, actor and time. It never mutates the frozen original fixture.

The export is generated entirely in the browser. It labels itself synthetic, includes missing-required-evidence state, and contains the original record plus the correction history. No form, API, persistence or telemetry path receives its contents.

020-B progressively opens the decision into the canonical temporal provenance chain. Only the selected-stage summary is announced as it changes.

## Boundaries

Provenance does not itself prove truth, causation, legal authority, compliance, or substantive correctness. Real deployments require access controls, immutable storage with integrity verification, record schedules, source authentication, privacy review and competent domain review.
