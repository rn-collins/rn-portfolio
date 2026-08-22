# Build 080 — Journalism-to-Infrastructure System

## Canonical contract

Build 080 uses Builds 057, 058, 062, and 063 and creates `cap:080`. Its exact artifacts are `Reporting Asset Extractor` and `Infrastructure Opportunity Queue`.

080-A is **Journalism-to-Infrastructure System**: it turns reporting, interviews, field observations, records, and reader questions into reusable datasets, tools, trackers, and public resources. Registry title: **Turn Reporting Into Public Infrastructure**. Job: **Convert reporting, interviews, records and field observations into maintained public tools, data and trackers.** 080-B is **The Article Was Only the First Output**: a published story unfolds into an infrastructure pipeline. On the web, a published story unfolds into reusable datasets, maps, timelines and tools.

## Frozen synthetic fixture

The engine admits exactly five fictional reporting packets in fixed order: Cedar, Harbor, Lattice, Mesa, and Orbit. Each contains exactly five invented sources: published story, interview note, field observation, public record, and reader question. Every source preserves its ID, type, title, summary, observed date, as-of date, fictional rights state, public-synthetic confidentiality state, and fixture-verification state. There are no real people, interviews, quotations, places, records, readers, or confidential materials.

Each packet deterministically produces exactly five candidates: dataset, tool, tracker, timeline, and public resource. Every candidate retains all supporting source IDs, fields, limitations, and `CANDIDATE-NOT-PUBLISHED` status. Each enters an opportunity queue with an unassessed priority, evidence gap, maintenance requirement, intended-user hypothesis, and mandatory human review. The engine does not publish, prioritize, validate demand, clear real rights, verify factual claims, or infer impact.

Only the five byte-for-byte frozen presets are admitted. Additional, mutated, real, rights-bearing, hostile, or unrecognized input returns `INVALID`, an empty pipeline, and no packet. There is no free text, network dependency, live reporting feed, real source archive, randomness, model inference, or fallback to an apparently similar report.

## UI and export contract

080-A uses native select label `REPORTING PACKET` and buttons `RESTORE CEDAR REPORT` and `EXPORT INFRASTRUCTURE PACKET`. The exact export filename is `synthetic-reporting-infrastructure-packet.json`. The payload contains version `080.1.0`, exact lineage, exact artifacts, full admission block, input, result, and replay data.

080-B starts closed and uses `UNFOLD STORY`; its live status says `One story became a sourced infrastructure pipeline`. The transformation must preserve source-to-asset links, rights and confidentiality states, limitations, evidence gaps, unknowns, unassessed priority, and human-review gates.

Both routes require semantic native controls, visible keyboard focus, live status, reduced-motion support, print support, and no horizontal document overflow at 320 CSS pixels. Color is never the only carrier of source type, candidate status, limitation, or unknown.

## Reporting, rights, privacy, and decision boundaries

Every source, person, interview, quotation, observation, location, record, reader, date, need, user, and candidate is fictional. `FICTIONAL-CLEARED` and `SYNTHETIC-SOURCE-CHECKED` apply only inside the fixed fixture. They do not establish copyright, license, consent, privacy, confidentiality, accuracy, publication rights, or evidentiary status for anything real.

The build performs no journalism, fact-checking, source protection, editorial judgment, public-record authentication, legal review, clinical review, privacy review, publication, or maintenance. It makes no factual, legal, clinical, demand, priority, impact, completeness, accuracy, adoption, public-interest, or outcome claim. A qualified human must inspect original sources, rights, consent, confidentiality, security, evidence, user need, maintenance capacity, and risk before real use.

## LinkedIn boundary contract

The silent-first 18-second asset may communicate only that one fictional reporting packet can expose multiple sourced infrastructure candidates. It must visibly say `SYNTHETIC REPORTING — NO REAL PEOPLE, SOURCES, OR RECORDS` and `NO FACTUAL, RIGHTS, PUBLICATION, DEMAND, PRIORITY, IMPACT, LEGAL, OR CLINICAL CLAIM`, with the same boundary in caption and alt text.

No real people, journalists, interviewees, places, news brands, records, documents, quotations, logos, seals, statistics, confidential materials, or current events. No publication checkmarks, verified badges, priority scores, adoption claims, source-reliability grades, or guaranteed outcomes.

## Acceptance

Playwright asserts exact packet, source, asset, and opportunity counts; deterministic extraction; complete provenance, rights, dates, source-link, limitations, gap, unknown, and human-review preservation; hostile-input fail closure; empty invalid pipeline; exact export admission/artifacts/lineage; reporting and rights boundaries; 320-pixel containment; and the B-side unfold status.
