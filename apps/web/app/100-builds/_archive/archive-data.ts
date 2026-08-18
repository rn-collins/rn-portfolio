export type ArchiveItem={label:string;detail:string;path?:string;href?:string};
export type BuildArchive={id:string;title:string;question:string;thesis:string;research:ArchiveItem[];created:ArchiveItem[];decisions:ArchiveItem[];audits:ArchiveItem[];plans:ArchiveItem[];sourceFiles:string[]};

export const programArchive:ArchiveItem[]=[
 {label:'100-cycle master syllabus',detail:'The frozen sequence, learning progression, A/B expectations, and compounding logic for all 100 cycles.',path:'docs/100-cycle-master-syllabus.md'},
 {label:'Execution feasibility + architecture audit',detail:'The feasibility, roles, architecture, operating model, and execution constraints used to decide whether the 100-build program could actually be built.',path:'docs/100-build-execution-feasibility-architecture-audit.md'},
 {label:'Strategic value audit',detail:'Why the 100 builds exist, what makes them saveable/useful, and how the sequence connects to public value rather than novelty alone.',path:'docs/100-builds-strategic-value-audit.md'},
 {label:'Canonical sequence completeness audit',detail:'The audit that checked the 100-cycle canon for gaps, duplicates, progression, and missing capability classes.',path:'docs/canonical-sequence-completeness-audit.md'},
 {label:'Frozen canonical declaration',detail:'The record establishing Canonical 100 v1 as the sequence used by the gallery and build registry.',path:'docs/CANONICAL-100-V1-FROZEN.md'},
 {label:'Build release standard v1',detail:'The standing release gate covering public value, technological ceiling, evidence, accessibility, privacy, fallback, resilience, metadata, B-LinkedIn, and adversarial QA.',path:'docs/build-release-standard-v1.md'},
 {label:'Exhibition Space design system',detail:'The visual and interaction language used to replace the prior skin and make the gallery read as a public exhibition rather than an internal dashboard.',path:'docs/exhibition-space-design-system.md'},
 {label:'Public site reskin architecture',detail:'The architecture for entrance, gallery, build rooms, lifecycle states, public records, and conversion path.',path:'docs/public-site-reskin-architecture.md'},
 {label:'Visual builds handoff',detail:'The reusable A/B-Web/B-LinkedIn motion architecture and production logic intended to travel into other content programs.',path:'docs/visual-builds-handoff.md'},
 {label:'Infrastructure manifest',detail:'The concrete artifact-lineage ledger showing what reusable primitives earlier builds created and later builds actually imported.',path:'docs/infrastructure-manifest.json'},
 {label:'001–006 archive + media backfill certification',detail:'Exact certified head, CI run, deployed-preview verification, integration decision, and reusable infrastructure left forward before Build 007.',path:'docs/builds/001-006-archive-media-backfill-certification.md'}
];

export const buildArchives:Record<string,BuildArchive>={
 '001':{id:'001',title:'Human Review Design Framework',question:'When is a human actually a control?',thesis:'Human presence is not the same thing as meaningful human review. Timing, evidence, authority, escalation, records, and the ability to change or stop an outcome have to be designed separately.',research:[
  {label:'Claim-to-source evidence map',detail:'Primary-source basis for the dimensions used in the framework, including source-vs-heuristic distinctions and freshness notes.',path:'data/build-001-evidence-v1.json',href:'/100-builds/001/evidence'},
  {label:'NIST AI RMF 1.0',detail:'Mapped into the evidence layer as a governance source family rather than treated as proof of the product score.'},
  {label:'EU AI Act Articles 13–14',detail:'Used for transparency/human-oversight source grounding where relevant.'},
  {label:'UK ICO AI audit toolkit — human review',detail:'Used as a primary governance source family for meaningful human review concepts.'},
  {label:'001 specification',detail:'Original build purpose, scope, use case, system behavior, audience range, and constraints.',path:'docs/builds/001/SPEC.md'}],created:[
  {label:'001-A working tool',detail:'Quick/deep diagnostic that turns plain-language workflow answers into prioritized human-review design findings.',href:'/100-builds/001/a'},
  {label:'001-B interactive visual',detail:'Motion/interaction reveal that decomposes “human in the loop” into the hidden architecture of review.',href:'/100-builds/001/b'},
  {label:'Making page',detail:'Visible build-development history and design changes.',href:'/100-builds/001/making'},
  {label:'Method page',detail:'Reusable method and conceptual decomposition.',href:'/100-builds/001/method'},
  {label:'Public record',detail:'Making, method, evidence, and limits in visitor-facing form.',href:'/100-builds/001/record'},
  {label:'Shared reusable primitives',detail:'Form Engine v1, Conditional Logic v1, Results Renderer v1, Visual Reveal Primitive v1, and Exhibition Room Shell v1 are recorded in the infrastructure manifest.'}],decisions:[
  {label:'Broad comprehension range',detail:'The interface was rewritten so an early-secondary reader can begin while a domain/technical reader can still inspect deeper control logic.'},
  {label:'Score is heuristic',detail:'Composite scoring/thresholds are explicitly product heuristics, not legal or compliance determinations.'},
  {label:'Interactive B is a separate artifact',detail:'The explanatory visual became a first-class interactive master rather than a static slideshow attached to A.'}],audits:[
  {label:'001–003 certification ledger',detail:'Automated release evidence, browser matrix, manual-device distinctions, and exact release history.',path:'docs/builds/001-003-certification-ledger.md'},
  {label:'001 release record',detail:'Release-state record for 001.',path:'docs/builds/001-release-record.md'},
  {label:'001–003 security review',detail:'Shared privacy/security review for the first tranche.',path:'docs/builds/001-003-security-review.md'},
  {label:'001–003 acceptance + artifact + freshness/privacy records',detail:'Machine-readable acceptance, artifact, resilience, and privacy/support ledgers.',path:'data/build-001-003-acceptance-v1.json'}],plans:[
  {label:'Standing reuse',detail:'001’s room shell and interaction primitives are intended to be inherited only when a later build has a concrete dependency—not merely thematic similarity.'},
  {label:'Physical-device review remains distinct',detail:'Automated certification does not replace any separately required physical-device/manual accessibility review.'}],sourceFiles:['apps/web/app/100-builds/001/a/page.tsx','apps/web/app/100-builds/001/b/page.tsx','apps/web/app/100-builds/001/evidence/page.tsx','apps/web/app/100-builds/001/making/page.tsx','apps/web/app/100-builds/001/method/page.tsx','data/build-001-evidence-v1.json','docs/builds/001/SPEC.md','docs/builds/001-release-record.md','docs/builds/001-003-certification-ledger.md','docs/builds/001-003-linkedin-artifact-manifest.json','docs/builds/001-003-linkedin-production-specs.md']},
 '002':{id:'002',title:'Multi-Audience Meaning Architecture',question:'Can the language change without the truth moving?',thesis:'Audience adaptation should transform register and explanation while preserving a separate source-of-truth object, explicit anchors, and an independent drift check.',research:[
  {label:'Governed engine record',detail:'The preservation/anchor contract and its limits are recorded as product/engineering heuristics.',path:'data/build-002-engine-v1.json'},
  {label:'Public record source',detail:'The original visitor-facing method/evidence/limits record created during the 002 build.',path:'docs/builds/002-public-record.md'},
  {label:'Browser-AI capability investigation',detail:'Local generation/translation was treated as optional progressive enhancement; an opaque CDN NLI evaluator was rejected until it could be pinned/versioned and governed.'}],created:[
  {label:'002-A working tool',detail:'Adapt one source claim for a selected audience while preserving locked facts, numbers, uncertainty, names, and negation.',href:'/100-builds/002/a'},
  {label:'002-B interactive visual',detail:'Audience doors alter expression while truth anchors stay visibly fixed.',href:'/100-builds/002/b'},
  {label:'Public build record',detail:'Making, method, evidence, and limitations.',href:'/100-builds/002/record'}],decisions:[
  {label:'Generation and verification stay separate',detail:'A fluent rewrite is never treated as its own proof of preservation.'},
  {label:'Browser AI is not first-value dependency',detail:'Core value remains available without a model/network call.'},
  {label:'Anchor checks are alarms, not equivalence proof',detail:'Passing the preservation contract does not establish semantic/cultural equivalence.'}],audits:[
  {label:'002 release record',detail:'Detailed certification-era release record and unresolved-manual distinctions.',path:'docs/builds/002-release-record.md'},
  {label:'Shared first-tranche certification',detail:'001–003 release matrix, security review, artifact ledger, privacy/support and freshness/performance records.',path:'docs/builds/001-003-certification-ledger.md'}],plans:[
  {label:'Future governed evaluator path',detail:'A stronger semantic evaluator remains possible only when versioning, provenance, fallback, and domain validation can be made inspectable.'}],sourceFiles:['apps/web/app/100-builds/002/a/MeaningArchitecture.tsx','apps/web/app/100-builds/002/b/MeaningDoors.tsx','data/build-002-engine-v1.json','docs/builds/002-public-record.md','docs/builds/002-release-record.md','docs/builds/001-003-certification-ledger.md','docs/builds/001-003-linkedin-production-specs.md']},
 '003':{id:'003',title:'Unserved Decision Discovery',question:'Where is information failing to become a decision?',thesis:'A market/content problem can hide a decision-system gap: people may already have information but still lack a repeatable way to decide what to do.',research:[
  {label:'Decision Gap Engine v1',detail:'The recurrence, consequence, ambiguity, and fragmentation heuristic that later builds can inherit concretely.',path:'data/build-003-engine-v1.json'},
  {label:'Public record source',detail:'Original public method/evidence/limits record.',path:'docs/builds/003-public-record.md'},
  {label:'Product-market-fit boundary',detail:'The build deliberately refuses to treat the score as proof of demand, willingness to pay, or solution correctness.'}],created:[
  {label:'003-A Decision Gap Lab',detail:'Describe a situation, unresolved decision, information substitutes, and structural signals; export a portable decision-gap record.',href:'/100-builds/003/a'},
  {label:'003-B Decision Void',detail:'Shows how adding more information can still leave the decision point empty.',href:'/100-builds/003/b'},
  {label:'Reusable Decision Gap Engine v1',detail:'Concrete scoring/tier primitive now imported by later builds.'},
  {label:'Public build record',detail:'Making, method, evidence, and limits.',href:'/100-builds/003/record'}],decisions:[
  {label:'AI only as optional challenger',detail:'Browser-local AI may challenge a hypothesis, but cannot establish demand or validation.'},
  {label:'External evidence belongs to 004',detail:'Retrieval/verification was intentionally not duplicated here; the sequence compounds instead.'}],audits:[
  {label:'003 release record',detail:'Release record for the final certified candidate.',path:'docs/builds/003-release-record.md'},
  {label:'Shared first-tranche certification',detail:'001–003 certification, security, artifact, privacy/support and resilience records.',path:'docs/builds/001-003-certification-ledger.md'}],plans:[
  {label:'Inherited by later product-discovery cycles',detail:'005 and 006 reuse the decision-gap primitive so the program remembers why the opportunity matters before choosing a form or automation path.'}],sourceFiles:['apps/web/app/100-builds/003/a/DecisionGapLab.tsx','apps/web/app/100-builds/003/b/DecisionVoid.tsx','packages/release/src/decision-engines.ts','data/build-003-engine-v1.json','docs/builds/003-public-record.md','docs/builds/003-release-record.md']},
 '004':{id:'004',title:'Manual Intelligence Engine',question:'What has to be true before research deserves automation?',thesis:'A research system should expose collection, provenance, source/claim separation, verification state, contradiction, uncertainty, and synthesis rules before any automation is allowed to hide them.',research:[
  {label:'Manual Intelligence Engine Method v1',detail:'Governed source schema, claim schema, verification contract, evidence-boundary invariants, and limitations.',path:'data/build-004-engine-v1.json'},
  {label:'Provenance upgrade',detail:'Issuer/author, publication/version, source date, checked/retrieval date, and relevant section/page were made explicit rather than buried in notes.'},
  {label:'Technological-ceiling survey',detail:'Automatic retrieval, model synthesis/extraction, vector retrieval, truth scoring, and agentic research were considered and rejected for this cycle because they would automate the method before making it inspectable.'}],created:[
  {label:'004-A Manual Intelligence Engine',detail:'Collection protocol → source register → claim verification queue → evidence-bounded intelligence brief.',href:'/100-builds/004/a'},
  {label:'004-B Intelligence Chain Story',detail:'Interactive RAW → COLLECT → SEPARATE → VERIFY → BRIEF visual master.',href:'/100-builds/004/b'},
  {label:'Local JSON research-record export',detail:'Preserves the working state without requiring an external service.'},
  {label:'Public build record',detail:'Making, method, evidence, and limits.',href:'/100-builds/004/record'}],decisions:[
  {label:'Verified requires a verification note',detail:'A claim cannot enter verified findings merely because a reviewer clicked a status.'},
  {label:'Clearing the note demotes the claim',detail:'The system enforces its evidence boundary rather than relying on memory.'},
  {label:'Contradiction/uncertainty remain visible',detail:'The brief is status-derived; unresolved states cannot be flattened into findings.'}],audits:[
  {label:'004 acceptance matrix',detail:'Machine-readable release gates and evidence basis.',path:'data/build-004-acceptance-v1.json'},
  {label:'004 artifact inventory',detail:'A/B-Web/B-LinkedIn production state and media gate.',path:'data/build-004-artifacts-v1.json'},
  {label:'004 privacy/support',detail:'State handling, privacy boundary, and support assumptions.',path:'data/build-004-privacy-support-v1.json'},
  {label:'004 freshness/performance',detail:'Network/model dependencies, resilience, and performance record.',path:'data/build-004-freshness-performance-v1.json'},
  {label:'004 release record',detail:'Detailed release engineering and adversarial audit history.',path:'docs/builds/004-release-record.md'},
  {label:'004 LinkedIn production record',detail:'Film dimensions, runtime, checksum, sampled-frame QA, and remaining phone/platform QA.',path:'docs/builds/004-linkedin-production.md'}],plans:[
  {label:'Automation comes later',detail:'004 creates the inspectable manual method that future retrieval/synthesis/agentic systems may inherit once their behavior can be governed.'}],sourceFiles:['apps/web/app/100-builds/004/a/ManualIntelligenceEngine.tsx','apps/web/app/100-builds/004/b/IntelligenceChainStory.tsx','data/build-004-engine-v1.json','data/build-004-acceptance-v1.json','data/build-004-artifacts-v1.json','data/build-004-privacy-support-v1.json','data/build-004-freshness-performance-v1.json','docs/builds/004-release-record.md','docs/builds/004-linkedin-production.md','tests/build004.spec.ts','tests/build004-story.spec.ts','tests/build004-routing.spec.ts']},
 '005':{id:'005',title:'Service-to-Software Discovery',question:'Which repeated service steps deserve software, human judgment, or removal?',thesis:'Repetition alone is not an automation opportunity. Map the service step-by-step, preserve judgment where it is central, remove low-value repetition, and prototype only the stable rule-bound work.',research:[
  {label:'Service-to-Software Discovery Method v1',detail:'Governed disposition rules, threshold heuristics, inherited decision-gap signal, and explicit non-claims.',path:'data/build-005-engine-v1.json'},
  {label:'Build 003 inheritance',detail:'The Decision Gap Engine is imported directly so 005 keeps the original problem signal visible while classifying service steps.'},
  {label:'Technological-ceiling decision',detail:'Automatic workflow mining, model classification, process-mining integrations, and agentic automation were deferred because they would obscure the form-selection logic this build is meant to expose.'}],created:[
  {label:'005-A service-step classifier',detail:'Maps service work into AUTOMATE / KEEP HUMAN / REMOVE candidates with visible reasons and explicit boundaries.',href:'/100-builds/005/a'},
  {label:'005-B Service Path Split',detail:'Interactive scenario visual that changes the service path instead of merely restyling it.',href:'/100-builds/005/b'},
  {label:'Workflow map JSON export',detail:'Carries signals, dispositions, reasons, and inherited decision-gap context.'},
  {label:'Public build record',detail:'Making, method, evidence, and limits.',href:'/100-builds/005/record'}],decisions:[
  {label:'REMOVE is first-class',detail:'Low-value repeated work is not automatically preserved simply because it can be automated.'},
  {label:'KEEP HUMAN is not anti-software',detail:'Software may still assist; the label protects central expert judgment and high-consequence ambiguity.'},
  {label:'AUTOMATE means investigate/prototype',detail:'It is not a deployment, ROI, labor, legal, or safety approval.'}],audits:[
  {label:'005 acceptance matrix',detail:'Machine-readable automated/manual release state.',path:'data/build-005-acceptance-v1.json'},
  {label:'005 privacy/support',detail:'Privacy and support assumptions for local workflow data.',path:'data/build-005-privacy-support-v1.json'},
  {label:'005 freshness/performance',detail:'Resilience and dependency record.',path:'data/build-005-freshness-performance-v1.json'},
  {label:'005 release record',detail:'Full release-engineering history and automated certification basis.',path:'docs/builds/005-release-record.md'},
  {label:'005 LinkedIn production record',detail:'Motion-film production specification, checksum, sampled-frame QA, and remaining phone/platform QA.',path:'docs/builds/005-linkedin-production.md'}],plans:[
  {label:'Feeds Build 006',detail:'005 establishes the form-before-automation boundary that 006 expands into a wider question: does the opportunity deserve software at all?'}],sourceFiles:['apps/web/app/100-builds/005/a/ServiceSoftwareLab.tsx','apps/web/app/100-builds/005/b/ServicePathSplit.tsx','data/build-005-engine-v1.json','data/build-005-acceptance-v1.json','data/build-005-privacy-support-v1.json','data/build-005-freshness-performance-v1.json','docs/builds/005-release-record.md','docs/builds/005-linkedin-production.md','tests/build005.spec.ts']},
 '006':{id:'006',title:'Does This Actually Deserve to Be Software?',question:'What form does the problem actually earn?',thesis:'Software is one possible form—not the default answer. Test value, recurrence, buyer clarity, software advantage, maintenance, expert judgment, durable data, and scale before choosing SOFTWARE / SERVICE / DATASET / COMPANY / KEEP SIMPLE.',research:[
  {label:'Software-worthiness engine v1',detail:'Governed form-classification heuristic and explicit non-claims.',path:'data/build-006-engine-v1.json'},
  {label:'Build 003 + 005 inheritance',detail:'Uses the decision-gap primitive and form-before-automation boundary rather than starting from a desire to build software.'},
  {label:'Technological-ceiling premise',detail:'The strongest answer may be to keep the system simple; technical sophistication is not treated as the optimization target.'}],created:[
  {label:'006-A software-worthiness lab',detail:'Move eleven visible product/form signals and inspect the candidate form plus reasons.',href:'/100-builds/006/a'},
  {label:'006-B Form Gate Field',detail:'Interactive visual master in which changing the evidence moves the candidate form.',href:'/100-builds/006/b'},
  {label:'Local software-worthiness JSON export',detail:'Preserves the idea, signals, inherited gap, candidate form, reasons, and limits.'},
  {label:'Public build record',detail:'Making, method, evidence, and limits.',href:'/100-builds/006/record'}],decisions:[
  {label:'KEEP SIMPLE is a successful output',detail:'A sophisticated evaluation is allowed to conclude that a template/process remains the stronger system.'},
  {label:'SERVICE / DATASET / COMPANY are distinct forms',detail:'The tool does not collapse every valuable opportunity into a software-product frame.'},
  {label:'Classification is a heuristic',detail:'It does not establish product-market fit, market size, ROI, feasibility, defensibility, legal permission, procurement readiness, safety, or investment readiness.'}],audits:[
  {label:'006 privacy/support record',detail:'Local-state privacy and support assumptions.',path:'data/build-006-privacy-support-v1.json'},
  {label:'006 freshness/performance record',detail:'No-network/no-model core-value and resilience record.',path:'data/build-006-freshness-performance-v1.json'},
  {label:'006 LinkedIn production record',detail:'Motion-film production record and media metadata.',path:'docs/builds/006-linkedin-production.md'},
  {label:'006 adversarial browser fixtures',detail:'Weak value → KEEP SIMPLE; high judgment/weak software advantage → SERVICE; durable data can → DATASET; local export; lifecycle/B-Web behavior.',path:'tests/build006.spec.ts'}],plans:[
  {label:'Final release package',detail:'Acceptance/release status is recorded only after the exact final-head Chromium/WebKit matrix earns it.'},
  {label:'Next cycle',detail:'007 closes one-way product flow into a governed feedback loop; it should branch only after 006’s final release state is frozen.'}],sourceFiles:['apps/web/app/100-builds/006/a/SoftwareWorthinessLab.tsx','apps/web/app/100-builds/006/b/FormGateField.tsx','data/build-006-engine-v1.json','data/build-006-privacy-support-v1.json','data/build-006-freshness-performance-v1.json','docs/builds/006-linkedin-production.md','tests/build006.spec.ts']},
 '007':{id:'007',title:'Feedback Loop Product Architecture',question:'How does feedback become accountable product improvement?',thesis:'A product learns only when use, outcomes, corrections, and unmet needs can reach a named human control, become a bounded change, be validated and communicated, and return to monitoring within explicit privacy limits.',research:[
  {label:'Feedback-loop engine + evidence boundary',detail:'The event schema, governed stages, source classifications, inherited control primitive, and non-claims.',path:'data/build-007-engine-v1.json'},
  {label:'Complete Build 007 archive',detail:'Observation, retained research, inheritance, decisions, rejected approaches, privacy, QA state, and forward lineage.',path:'docs/builds/007/ARCHIVE.md'},
  {label:'Build 007 specification',detail:'Purpose, inputs, engine contract, acceptance criteria, and evidence requirements.',path:'docs/builds/007/SPEC.md'}],created:[
  {label:'007-A feedback-loop architecture lab',detail:'Map four feedback event classes and test the controls required to turn signals into accountable improvements.',href:'/100-builds/007/a'},
  {label:'007-B The Product That Learns',detail:'Interactive one-way, partial, governed, and urgent-correction loop states.',href:'/100-builds/007/b'},
  {label:'Feedback Event Schema v1',detail:'Use, outcome, correction, and unmet-need events with source, affected group, urgency, and consent boundary.'},
  {label:'Local feedback-loop JSON export',detail:'Preserves product, events, controls, assessment, inheritance, version, and limits.'}],decisions:[
  {label:'Correction is first-class',detail:'A contest or repair signal is not buried in the ordinary request queue.'},
  {label:'Build 001 is concretely inherited',detail:'The engine imports humanReviewScore and humanReviewGrade; person-present is not treated as governed.'},
  {label:'Privacy can block closure',detail:'Missing consent-purpose confirmation or retention rules prevents the strongest assessment.'},
  {label:'Collection is not learning',detail:'Validation and communication must occur before outcomes return to monitoring.'}],audits:[
  {label:'Machine-readable archive',detail:'Structured lineage, decisions, rejected approaches, records, and limitations.',path:'data/build-007-archive-v1.json'},
  {label:'007 privacy/support record',detail:'Local-state privacy, minimization, export, and support boundary.',path:'data/build-007-privacy-support-v1.json'},
  {label:'007 freshness/performance record',detail:'No-network/no-model core value, dependencies, freshness, and resilience.',path:'data/build-007-freshness-performance-v1.json'},
  {label:'007 LinkedIn production record',detail:'Deterministic 4:5 film specification, checksum, reproduction, and verification boundary.',path:'docs/builds/007-linkedin-production.md'}],plans:[
  {label:'Certified release',detail:'Implementation head 47c9c83d passed 198/198 Chromium/WebKit tests in CI run 31986626556; exact-head Vercel deployment dpl_23iAtLXTcpztKXZNtNwdzEyQs5CS was READY and received hosted interaction QA.'},
  {label:'Future consumers',detail:'Canonical Builds 037, 086, and 087 explicitly inherit Build 007.'}],sourceFiles:['apps/web/app/100-builds/007/a/FeedbackLoopLab.tsx','apps/web/app/100-builds/007/b/GovernedLoopField.tsx','packages/release/src/decision-engines.ts','data/build-007-engine-v1.json','data/build-007-archive-v1.json','docs/builds/007/SPEC.md','docs/builds/007/ARCHIVE.md','docs/builds/007-linkedin-production.md','data/build-007-privacy-support-v1.json','data/build-007-freshness-performance-v1.json','tests/build007.spec.ts']},
 '008':{id:'008',title:'Decision-Ready Dashboard Standard',question:'When does a dashboard become a decision path?',thesis:'A dashboard becomes decision-ready only when relevant evidence is connected to a named decision, accountable owner, authorized action, timing, escalation, and an observable next state—with a human able to review caveats and resolve conflicts.',research:[
  {label:'Decision-readiness engine + evidence boundary',detail:'Metric completeness, action-state gates, inherited human-control scoring, status logic, provenance, and non-claims.',path:'data/build-008-engine-v1.json'},
  {label:'Complete Build 008 archive',detail:'Purpose, retained research, Build 001 inheritance, decisions, rejected approaches, QA state, and forward lineage.',path:'docs/builds/008/ARCHIVE.md'},
  {label:'Build 008 specification',detail:'Purpose, inputs, assessment contract, acceptance criteria, and evidence requirements.',path:'docs/builds/008/SPEC.md'},
  {label:'CDC dashboard guidance',detail:'Dashboards are appropriate when related visualizations and common filtering serve a combined purpose; not every dataset needs one.',href:'https://www.cdc.gov/cove/dashboards/index.html'},
  {label:'W3C WCAG 2.2 distinguishable guidance',detail:'Status and controls must remain perceivable through contrast, reflow, resizing, and cues beyond color.',href:'https://www.w3.org/WAI/WCAG22/Understanding/distinguishable'}],created:[
  {label:'008-A Decision-Ready Dashboard Standard',detail:'Name a decision, justify every metric, complete the accountable action state, inspect gaps, and export a local record.',href:'/100-builds/008/a'},
  {label:'008-B Data Is Not a Decision',detail:'Interactive chart-wall, signal, decision-ready, and conflict states that expose the human control node.',href:'/100-builds/008/b'},
  {label:'Decision Readiness Rubric v1',detail:'Completeness checks for decision-useful metrics and eight explicit action-state gates.'},
  {label:'Action-State Component v1',detail:'Decision → owner → action → next state, with trigger, deadline, authority, and escalation.'}],decisions:[
  {label:'Start with the decision',detail:'A metric must state how it can change the named decision; otherwise it remains information only.'},
  {label:'Completeness is not correctness',detail:'The rubric cannot prove source quality, causality, organizational authority, compliance, or decision quality.'},
  {label:'Build 001 is concretely inherited',detail:'The engine imports humanReviewScore and humanReviewGrade and exposes the inherited result.'},
  {label:'Conflict requires escalation',detail:'Competing obligations are surfaced for accountable human resolution rather than hidden behind a composite score.'},
  {label:'Status is not color-only',detail:'Every B state is expressed in text, structure, control state, and copy as well as visual treatment.'}],audits:[
  {label:'008 privacy/support record',detail:'Local-state privacy, no persistence, export, and support boundary.',path:'data/build-008-privacy-support-v1.json'},
  {label:'008 freshness/performance record',detail:'No-network/no-model core value, dependency, freshness, and resilience record.',path:'data/build-008-freshness-performance-v1.json'},
  {label:'008 LinkedIn production record',detail:'Deterministic 4:5 film specification, checksum, reproduction, and verification boundary.',path:'docs/builds/008-linkedin-production.md'},
  {label:'008 adversarial browser fixtures',detail:'Ready, incomplete, empty, metric lifecycle, export, 320px, scenario state, human control, and conflict behavior.',path:'tests/build008.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete Chromium/WebKit, accessibility, 320px, reduced-motion, archive, media, preview, and exact-head certification.'},
  {label:'Future consumer',detail:'Canonical Build 071 explicitly inherits cap:008.'}],sourceFiles:['apps/web/app/100-builds/008/a/DecisionDashboardLab.tsx','apps/web/app/100-builds/008/b/DecisionPathField.tsx','packages/release/src/decision-engines.ts','data/build-008-engine-v1.json','docs/builds/008/SPEC.md','docs/builds/008/ARCHIVE.md','docs/builds/008-linkedin-production.md','data/build-008-privacy-support-v1.json','data/build-008-freshness-performance-v1.json','tests/build008.spec.ts']},
 '009':{id:'009',title:'Place-Sensitive Technology Readiness',question:'Can this technology work in this place?',thesis:'Transferability is not a property of technology alone. Requirements must be tested against evidenced local capacity, prevailing hazards, access needs, operating systems, and legitimate local authority before a bounded pilot.',research:[
  {label:'Place-readiness engine + evidence boundary',detail:'Ten local dimensions, inherited decision-gap score, status logic, provenance, and non-claims.',path:'data/build-009-engine-v1.json'},
  {label:'Complete Build 009 archive',detail:'Canon, evidence boundary, direct Build 003 inheritance, privacy, lineage, and release placeholders.',path:'docs/builds/009/ARCHIVE.md'},
  {label:'Build 009 specification',detail:'Purpose, product contract, engine inheritance, evidence and non-claims.',path:'docs/builds/009/SPEC.md'},
  {label:'NIST Community Resilience Planning Guide',detail:'Supports local goals, collaborative planning, dependencies, prevailing hazards, infrastructure, and social/economic context.',href:'https://www.nist.gov/community-resilience/planning-guide'},
  {label:'NTIA local coordination',detail:'Supports meaningful involvement of local, territorial, Tribal, and underrepresented communities.',href:'https://broadbandusa.ntia.gov/news/latest-news/ntias-commitment-state-and-territory-local-coordination'}],created:[
  {label:'009-A Place-Sensitive Technology Readiness',detail:'Compare requirements with local capacity, record evidence/owners/mitigations, bound a pilot, and export a local record.',href:'/100-builds/009/a'},
  {label:'009-B Transfer Is a Place Question',detail:'Interactive place scenarios reshape feasibility and local authority in real time.',href:'/100-builds/009/b'},
  {label:'Place Readiness Engine v1',detail:'Ten-dimension local fit heuristic with explicit blockers, unknowns, mitigations, and three named states.'}],decisions:[
  {label:'Build 003 is concretely inherited',detail:'The engine directly calls decisionGapScore and decisionGapTier before assessing place fit.'},
  {label:'Community authority is a gate',detail:'Local and affected-community authority can condition, pause, or stop the pilot.'},
  {label:'Fit is not certification',detail:'The rubric does not prove safety, legality, legitimacy, reliability, adoption, procurement, or successful transfer.'},
  {label:'Status is not color-only',detail:'Every visual state is named, scored, structured, and described.'}],audits:[
  {label:'Machine-readable archive',detail:'Structured routes, lineage, privacy, evidence boundary, and release state.',path:'data/build-009-archive-v1.json'},
  {label:'009 browser fixtures',detail:'Conditional default, constraint change, empty state, export, lifecycle, 320px, scenario, and local-authority behavior.',path:'tests/build009.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Chromium/WebKit matrix, accessibility, archive, media, preview, and exact-head certification.'},
  {label:'Future consumers',detail:'Canonical Builds 045, 046, and 047 explicitly consume cap:009.'}],sourceFiles:['apps/web/app/100-builds/009/a/PlaceReadinessLab.tsx','apps/web/app/100-builds/009/b/FeasibilityField.tsx','packages/release/src/decision-engines.ts','data/build-009-engine-v1.json','data/build-009-archive-v1.json','docs/builds/009/SPEC.md','docs/builds/009/ARCHIVE.md','tests/build009.spec.ts']}
,
 '010':{id:'010',title:'Give the Idea a Skeleton',question:'What are the things, rules, and relationships inside this idea?',thesis:'Ambiguous concepts become testable when their entities, fields, relationships, constraints, and source rules are explicit—without confusing structural validity with truth.',research:[
  {label:'Idea Skeleton Engine v1',detail:'Entity, field, relationship, source-rule validation and explicit non-claims.',path:'data/build-010-engine-v1.json'},
  {label:'JSON Schema 2020-12 validation',detail:'Primary grounding for structural constraints on instance data.',href:'https://json-schema.org/draft/2020-12/json-schema-validation'},
  {label:'W3C SHACL',detail:'Primary grounding for validating data graphs against declared shapes.',href:'https://www.w3.org/TR/shacl/'},
  {label:'W3C PROV-O',detail:'Informs distinct entities and source/provenance relationships.',href:'https://www.w3.org/TR/prov-o/'}],created:[
  {label:'010-A Give the Idea a Skeleton',detail:'Define entities, fields, relationships and source rules; validate and export locally.',href:'/100-builds/010/a'},
  {label:'010-B From Words to Structure',detail:'Move loose language through named entities into a validated graph.',href:'/100-builds/010/b'},
  {label:'Idea Skeleton Engine v1',detail:'Reusable structural assessment primitive for later graph, rights, workflow and provenance builds.'}],decisions:[
  {label:'Stable identifiers are first-class',detail:'Names may change; entity, field, relationship and source identifiers remain inspectable.'},
  {label:'Source rules belong in the skeleton',detail:'Authority, exact locator, and freshness are modeled before facts are trusted.'},
  {label:'Validation is bounded',detail:'Passing structure does not prove truth, completeness, fairness, interoperability or domain fitness.'},
  {label:'Status is not color-only',detail:'Every stage is named and structurally distinct.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, consumers and release state.',path:'data/build-010-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local state and explicit export boundary.',path:'data/build-010-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Offline core value and dependency record.',path:'data/build-010-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Valid, invalid, empty, export, lifecycle, 320px, stage and boundary tests.',path:'tests/build010.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Chromium/WebKit matrix, media, preview and exact-head certification.'},
  {label:'Future consumers',detail:'011, 012, 016, 020, 023, 026, 027, 028, 029, 035, 044, 046, 075 and 099 consume cap:010.'}],sourceFiles:['apps/web/app/100-builds/010/a/IdeaSkeletonLab.tsx','apps/web/app/100-builds/010/b/SkeletonGraph.tsx','packages/release/src/decision-engines.ts','data/build-010-engine-v1.json','data/build-010-archive-v1.json','docs/builds/010/SPEC.md','docs/builds/010/ARCHIVE.md','tests/build010.spec.ts']}
,
 '011':{id:'011',title:'Entity / Ownership Resolution X-Ray',question:'When do two records refer to the same thing?',thesis:'Similarity is not identity. Resolution requires a valid entity model, source-linked support and conflict evidence, attribute minimization, and an accountable human decision record.',research:[
  {label:'Resolution engine + evidence boundary',detail:'Signals, source authority, conflict behavior, inherited schema gate and non-claims.',path:'data/build-011-engine-v1.json'},
  {label:'NIST SP 800-63A-4',detail:'Grounds contextual resolution, evidence validation and authoritative or credible sources.',href:'https://pages.nist.gov/800-63-4/sp800-63a.html'},
  {label:'NIST identity-resolution implementation resource',detail:'Grounds minimum-necessary attributes and additional evidence for conflicts.',href:'https://pages.nist.gov/800-63-3-Implementation-Resources/63A/resolution/'}],created:[
  {label:'011-A Entity / Ownership Resolution X-Ray',detail:'Compare records, toggle evidence and conflicts, validate the model, record review and export locally.',href:'/100-builds/011/a'},
  {label:'011-B Same Name Is Not Same Entity',detail:'Three interactive resolution states with visible human authority.',href:'/100-builds/011/b'},
  {label:'Entity Resolution Engine v1',detail:'Reusable merge-candidate, human-review and keep-separate assessment.'}],decisions:[
  {label:'Build 010 is concretely inherited',detail:'The resolver directly calls assessIdeaSkeleton and blocks the strongest result when the entity model is invalid.'},
  {label:'Authoritative conflicts dominate similarity',detail:'A hard conflict can keep records separate despite matching names or relationships.'},
  {label:'The score never executes a merge',detail:'A named human records rationale, aliases, sources and rollback.'},
  {label:'Minimization is a gate',detail:'Unnecessary identifying attributes prevent the strongest assessment.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy and consumers.',path:'data/build-011-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local state and minimization boundary.',path:'data/build-011-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Offline operation and record-freshness rule.',path:'data/build-011-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Merge, conflict, review, reset, export, lifecycle, 320px and B-state coverage.',path:'tests/build011.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Chromium/WebKit matrix, media, preview and exact-head certification.'},
  {label:'Future consumers',detail:'021, 026, 027, 041, 046, 056, 060, 062, 082, 084, 085, 088 and 099 consume cap:011.'}],sourceFiles:['apps/web/app/100-builds/011/a/EntityResolutionLab.tsx','apps/web/app/100-builds/011/b/IdentityField.tsx','packages/release/src/decision-engines.ts','data/build-011-engine-v1.json','data/build-011-archive-v1.json','docs/builds/011/SPEC.md','docs/builds/011/ARCHIVE.md','tests/build011.spec.ts']}

,
 '012':{id:'012',title:'AI Use Consequence & Control Mapper',question:'What controls does this AI use earn?',thesis:'AI controls should follow the consequence of a bounded use—not the prestige of a model or a generic risk label.',research:[
  {label:'Consequence and control engine',detail:'Nine evidence-bearing dimensions, proportional required controls, inherited human-review gate and explicit non-approval boundary.',path:'data/build-012-engine-v1.json'},
  {label:'NIST AI RMF 1.0',detail:'Grounds context-sensitive, rights-preserving management of AI risk across the lifecycle.',href:'https://doi.org/10.6028/NIST.AI.100-1'},
  {label:'OECD AI classification framework',detail:'Grounds classification by people, context, data, model, task and output rather than model name alone.',href:'https://oecd.ai/en/ai-publications/framework-classification'}],created:[
  {label:'012-A AI Use Consequence & Control Mapper',detail:'Score an evidenced use, edit eleven controls, expose gaps and export locally.',href:'/100-builds/012/a'},
  {label:'012-B Controls Follow Consequence',detail:'Three interactive consequence states visibly reconfigure control load.',href:'/100-builds/012/b'},
  {label:'AI Control Mapper Engine v1',detail:'Reusable consequence, coverage, inherited human-review, structural-gate and escalation assessment.'}],decisions:[
  {label:'Builds 001 and 010 are concrete dependencies',detail:'The engine directly calls the human-review score/grade primitives and assessIdeaSkeleton.'},
  {label:'Consequence drives required controls',detail:'Severe rights or essential-service impacts trigger the full control set regardless of average score.'},
  {label:'Missing controls escalate',detail:'A severe use with an incomplete control architecture returns ESCALATE / DO NOT DEPLOY.'},
  {label:'No state grants permission',detail:'The boundary excludes legal classification, compliance, safety certification and deployment approval.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy and consumers.',path:'data/build-012-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local assessment and competent-review boundary.',path:'data/build-012-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Current primary sources and offline core value.',path:'data/build-012-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Controlled, escalation, reset, export, lifecycle, 320px and B-state coverage.',path:'tests/build012.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Chromium/WebKit matrix, media, preview and exact-head certification.'},
  {label:'Future consumers',detail:'013, 014, 019, 021, 022, 025, 032, 033, 038, 040, 041 and 042 consume cap:012.'}],sourceFiles:['apps/web/app/100-builds/012/a/AIControlMapper.tsx','apps/web/app/100-builds/012/b/ConsequenceField.tsx','packages/release/src/decision-engines.ts','data/build-012-engine-v1.json','data/build-012-archive-v1.json','docs/builds/012/SPEC.md','docs/builds/012/ARCHIVE.md','tests/build012.spec.ts']}
,
 '013':{id:'013',title:'AI Workflow Consequence Scanner',question:'Where does consequence enter and travel?',thesis:'AI consequence is produced by an end-to-end workflow. A risk entering one stage can survive every downstream handoff when ownership, control, stop authority, or monitoring is missing.',research:[
  {label:'Workflow scanner engine',detail:'Directed stage traversal, inherited Build 012 assessment, control coverage, propagation exposure, gaps and non-claims.',path:'data/build-013-engine-v1.json'},
  {label:'NIST AI RMF Core',detail:'Grounds lifecycle interdependence, distributed visibility, mapped context, measurement and ongoing management.',href:'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/'},
  {label:'NIST SP 800-218A',detail:'Grounds AI-specific secure practices across the software development lifecycle.',href:'https://doi.org/10.6028/NIST.SP.800-218A'}],created:[
  {label:'013-A AI Workflow Consequence Scanner',detail:'Trace risks through six stages, remove controls, expose gaps and export locally.',href:'/100-builds/013/a'},
  {label:'013-B Follow the Consequence',detail:'An interactive risk circuit illuminates downstream propagation.',href:'/100-builds/013/b'},
  {label:'AI Workflow Scanner Engine v1',detail:'Reusable directed propagation and stage-control assessment.'}],decisions:[
  {label:'Build 012 is concretely inherited',detail:'The scanner directly calls assessAIUseControls and exposes its status.'},
  {label:'Workflow stages—not model boundaries—define scope',detail:'Intake, data, model, decision, action and monitoring remain visible.'},
  {label:'Every stage needs four control properties',detail:'Owner, control, stop authority and monitoring are independently inspectable.'},
  {label:'Exposure is not probability',detail:'The score prioritizes gaps; it does not predict harm or approve deployment.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy and consumers.',path:'data/build-013-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local state and competent-review boundary.',path:'data/build-013-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Current primary sources and offline graph traversal.',path:'data/build-013-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Contained, propagation, reset, export, lifecycle, 320px and B-state coverage.',path:'tests/build013.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Chromium/WebKit matrix, media, preview and exact-head certification.'},
  {label:'Future consumers',detail:'022, 025, 032 and 041 consume cap:013.'}],sourceFiles:['apps/web/app/100-builds/013/a/WorkflowScanner.tsx','apps/web/app/100-builds/013/b/RiskCircuit.tsx','packages/release/src/decision-engines.ts','data/build-013-engine-v1.json','data/build-013-archive-v1.json','docs/builds/013/SPEC.md','docs/builds/013/ARCHIVE.md','tests/build013.spec.ts']}
,
 '014':{id:'014',title:'Legal Judgment Architecture',question:'Who owns each layer of legal judgment?',thesis:'A tool may produce legal text, but responsibility does not move with the text. Research, interpretation, inference, strategy, approval, professional judgment and client authority require distinct allocations.',research:[
  {label:'Legal judgment engine',detail:'Seven work layers, four allocation states, inherited human and AI controls, leak detection and jurisdictional boundary.',path:'data/build-014-engine-v1.json'},
  {label:'ABA Formal Opinion 512',detail:'Official guidance on competence, confidentiality, communication, supervision, candor and fees when lawyers use generative AI.',href:'https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf'},
  {label:'ABA Model Rule 2.1',detail:'Grounds the lawyer’s independent professional judgment and candid advice.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_2_1_advisor/'},
  {label:'ABA Model Rule 5.3',detail:'Grounds reasonable measures, supervision and responsibility for nonlawyer assistance.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_5_3_responsibilities_regarding_nonlawyer_assistant/'}],created:[
  {label:'014-A Legal Judgment Architecture',detail:'Audit seven legal-work layers, expose judgment leakage and export locally.',href:'/100-builds/014/a'},
  {label:'014-B The Answer Has Layers',detail:'An interactive responsibility stack separates assistance from owned judgment.',href:'/100-builds/014/b'},
  {label:'Legal Judgment Engine v1',detail:'Reusable legal-work allocation and supervision assessment.'}],decisions:[
  {label:'Builds 001 and 012 are concrete dependencies',detail:'The engine directly calls the human-review primitives and assessAIUseControls.'},
  {label:'Generated text does not transfer responsibility',detail:'Strategy, final approval and professional judgment cannot be silently assigned to AI assistance.'},
  {label:'Client authority remains distinct',detail:'Decisions allocated to the client are not relabeled lawyer or tool decisions.'},
  {label:'No universal UPL claim',detail:'The architecture defers to jurisdictional law, adopted rules, court orders, agreements and supervising counsel.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy and consumers.',path:'data/build-014-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local state and jurisdictional support boundary.',path:'data/build-014-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Current official ABA sources and offline operation.',path:'data/build-014-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Supervised, leak, reset, export, lifecycle, 320px and B-layer coverage.',path:'tests/build014.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Chromium/WebKit matrix, media, preview and exact-head certification.'},
  {label:'Future consumers',detail:'015, 016, 044 and 093 consume cap:014.'}],sourceFiles:['apps/web/app/100-builds/014/a/LegalJudgmentLab.tsx','apps/web/app/100-builds/014/b/JudgmentLayers.tsx','packages/release/src/decision-engines.ts','data/build-014-engine-v1.json','data/build-014-archive-v1.json','docs/builds/014/SPEC.md','docs/builds/014/ARCHIVE.md','tests/build014.spec.ts']},
 '015':{id:'015',title:'Repeated Legal Task → Product Engine',question:'Which repeated legal work can safely become a reusable system?',thesis:'Repetition is evidence of a pattern, not permission to automate judgment. Reusable structure must be separated from matter facts, confidentiality, legal conclusions, strategy, approval, and client authority.',research:[
  {label:'Legal product engine',detail:'Seven-factor candidate assessment, four bounded dispositions, human review, and explicit productization boundary.',path:'data/build-015-engine-v1.json'},
  {label:'ABA Model Rule 1.1',detail:'Competence remains required when selecting and using methods and technology.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_1_competence/'},
  {label:'ABA Model Rule 1.6',detail:'Confidentiality constrains the information and systems used in repeated legal work.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_6_confidentiality_of_information/'},
  {label:'ABA Model Rule 5.3',detail:'Supervision and responsibility remain with authorized humans.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_5_3_responsibilities_regarding_nonlawyer_assistant/'}],created:[
  {label:'015-A Repeated Legal Task → Product Engine',detail:'Scores repeated tasks and exposes safe, internal, supervised, and prohibited dispositions.',href:'/100-builds/015/a'},
  {label:'015-B From Matter Work to Reusable System',detail:'An interactive assembly line reveals where matter work becomes governed structure.',href:'/100-builds/015/b'},
  {label:'Legal Product Engine v1',detail:'Reusable candidate scoring and productization-boundary assessment.'}],decisions:[
  {label:'Repetition is not authorization',detail:'Frequency supports investigation but cannot move professional responsibility or expand who may provide legal services.'},
  {label:'Structure may be reusable',detail:'Inputs, fields, source rules, verification steps, handoffs, records, and review gates may become bounded systems.'},
  {label:'Judgment remains owned',detail:'Matter conclusions, strategy, approval, confidential information, and client decisions stay with authorized humans.'},
  {label:'Internal is a distinct disposition',detail:'Some useful systems are appropriate only inside an access-controlled supervised environment.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, and lifecycle state.',path:'data/build-015-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local processing and professional boundary.',path:'data/build-015-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Official ABA sources and offline deterministic operation.',path:'data/build-015-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Candidate, unsafe collapse, reset, export, lifecycle, 320px, and paired-visual coverage.',path:'tests/build015.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete local static gates, browser matrix, Vercel preview, and deployment verification; defer GitHub-hosted jobs until Actions capacity returns.'},
  {label:'Future consumers',detail:'Build 093 consumes cap:015.'}],sourceFiles:['apps/web/app/100-builds/015/a/LegalProductLab.tsx','apps/web/app/100-builds/015/b/ProductAssembly.tsx','packages/release/src/decision-engines.ts','data/build-015-engine-v1.json','data/build-015-archive-v1.json','docs/builds/015/SPEC.md','docs/builds/015/ARCHIVE.md','tests/build015.spec.ts']},
 '016':{id:'016',title:'Legal Workflow Mapping System',question:'What actually has to move—and who accepts responsibility at every transfer?',thesis:'A legal task is an operational network. Actors, documents, authorities, deadlines, decisions, risks, records, and handoffs must be explicit before a workflow is accountable.',research:[
  {label:'Legal Workflow Engine v1',detail:'Seven node classes, nine-field handoff records, coverage, orphan detection, responsibility gaps, and human review.',path:'data/build-016-engine-v1.json'},
  {label:'ABA Model Rule 1.1',detail:'Grounds competent methods, preparation, and technological understanding.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_1_competence/'},
  {label:'ABA Model Rule 1.3',detail:'Grounds diligence and controlled progress through the matter.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_3_diligence/'},
  {label:'ABA Model Rule 1.4',detail:'Grounds communication, consultation, and informed client decisions.',href:'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_1_4_communications/'}],created:[
  {label:'016-A Legal Workflow Mapping System',detail:'Maps nodes and accountable handoff records, exposes broken acceptance, and exports locally.',href:'/100-builds/016/a'},
  {label:'016-B The Matter Beneath the Matter',detail:'A linear request unfolds into actors, evidence, controls, and records.',href:'/100-builds/016/b'},
  {label:'Workflow Map Schema and Handoff Record v1',detail:'Reusable operational primitives for later regulated-market and state-machine builds.'}],decisions:[
  {label:'Builds 010 and 014 are concrete dependencies',detail:'The workflow inherits explicit entities and relationships plus legal judgment and authority allocation.'},
  {label:'Handoffs are first-class controls',detail:'Every transfer records payload, sender, receiver, trigger, deadline, acceptance, authority, record, and escalation.'},
  {label:'Deadlines join the decision network',detail:'A deadline is sourced, computed, owned, confirmed, changed, and escalated—not merely displayed.'},
  {label:'The map does not provide legal advice',detail:'It structures supervised work while jurisdiction-specific professional conclusions remain with authorized counsel.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, and lifecycle.',path:'data/build-016-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local state and competent-review boundary.',path:'data/build-016-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Official ABA sources and offline deterministic operation.',path:'data/build-016-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Mapped, broken handoff, reset, export, lifecycle, 320px, and paired-visual coverage.',path:'tests/build016.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete local gates, Vercel deployment, live browser verification, then record GitHub CI and media independently.'},
  {label:'Future consumers',detail:'017, 018, 069, 077 and 093 consume cap:016.'}],sourceFiles:['apps/web/app/100-builds/016/a/LegalWorkflowLab.tsx','apps/web/app/100-builds/016/b/MatterNetwork.tsx','packages/release/src/decision-engines.ts','data/build-016-engine-v1.json','data/build-016-archive-v1.json','docs/builds/016/SPEC.md','docs/builds/016/ARCHIVE.md','tests/build016.spec.ts']}

,
 '017':{id:'017',title:'Regulated-Market Handoff Mapper',question:'Where does responsibility disappear between organizations?',thesis:'Regulated work does not become safe because every organization has its own box. Responsibility, evidence, permission, acceptance, incident duties, records, and recourse must survive every transfer.',research:[
  {label:'Regulated Handoff Engine v1',detail:'Cross-organization responsibility-gap detection that concretely inherits Build 016’s workflow and handoff assessment.',path:'data/build-017-engine-v1.json'},
  {label:'FDA quality-agreement guidance',detail:'Grounds explicit allocation and documentation of manufacturing activities while preserving each party’s applicable CGMP responsibilities.',href:'https://www.fda.gov/regulatory-information/search-fda-guidance-documents/contract-manufacturing-arrangements-drugs-quality-agreements-guidance-industry'},
  {label:'45 CFR 164.504(e)',detail:'Grounds bounded uses, safeguards, reporting, downstream restrictions, records, return or destruction, cure, termination, and organizational responsibility in the HIPAA business-associate context.',href:'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.504'}],created:[
  {label:'017-A Regulated-Market Handoff Mapper',detail:'Maps organizations and cross-institution controls, exposes a broken data transfer, and exports locally.',href:'/100-builds/017/a'},
  {label:'017-B The Risk Lives Between the Boxes',detail:'An interactive institutional diagram reveals five hidden transfer questions.',href:'/100-builds/017/b'},
  {label:'Cross-Organization Handoff Model and Responsibility Gap Detector',detail:'Reusable primitives for later state, escalation, implementation, consent, and regulated-system builds.'}],decisions:[
  {label:'Build 016 is concretely inherited',detail:'The engine converts organizations and transfers into the legal workflow nodes and nine-field handoffs consumed by assessLegalWorkflow.'},
  {label:'Agreements do not erase applicable duties',detail:'The mapper allocates work and controls without implying that a contract transfers or eliminates obligations imposed by governing law.'},
  {label:'Permission and recourse are independent controls',detail:'A technically successful transfer can still fail because its purpose, authority, incident response, or affected-person remedy is missing.'},
  {label:'Examples are not universal compliance rules',detail:'Every real use requires the correct jurisdiction, market, product, activity, agreement, facts, and competent reviewers.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, deferred gates, and lifecycle.',path:'data/build-017-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local operation and legal/compliance boundary.',path:'data/build-017-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Current primary sources and offline deterministic operation.',path:'data/build-017-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Intact, broken controls, reset, export, lifecycle, 320px, and paired-visual coverage.',path:'tests/build017.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete local gates, Vercel deployment, and live browser verification; keep GitHub-hosted CI and media certification pending until Actions capacity returns.'},
  {label:'Future consumers',detail:'018, 019, 022, 043, 044, 048, 065, 069, 077 and 093 consume cap:017.'}],sourceFiles:['apps/web/app/100-builds/017/a/RegulatedHandoffLab.tsx','apps/web/app/100-builds/017/b/BetweenTheBoxes.tsx','packages/release/src/decision-engines.ts','data/build-017-engine-v1.json','data/build-017-archive-v1.json','docs/builds/017/SPEC.md','docs/builds/017/ARCHIVE.md','tests/build017.spec.ts']},
 '018':{id:'018',title:'Institutional Friction Detector',question:'Where is the institution making the path harder than it has to be?',thesis:'An official process is also an experienced path. Waits, repeated loops, duplicate demands, dead ends, and ownerless states can make a valid institutional outcome inaccessible.',research:[
  {label:'Institutional Friction Engine v1',detail:'Five observable friction classes, inherited workflow and handoff status, transparent score, and prioritized repair order.',path:'data/build-018-engine-v1.json'},
  {label:'OMB Circular A-11 Section 280',detail:'Grounds attention to public-facing service delivery, customer experience, measurement, and improvement.',href:'https://www.whitehouse.gov/omb/information-resources/guidance/circulars/'},
  {label:'OMB administrative-burden guidance',detail:'Grounds attention to time, learning, compliance, access, and psychological costs in public-benefit and service processes.',href:'https://www.whitehouse.gov/wp-content/uploads/2022/12/M-23-08.pdf'}],created:[
  {label:'018-A Institutional Friction Detector',detail:'Detects bottlenecks, loops, dead ends, duplicate demands, and owner gaps, simulates repair, and exports locally.',href:'/100-builds/018/a'},
  {label:'018-B The Process Is Part of the Outcome',detail:'An interactive path makes the experienced cost inside an official process visible.',href:'/100-builds/018/b'},
  {label:'Institutional Friction Finding and Repair Order v1',detail:'Reusable process signals for later escalation, implementation, and institutional-system builds.'}],decisions:[
  {label:'Builds 016 and 017 are concrete dependencies',detail:'The detector directly calls assessLegalWorkflow and assessRegulatedHandoffs before reporting local process friction.'},
  {label:'The fixture contains a repairable defect',detail:'A duplicated evidence request, 96-hour wait, and three loops create visible hotspots; the simulation repairs only those bounded conditions.'},
  {label:'Experienced burden is not reduced to one score',detail:'The score sorts observable signals while direct research with affected people remains necessary.'},
  {label:'No compliance or eligibility claim',detail:'The engine cannot determine legal compliance, entitlement, institutional authority, or the full burden a person experiences.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, deferred gates, and lifecycle.',path:'data/build-018-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local operation and redesign boundary.',path:'data/build-018-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Official OMB sources and offline deterministic operation.',path:'data/build-018-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Hotspots, bounded repair, reset, export, lifecycle, 320px, and paired-visual coverage.',path:'tests/build018.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete Vercel deployment and live browser verification; keep GitHub-hosted CI and media certification pending until Actions capacity returns.'},
  {label:'Future consumers',detail:'019, 034, 048 and 093 consume cap:018.'}],sourceFiles:['apps/web/app/100-builds/018/a/InstitutionalFrictionLab.tsx','apps/web/app/100-builds/018/b/ProcessDrag.tsx','packages/release/src/decision-engines.ts','data/build-018-engine-v1.json','data/build-018-archive-v1.json','docs/builds/018/SPEC.md','docs/builds/018/ARCHIVE.md','tests/build018.spec.ts']},
 '019':{id:'019',title:'Consequence-Aware Escalation Router',question:'When something needs attention, who actually needs to know—and when?',thesis:'An alert is useful only when its consequence, evidence, owner, authority, channel, acknowledgement clock, backup, and next step are explicit.',research:[
  {label:'Escalation Router Engine v1',detail:'Event correlation, consequence scoring, explicit acknowledgement records, authority/channel validation, backup routing, and explainable reasons.',path:'data/build-019-engine-v1.json'},
  {label:'LinkedIn production record',detail:'Exact silent-first storyboard, transcript, source inventory, rights basis, encoding target, and honest pending gates.',path:'docs/builds/019/LINKEDIN-PRODUCTION.md'},
  {label:'NIST SP 800-61 Rev. 3',detail:'Supports integrating incident response across operations, roles, communication, prioritization, response, and recovery.',href:'https://csrc.nist.gov/pubs/sp/800/61/r3/final'},
  {label:'NIST Cybersecurity Framework 2.0',detail:'Supports adverse-event analysis, magnitude validation, incident management, and notification of designated stakeholders.',href:'https://www.nist.gov/cyberframework'},
  {label:'CISA situational-awareness guidance',detail:'Supports designing urgent notification systems to avoid alarm inundation and alarm fatigue.',href:'https://www.cisa.gov/sites/default/files/publications/CRR_Resource_Guide-SA_0.pdf'}],created:[
  {label:'019-A Consequence-Aware Escalation Router',detail:'Correlates signals, checks consequence and authority, simulates acknowledgement failure, reroutes, and exports locally.',href:'/100-builds/019/a'},
  {label:'019-B The Alert That Knows Who Cares',detail:'An interactive signal field collapses noise into one timed, explainable escalation chain.',href:'/100-builds/019/b'},
  {label:'Event Rules, Notification Router, and Escalation Ladder v1',detail:'Reusable event and acknowledgement primitives for later incident, agent, legal-change, and institutional builds.'}],decisions:[
  {label:'Builds 012, 017, and 018 are concrete dependencies',detail:'The router executes the inherited consequence-control, cross-organization handoff, and process-friction assessments.'},
  {label:'Correlation precedes notification',detail:'Repeated signals sharing one correlation key become one incident candidate rather than three interruptions.'},
  {label:'Authority is not availability',detail:'The first available person is not routed a consequential event unless their recorded authority matches the required action.'},
  {label:'Suppression remains visible',detail:'A suppressed event retains its reason and state; silence is never treated as deletion.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, deferred gates, and lifecycle.',path:'data/build-019-archive-v1.json'},
  {label:'Privacy/support',detail:'Client-local synthetic fixture and operational/legal boundary.',path:'data/build-019-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Current official sources and deterministic offline operation.',path:'data/build-019-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Correlation, recorded acknowledgement, timeout escalation, empty state, reset, export, lifecycle, 320px, and paired-visual coverage.',path:'tests/build019.spec.ts'},
  {label:'LinkedIn film candidate',detail:'Versioned six-scene source and deterministic pipeline are present; binary render and manual certification remain pending.',path:'data/linkedin-film-specs-v1.json'}],plans:[
  {label:'Release path',detail:'Complete local gates, Vercel deployment, live browser verification, and exact-head evidence; keep GitHub-hosted CI and media certification independent.'},
  {label:'Future consumers',detail:'020, 034, 037, 040, 043, 069, 092 and 093 consume cap:019.'}],sourceFiles:['apps/web/app/100-builds/019/a/EscalationRouterLab.tsx','apps/web/app/100-builds/019/b/SignalChain.tsx','packages/release/src/decision-engines.ts','data/build-019-engine-v1.json','data/build-019-archive-v1.json','docs/builds/019/SPEC.md','docs/builds/019/ARCHIVE.md','docs/builds/019/LINKEDIN-PRODUCTION.md','data/linkedin-film-specs-v1.json','scripts/render-linkedin-films.py','.github/workflows/render-linkedin-films.yml','tests/build019.spec.ts']},
 '020':{id:'020',title:'Decision Evidence Ledger',question:'Why was this decision made, and can its evidence and result be reconstructed?',thesis:'A decision is accountable only when its actor, authority, time, evidence, alternatives, acknowledgement, result, and correction history remain linked without silently replacing earlier records.',research:[
  {label:'Decision Evidence Ledger v1',detail:'Eight linked record classes, disclosed evidence gaps, append-only correction, and local export.',path:'data/build-020-engine-v1.json'},
  {label:'W3C PROV-O',detail:'Grounds entities, activities, agents, attribution, derivation, and temporal provenance.',href:'https://www.w3.org/TR/prov-o/'},
  {label:'NIST SP 800-53 Rev. 5',detail:'Grounds audit-event content, timestamps, review, protection, and retention controls.',href:'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final'}],created:[
  {label:'020-A Decision Evidence Ledger',detail:'Reconstructs a synthetic decision, exposes missing evidence, appends corrections, and exports locally.',href:'/100-builds/020/a'},
  {label:'020-B Open the Decision',detail:'Progressively opens one outcome into its actor, authority, evidence, alternatives, result, and correction chain.',href:'/100-builds/020/b'},
  {label:'Decision Record and Evidence Chain v1',detail:'Reusable provenance primitives for later procurement, incident, change, governance, and research builds.'}],decisions:[
  {label:'Canonical versus implementation copy is explicit',detail:'Title, job, B-web, and lineage are canonical; the displayed question and thesis are derived implementation copy.'},
  {label:'Corrections do not erase history',detail:'A correction appends a reasoned superseding record and retains the original.'},
  {label:'Provenance is not proof',detail:'A complete chain does not itself establish truth, causation, legality, authority validity, or substantive correctness.'},
  {label:'Builds 001, 010, and 019 are concrete dependencies',detail:'The ledger inherits review authority, explicit entities/relationships, and acknowledgement/escalation records.'}],audits:[
  {label:'Machine-readable archive',detail:'Routes, lineage, privacy, deferred gates, and lifecycle.',path:'data/build-020-archive-v1.json'},
  {label:'Privacy/support',detail:'Synthetic client-local fixture and provenance boundary.',path:'data/build-020-privacy-support-v1.json'},
  {label:'Freshness/performance',detail:'Primary provenance and audit-control sources with deterministic offline operation.',path:'data/build-020-freshness-performance-v1.json'},
  {label:'Browser fixtures',detail:'Complete chain, evidence gap, append correction, export, 320px, and paired visual coverage.',path:'tests/build020.spec.ts'}],plans:[
  {label:'Release path',detail:'Complete static gates, Vercel deployment, authenticated browser and physical-device accessibility review; certify media independently.'},
  {label:'Future consumers',detail:'021, 023, 026, 029, 032, 033, 034, 037, 038, 039, 041, 044, 057, 058, 060, 061, 069, 071, 084, 088, 092, 093, 094 and 100 consume cap:020.'}],sourceFiles:['apps/web/app/100-builds/020/a/DecisionEvidenceLedger.tsx','apps/web/app/100-builds/020/b/DecisionChain.tsx','data/build-020-engine-v1.json','data/build-020-archive-v1.json','docs/builds/020/SPEC.md','docs/builds/020/ARCHIVE.md','tests/build020.spec.ts']}


};
