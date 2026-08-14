import { HumanReviewForm } from '@rn/forms';

export default function Build001A(){
  return <main className="build-wrap build-001-a">
    <div className="eyebrow">BUILD 001-A / 100 · FUNCTIONAL BUILD</div>
    <h1>Human Review Design Framework</h1>
    <p className="lede">“Human in the loop” sounds like a safeguard. It is only meaningful when the human has a defined role, enough information and competence to judge the output, the authority to disagree, a timely intervention point, and a documented path when something goes wrong.</p>
    <div className="research-strip" aria-label="Research basis">
      <span>Research basis</span>
      <p>Built from recurring oversight requirements in NIST AI RMF guidance, Article 14 of the EU AI Act, and UK ICO guidance on meaningful human intervention: defined roles, competence, interpretability, automation-bias awareness, intervention authority, escalation, and review records.</p>
    </div>
    <HumanReviewForm />
    <section className="method-note">
      <div className="eyebrow">What this build does — and does not do</div>
      <h2>It makes vague oversight architecture inspectable.</h2>
      <p>The tool deliberately does not certify legal compliance or tell you that a control is effective merely because it exists on paper. Its job is narrower: expose whether the core design choices have actually been specified, and make missing pieces visible before “human oversight” becomes a box someone checks.</p>
    </section>
  </main>
}
