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
  {label:'Release path',detail:'Complete Chromium/WebKit, accessibility, 320px, reduced-motion, archive, media, preview, and exact-head certification.'},
  {label:'Future consumers',detail:'Canonical Builds 037, 086, and 087 explicitly inherit Build 007.'}],sourceFiles:['apps/web/app/100-builds/007/a/FeedbackLoopLab.tsx','apps/web/app/100-builds/007/b/GovernedLoopField.tsx','packages/release/src/decision-engines.ts','data/build-007-engine-v1.json','data/build-007-archive-v1.json','docs/builds/007/SPEC.md','docs/builds/007/ARCHIVE.md','docs/builds/007-linkedin-production.md','data/build-007-privacy-support-v1.json','data/build-007-freshness-performance-v1.json','tests/build007.spec.ts']}
};
