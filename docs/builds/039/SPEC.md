# Build 039 — Agent Work Trace Inspector

Engine `039.2.0` inspects a bounded synthetic event record. It requires unique immutable IDs, contiguous deterministic order, timestamps, acyclic parent links, explicit plan-versus-execution status, tool request/result/error identity and side-effect class, evidence identity/scope/source/freshness/support mapping, decision rationale, failure/abort preservation, redaction attestation, and inherited records 020/032/034/038.

“Complete” means only complete against the declared schema and capture boundary. Hidden model reasoning, provider runtime, unrecorded tools, and external logs are not observable here. Replay deterministically re-inspects recorded data; it never re-executes live reads or writes. Export is exact browser-local JSON but is not externally signed.

Traceability does not establish answer truth, evidence validity, intent, safety, approval, or completeness beyond capture. Authenticated browser, physical-device/manual accessibility, hosted CI, independent trace review, secrets review, and media certification remain external gates.
