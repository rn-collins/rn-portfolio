import Link from 'next/link';
import { HumanReviewForm } from '@rn/forms';
import s from '../room.module.css';

export default function Build001A(){
  return <main className={s.toolRoom}>
    <nav className={s.crumb}><Link href="/100-builds/001">← Accession 001</Link><span>Object A / Functional system</span></nav>
    <header className={s.label}>
      <div className={s.accession}>001-A<br/>ON VIEW</div>
      <div><h1>Human Review Design Framework</h1><p>AI is often described as “human reviewed.” This tool helps you check what that really means. Can the person reviewing the AI see enough, act in time, disagree, and stop a bad outcome?</p></div>
    </header>
    <section className={s.wallText}><strong>Who can use it</strong><p>You do not need to know how AI works, know the law, or work in technology. If an AI system helps make, recommend, rank, approve, flag, draft, or influence a decision that affects people, you can use this tool. That could be a student, teacher, small-business owner, nonprofit worker, manager, lawyer, researcher, clinician, regulator, or engineer.</p></section>
    <section className={s.wallText}><strong>Start here</strong><p>Use the 60-second Quick Check if you just want to know whether the human review in a real workflow is meaningful. The questions use everyday language and explain unfamiliar ideas as you go. If you already work in AI, law, compliance, research, or operations, switch to Design the Control for the more detailed version.</p></section>
    <section className={s.wallText}><strong>Why these questions</strong><p>The deeper framework is based on recurring oversight requirements in NIST AI RMF guidance, Article 14 of the EU AI Act, and UK ICO guidance on meaningful human intervention. The public-facing questions translate those ideas into plain language first; the technical and regulatory concepts stay available underneath rather than becoming a prerequisite for using the tool.</p></section>
    <section className={s.worktable} aria-label="Interactive worktable"><HumanReviewForm /></section>
    <section className={s.method}><strong>What the result means</strong><div><h2>A person being present is not the same as a person having control.</h2><p>Your result is a design check, not a legal grade. It shows where human review looks strong, where it looks weak, and what to fix first. A higher score does not prove the system is safe or legally compliant; it means the review process is more clearly designed and easier to challenge.</p><p><strong>If the tool finds a serious gap:</strong> the next question is not “How do I improve my score?” It is “What has to change so a real person can understand the situation and affect the outcome before harm happens?”</p><p>If you are working through that kind of systems problem and want another set of eyes on the architecture, <a href="mailto:collins.ra@northeastern.edu">contact RN</a>.</p></div></section>
  </main>
}
