export type Treatment='pilot-now'|'evidence-sprint'|'editorial-lab'|'method-anchor'|'supporting-module'|'archive-concept'|'merged-module';

export const launchPilots=['001','030'] as const;
export const methodAnchors=['012','014'] as const;

export const candidatePlan=[
  {id:'001',treatment:'pilot-now',parent:null,reason:'Consensus hero: human authority, evidence and stopping power are central to the RN method.'},
  {id:'030',treatment:'pilot-now',parent:null,reason:'Consensus hero: inclusive repair is legible, interactive and directly connected to design practice.'},
  {id:'009',treatment:'evidence-sprint',parent:null,reason:'Place-sensitive transfer connects Hawaiʻi, implementation and Dutch field research.'},
  {id:'017',treatment:'evidence-sprint',parent:null,reason:'Institutional handoffs are distinctive, but the prototype needs real workflow evidence.'},
  {id:'021',treatment:'evidence-sprint',parent:null,reason:'AI vendor-claim scrutiny has immediate professional relevance and a clear evidence test.'},
  {id:'045',treatment:'evidence-sprint',parent:null,reason:'Cannabis access fits RN’s domain authority but requires real journey evidence and current sources.'},
  {id:'046',treatment:'evidence-sprint',parent:null,reason:'Island dependency is highly distinctive but must be grounded in actual infrastructure evidence.'},
  {id:'048',treatment:'evidence-sprint',parent:null,reason:'The lived experience of rules is a strong RN proposition that needs observed human evidence.'},
  {id:'059',treatment:'evidence-sprint',parent:null,reason:'Citation verification directly connects law and AI, but must be tested against real citations.'},
  {id:'069',treatment:'evidence-sprint',parent:null,reason:'Implementation after enactment is a strong legal-systems story that needs a real law and timeline.'},
  {id:'100',treatment:'evidence-sprint',parent:null,reason:'A powerful capstone if presented as a bounded planning rehearsal—not a forecast or digital twin.'},
  {id:'002',treatment:'editorial-lab',parent:null,reason:'Strong public explanation concept; prove truth-preserving translation with one real claim.'},
  {id:'003',treatment:'editorial-lab',parent:null,reason:'Strong discovery method; prove that it finds a real unserved decision.'},
  {id:'006',treatment:'editorial-lab',parent:null,reason:'Useful product judgment; show one decision where refusing software was the correct result.'},
  {id:'063',treatment:'editorial-lab',parent:null,reason:'Promising knowledge infrastructure; demonstrate a real source changing a claim and output.'},
  {id:'080',treatment:'editorial-lab',parent:null,reason:'Strong link to RN’s reporting practice; run it on one rights-cleared reporting packet.'},
  {id:'083',treatment:'editorial-lab',parent:null,reason:'Strong portfolio mechanism; prove confidentiality and rights gates using one real cleared project.'}
] as const;

export const mergeGroups=[
  {title:'Stop, escalate and release consequential AI',lead:'001',members:['019','032','038','039','040'],purpose:'Combine escalation, evaluation, tracing and release readiness into the human-authority story.'},
  {title:'Remember why a decision was made',lead:'063',members:['020','061','066'],purpose:'Combine evidence ledgers, decision memory and institutional knowledge into one living-research system.'},
  {title:'Minimize, permit and understand product data',lead:'030',members:['023','024','026','031'],purpose:'Treat consent, minimization, data quality and privacy behavior as parts of inclusive system repair.'},
  {title:'Give AI bounded work and governed memory',lead:'001',members:['041','042','043','044','090','091','092','093','094'],purpose:'Collapse generic AI-team infrastructure into one inspectable authority, orchestration and proof architecture.'}
] as const;

export const supportClusters=[
  {title:'Discover the real decision',lead:'003',members:['007','010','011','018','025','029','033'],role:'Methods and stress tests supporting discovery, ownership, readiness and institutional-friction analysis.'},
  {title:'Design for access, place and embodiment',lead:'030',members:['035','054','055','067','068','073','097'],role:'Portability, adaptive environments, personal context, visible personalization and equity become supporting lenses.'},
  {title:'Build evidence that stays alive',lead:'063',members:['028','070','074','075','076','077','078','079'],role:'Retrieval, lifecycle, comparison, consequence and translation become modules in a source-linked evidence system.'},
  {title:'Turn work into public infrastructure',lead:'080',members:['081','082','086','087','088','089'],role:'Audience signals, content experiments, media operations, relationships and founder memory support the reporting-to-infrastructure story.'},
  {title:'Ground access in lived experience',lead:'045',members:['071','072','096','098'],role:'Synthetic access comparisons and continuity rehearsals remain modules until field evidence exists.'}
] as const;

export const otherSupporting=['004','005','008','013','015','016','022','027','034','036','037','047','056','057','058','060','062','084','085','095','099'] as const;
export const archiveConcepts=['049','050','051','052','053','064','065'] as const;

export const explicitCuts=[
  {id:'019',destination:'Build 001 story; execution module shared with 040',reason:'Escalation is not strong enough to carry a separate episode.'},
  {id:'020',destination:'Build 063 story with 061',reason:'The evidence ledger becomes the memory/provenance layer.'},
  {id:'024',destination:'Build 030 story with 023, 026 and 031',reason:'Minimization belongs inside the inclusive data-behavior system.'},
  {id:'026',destination:'Build 030 story with 023, 024 and 031',reason:'Data cleaning is an implementation module, not a flagship story.'},
  {id:'031',destination:'Build 030 story with 023, 024 and 026',reason:'Privacy behavior becomes a repair dimension.'},
  {id:'038',destination:'Build 001 story with 032, 039 and 040',reason:'Domain evaluation supports the release-and-escalation architecture.'},
  {id:'039',destination:'Build 001 story with 032, 038 and 040',reason:'Agent tracing becomes evidence for human review.'},
  {id:'042',destination:'Build 001 story with 043 and 092',reason:'Job definition belongs inside bounded AI authority.'},
  {id:'043',destination:'Build 001 story with 042 and 092',reason:'Team design alone is too generic for a standalone episode.'},
  {id:'092',destination:'Build 001 story with 042 and 043',reason:'Orchestration becomes an implementation layer, not a headline.'}
] as const;

export const pilotRequirements=[
  'One precise question the prototype tests',
  'Exact users, actors and authority boundaries',
  'Primary sources and material counterevidence',
  'What the current code actually does',
  'Inputs, state changes, rules, outputs and failure paths',
  'What is synthetic, hard-coded, missing or prohibited',
  'Observed first-time-user testing and misunderstandings',
  'A literal materials-and-steps reconstruction guide',
  'Tests, accessibility checks and claim boundaries',
  'What a production version would require',
  'Three creative treatments before selecting a design system',
  'A release decision: publish, revise or stop'
] as const;
