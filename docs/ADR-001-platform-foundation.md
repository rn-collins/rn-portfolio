# ADR-001 — One reusable application platform for the 100 Builds program

- Status: accepted for Foundation Sprint F0
- Date: 2026-08-14
- Decision owner: RN Builds

## Context
The existing portfolio is a static HTML/CSS/JS application. The canonical syllabus progresses into persistence, identity, workflows, provenance, AI evaluation, agents, orchestration and longitudinal systems. One-off HTML artifacts would make reuse unverifiable and maintenance increasingly unsafe.

## Decision
Use a pnpm workspace + Turborepo monorepo with a primary Next.js App Router application under `apps/web`. Numbered builds are routes/modules that consume shared packages. The existing static portfolio remains production-authoritative until parity and preview QA pass.

## Alternatives considered
1. Keep adding standalone HTML files — rejected for weak reuse, testing and stateful-system support.
2. One repository/Vercel project per build — rejected for operational fragmentation and inability to demonstrate shared lineage cleanly.
3. Immediate rewrite of production — rejected because migration must not destroy the working portfolio.

## Consequences
Build 001 is reimplemented first as shared form/results/visual primitives. Build 002 is gated until F0 passes CI, browser, mobile, accessibility and preview review.

## Revisit trigger
Revisit only if the single application becomes a demonstrable deployment/security boundary problem for later high-risk builds.
