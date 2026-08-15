import type {Metadata} from 'next';
import Link from 'next/link';
import {builds} from '../../../../packages/registry/src/index';
import Exhibition from './exhibition';
import s from './gallery.module.css';

export const metadata:Metadata={title:'The 100 — RN Collins Public Build Exhibition',description:'A public exhibition of 100 compounding builds across technology, law, neuroscience, research, place, and everyday systems.',alternates:{canonical:'/100-builds'},openGraph:{title:'The 100 — RN Collins Public Build Exhibition',description:'100 useful things, built in public. Use the released builds, inspect the current lab work, and see what is coming next.',type:'website',images:[{url:'/og-image.png',width:1200,height:630,alt:'The 100 — RN Collins Public Build Exhibition'}]},twitter:{card:'summary_large_image',title:'The 100 — RN Collins Public Build Exhibition',description:'100 useful things, built in public.',images:['/og-image.png']}};

export default function BuildsPage(){
  const onView=builds.filter(b=>b.publicState==='OnView').length;
  const inLab=builds.filter(b=>b.publicState==='InLab');
  const comingNext=builds.filter(b=>b.publicState==='ComingNext').length;
  const current=inLab[0];
  return <main className={s.page}>
    <header className={s.mast}><Link href="/">RN COLLINS / PUBLIC BUILD EXHIBITION</Link><span>THE 100</span><Link href="/practice">WORK WITH RN →</Link></header>
    <section className={s.intro}>
      <div><span className={s.kicker}>100 BUILDS · ONE COMPOUNDING PRACTICE</span><h1>THE 100<span>main gallery.</span></h1></div>
      <div className={s.introCopy}><p>I’m building one hundred useful things from questions I keep running into across technology, law, neuroscience, research, place, work, and everyday life.</p><p>You can use what is finished, look inside what I am building now, and see the frozen sequence ahead.</p><div className={s.progress} aria-label="Exhibition progress"><strong>{onView}</strong><span>ON VIEW</span><strong>{inLab.length}</strong><span>IN THE LAB</span><strong>{comingNext}</strong><span>COMING NEXT</span></div></div>
    </section>
    <section className={s.guide} aria-labelledby="how-to-enter"><div><span>HOW TO ENTER</span><h2 id="how-to-enter">No technical training required.</h2></div><div className={s.guideGrid}><article><b>A / THE THING</b><p>A working tool, system, experiment, or experience you can use.</p></article><article><b>B / THE STORY</b><p>An interactive visual build that makes the hidden system easier to see, plus a LinkedIn-native film when the cycle releases.</p></article><article><b>THE RECORD</b><p>Making, method, evidence, limits, and lineage—available when you want to go deeper.</p></article></div></section>
    {current&&<section className={s.current} aria-labelledby="current-build"><div><span>CURRENTLY IN THE LAB / BUILD {current.id}</span><h2 id="current-build">{current.title}</h2><p>{current.description}</p></div><Link href={`/100-builds/${current.id}`}>SEE THE BUILD IN PROGRESS →</Link></section>}
    <section className={s.floor}>
      <div className={s.legend}><span><i className={s.dotOn}/> ON VIEW — released and usable</span><span><i className={s.dotLab}/> IN THE LAB — working build under certification</span><span><i className={s.dotNext}/> COMING NEXT — frozen future cycle</span></div>
      <Exhibition />
    </section>
    <section className={s.footerCta}><div><span>BRING THE QUESTION</span><h2>See a system people are still working around?</h2><p>The exhibition is the public side of a broader practice: research the system, find the opening, and build the path forward.</p></div><Link href="/practice">WORK WITH RN →</Link></section>
  </main>;
}
