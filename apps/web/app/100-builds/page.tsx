import Link from 'next/link';
import Script from 'next/script';
import Exhibition from './exhibition';
import s from './gallery.module.css';

export default function BuildsPage(){
  return <main className={s.page}>
    <Script src="/data/100-builds.js" strategy="afterInteractive" />
    <header className={s.mast}><Link href="/">RN COLLINS / EXHIBITION</Link><span>ROOM 01 — THE 100</span><span>FUNCTIONAL SYSTEMS + VISUAL ARGUMENTS</span></header>
    <section className={s.intro}><div><h1>THE 100<em>main gallery.</em></h1></div><div><p>One hundred numbered works, ordered so technical capability compounds rather than resets.</p><small>Each accession contains two primary objects:<br/>A / functional system<br/>B / visual argument<br/><br/>Works remain marked PLANNED until their cycle enters production.</small></div></section>
    <section className={s.floor}><div className={s.legend}><span>ON VIEW — released or active work</span><span>PLANNED — canonical future accession</span><span>OPEN A WORK TO SEE QUESTION / SYSTEM / REVEAL / LINEAGE</span></div><Exhibition /></section>
  </main>;
}
