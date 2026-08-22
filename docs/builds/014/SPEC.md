# Build 014 — Legal Judgment Architecture

## Job
Separate research, interpretation, inference, strategy, approval and attorney-only judgment in legal work.

## Lineage
Uses Build 001 human-review controls and Build 012 consequence/control mapping. Creates `cap:014`.

## Product contract
A decomposes a bounded matter into seven layers, assigns AI assistance, supervised drafting, lawyer-only responsibility, or client authority, and makes source, reviewer, authority, record, and confidentiality rules inspectable. It directly calls Build 012’s assessment and Build 001’s human-review primitives. B makes responsibility allocation legible as an interactive stack.

## Boundary
Educational workflow architecture—not legal advice, an ethics opinion, an unauthorized-practice determination, or jurisdiction-specific compliance. ABA Model Rules are models; adopted jurisdictional rules and supervising counsel control.

## Sources
- ABA Formal Opinion 512: https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf
- ABA Model Rule 2.1: https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_2_1_advisor/
- ABA Model Rule 5.3: https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_5_3_responsibilities_regarding_nonlawyer_assistant/
