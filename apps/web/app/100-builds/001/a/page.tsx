import Link from 'next/link';
import { HumanReviewForm } from '@rn/forms';
import s from '../room.module.css';
import skin from './exhibition-tool.module.css';

export default function Build001A(){
  return <main className={`${s.toolRoom} ${skin.tool}`}>
    <nav className={s.crumb}><Link href="/100-builds/001">← Build 001</Link><span>001-A / Working tool</span></nav>
    <header className={s.label}>
      <div className={s.accession}>BUILD 001-A<br/>ON VIEW</div>
      <div><h1>Human Review Design Framework</h1><p>AI is often described as “human reviewed.” This tool helps you check what that really means. Can the person reviewing the AI see enough, act in time, disagree, and stop a bad outcome?</p></div>
    </header>
    <section className={s.wallText}><strong>Who can use it</strong><p>You do not need to know how AI works, know the law, or work in technology. If AI helps make, recommend, rank, approve, flag, draft, or influence a decision that affects people, this tool can help you inspect the human review around it.</p></section>
    <section className={s.wallText}><strong>Start here</strong><p>Use the 60-second Quick Check for the simplest path. It asks what actually happens in the workflow and tells you what looks strong, what looks weak, and what to fix first. If you need more detail, open Design the Control.</p></section>
    <section className={s.wallText}><strong>Why these questions</strong><p>The deeper framework is informed by recurring human-oversight concepts in NIST AI guidance, the EU AI Act, and UK ICO guidance. The tool translates those ideas into ordinary language first, while keeping the more precise concepts available underneath.</p></section>
    <section className={s.worktable} aria-label="Interactive worktable"><HumanReviewForm /></section>
    <section className={s.method}><strong>What the result means</strong><div><h2>A person being present is not the same as a person having control.</h2><p>Your result is a design check, not a legal grade. It shows where human review looks strong, where it looks weak, and what to fix first. A higher score does not prove the system is safe or legally compliant.</p><p><strong>If the tool finds a serious gap:</strong> ask what has to change so a real person can understand the situation and affect the outcome before harm happens.</p><p>If you are working through a related systems problem and want another set of eyes on the architecture, <a href="mailto:collins.ra@northeastern.edu">contact RN</a>.</p></div></section>
  </main>
}
