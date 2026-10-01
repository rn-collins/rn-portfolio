import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'AI & Big Data Expo Europe 2026 research map · The 100',
  description:'A primary-source technical frontier map connecting the 2026 Amsterdam programme to a reproducible explanation standard for every RN build.',
  alternates:{canonical:'/100-builds/netherlands-2026/ai-big-data-research'},
  robots:{index:true,follow:true}
};

const sources=[
  ['Event overview','https://www.ai-expo.net/europe/','Official dates, venue, scale, co-located events, headliners and Agentic AI Pavilion.'],
  ['AI Leadership','https://www.ai-expo.net/europe/agenda/ai-leadership/','Autonomous-agent architecture, evaluation, token economics, network infrastructure and agentic data architecture.'],
  ['Enterprise AI','https://www.ai-expo.net/europe/agenda/enterprise-ai/','Data products, delivery operating models, coding agents, master data and scalable software-production systems.'],
  ['AI Builders','https://www.ai-expo.net/europe/agenda/ai-builders/','Converging platforms, observability, cost-efficient deployment, authority and platform selection.'],
  ['Data & Analytics','https://www.ai-expo.net/europe/agenda/data-analytics/','Production durability, agent identity, build-versus-buy and provable value.'],
  ['Future AI','https://www.ai-expo.net/europe/agenda/future-ai/','Cross-functional governance, risk stacks, enterprise agents and benchmark skepticism.'],
  ['AI Developer','https://www.ai-expo.net/europe/agenda/ai-developer/','Development workflows, identity-aware memory, orchestration, context, MCP, RAG and self-hosted models.'],
  ['2026 speakers','https://www.ai-expo.net/europe/speakers/','Official speaker and organization roster.'],
  ['2026 exhibitors','https://www.ai-expo.net/europe/exhibitors/','Current exhibitor descriptions, stands and claimed capabilities.'],
  ['Visitor information','https://www.ai-expo.net/europe/visitor-faqs/','19–20 October 2026, RAI Amsterdam, public hours and access information.']
] as const;

const frontier=[
  {rank:'01',name:'Production agents need bounded authority',evidence:'AI Builders introduces the 5 A’s: Authority, Access, Approval, Accountability and Adaptation. Data & Analytics adds identity-provider controls for MCP-connected agents.',meaning:'An agent is not “safe” because its prompt says to behave. Its permissions, approvals, owner, stop control and audit trail must exist in the system.',ask:'For every action: what may the agent decide, which tool or record may it touch, who approves, who is responsible, and how is access revoked?'},
  {rank:'02',name:'The product is the whole system around the model',evidence:'Ford Credit’s developer session frames production AI as distributed software: orchestration, context engineering, evaluation, memory, observability and governance.',meaning:'A model call is one component. Reliability depends on everything before it, around it and after it.',ask:'Draw the request path from user input through validation, retrieval, model, tools, storage, review and final output. Name every boundary.'},
  {rank:'03',name:'Memory must know who and what it describes',evidence:'The AI Developer programme includes an identity-aware memory layer using entity resolution for a Fortune 500 insurer.',meaning:'Saving conversation text is not enough. The system must distinguish people, organizations, records, sessions and permissions without merging the wrong entities.',ask:'What is remembered, under which identity, for how long, in which store, with what retrieval rule, and how can it be corrected or deleted?'},
  {rank:'04',name:'Evaluation must run continuously',evidence:'BBC addresses responsible evaluation at scale; Future AI specifies monitoring, logging and audit trails; Splunk claims evaluation of all agent traffic with real-time blocking.',meaning:'A one-time demo cannot prove a system is dependable. Tests must measure quality, safety, task success, regressions, latency and cost over time.',ask:'State the test set, metric, threshold, failure response, reviewer, sampling rate and evidence retained for each important behavior.'},
  {rank:'05',name:'Data architecture determines agent quality',evidence:'IBM links real-time access, security, governance, trust, silos and lineage to agentic scale. Shell, Volvo, Eneco and IBM discuss data products and product ownership.',meaning:'Agents cannot repair undocumented, inaccessible or contradictory data by sounding confident.',ask:'Name each source, owner, schema, refresh cycle, transformation, quality check, lineage record and rule for resolving conflicts.'},
  {rank:'06',name:'Open and self-hosted models are an operating choice',evidence:'GLS reports a multi-country customer-service system built with self-hosted open-source small language models, with guardrails, scale, accuracy, regulation and predictable cost as explicit concerns.',meaning:'“Which model is best?” is the wrong first question. Control, data location, latency, skill coverage, maintenance and total cost determine the right deployment.',ask:'Explain why this model and hosting mode were chosen; compare privacy, control, quality, latency, lock-in, maintenance and per-task cost against alternatives.'},
  {rank:'07',name:'Infrastructure and token economics are product constraints',evidence:'AI Leadership covers finance-grade ROI, token economics, latency, jitter, cross-cloud data movement, network sovereignty and the cost of agentic data architecture.',meaning:'An architecture that works only when cost and latency are ignored is not production-ready.',ask:'Provide token, compute, storage, network and human-review costs per task; include latency targets, limits, caching, retries and graceful degradation.'},
  {rank:'08',name:'Build-versus-buy is about ownership over time',evidence:'Data & Analytics explicitly weighs vendor lock-in, IP ownership and long-term costs; AI Builders warns against vendor sprawl, over-engineering and technical debt.',meaning:'A fast vendor integration may become an expensive dependency. A custom system may create maintenance work the team cannot sustain.',ask:'List what is owned, rented and replaceable; document export paths, switching costs, proprietary dependencies and the smallest viable internal capability.'},
  {rank:'09',name:'AI-assisted development moves the bottleneck to review',evidence:'Datadog describes coding agents for data pipelines where bad code may run successfully and poison downstream data. In The Pocket describes 400 governed production skills across its software lifecycle.',meaning:'Faster generation increases the volume that needs verification. Quality systems must scale with output speed.',ask:'Show generated versus human-authored work, automated checks, reviewer responsibility, release gates, rollback and how silent data errors are detected.'},
  {rank:'10',name:'Human trust requires measurable trustworthiness',evidence:'Future AI challenges benchmark overfitting and the human tendency to project intention onto fluent systems; its risk-stack panel asks for classification, controls, monitoring and auditability.',meaning:'Friendly language and impressive benchmarks are not evidence that a system understands, is correct or should be trusted.',ask:'Separate observed performance from marketing claims and inference. Show limitations, uncertainty, known failure modes and the evidence a user can inspect.'},
  {rank:'11',name:'Physical AI closes the loop with the world',evidence:'The official programme includes a dedicated Physical AI track and co-located edge, IoT and intelligent-automation tracks covering robotics, autonomous systems and industrial operations.',meaning:'When software senses or changes the physical world, timing, safety, device failure and human override become part of the architecture.',ask:'For any physical input or action, specify sensor, sampling, edge/cloud split, control loop, safe state, override, environmental limits and recovery.'},
  {rank:'12',name:'Value must be attributable, not merely asserted',evidence:'Leadership and Data & Analytics sessions question activity metrics, reported productivity gains and AI budgets whose costs are visible but value is not.',meaning:'Usage, outputs and speed do not prove that a build helped. A causal story and an accountable measurement plan are required.',ask:'Define the baseline, intended outcome, owner, counterfactual, measurement window, confounders and rule for stopping or redesigning the system.'}
] as const;

const schema=[
  ['1. Provocation','What happened that made this worth building?','Name the person or institution affected, the existing failure and the evidence that it is real.'],
  ['2. Promise','What can the finished system actually do?','Use testable verbs. Separate live capability, prototype, simulation and planned work.'],
  ['3. Boundary','What does it deliberately not do?','State non-goals, prohibited uses, unsupported users, jurisdictions and decisions reserved for people.'],
  ['4. Journey','What does a person do from start to finish?','Number every screen, choice, input, wait, correction, output and next step.'],
  ['5. System map','Which parts talk to which other parts?','Name the browser, server, model, agent, database, queue, API, file store and third-party service; label every connection.'],
  ['6. Data contract','What enters, changes, persists and leaves?','For every field give its type, source, validation, transformation, destination, retention and deletion rule.'],
  ['7. Intelligence split','Which work is deterministic and which uses AI?','For each step name rule, search, model or human judgment; explain why uncertainty is acceptable there.'],
  ['8. Agent contract','What may each agent perceive, decide and change?','List tools, credentials, scopes, approvals, budget, stop condition, escalation route and accountable human.'],
  ['9. Context and memory','How does the system know what matters now and later?','Document retrieval query, context assembly, identity resolution, memory write/read/delete rules and contamination defenses.'],
  ['10. Model decision','Why this model, size and host?','Compare quality, privacy, latency, control, availability, regulation, lock-in and total cost.'],
  ['11. Failure tree','How can it fail, and what happens next?','Cover bad input, missing data, timeouts, rate limits, model error, tool error, stale state, unauthorized action and partial completion.'],
  ['12. Assurance','How do we know it works and remains safe?','Name test cases, metrics, thresholds, adversarial tests, monitoring, alerts, audit logs and regression cadence.'],
  ['13. Security and rights','Who may access, copy, change or remove what?','Explain authentication, authorization, secrets, encryption, provenance, license, privacy, consent and incident response.'],
  ['14. Operations','What does production require every day?','Include deploy, environments, configuration, observability, support, backups, rollback, capacity, latency and cost ceilings.'],
  ['15. Reproduction','Could a determined twelve-year-old rebuild the logic?','List prerequisites and exact steps in order. Define every term at first use and include a visible pass/fail check after each step.'],
  ['16. Design rationale','Why is the experience shaped this way?','Connect information order, interface, typography, imagery, friction and feedback to a human need—not aesthetic preference alone.'],
  ['17. Decision history','What was tried, rejected and changed?','Show hypothesis, experiment, failure evidence, correction and the commit or artifact proving the change.'],
  ['18. Evidence ledger','Which statements are facts, claims or inference?','Attach a source, date and scope to facts; label vendor claims and RN interpretations; never blend them.'],
  ['19. Value test','What outcome would justify keeping it?','Define baseline, target, measurement period, cost, owner and the evidence that would trigger shutdown or revision.'],
  ['20. Exhibition label','What must a cold reader know in thirty seconds?','Build number, purpose, status, stack, date, author, live link, repository, sources, rights, limitations and next experiment.']
] as const;

const gaps=[
  'The agenda is still changing. Several 2026 slots are marked TBC and some speaker profile pages do not yet carry session details.',
  'Session descriptions are proposals, not published proceedings. Claims about scale, ROI, safety or performance remain unverified until speakers provide evidence.',
  'The official site identifies more than 200 exhibitors across eight co-located events, but exhibitor descriptions are self-authored marketing copy and not an independent capability audit.',
  'The public agenda does not yet expose slide decks, implementation repositories, model cards, evaluation datasets, cost tables or post-event recordings.',
  'Physical AI, Founders & Future, Learning Hub and co-located tracks live on separate sites. This page maps their relevance but does not pretend every future programme change has already been captured.',
  'A complete RN-build crosswalk requires repository-by-repository reconstruction. No build should be assigned a frontier merely because its title sounds related.'
] as const;

const questions=[
  'Show the diagram you use internally when this fails—not the polished architecture diagram.',
  'What decision can the agent make today that it could not make six months ago, and who gave it that authority?',
  'Which evaluation catches the most expensive failure? Which failure still has no reliable test?',
  'What does one successful task cost after tokens, infrastructure, human review and rework?',
  'Where can a user see the source, uncertainty and action log before trusting the result?',
  'What changes when the same system serves a child, employee, customer, regulator or person in crisis?',
  'Which dependency would be hardest to replace, and what evidence would make you replace it?',
  'What is the system allowed to remember? How does a person correct or erase that memory?',
  'What claim in this presentation is measured, what is inferred and what is still aspirational?',
  'If network access, a model provider or one database fails, what remains useful and safe?'
] as const;

const card={border:'1px solid #111',padding:'clamp(1rem,2vw,1.4rem)',background:'#fff'} as const;
const label={fontSize:'.78rem',letterSpacing:'.09em',textTransform:'uppercase' as const,fontWeight:800};

export default function AIBigDataResearch(){return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} style={{maxWidth:'76rem',margin:'0 auto',padding:'clamp(1rem,4vw,3rem)',fontFamily:'system-ui, sans-serif',color:'#111',background:'#f4f2ed',lineHeight:1.55}}>
  <nav aria-label="Breadcrumb"><Link href="/100-builds/carousel-operations">100 Builds operations</Link> / Netherlands 2026 / AI &amp; Big Data</nav>
  <header style={{borderTop:'10px solid #175cff',borderBottom:'3px solid #111',padding:'clamp(2rem,6vw,5rem) 0 2rem',marginBottom:'2rem'}}>
    <p style={label}>PRIMARY-SOURCE RESEARCH MAP · VERSION 1 · 1 OCTOBER 2026</p>
    <h1 style={{fontSize:'clamp(2.5rem,8vw,6.8rem)',lineHeight:.88,letterSpacing:'-.065em',maxWidth:'12ch',margin:'.5rem 0 1.5rem'}}>From impressive demo to accountable system</h1>
    <p style={{fontSize:'clamp(1.15rem,2.2vw,1.6rem)',maxWidth:'48rem'}}>AI &amp; Big Data Expo Europe supplies the technical lens for The 100: not whether AI can produce an answer, but how a real system earns permission to act, survives failure, shows its evidence and proves its value.</p>
    <dl style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(12rem,1fr))',gap:'1rem',marginTop:'2rem'}}>
      <div style={card}><dt style={label}>When</dt><dd style={{margin:'.35rem 0 0'}}>19–20 October 2026</dd></div>
      <div style={card}><dt style={label}>Where</dt><dd style={{margin:'.35rem 0 0'}}>RAI Amsterdam</dd></div>
      <div style={card}><dt style={label}>Official programme</dt><dd style={{margin:'.35rem 0 0'}}>6 AI/Big Data stages + Physical AI + adjacent TechEx tracks</dd></div>
      <div style={card}><dt style={label}>RN purpose</dt><dd style={{margin:'.35rem 0 0'}}>A reproducibility and accountability standard for 100 builds</dd></div>
    </dl>
  </header>

  <section aria-labelledby="reading"><h2 id="reading" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>What the programme is really about</h2>
    <p style={{fontSize:'1.2rem',maxWidth:'62rem'}}>The verified programme repeatedly returns to one engineering problem: the model is no longer the hardest part. The frontier is the surrounding system—data, identity, authority, memory, orchestration, evaluation, infrastructure, governance, human review and value measurement.</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(17rem,1fr))',gap:'1rem',margin:'2rem 0'}}>
      {[
        ['Day 1 · AI Leadership','Autonomous-agent foundations, research validation, token economics, network constraints, responsible evaluation and agentic data architecture.'],
        ['Day 1 · Enterprise AI','Data products, operating models, coding agents for high-risk pipelines, master data and governed software-production skills.'],
        ['Day 1 · AI Builders','Converging platforms, full-traffic observability claims, delegated authority and build/buy/combine strategy.'],
        ['Day 2 · Data & Analytics','Production durability, agent identity through MCP, build-versus-buy, lock-in, IP ownership and attributable ROI.'],
        ['Day 2 · Future AI','Legal-risk-engineering alignment, monitoring and audit trails, agentic operating models and skepticism about benchmarks.'],
        ['Day 2 · AI Developer','AI coding, identity-aware memory, context engineering, RAG, orchestration, evaluation, MCP and self-hosted small models.']
      ].map(([a,b])=><article key={a} style={card}><h3 style={{marginTop:0}}>{a}</h3><p>{b}</p></article>)}
    </div>
    <p><b>Interpretation:</b> this synthesis is RN’s inference from the official agenda. It is not an official characterization by the event.</p>
  </section>

  <section aria-labelledby="frontier" style={{marginTop:'4rem'}}><p style={label}>RANKED TECHNICAL FRONTIER MAP</p><h2 id="frontier" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>Twelve questions every serious build must answer</h2>
    <div style={{display:'grid',gap:'1rem'}}>
      {frontier.map(x=><article key={x.rank} style={{...card,display:'grid',gridTemplateColumns:'minmax(3rem,6rem) 1fr',gap:'1rem'}}>
        <div aria-hidden="true" style={{fontSize:'2.8rem',fontWeight:900,color:'#175cff'}}>{x.rank}</div><div><h3 style={{fontSize:'1.45rem',margin:0}}>{x.name}</h3><p><b>Verified programme evidence:</b> {x.evidence}</p><p><b>Why it matters:</b> {x.meaning}</p><p style={{borderLeft:'5px solid #ff4f00',paddingLeft:'1rem'}}><b>Ask of every RN build:</b> {x.ask}</p></div>
      </article>)}
    </div>
  </section>

  <section aria-labelledby="schema" style={{marginTop:'4rem'}}><p style={label}>THE RN BUILD EXPLANATION CONTRACT</p><h2 id="schema" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>CTO-complete. Twelve-year-old clear.</h2>
    <p style={{fontSize:'1.2rem',maxWidth:'62rem'}}>Every case study must contain all twenty records below. “Connect the API,” “add a database,” “use an agent” and “apply safeguards” fail this standard. The explanation must identify the exact component, input, output, decision rule, failure behavior and visible proof that it worked.</p>
    <div style={{overflowX:'auto',background:'#fff'}}><table style={{borderCollapse:'collapse',width:'100%',minWidth:'48rem'}}><thead><tr><th scope="col" style={{textAlign:'left',padding:'.8rem',border:'2px solid #111'}}>Record</th><th scope="col" style={{textAlign:'left',padding:'.8rem',border:'2px solid #111'}}>Plain question</th><th scope="col" style={{textAlign:'left',padding:'.8rem',border:'2px solid #111'}}>Minimum proof</th></tr></thead><tbody>
      {schema.map(([a,b,c])=><tr key={a}><th scope="row" style={{textAlign:'left',verticalAlign:'top',padding:'.8rem',border:'1px solid #111'}}>{a}</th><td style={{verticalAlign:'top',padding:'.8rem',border:'1px solid #111'}}>{b}</td><td style={{verticalAlign:'top',padding:'.8rem',border:'1px solid #111'}}>{c}</td></tr>)}
    </tbody></table></div>
  </section>

  <section aria-labelledby="trace" style={{marginTop:'4rem'}}><h2 id="trace" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>One traceable sentence at a time</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(17rem,1fr))',gap:'1rem'}}>
      <article style={{...card,borderTop:'10px solid #175cff'}}><h3>Verified fact</h3><p>Directly supported by code, logs, tests, a deployed interface, an official source or a preserved artifact. Attach source, date and scope.</p></article>
      <article style={{...card,borderTop:'10px solid #ff4f00'}}><h3>External claim</h3><p>A speaker, vendor or institution says it. Name the claimant and do not silently convert the statement into independent fact.</p></article>
      <article style={{...card,borderTop:'10px solid #ffda00'}}><h3>RN inference</h3><p>A reasoned interpretation connecting evidence. Show the evidence chain and state what could disprove it.</p></article>
      <article style={{...card,borderTop:'10px solid #111'}}><h3>Unknown</h3><p>Evidence is absent, incomplete or not yet inspected. Record the gap and the exact action needed to resolve it.</p></article>
    </div>
  </section>

  <section aria-labelledby="field" style={{marginTop:'4rem'}}><h2 id="field" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>Questions to bring into the room</h2><ol style={{fontSize:'1.15rem',paddingLeft:'1.5rem'}}>{questions.map(q=><li key={q} style={{padding:'.55rem 0',borderBottom:'1px solid #111'}}>{q}</li>)}</ol></section>

  <section aria-labelledby="tensions" style={{marginTop:'4rem'}}><h2 id="tensions" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>Claims and tensions to test</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(19rem,1fr))',gap:'1rem'}}>
      {[
        ['Autonomy vs. control','The programme promotes agents that plan and act while also demanding narrow authority, approvals, traceability and human accountability. Ask where autonomy actually begins and ends.'],
        ['Speed vs. durability','Vendors promise weeks-to-deployment while speakers warn that rushed architectures create cleanup, drift, technical debt and unsafe access. Ask what was omitted to achieve speed.'],
        ['Democratization vs. review burden','Coding agents lower barriers, but generated pipelines can quietly corrupt downstream data. Ask whether review capacity grew as quickly as generation.'],
        ['Open control vs. maintenance cost','Self-hosting can improve sovereignty and predictability while transferring security, upgrades, evaluation and operations to the adopter. Ask for total—not token-only—cost.'],
        ['Benchmark performance vs. real usefulness','A model can score well, speak fluently and still fail a specific workflow. Ask for task-level evaluation with real users, failures and counterfactuals.'],
        ['Visible usage vs. provable value','Activity and productivity estimates are easy to report. Attribution, avoided harm and durable outcome improvement are harder. Ask what evidence finance would accept.']
      ].map(([a,b])=><article key={a} style={card}><h3 style={{marginTop:0}}>{a}</h3><p>{b}</p></article>)}
    </div>
  </section>

  <section aria-labelledby="gaps" style={{marginTop:'4rem',background:'#111',color:'#fff',padding:'clamp(1rem,4vw,3rem)'}}><p style={{...label,color:'#ffda00'}}>HONEST COVERAGE BOUNDARY</p><h2 id="gaps" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>What this research cannot yet prove</h2><ul>{gaps.map(g=><li key={g} style={{padding:'.45rem 0'}}>{g}</li>)}</ul></section>

  <section aria-labelledby="sources" style={{marginTop:'4rem'}}><h2 id="sources" style={{fontSize:'clamp(2rem,5vw,4rem)',letterSpacing:'-.04em'}}>Official source register</h2><p>All event facts on this page were checked against the organizer’s current public pages on 1 October 2026. Agenda details may change before the event.</p>
    <div style={{display:'grid',gap:'.75rem'}}>{sources.map(([name,url,use])=><article key={url} style={card}><h3 style={{margin:'0 0 .35rem'}}><a href={url} target="_blank" rel="noreferrer">{name}</a></h3><p style={{margin:0}}>{use}</p></article>)}</div>
  </section>

  <footer style={{borderTop:'3px solid #111',marginTop:'4rem',paddingTop:'1.5rem'}}>
    <p><b>Editorial status:</b> research foundation, not conference endorsement. AI &amp; Big Data Expo Europe and named organizations do not sponsor or approve The 100.</p>
    <p><b>Next required layer:</b> reconstruct each RN build from repository, deployment and evidence artifacts, then crosswalk it to these frontiers only where the technical evidence supports the connection.</p>
    <p><Link href="/100-builds/">Return to The 100</Link></p>
  </footer>
</main></>}