import Link from 'next/link';
import Exhibition from './exhibition';
import s from './gallery.module.css';

export default function BuildsPage(){
  return <main className={s.page}>
    <header className={s.mast}><Link href="/">RN COLLINS / EXHIBITION</Link><span>ROOM 01 — THE 100</span><span>FUNCTIONAL SYSTEMS + VISUAL BUILDS</span></header>
    <section className={s.intro}>
      <div><h1>THE 100<em>main gallery.</em></h1></div>
      <div><p>One hundred numbered builds, ordered so technical capability compounds rather than resets.</p><small>Every build has two primary parts:<br/>A / THE THING — a functional tool, system, experiment, or experience<br/>B / THE STORY — an interactive visual build, with a silent-first LinkedIn MP4 derived from the same idea<br/><br/>You do not need technical training to enter. The first layer is for anyone; deeper evidence, methods, and technical detail are available when you want them.<br/><br/>Builds remain marked PLANNED until their cycle enters production.</small></div>
    </section>
    <section className={s.floor}>
      <div className={s.legend}><span>ON VIEW — released or active work</span><span>PLANNED — frozen future build</span><span>OPEN A BUILD TO SEE THE QUESTION / THING / STORY / PROCESS / EVIDENCE / LINEAGE</span></div>
      <Exhibition />
    </section>
  </main>;
}
