# Build 081 — Social Listening → Unmet Need Engine

## Canonical contract

Build 081 uses Builds 003, 028, and 063 and creates `cap:081`. Its exact artifacts are `Signal Classifier` and `Need Validation Workflow`.

081-A is **Social Listening → Unmet Need Engine**: it converts public conversation into verified problem signals, affected groups, existing alternatives, and product or policy opportunities. Registry title: **What Are People Repeatedly Struggling With?** Job: **Convert public conversation into verified unmet-need signals rather than trends.** 081-B is **Listening for the Missing System**: a stream of posts resolves into repeated unmet decisions. On the web, a conversation field clusters into repeated unresolved decisions and problems.

## Frozen synthetic fixture

The engine admits exactly five fictional conversation corpora in fixed order: Cedar, Harbor, Lattice, Mesa, and Orbit. Each contains exactly six invented posts from explicitly fictional public accounts. There are no real posts, people, handles, platforms, conversations, identities, demographics, locations, or protected traits, and the engine performs no network retrieval or scraping.

Each fixed corpus preserves the post text, date, context, repeated decision, bounded affected context, mentioned alternatives, contradictions, missing evidence, and conditional product or policy candidates. `CORROBORATED-IN-SYNTHETIC-FIXTURE` means only that multiple fixed invented posts express a repeated decision. Every resulting need remains `HYPOTHESIS-NOT-VALIDATED`; every candidate requires human validation. Repetition is never converted into prevalence, truth, real need, demand, trend, priority, or a recommendation.

The workflow classifies the repeated decision, bounds the context, inventories alternatives, seeks contradiction, exposes missing evidence, and stops for real human research and decision. Only the five byte-for-byte frozen presets are admitted. Additional, mutated, real, identity-bearing, hostile, or unrecognized input returns `INVALID` and no hypothesis. There is no free text, live social feed, identity linkage, profiling, sentiment analysis, demographic or protected-trait inference, numeric scoring, ranking, or fallback.

## UI and export contract

081-A uses native select label `SIGNAL CORPUS` and buttons `RESTORE CEDAR CORPUS` and `EXPORT NEED SIGNAL`. The exact export filename is `synthetic-unmet-need-signal.json`. The payload contains version `081.1.0`, exact lineage, exact artifacts, full admission block, input, result, and replay data.

081-B starts closed and uses `RESOLVE REPEATED SIGNALS`; its live status says `Repeated posts became bounded need hypotheses`. The transformation must preserve contradictions, missing evidence, unvalidated status, conditional candidates, and the human-research stop.

Both routes require semantic native controls, visible keyboard focus, live status, reduced-motion support, print support, and no horizontal document overflow at 320 CSS pixels. Color is never the only carrier of signal, contradiction, uncertainty, or validation state.

## Privacy, research, product, and policy boundaries

Every post, account, context, decision, alternative, contradiction, need, candidate, and date is fictional. Fixture checks do not verify any real problem. The engine performs no research on real people and cannot determine identity, demographic attributes, protected traits, sentiment, intent, vulnerability, need, prevalence, demand, trend, priority, causation, product-market fit, policy merit, impact, or outcome.

The demonstration cannot support profiling, targeting, surveillance, eligibility, moderation, clinical, legal, policy, product, marketing, investment, funding, hiring, insurance, credit, housing, education, public-benefit, or resource-allocation decisions. Real work requires lawful and ethical collection, privacy review, representative research, contradiction seeking, alternative analysis, consequence evidence, affected-person participation, and accountable human judgment.

## LinkedIn boundary contract

The silent-first 18-second asset may communicate only that repeated fictional posts can become bounded hypotheses and a validation queue. It must visibly say `SYNTHETIC CONVERSATION — NO REAL PEOPLE OR POSTS` and `NO IDENTITY, DEMOGRAPHIC, PROTECTED-TRAIT, SENTIMENT, NEED, DEMAND, TREND, PRIORITY, PRODUCT, OR POLICY CLAIM`, with the same boundary in caption and alt text.

No real platform interfaces, posts, people, handles, avatars, quotations, locations, organizations, brands, statistics, hashtags, or trending labels. No sentiment colors, demographic profiles, heat maps, popularity scores, rankings, targeting segments, verified-need badges, recommendations, or guaranteed outcomes.

## Acceptance

Playwright asserts exact corpus/post counts, deterministic classification, complete post/alternative/contradiction/missing-evidence preservation, hypothesis and human-validation states, no profiling/scoring/ranking, hostile-input fail closure, exact export admission/artifacts/lineage, privacy and research boundaries, 320-pixel containment, and the B-side signal status.
