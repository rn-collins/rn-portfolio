# 100 Builds — Comprehension, Adoption & Technical Ambition Gate

Status: controlling product gate for every A-side build

## Core rule
Maximum warranted technical sophistication behind the interface. Minimum necessary cognitive burden in front of it.

## Education-range requirement
Every public A-side build must be usable by people across a broad range of formal education and domain expertise. The default path should not assume college education, professional vocabulary, technical literacy, legal literacy, scientific literacy, or prior knowledge of RN's work.

The product must be tested conceptually against at least these audience bands:
1. Middle-school / early secondary comprehension: can a motivated 12–14-year-old understand what the tool is asking and why the question matters?
2. High-school comprehension: can a teenager or adult with no specialist training complete the primary path without translation help?
3. General adult / some college: can a typical public user get useful value quickly without domain knowledge?
4. College-educated non-specialist: can a capable professional outside the field understand the result and act on it?
5. Domain professional: does the result remain credible and useful to a lawyer, scientist, engineer, clinician, policy professional, founder, operator, regulator, or researcher?
6. Expert / technical user: is deeper evidence, methodology, terminology, assumptions, controls, exports, and advanced configuration available without forcing that complexity onto everyone else?

These are product-testing bands, not labels shown to visitors. Do not ask a user to identify their education level unless there is a compelling product reason.

## Required layered-comprehension architecture
- Plain-language default copy.
- Short first explanation of what the tool does and when to use it.
- Everyday examples before specialist examples.
- Define unfamiliar terms where they first appear.
- Progressive disclosure: advanced detail appears only when requested or needed.
- Advanced/professional mode may expose exact technical, legal, scientific, or operational concepts.
- Results begin with a human-readable conclusion before methodology.
- Technical evidence and provenance remain accessible underneath the plain-language result.
- No loss of substantive accuracy merely to achieve lower reading complexity.

## Adoption gate
A build fails public release if a first-time visitor cannot answer all of these within roughly 10 seconds:
- What is this?
- Is it for me?
- What do I put in?
- What do I get back?
- Why would I care?

The primary path should usually provide useful first value within 1–3 minutes and should avoid account creation, integrations, setup calls, jargon, or long free-text entry unless inherently necessary.

## Technical ambition gate
For every build, separately identify:
- the simplest public interaction;
- the most advanced technically warranted implementation;
- which advanced capabilities materially improve user outcomes;
- which complexity should remain invisible;
- which expert controls belong behind progressive disclosure;
- why this should be software rather than a PDF, article, checklist, spreadsheet, or static calculator.

## Required roles for each build audit
1. Product strategist / product manager — problem, user, job-to-be-done, adoption.
2. Domain researcher / subject-matter reviewer — factual and conceptual accuracy.
3. UX researcher — likely user questions, confusion, failure points, context of use.
4. Content designer / UX writer — plain-language information hierarchy and microcopy.
5. Literacy & learning-experience designer — broad reading-level comprehension without patronizing simplification.
6. Accessibility / cognitive-accessibility specialist — keyboard, screen-reader, visual, motor, attention, memory, language, and cognitive load.
7. Information architect — progressive disclosure and novice-to-expert pathways.
8. Senior product designer — interaction model and usability.
9. Principal software architect — highest warranted technical capability and reuse/lineage.
10. Senior full-stack / specialist engineer(s) — implementation.
11. Data / AI / search / geospatial / agent / visualization engineer as warranted by the build.
12. Privacy & security reviewer — minimization, storage, abuse cases, safe defaults.
13. QA / test engineer — happy paths, edge cases, failure states, representative users.
14. Adversarial product critic — whether the build is actually worth one of the 100 slots.
15. Conversion strategist — save, click, use, return, share, contact without turning the product into a funnel.
16. B-side creative director / motion or visual technologist — whether the paired visual can make the proposition understandable and worth saving.

## Release rule
A build can be technically extraordinary and still fail the public canon if ordinary people cannot understand or use it. A build can be extremely easy to use and still fail if its underlying capability is shallow, inaccurate, undifferentiated, or better delivered as static content. Both sides must pass.
