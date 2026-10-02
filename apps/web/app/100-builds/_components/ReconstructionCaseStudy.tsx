import Link from 'next/link';
import s from './reconstruction.module.css';

export type ReconstructionData={
 id:string;title:string;thesis:string;decision:'PUBLISH'|'REVISE'|'STOP';decisionNote:string;
 question:string;people:Array<[string,string]>;authority:string[];
 architecture:Array<[string,string]>;algorithm:string[];states:Array<[string,string]>;
 boundaries:Array<[string,string]>;failures:Array<[string,string]>;tests:string[];
 reproduce:string[];sources:Array<{title:string;url:string;locator:string;use:string;limit:string}>;
 research:Array<[string,string]>;production:string[];creative:string[];
 evidence:string[];open:string[];
};

export default function ReconstructionCaseStudy({data}:{data:ReconstructionData}){
 return <main className={s.page}>
  <header className={s.mast}><Link href={`/100-builds/${data.id}`}>← BUILD {data.id}</Link><span>COMPLETE RECONSTRUCTION · 2026-10-02</span></header>
  <section className={s.hero}><span>CONSENSUS LAUNCH PILOT / {data.decision}</span><h1>{data.title}</h1><p>{data.thesis}</p><div className={s.verdict}><b>RELEASE DECISION</b><strong>{data.decision}</strong><p>{data.decisionNote}</p></div></section>
  <nav className={s.index} aria-label="Reconstruction contents">{['question','people','system','boundaries','evidence','testing','reproduce','production'].map((x,i)=><a key={x} href={`#${x}`}>{String(i+1).padStart(2,'0')} / {x}</a>)}</nav>
  <section id="question" className={s.block}><div className={s.kicker}>01 / EXACT QUESTION</div><h2>What is this prototype trying to learn?</h2><p className={s.lede}>{data.question}</p><h3>What exists now</h3><ul>{data.evidence.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section id="people" className={s.block}><div className={s.kicker}>02 / PEOPLE + AUTHORITY</div><h2>Who does what—and who is allowed to decide?</h2><div className={s.grid}>{data.people.map(([name,role])=><article key={name}><b>{name}</b><p>{role}</p></article>)}</div><h3>Authority boundary</h3><ul>{data.authority.map(x=><li key={x}>{x}</li>)}</ul></section>
  <section id="system" className={s.block}><div className={s.kicker}>03 / TECHNICAL SYSTEM</div><h2>From input to output, without magic.</h2><div className={s.flow}>{data.architecture.map(([name,detail],i)=><article key={name}><span>{String(i+1).padStart(2,'0')}</span><h3>{name}</h3><p>{detail}</p></article>)}</div><h3>Exact decision procedure</h3><ol className={s.steps}>{data.algorithm.map(x=><li key={x}>{x}</li>)}</ol><h3>State model</h3><div className={s.table} role="table" aria-label="State model">{data.states.map(([state,meaning])=><div role="row" key={state}><strong role="cell">{state}</strong><span role="cell">{meaning}</span></div>)}</div></section>
  <section id="boundaries" className={s.dark}><div className={s.kicker}>04 / TRUTH BOUNDARIES</div><h2>What is real, synthetic, missing, or prohibited?</h2><div className={s.grid}>{data.boundaries.map(([label,text])=><article key={label}><b>{label}</b><p>{text}</p></article>)}</div><h3>Known failure modes</h3><div className={s.table} role="table" aria-label="Known failure modes">{data.failures.map(([failure,response])=><div role="row" key={failure}><strong role="cell">{failure}</strong><span role="cell">{response}</span></div>)}</div></section>
  <section id="evidence" className={s.block}><div className={s.kicker}>05 / PRIMARY EVIDENCE + COUNTEREVIDENCE</div><h2>What each source supports—and where it stops.</h2>{data.sources.map(source=><article className={s.source} key={source.url}><h3><a href={source.url} rel="noreferrer">{source.title} ↗</a></h3><p><b>Exact locator:</b> {source.locator}</p><p><b>Used for:</b> {source.use}</p><p><b>Does not establish:</b> {source.limit}</p></article>)}</section>
  <section id="testing" className={s.block}><div className={s.kicker}>06 / VERIFICATION</div><h2>What has been tested, and what has not.</h2><h3>Automated and inspectable checks</h3><ul>{data.tests.map(x=><li key={x}>{x}</li>)}</ul><h3>Human research ledger</h3><div className={s.table} role="table" aria-label="Human research status">{data.research.map(([status,item])=><div role="row" key={item}><strong role="cell">{status}</strong><span role="cell">{item}</span></div>)}</div><div className={s.warning}><b>NO INVENTED RESEARCH</b><p>An automated test can prove deterministic behavior. It cannot prove that a first-time visitor understands the language, that a reviewer resists automation bias, or that a repair works for disabled people. Those gates remain open until observed sessions exist.</p></div></section>
  <section id="reproduce" className={s.block}><div className={s.kicker}>07 / RECONSTRUCTION GUIDE</div><h2>Rebuild the capability step by step.</h2><ol className={s.steps}>{data.reproduce.map(x=><li key={x}>{x}</li>)}</ol></section>
  <section id="production" className={s.block}><div className={s.kicker}>08 / PRODUCTION + STORY</div><h2>What must happen before this becomes a launch story.</h2><h3>Production requirements</h3><ol className={s.steps}>{data.production.map(x=><li key={x}>{x}</li>)}</ol><h3>Three future creative territories—not designs</h3><p>These are briefs to test only after the product and human-research gates above are complete. No carousel direction is selected here.</p><div className={s.grid}>{data.creative.map((x,i)=><article key={x}><b>TERRITORY {i+1}</b><p>{x}</p></article>)}</div><h3>Open release gates</h3><ul>{data.open.map(x=><li key={x}>{x}</li>)}</ul></section>
  <footer className={s.footer}><Link href={`/100-builds/${data.id}/a`}>Use the working prototype →</Link><Link href={`/100-builds/${data.id}/record`}>Open the concise public record →</Link><Link href="/100-builds/netherlands-2026/curation-plan">Return to the curation plan →</Link></footer>
 </main>;
}
