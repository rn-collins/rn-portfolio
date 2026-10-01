import type {Metadata} from 'next';
import Link from 'next/link';
import externalAudit from '../../../../../../audit/external/external-value-audit.json';
import intellectualAudit from '../../../../../../audit/intellectual/intellectual-audit-100-builds.json';
import technicalAudit from '../../../../../../audit/technical/technical-audit-100.json';
import styles from './method-audit.module.css';

export const metadata:Metadata={
  title:'Are the 100 builds worth continuing? | RN method audit',
  description:'A three-lane audit of technical reality, intellectual substance and external value across all 100 RN Builds.',
  alternates:{canonical:'/100-builds/netherlands-2026/method-audit'},
  robots:{index:false,follow:true}
};

type ExternalRecord=(typeof externalAudit.records)[number];
type IntellectualRecord=(typeof intellectualAudit.records)[number];
type TechnicalRecord=(typeof technicalAudit.builds)[number];

const intellectualById=new Map<string,IntellectualRecord>(intellectualAudit.records.map(record=>[record.id,record]));
const technicalById=new Map<string,TechnicalRecord>(technicalAudit.builds.map(record=>[record.id,record]));
const heroNow=new Set(intellectualAudit.records.filter(record=>record.editorialDecision.classification==='hero-now').map(record=>record.id));
const externalHeroes=new Set(externalAudit.records.filter(record=>record.classification==='Hero').map(record=>record.id));
const consensusHeroes=externalAudit.records.filter(record=>externalHeroes.has(record.id)&&heroNow.has(record.id));

function intellectualLabel(record:IntellectualRecord|undefined){
  if(!record)return 'Not reconciled';
  return record.editorialDecision.classification.replaceAll('-',' ');
}

function evidenceLabel(record:IntellectualRecord|undefined){
  if(!record)return 'Unknown';
  const status=record.intellectualAssessment.evidenceResearch.status;
  if(status==='verified-partial')return 'Direct authority links found';
  if(status==='synthetic-placeholder')return 'Synthetic placeholders only';
  return 'No direct source lineage shown';
}

export default function MethodAudit(){
  return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} className={styles.main}>
    <nav className={styles.nav} aria-label="Breadcrumb"><Link href="/100-builds/">The 100</Link><span>/</span><Link href="/100-builds/netherlands-2026/">Netherlands 2026 studio</Link><span>/</span><b>Method audit</b></nav>

    <header className={styles.hero}>
      <div><p className={styles.eyebrow}>THREE-LANE AUDIT · ALL 100 BUILDS · 1 OCTOBER 2026</p><h1>Do the builds amount to anything?</h1></div>
      <div className={styles.verdict}><p className={styles.answer}>Yes—but not as 100 equal products.</p><p>The collection supports a distinctive RN method and a credible laboratory of executable system-design experiments. It does not support calling the collection 100 production AI products, 100 validated systems or 100 equally strong public stories.</p></div>
    </header>

    <section className={styles.metrics} aria-label="Audit summary">
      <article><strong>100/100</strong><span>paired A/B build routes</span></article>
      <article><strong>94/100</strong><span>A routes importing dedicated deterministic engines</span></article>
      <article><strong>97/100</strong><span>build-specific automated tests</span></article>
      <article><strong>0/100</strong><span>live model, API or network runtimes in audited A paths</span></article>
      <article><strong>0/100</strong><span>durable per-user data persistence found</span></article>
      <article><strong>6/100</strong><span>direct real authority links in inspected build files</span></article>
    </section>

    <section className={styles.dark} aria-labelledby="decision">
      <p className={styles.eyebrow}>DECISION</p><h2 id="decision">Keep the body of work. End equal-weight production.</h2>
      <div className={styles.columns}>
        <div><h3>What is real</h3><ul><li>Working browser interactions, deterministic rules, traces, exports and governance gates.</li><li>A repeated habit of exposing who decides, with what evidence, under what authority and with what consequences.</li><li>A cross-disciplinary lens connecting law, regulation, health, technology, design, place and lived experience.</li></ul></div>
        <div><h3>What is not established</h3><ul><li>Production AI, autonomous agents, live data infrastructure or operational institutional systems.</li><li>Real-world adoption, user outcomes, domain validity, scale, security or production reliability.</li><li>That all 100 deserve independent publication, seven slides or equal portfolio weight.</li></ul></div>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="method">
      <p className={styles.eyebrow}>THE DISTINCTIVE RN METHOD</p><h2 id="method">Make the invisible decision system inspectable.</h2>
      <ol className={styles.method}>
        <li><b>Start with a slogan, status or institutional promise.</b><span>“Human in the loop,” “access,” “compliance,” “personalization” or “resilience.”</span></li>
        <li><b>Name the actors and authority.</b><span>Who may act, approve, contest, stop, escalate or carry responsibility?</span></li>
        <li><b>Expose the evidence and transformation.</b><span>What enters, what rules change it and what assumptions remain hidden?</span></li>
        <li><b>Follow the handoffs and consequences.</b><span>Where does responsibility disappear, and what does the system feel like to a person?</span></li>
        <li><b>Keep uncertainty and refusal visible.</b><span>What is unknown, synthetic, prohibited, unsafe or still dependent on human judgment?</span></li>
      </ol>
    </section>

    <section className={styles.section} aria-labelledby="reconcile">
      <p className={styles.eyebrow}>WHY THE REVIEWERS DISAGREED</p><h2 id="reconcile">A compelling topic is not the same as a publication-ready case.</h2>
      <div className={styles.cards}>
        <article><strong>17</strong><h3>External-value hero candidates</h3><p>Strong cold-reader usefulness, portfolio signal and editorial potential—but still candidates, not automatic approvals.</p></article>
        <article><strong>4</strong><h3>Intellectual “hero now” builds</h3><p>Builds 001, 012, 014 and 030 combine a distinctive proposition with at least partial direct authority lineage.</p></article>
        <article><strong>{consensusHeroes.length}</strong><h3>Consensus launch pilots</h3><p>Builds {consensusHeroes.map(record=>record.id).join(' and ')} clear both gates today. They still need observed users, outcomes and a complete reconstruction guide.</p></article>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="inventory">
      <p className={styles.eyebrow}>COMPLETE 100-BUILD DECISION RECORD</p><h2 id="inventory">Nothing is being quietly promoted or discarded.</h2>
      <p className={styles.intro}>External classification measures public value. Intellectual disposition measures originality and evidence readiness. Technical status states what the code actually does. The labels answer different questions and are intentionally shown together.</p>
      <div className={styles.tableWrap}><table><thead><tr><th>Build</th><th>Public value</th><th>Intellectual readiness</th><th>Evidence</th><th>Technical reality</th><th>Score</th></tr></thead><tbody>
        {externalAudit.records.map((record:ExternalRecord)=>{
          const intellectual=intellectualById.get(record.id);
          const technical=technicalById.get(record.id);
          return <tr key={record.id}><th scope="row"><Link href={`/100-builds/${record.id}/a`}>{record.id}</Link><span>{record.title}</span></th><td>{record.classification}</td><td>{intellectualLabel(intellectual)}</td><td>{evidenceLabel(intellectual)}</td><td>{technical?.technical_reality.runtime_type??'Unknown'}</td><td>{record.scores.total}/{record.scores.max}</td></tr>;
        })}
      </tbody></table></div>
    </section>

    <section className={styles.next} aria-labelledby="next">
      <p className={styles.eyebrow}>NEXT GATE · BEFORE CANVA</p><h2 id="next">Turn two consensus pilots into complete, falsifiable case studies.</h2>
      <ol><li>Correct registry and claim inconsistencies.</li><li>Add exact sources, counterevidence and the real question each prototype tests.</li><li>Document materials, architecture, data, rules, safeguards, tests, failures and limitations step by step.</li><li>Observe first-time users and record what they misunderstand.</li><li>Create three genuinely different visual treatments for Builds 001 and 030.</li><li>Scale only if a cold reader can understand the claim and a motivated twelve-year-old can reconstruct the prototype.</li></ol>
    </section>

    <footer className={styles.footer}><p><b>Audited source:</b> GitHub commit <code>{externalAudit.auditedCommit}</code>. Scores are structured editorial judgments, not audience analytics. HTTP 200 proves publication, not correctness, usability or outcomes.</p><p><Link href="/100-builds/netherlands-2026/">Return to the Netherlands 2026 studio</Link></p></footer>
  </main></>;
}
