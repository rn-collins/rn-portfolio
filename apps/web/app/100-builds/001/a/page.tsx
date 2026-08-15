import Link from 'next/link';
import { HumanReviewForm } from '@rn/forms';
import s from '../room.module.css';

export default function Build001A(){
  return <main className={s.toolRoom}>
    <nav className={s.crumb}><Link href="/100-builds/001">← Accession 001</Link><span>Object A / Functional system</span></nav>
    <header className={s.label}>
      <div className={s.accession}>001-A<br/>ON VIEW</div>
      <div><h1>Human Review Design Framework</h1><p>Find out whether the “human in the loop” in an AI-assisted workflow is actually positioned to function as a control — or is mostly there to make the system sound safer.</p></div>
    </header>
    <section className={s.wallText}><strong>Use this when</strong><p>You are designing, buying, reviewing, governing, or inheriting an AI-assisted workflow and someone says a human reviews the output. Start with the 60-second Quick Check. Move into Design the Control only when you need the deeper protocol.</p></section>
    <section className={s.wallText}><strong>Research basis</strong><p>Built from recurring oversight requirements in NIST AI RMF guidance, Article 14 of the EU AI Act, and UK ICO guidance on meaningful human intervention: defined roles, competence, system understanding, intervention authority, practical capacity, escalation, review records, and evaluation of whether oversight works.</p></section>
    <section className={s.worktable} aria-label="Interactive worktable"><HumanReviewForm /></section>
    <section className={s.method}><strong>Curatorial note</strong><div><h2>A reassuring phrase is not yet an architecture.</h2><p>This diagnostic does not certify compliance and does not prove a review control works in practice. It exposes whether the essential design choices are explicit, prioritizes weaknesses, and produces a protocol a team can challenge and improve.</p><p><strong>If this exposes a consequential gap:</strong> the useful next question is not how to improve the score; it is how the workflow itself should change so a qualified human can meaningfully affect the outcome.</p><p>If you are working through that kind of systems problem and want another set of eyes on the architecture, <a href="mailto:collins.ra@northeastern.edu">contact RN</a>.</p></div></section>
  </main>
}
