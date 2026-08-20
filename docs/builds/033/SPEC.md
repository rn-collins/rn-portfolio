# Build 033 — Adversarial System Explorer

## Frozen canon
- Job: Explore how a system could be misused, manipulated, broken or exploited—and what blocks those paths.
- B-Web: An attack graph changes as attacker goals and controls change.
- Uses: 012, 020, 032. Creates: cap:033.

## Integrity model — engine 033.2.0

The build is a bounded, synthetic, high-level defensive prompt. Its four example goals and eight paths do not claim attacker-goal, route, asset, control, bypass, or threat completeness. Assumptions and exclusions are explicit. Paths deliberately omit payloads, commands, vulnerabilities, credentials, production topology, or procedural exploitation details.

Every path is a unique directed acyclic graph. Duplicate IDs/nodes, missing edge nodes, self-links, cycles, missing paths, and empty interruption mappings block interpretation. An interruption requires every control in at least one declared set, with exactly one current evidence record per enabled control. One control does not silently satisfy a multi-control set.

Control evidence carries unique identity, control binding, scope, method, outcome, checked date, expiry, and revocation. Duplicate, incomplete, non-pass, stale, future-checked, expired, or revoked evidence blocks. The model links Build 012 consequence scope, Build 020 decision evidence, and Build 032 readiness; readiness is not authorization.

`MODELED PATHS INTERRUPTED` means only that the bounded synthetic routes have a complete declared control set. It does not prove real control efficacy, security, safety, compliance, or absence of bypass, combined, adaptive, or unmodeled paths. Residual exposure remains visible even when every registered path is interrupted.

The explicit local export contains ordered original input, derived result, graph structure, evidence, engine version, goal/control order, exact replay input, privacy boundary, and limitations. The feature collects, persists, or transmits nothing.

A and B provide native keyboard controls, reversible state, polite atomic text status, a screen-readable graph description, visible focus, 320px layout, and reduced-motion handling. Authorized expert security review/penetration testing, production architecture validation, red-team scope, affected-system owners, authenticated browser, physical-device/manual accessibility, hosted CI, and LinkedIn verification remain external gates.
