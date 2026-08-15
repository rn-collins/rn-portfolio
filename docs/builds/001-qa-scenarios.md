# Build 001 — Representative QA Scenarios

These scenarios are acceptance fixtures for product behavior, not legal determinations.

## Scenario A — Weak / nominal review
A customer-support AI recommends account action. A generalist reviewer sees only the model output after the action is queued, can comment but cannot stop it, has no escalation path, and no review record is retained.

Expected product behavior:
- Weak classification.
- Timing, evidence access, authority, escalation, record, and practical capacity should surface as meaningful gaps.
- Prioritized fixes should not be dominated by cosmetic documentation issues when the reviewer cannot act in time or change the outcome.

## Scenario B — Partial review
An internal research assistant produces a draft. A subject-matter reviewer checks it before use and can revise or reject it, but sees only partial supporting evidence, escalation is informal, workload is strained, and review effectiveness is discussed only after incidents.

Expected product behavior:
- Partial classification.
- Evidence access, escalation, capacity, and testing should remain visible as incomplete dimensions.
- The result should acknowledge the meaningful authority/timing strengths without calling the control strong.

## Scenario C — Strong architecture on paper
A high-consequence workflow requires a qualified reviewer before external action. The reviewer can inspect inputs, sources, context, uncertainty and conflicts; can reject, revise, stop or escalate; has a defined fallback; records rationale and outcome; and the organization periodically reviews overrides, errors, complaints and escalations.

Expected product behavior:
- Strong classification if all structured selections reflect the facts above.
- Output must still state that the score is not a compliance certification and does not prove effectiveness in practice.

## Cross-scenario assertions
- High-consequence context increases urgency of weak timing, authority, or evidence access.
- Empty or incomplete selections must not accidentally produce a strong result.
- Copy protocol must reproduce the assessed architecture accurately.
- No scenario should imply that merely naming a reviewer constitutes meaningful oversight.
- Browser-local behavior must remain true unless intentionally changed and disclosed.
