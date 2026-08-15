# Public Product Audit — 001–030

This is separate from the strategic-value audit. A build may deserve a public slot and still fail as a product.

Controlling principle: **maximum warranted technical sophistication behind the interface; minimum necessary cognitive burden in front of it.**

| # | Public product expression | Novice first value | Warranted technical ceiling | Product disposition |
|---|---|---|---|---|
|001|Human Review Design Framework|Answer plain-language questions; receive weaknesses + first fixes|consequence-aware rules, evidence/provenance, scenario testing, export, later organization comparison|PASS after final QA|
|002|Claim-Preserving Audience Translator|Paste one claim; choose audience; see what changes and what must not|claim graph, evidence boundaries, audience model, semantic-drift detection|PASS if not generic copywriter|
|003|Unserved Decision Finder|Describe recurring situation; discover missing decision system|decision ontology, clustering, opportunity scoring, evidence of recurrence|PASS|
|004|Defensible Intelligence Workflow Designer|Describe research task; get a repeatable verification workflow|source orchestration, provenance, queues, confidence, human review|REFRAME then pass|
|005|Service → Software Discovery|Map repeated service steps; see automate/keep-human/eliminate|workflow decomposition, automation suitability, risk/ROI model|PASS|
|006|Research System → Product / Dataset / Company Test|Describe private tracker/system; receive viable productization paths|buyer/problem graph, moat analysis, maintenance economics, scenario comparison|REFRAME|
|007|Governed Learning Loop Designer|Show how corrections enter a system without erasing history|feedback events, adjudication, versioning, evaluation, rollback|REFRAME|
|008|Decision-Ready Dashboard Diagnostic|Upload/describe dashboard; see whether it actually supports a decision|decision graph, metric-to-action mapping, uncertainty and ownership model|PASS|
|009|Place-Sensitive Technology Readiness|Choose technology + place; receive local blockers and prerequisites|geospatial/context data, constraint graph, policy/infrastructure layers, scenario engine|REPLACEMENT / STRONG|
|010|Ontology Conflict Mapper|Enter competing labels/categories; expose where systems mean different things|schema inference, ontology mapping, conflict detection, provenance|REFRAME / STRONG|
|011|Entity / Ownership Resolution X-Ray|Search an entity; see aliases, relationships and confidence|entity resolution, graph DB, source provenance, confidence/review queue|REFRAME / STRONG|
|012|Risk-Tiered AI Architecture|Describe AI use; receive proportionate control architecture|risk model, consequence/reversibility/sensitivity rules, control graph|PASS|
|013|AI Workflow Risk Classifier|Map workflow; see exactly where AI risk enters|workflow graph, risk propagation, controls, exception routing|PASS|
|014|Legal Judgment Architecture|Describe legal task; see research/inference/judgment/approval boundaries|task decomposition, authority model, provenance, review gates|PASS|
|015|Repeated Legal Task → Product|Describe repeated supervised task; see safe reusable product forms|workflow mining, productization scoring, supervision/ethics boundaries|PASS|
|016|Legal Workflow Mapper|Choose matter/process; generate actors, handoffs, deadlines, evidence|workflow/state graph, authority/evidence links, deadlines, export|PASS|
|017|Regulated Handoff Mapper|Describe organizations in a process; expose responsibility gaps|cross-org graph, evidence/consent/accountability propagation, gap scoring|PASS|
|018|Institutional Friction Detector|Describe recurring breakdown; see whether system not person is failing|journey/process graph, friction taxonomy, causal hypotheses, intervention ranking|REPLACEMENT / STRONG|
|019|Consequence-Aware Escalation Router|Describe failure/event; see who needs to know and when|event rules, urgency model, routing, suppression, escalation, audit|REFRAME / STRONG|
|020|Decision Evidence Trail|Trace why a consequential result happened|tamper-evident event model, provenance graph, versioning, replay|PASS|
|021|AI Implementation Readiness X-Ray|Answer plain questions; receive blockers and sequence before buying AI|dependency graph, workflow/data/security/review scoring, remediation plan|REPLACEMENT / ANCHOR|
|022|Human Consequence Map for AI Workflows|Describe workflow; reveal affected people, consequences and recourse|graph propagation, rights/consequence taxonomy, recourse/review mapping|REPLACEMENT / STRONG|
|023|Consent & Data Rights Manager|See and change what a system may do with your data|consent ledger, purpose binding, withdrawal propagation, rights workflows|PASS|
|024|Privacy & Data Minimization Engine|Describe use case; see what data you do not need to collect|necessity rules, sensitivity classification, retention/redaction, privacy model|PASS|
|025|Policy-to-Workflow Translator|Paste policy/rule; receive actors, triggers, obligations and unresolved questions|structured extraction, workflow/state generation, provenance, exception model|REPLACEMENT / ANCHOR|
|026|Messy Regulation / Evidence Normalizer|Give inconsistent records; see canonical record + transformations|normalization, dedupe/entity resolution, jurisdiction/date handling, audit trail|REFRAME|
|027|AI Vendor Claim / Procurement X-Ray|Paste vendor claim; receive evidence requests, hidden assumptions and red flags|claim extraction, evidence graph, data/control/security/integration comparison|REPLACEMENT / ANCHOR|
|028|Evidence-Aware Search|Ask normal question; receive ranked results with why/source strength|hybrid retrieval, reranking, provenance, authority/freshness, evaluation|PASS|
|029|Change History + Downstream Impact|Choose record/rule; see what changed and what else it affects|version graph, diffs, dependency propagation, alerts|PASS|
|030|Inclusive Interaction Stress Test|Use/describe interface; see who is excluded and how to redesign|a11y automation + manual gates, localization, cognitive load, bandwidth/device profiles|PASS|

## Cross-batch finding
The first 30 should feel easier to use as the technology becomes more sophisticated, not harder. Advanced controls belong behind progressive disclosure. Technical terms may appear in methodology/build logs, not as prerequisites for receiving value.
