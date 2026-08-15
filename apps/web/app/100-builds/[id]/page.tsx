import Link from 'next/link';
import { builds } from '@rn/registry';
import s from './object.module.css';

export function generateStaticParams(){return builds.map(b=>({id:b.id}));}

export default async function BuildDetail({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const build=builds.find(b=>b.id===id);
  if(!build)return <main className={s.page}><header className={s.mast}><Link href="/100-builds">← MAIN GALLERY</Link></header><section className={s.planned}><h1>BUILD NOT FOUND</h1></section></main>;

  if(id!=='001')return <main className={s.page}>
    <header className={s.mast}><Link href="/100-builds">← MAIN GALLERY</Link><span>BUILD {id} / 100 · PLANNED</span></header>
    <section className={s.planned}>
      <div className={s.number}>FROZEN CANON / FUTURE BUILD</div>
      <h1>{build.title}</h1>
      <p>{build.description}</p>
      <div className={s.notes}>
        <div><h3>A / THE THING</h3><p>{build.functional.summary}</p></div>
        <div><h3>B / THE STORY</h3><p>{build.visual.mechanism}</p></div>
      </div>
      <p>This build is part of the frozen 100, but its working A-side, interactive B-Web, and LinkedIn MP4 do not enter production until this cycle begins.</p>
      {build.usesInfrastructure.length>0&&<p><strong>BUILDS IT INHERITS FROM /</strong> {build.usesInfrastructure.join(' · ')}</p>}
    </section>
  </main>;

  return <main className={s.page}>
    <header className={s.mast}><Link href="/100-builds">← MAIN GALLERY</Link><span>BUILD 001 / 100 · ON VIEW</span></header>
    <section className={s.wall}>
      <div className={s.number}>ROOM 01<br/>BUILD 001<br/>2026</div>
      <div className={s.title}><h1>{build.title}</h1><p>{build.description}</p></div>
      <aside className={s.label}>A / THE THING — FUNCTIONAL BUILD<br/>B / THE STORY — VISUAL BUILD<br/><br/>STATUS / ACTIVE PREVIEW<br/>PHASE / 01<br/><br/>QUESTION / WHEN IS A HUMAN ACTUALLY A CONTROL?</aside>
    </section>
    <section className={s.objects}>
      <Link className={s.object} href="/100-builds/001/a"><span>001-A / THE THING</span><h2>Use it</h2><p>Check a real AI-assisted workflow in plain language, then get prioritized fixes and a deeper review protocol if you need one.</p><b>OPEN THE TOOL →</b></Link>
      <Link className={s.object} href="/100-builds/001/b"><span>001-B / THE STORY</span><h2>Watch + explore it</h2><p>The reassuring phrase “human in the loop” breaks apart until the hidden architecture of meaningful review becomes visible.</p><b>ENTER THE VISUAL BUILD →</b></Link>
    </section>
    <section className={s.publicLayers}>
      <div className={s.layerIntro}><span>PUBLIC BUILD RECORD</span><h2>The finished thing is only half the work.</h2><p>Each build also publishes what changed, what failed, what another person can reuse, what evidence supports the system, and what this build leaves behind for the next one.</p></div>
      <div className={s.layerGrid}>
        <Link href="/100-builds/001/making"><span>MAKING</span><strong>Behind the Build</strong><p>See the versions, mistakes, design decisions and technical choices that changed 001.</p></Link>
        <Link href="/100-builds/001/method"><span>METHOD</span><strong>Use this in your own work</strong><p>Take the reusable product, comprehension and engineering principles without needing this exact use case.</p></Link>
        <Link href="/100-builds/001/evidence"><span>EVIDENCE</span><strong>Why the tool says what it says</strong><p>See the research basis, assumptions, limits and claims this build does—and does not—make.</p></Link>
        <Link href="/lineage"><span>LINEAGE</span><strong>What 001 leaves behind</strong><p>See which components and rules later builds can actually inherit.</p></Link>
      </div>
    </section>
    <section className={s.notes}>
      <div><h3>Why I built it</h3><p>{build.observation}</p></div>
      <div><h3>The missing system</h3><p>{build.missingSystem}</p></div>
    </section>
  </main>;
}
