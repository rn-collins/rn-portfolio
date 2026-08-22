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
      <div><p>One hundred numbered builds, ordered so technical capability compounds rather than resets.</p><small>Every numbered build is designed around three durable layers. A and B are available when their room is open. Archive and evidence records appear only after public certification:<br/>A / THE THING — a functional tool, system, experiment, or experience<br/>B / THE STORY — an interactive visual build, with a silent-first LinkedIn MP4 derived from the same idea<br/>ARCHIVE / THE RECORD — certified research, decisions, audits, media, lineage and source paths when publicly available<br/><br/>You do not need technical training to enter. The first layer is for anyone; deeper evidence, methods, technical detail and the complete archive are available when you want them.<br/><br/>The gallery is the system of record. Conversation can help create the work, but the work is retained here.</small></div>
    </section>
    <section className={s.floor}>
      <div className={s.legend}><span>ON VIEW — released work</span><span>IN THE LAB — working + being certified</span><span>COMING NEXT — frozen future cycle</span><span>OPEN A BUILD FOR THING / STORY / ARCHIVE / EVIDENCE / LINEAGE</span></div>
      <Exhibition />
    </section>
  </main>;
}
