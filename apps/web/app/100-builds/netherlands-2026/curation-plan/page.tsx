import type {Metadata} from 'next';
import Link from 'next/link';
import externalAudit from '../../../../../../audit/external/external-value-audit.json';
import intellectualAudit from '../../../../../../audit/intellectual/intellectual-audit-100-builds.json';
import {archiveConcepts,candidatePlan,explicitCuts,launchPilots,mergeGroups,methodAnchors,otherSupporting,pilotRequirements,supportClusters} from './curation-data';
import styles from './plan.module.css';

export const metadata:Metadata={
  title:'The 100 curation and production plan',
  description:'The reconciled treatment for every RN Build after technical, intellectual and external-value review.',
  alternates:{canonical:'/100-builds/netherlands-2026/curation-plan'},
  robots:{index:false,follow:true}
};

const buildById=new Map(externalAudit.records.map(record=>[record.id,record]));
const intellectualById=new Map(intellectualAudit.records.map(record=>[record.id,record]));
const supportOrMerge=new Set(intellectualAudit.records.filter(record=>record.editorialDecision.classification==='support-or-merge').map(record=>record.id));
const mappedSupport=new Set<string>([...mergeGroups.flatMap(group=>group.members),...supportClusters.flatMap(cluster=>cluster.members),...supportClusters.map(cluster=>cluster.lead)]);
const unmappedSupport=[...supportOrMerge].filter(id=>!mappedSupport.has(id));

function BuildLink({id}:{id:string}){const record=buildById.get(id);return <Link href={`/100-builds/${id}/a`} className={styles.buildLink}><b>{id}</b><span>{record?.title??'Build'}</span></Link>}

export default function CurationPlan(){return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} className={styles.main}>
  <nav className={styles.nav} aria-label="Breadcrumb"><Link href="/100-builds/">The 100</Link><span>/</span><Link href="/100-builds/netherlands-2026/">Netherlands 2026</Link><span>/</span><Link href="/100-builds/netherlands-2026/method-audit">Method audit</Link><span>/</span><b>Curation plan</b></nav>
  <header className={styles.hero}><p className={styles.eyebrow}>CURATION DECISION · NOT A NEW CONTENT QUEUE</p><h1>Seventeen candidates. Two pilots. One method to prove.</h1><p className={styles.dek}>The audit categories measured different things. This plan turns them into one operating hierarchy and gives every build a destination. No build is deleted. No build receives a carousel merely because it has a number.</p></header>

  <section className={styles.locked} aria-labelledby="locked"><p className={styles.eyebrow}>LOCKED NOW</p><h2 id="locked">Canva stays frozen.</h2><div className={styles.lockGrid}><article><strong>2</strong><p>complete pilots built first</p></article><article><strong>15</strong><p>other public candidates held behind evidence gates</p></article><article><strong>98</strong><p>builds receiving no new standalone slides yet</p></article><article><strong>0</strong><p>builds deleted or misrepresented as production AI</p></article></div></section>

  <section className={styles.section} aria-labelledby="pilots"><p className={styles.eyebrow}>TIER 1 · BUILD NOW</p><h2 id="pilots">Consensus launch pilots</h2><div className={styles.pilotGrid}>{launchPilots.map(id=><article key={id}><BuildLink id={id}/><p>{candidatePlan.find(item=>item.id===id)?.reason}</p></article>)}</div><ol className={styles.requirements}>{pilotRequirements.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,'0')}</span>{item}</li>)}</ol></section>

  <section className={styles.section} aria-labelledby="anchors"><p className={styles.eyebrow}>THE OTHER TWO INTELLECTUAL LEADERS</p><h2 id="anchors">Method anchors, not launch episodes.</h2><p className={styles.intro}>Builds 012 and 014 are intellectually strong and source-linked, but the external-value review did not find them distinctive enough to lead the public series. Their substance will strengthen the two pilots before either competes for its own release.</p><div className={styles.anchorGrid}>{methodAnchors.map(id=><article key={id}><BuildLink id={id}/><p>{id==='012'?'Supply the consequence, control and risk-tier architecture inside Build 001.':'Supply the legal-judgment and nondelegable-authority analysis inside Build 001.'}</p></article>)}</div></section>

  <section className={styles.section} aria-labelledby="candidates"><p className={styles.eyebrow}>THE COMPLETE 17-CANDIDATE QUEUE</p><h2 id="candidates">Compete for release; do not assume release.</h2><div className={styles.candidateTable} role="table" aria-label="Hero candidate treatments"><div className={styles.tableHead} role="row"><span>Build</span><span>Treatment</span><span>Required proof</span></div>{candidatePlan.map(item=><div className={styles.tableRow} role="row" key={item.id}><BuildLink id={item.id}/><span className={styles.badge}>{item.treatment.replaceAll('-',' ')}</span><p>{item.reason}</p></div>)}</div></section>

  <section className={styles.section} aria-labelledby="support"><p className={styles.eyebrow}>THE 53 SUPPORT-OR-MERGE RECOMMENDATIONS</p><h2 id="support">Modules inside larger stories.</h2><p className={styles.intro}>These builds retain code, routes, provenance and build numbers. They lose the presumption of a standalone episode. The groups below cover all 53 intellectual support-or-merge recommendations.</p><div className={styles.clusterGrid}>{mergeGroups.map(group=><article key={group.title} className={styles.merge}><p className={styles.eyebrow}>EXPLICIT MERGE GROUP · LEAD {group.lead}</p><h3>{group.title}</h3><p>{group.purpose}</p><div className={styles.ids}>{group.members.map(id=><BuildLink key={id} id={id}/>)}</div></article>)}{supportClusters.map(cluster=><article key={cluster.title}><p className={styles.eyebrow}>SUPPORT CLUSTER · LEAD {cluster.lead}</p><h3>{cluster.title}</h3><p>{cluster.role}</p><div className={styles.ids}>{cluster.members.map(id=><BuildLink key={id} id={id}/>)}</div></article>)}</div>{unmappedSupport.length>0?<div className={styles.warning}><b>Unmapped audit records:</b> {unmappedSupport.join(', ')}</div>:<p className={styles.complete}>53/53 mapped. No support-or-merge record is orphaned.</p>}</section>

  <section className={styles.section} aria-labelledby="cuts"><p className={styles.eyebrow}>TEN EXPLICIT CUTS</p><h2 id="cuts">Cut the standalone episode—not the work.</h2><div className={styles.cutList}>{explicitCuts.map(item=><article key={item.id}><BuildLink id={item.id}/><div><b>{item.destination}</b><p>{item.reason}</p></div></article>)}</div></section>

  <section className={styles.section} aria-labelledby="remaining"><p className={styles.eyebrow}>REMAINING BUILDS</p><h2 id="remaining">Preserve, repair or use as evidence.</h2><div className={styles.remainder}><article><h3>Other retained or repair builds</h3><p>Useful supporting modules and promising incomplete builds that were not among the intellectual audit’s 53 support-or-merge records.</p><div className={styles.ids}>{otherSupporting.map(id=><BuildLink key={id} id={id}/>)}</div></article><article><h3>Archive concepts</h3><p>Keep clearly labeled as synthetic thought experiments until field evidence changes their status.</p><div className={styles.ids}>{archiveConcepts.map(id=><BuildLink key={id} id={id}/>)}</div></article></div></section>

  <section className={styles.release} aria-labelledby="release"><p className={styles.eyebrow}>RELEASE RULE</p><h2 id="release">A build advances only when the evidence advances.</h2><p>No fixed quota. No promise that all seventeen ship. The two pilots are built and tested first. Every later candidate must outperform them on truthfulness, technical clarity, RN distinctiveness, child-clear reproducibility, accessibility and visual force.</p></section>
  <footer className={styles.footer}><p>Source audits: GitHub commit <code>{externalAudit.auditedCommit}</code>. This curation layer changes editorial treatment, not the preserved implementation record.</p><Link href="/100-builds/netherlands-2026/method-audit">Return to the complete method audit</Link></footer>
 </main></>}
