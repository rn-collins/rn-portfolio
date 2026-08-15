# Build 001 — Education-Range QA Matrix

Purpose: test whether one product can serve a wide education and domain range without creating separate childish/professional versions.

## Controlling principle
**One product, layered comprehension.** The primary path must be understandable to a motivated early-secondary learner. Professional precision appears through examples, helper text, result interpretation, evidence notes, and advanced mode—not through forcing every visitor to speak professional jargon.

## Test personas

### A. Early secondary / ~12–14-year-old comprehension target
Scenario: “A school uses AI to suggest which students may need extra help.”
Must understand without assistance:
- what the AI does;
- who checks it;
- whether checking happens before a teacher acts on it;
- what the checker can see;
- whether the checker can disagree;
- what happens if something looks wrong.
Failure signals: words such as oversight, escalation, auditability, domain competence, consequential workflow, or evidence sufficiency appear without plain explanation.

### B. High-school learner
Scenario: “A company uses AI to screen job applications.”
Must be able to complete Quick Check and explain the three priority fixes in their own words.

### C. General adult / no college assumption
Scenario: “An insurance company uses AI to help decide whether to approve something.”
Must understand risk/consequence choices and result without prior AI-policy knowledge.

### D. College-educated non-specialist
Scenario: “A business uses AI to draft recommendations before managers act.”
Must be able to compare Quick Check vs Design the Control and decide when deeper mode is useful.

### E. Domain professional
Scenario: attorney, clinician, HR lead, educator, compliance officer, operations lead.
Must find enough specificity to map the result to actual workflow controls without feeling the product is oversimplified.

### F. Technical / governance expert
Scenario: AI governance lead or system architect.
Must be able to inspect terminology, research basis, assumptions, scoring logic, limitations, and output protocol; expert depth cannot contaminate the novice path.

## Copy acceptance rules
- Lead with ordinary-language question; professional term may follow in parentheses or deeper layer.
- Concrete example before abstraction when possible.
- One idea per label.
- Avoid noun stacks (“human oversight control effectiveness evaluation”).
- A user must not need to know the meaning of HITL, NIST, AI RMF, Article 14, RBAC, audit log, escalation path, or model confidence to complete the primary path.
- “High consequence” must be explained through examples involving safety, money, rights, access, school/work, health, or legal position.
- Results must say what to change, not only name the deficiency.

## Interaction acceptance rules
- Quick Check is the default.
- Advanced detail is optional.
- No account required for first value.
- No blank-page free-text burden before examples.
- Every result dimension has a plain-language interpretation.
- Keyboard completion and mobile completion required.
- Reduced-motion preference cannot remove access to content.

## Expert-integrity rules
Simplification may not:
- imply legal compliance;
- invent a universal risk threshold;
- imply that presence of documentation proves effective oversight;
- hide uncertainty or jurisdiction dependence;
- replace meaningful review with a score.

## Release gate
001-A does not pass merely because the UI works. It passes only when all six comprehension bands can reach the same core meaning through the layered interface, with expert depth available without imposing expert language on everyone else.
