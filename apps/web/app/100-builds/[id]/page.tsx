import Link from 'next/link';
import { builds } from '../../../../../packages/registry/src/index';
import s from './object.module.css';

export function generateStaticParams(){return builds.map(b=>({id:b.id}));}

const activeCopy:Record<string,{question:string;a:string;b:string}>={
 '001':{question:'WHEN IS A HUMAN ACTUALLY A CONTROL?',a:'Check a real AI-assisted workflow in plain language, then get prioritized fixes and a deeper review protocol if you need one.',b:'Watch “human in the loop” break apart until the hidden architecture of meaningful review becomes visible.'},
 '002':{question:'CAN THE LANGUAGE CHANGE WITHOUT THE TRUTH MOVING?',a:'Paste one core claim, choose who needs to understand it, and inspect whether numbers, uncertainty, negation, names, and facts you lock survived the adaptation.',b:'Move the same factual core through different audience doors and interact with what may change—and what must stay fixed.'}
};

export default async function BuildDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params; const build=builds.find(b=>b.id===id);
 if(!build)return <main className={s.page}><header className={s.mast}><Link href="/100-builds">← MAIN GALLERY</Link></header><section className={s.planned}><h1>BUILD NOT FOUND</h1></section></main>;
 const active=activeCopy[id];
 if(!active)return <main className={s.page}><header className={s.mast}><Link href="/100-builds">← MAIN GALLERY</Link><span>BUILD {id} / 100 · PLANNED</span></header><section className={s.planned}><div className={s.number}>FROZEN CANON / FUTURE BUILD</div><h1>{build.title}</h1><p>{build.description}</p><div className={s.notes}><div><h3>A / THE THING</h3><p>{build.functional.summary}</p></div><div><h3>B / THE STORY</h3><p>{build.visual.mechanism}</p></div></div><p>This build is part of the frozen 100, but its working A-side, interactive B-Web, and LinkedIn MP4 do not enter production until this cycle begins.</p>{build.usesInfrastructure.length>0&&<p><strong>BUILDS IT INHERITS FROM /</strong> {build.usesInfrastructure.join(' · ')}</p>}</section></main>;
 return <main className={s.page}>
  <header className={s.mast}><Link href="/100-builds">← MAIN GALLERY</Link><span>BUILD {id} / 100 · ON VIEW</span></header>
  <section className={s.wall}><div className={s.number}>ROOM 01<br/>BUILD {id}<br/>2026</div><div className={s.title}><h1>{build.title}</h1><p>{build.description}</p></div><aside className={s.label}>A / THE THING — FUNCTIONAL BUILD<br/>B / THE STORY — INTERACTIVE VISUAL BUILD<br/><br/>STATUS / ACTIVE PREVIEW<br/>PHASE / 01<br/><br/>QUESTION / {active.question}</aside></section>
  <section className={s.objects}><Link className={s.object} href={`/100-builds/${id}/a`}><span>{id}-A / THE THING</span><h2>Use it</h2><p>{active.a}</p><b>OPEN THE TOOL →</b></Link><Link className={s.object} href={`/100-builds/${id}/b`}><span>{id}-B / THE STORY</span><h2>Watch + explore it</h2><p>{active.b}</p><b>ENTER THE VISUAL BUILD →</b></Link></section>
  {id==='001'&&<section className={s.publicLayers}><div className={s.layerIntro}><span>PUBLIC BUILD RECORD</span><h2>The finished thing is only half the work.</h2><p>Each build also publishes what changed, what failed, what another person can reuse, what evidence supports the system, and what this build leaves behind for the next one.</p></div><div className={s.layerGrid}><Link href="/100-builds/001/making"><span>MAKING</span><strong>Behind the Build</strong><p>See the versions, mistakes, design decisions and technical choices that changed 001.</p></Link><Link href="/100-builds/001/method"><span>METHOD</span><strong>Use this in your own work</strong><p>Take the reusable product, comprehension and engineering principles without needing this exact use case.</p></Link><Link href="/100-builds/001/evidence"><span>EVIDENCE</span><strong>Why the tool says what it says</strong><p>See the research basis, assumptions, limits and claims this build does—and does not—make.</p></Link><Link href="/lineage"><span>LINEAGE</span><strong>What 001 leaves behind</strong><p>See which components and rules later builds can actually inherit.</p></Link></div></section>}
  <section className={s.notes}><div><h3>What this build is testing</h3><p>{build.description}</p></div><div><h3>What it leaves behind</h3><p>{build.createsInfrastructure.join(' · ')}</p></div></section>
 </main>;
}
