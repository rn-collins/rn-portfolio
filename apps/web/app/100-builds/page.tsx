import type {Metadata} from 'next';
import Link from 'next/link';
import Exhibition from './exhibition';
import s from './gallery.module.css';
import {isReleased,programReleased,releasedBuilds,releasedPhases} from '../_release/gate';

const hasPhase=(id:number)=>releasedPhases.some(phase=>phase.id===id);
const startHere=[{id:'001',label:'001 · Meaningful human control'},{id:'038',label:'038 · Evidence under pressure'},{id:'071',label:'071 · Legal is not accessible'}].filter(item=>isReleased(item.id));

export const metadata:Metadata={
 title:'The 100',
 description:'Explore 100 paired working tools and interactive visual stories created by RN Collins across research, strategy, systems design and implementation.',
 alternates:{canonical:'/100-builds'},
 openGraph:{title:'The 100 — RN Builds',description:'Explore 100 paired working tools and interactive visual stories created by RN Collins.',url:'/100-builds',images:[{url:'/og/collection.png',width:1200,height:630,alt:'The 100 — one hundred questions turned into paired working tools and visual arguments.'}]},
 twitter:{card:'summary_large_image',title:'The 100 — RN Builds',description:'Explore 100 paired working tools and interactive visual stories created by RN Collins.',images:['/og/collection.png']}
};

export default function BuildsPage(){
 return <main className={s.page}>
  <header className={s.mast}><Link href="/">RN COLLINS / POLYMATH</Link><span>THE 100 — PUBLIC COLLECTION</span>{programReleased?<Link href="/100-builds/archive">PROGRAM ARCHIVE →</Link>:<a href="https://rn-selected-work.vercel.app/builds">SELECTED WORK →</a>}</header>
  <section className={s.intro}>
   <div><p className={s.eyebrow}>100 QUESTIONS · 200 PUBLIC EXPERIENCES</p><h1>THE 100<em>start anywhere.</em></h1></div>
   <div><p>One hundred questions that were too messy for a single discipline—turned into working tools, visual arguments and inspectable records.</p><small>Each build has two ways in:<br/><strong>A / USE IT</strong> — a functional tool, system or experiment<br/><strong>B / WATCH + EXPLORE IT</strong> — the LinkedIn cut, a motion argument and the richer interactive web version<br/><br/>Open an overview first when you want the question, purpose, RN&apos;s role, evidence status and limitations in one place.</small></div>
  </section>
  <nav className={s.discovery} aria-label="Start here">
   <div><span>START HERE</span>{startHere.length?startHere.map(item=><Link key={item.id} href={`/100-builds/${item.id}`}>{item.label}</Link>):<a href="#collection">Builds open here on their release day</a>}</div>
   <div><span>FOR CLIENTS + EMPLOYERS</span>{hasPhase(1)&&<a href="#phase-1">Decision systems</a>}{hasPhase(4)&&<a href="#phase-4">Evidence + AI behavior</a>}{hasPhase(10)&&<a href="#phase-10">Governed agents + convergence</a>}</div>
   <div><span>FOR COLLABORATORS + MEDIA</span>{hasPhase(5)&&<a href="#phase-5">Place + embodied experience</a>}{hasPhase(6)&&<a href="#phase-6">Provenance + rights</a>}{hasPhase(9)&&<a href="#phase-9">Creators + operating intelligence</a>}</div>
   <div><span>SEE THE SYSTEM</span>{isReleased('100')&&<Link href="/100-builds/100">100 · The convergence</Link>}{programReleased&&<Link href="/100-builds/netherlands-2026">Netherlands 2026 research studio</Link>}<Link href="/lineage">Capability lineage</Link>{programReleased&&<Link href="/100-builds/archive">Archive coverage</Link>}<a href="https://rn-selected-work.vercel.app/builds">RN Collins selected work</a></div>
  </nav>
  <section className={s.practice} aria-labelledby="what-the-100-proves">
   <div><p className={s.eyebrow}>THE PRACTICE BEHIND THE COLLECTION</p><h2 id="what-the-100-proves">Research that becomes something people can use.</h2></div>
   <div className={s.practiceGrid}>
    <article><h3>What the experiment demonstrates</h3><p>RN can move from an unresolved question to a bounded, testable public artifact: finding the decision, structuring the evidence, designing the interaction, implementing the system and documenting what it cannot claim.</p></article>
    <article><h3>RN&apos;s role</h3><p>Across this independent collection, RN serves as researcher, strategist, information architect, interaction designer, builder, editor and QA lead. Individual build records identify deeper methods and evidence where certification is complete.</p></article>
    <article><h3>Method</h3><p>Question → evidence → model → working A build → visual B argument → testing → record → lineage. Later builds inherit real capabilities from earlier ones instead of restarting from zero.</p></article>
    <article><h3>Prototype boundary</h3><p>These are independent research-and-design prototypes unless a build explicitly says otherwise. They demonstrate thinking and implementation; they are not client endorsements, deployed institutional systems, legal advice or medical advice.</p></article>
   </div>
   <div className={s.workWith}><div><span>WORK WITH RN</span><h3>Bring the question that does not fit neatly inside one discipline.</h3><p>RN works across research, strategy, legal and regulatory systems, AI governance, knowledge architecture and public-facing explanation. The wider portfolio and tailored Selected Works provide the shortest path for a specific opportunity.</p></div><div><a href="mailto:collins.ra@northeastern.edu?subject=Working%20with%20RN">Start a conversation</a><a href="https://rn-selected-work.vercel.app/">View RN&apos;s wider portfolio</a></div></div>
  </section>
  <section className={s.floor} id="collection">
   <div className={s.legend}><span>ON VIEW · certified public record</span><span>IN THE LAB · working prototype; certification continues</span><span>A — USE THE TOOL</span><span>B — WATCH THE CUT, EXPLORE THE ARGUMENT, USE THE WEB MASTER</span></div>
   <Exhibition builds={releasedBuilds} phases={releasedPhases}/>
  </section>
 </main>;
}
