import Link from 'next/link';
import { HumanLoopReveal } from '@rn/visuals';
import s from '../room.module.css';

export default function Build001B(){
  return <main className={s.screeningRoom}>
    <nav className={s.crumb}><Link href="/100-builds/001">← Accession 001</Link><span>Object B / Visual argument</span></nav>
    <header className={s.label}>
      <div className={s.accession}>001-B<br/>SCREENING</div>
      <div><h1>Human in the Loop</h1><p>A silent motion argument: the familiar assurance is taken apart until the viewer can see the architecture that meaningful review actually requires.</p></div>
    </header>
    <section className={s.screen} aria-label="Screening room"><HumanLoopReveal /></section>
    <section className={s.screenNote}><strong>Feed artifact</strong><p>This browser piece is the master motion artwork. The LinkedIn-native version is rendered as a silent-first 4:5 video so no clicking is required in-feed. The final architecture is intentionally held long enough to pause, screenshot, and save before the work resolves to 001-A.</p></section>
    <section className={s.screenNote}><strong>Pair logic</strong><p>B makes the problem visible. A gives the viewer a way to diagnose and redesign the problem. The motion is not decoration around the functional build; it is the second interface to the same idea.</p></section>
  </main>
}
