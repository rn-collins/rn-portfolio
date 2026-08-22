import type { Metadata } from 'next';
import Link from 'next/link';
import Exhibition from './exhibition';
import s from './gallery.module.css';

export const metadata:Metadata={
 title:'The 100',
 description:'Explore 100 paired functional and visual builds whose technical capability compounds across one public engineering experiment.',
 alternates:{canonical:'/100-builds'},
 openGraph:{
  title:'The 100 — RN Builds',
  description:'Explore 100 paired functional and visual builds whose technical capability compounds across one public engineering experiment.',
  url:'/100-builds'
 }
};

export default function BuildsPage(){
  return <main className={s.page}>
    <header className={s.mast}><Link href="/">RN COLLINS / EXHIBITION</Link><span>ROOM 01 — THE 100</span><Link href="/100-builds/archive">PROGRAM ARCHIVE →</Link></header>
    <section className={s.intro}>
      <div><h1>THE 100<em>main gallery.</em></h1></div>
      <div><p>One hundred numbered builds, ordered so technical capability compounds rather than resets.</p><small>Every numbered build is designed around three durable layers. A and B are available when their room is open. Archive and evidence records appear only after public certification:<br/>A / THE THING — a functional tool, system, experiment, or experience<br/>B / THE STORY — an interactive visual build; a silent-first LinkedIn MP4 is offered only when its verified repository file is published<br/>ARCHIVE / THE RECORD — certified research, decisions, audits, media, lineage and source paths when publicly available<br/><br/>You do not need technical training to enter. The first layer is for anyone; deeper evidence, methods, technical detail and the complete archive are available when you want them.<br/><br/>The gallery is the system of record. Conversation can help create the work, but the work is retained here.</small></div>
    </section>
    <nav className={s.discovery} aria-label="Ways to explore The 100">
      <div><span>START WITH RELEASED WORK</span><Link href="/100-builds/001">001 · Human review</Link><Link href="/100-builds/002">002 · Meaning across audiences</Link><Link href="/100-builds/003">003 · Missing decisions</Link></div>
      <div><span>BROWSE BY QUESTION</span><a href="#phase-1">Structure the problem</a><a href="#phase-4">Test evidence + AI behavior</a><a href="#phase-8">Compare law + consequences</a></div>
      <div><span>FOLLOW RN&apos;S FIELDS</span><a href="#phase-5">Place + embodied experience</a><a href="#phase-6">Provenance + rights</a><a href="#phase-9">Creators + operating intelligence</a></div>
      <div><span>SEE THE CONVERGENCE</span><a href="#phase-10">Governed agents + island resilience</a><Link href="/lineage">Open capability lineage</Link><Link href="/100-builds/archive">Check archive coverage</Link></div>
    </nav>
    <section className={s.floor}>
      <div className={s.legend}><span>ON VIEW — released work</span><span>IN THE LAB — working + being certified</span><span>COMING NEXT — frozen future cycle</span><span>OPEN A BUILD FOR THING / STORY / ARCHIVE / EVIDENCE / LINEAGE</span></div>
      <Exhibition />
    </section>
  </main>;
}
