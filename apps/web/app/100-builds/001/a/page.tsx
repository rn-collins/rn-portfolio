import { HumanReviewForm } from '@rn/forms';

export default function Build001A(){
  return <main className="build-wrap build-001-a">
    <div className="eyebrow">BUILD 001-A / 100 · FUNCTIONAL BUILD</div>
    <h1>Human Review Design Framework</h1>
    <p className="lede">Find out whether the “human in the loop” in an AI-assisted workflow is actually positioned to function as a control — or is mostly there to make the system sound safer.</p>
    <div className="research-strip" aria-label="Use case">
      <span>Use this when</span>
      <p>You are designing, buying, reviewing, governing, or inheriting an AI-assisted workflow and someone says a human reviews the output. Start with the 60-second Quick Check; move into Design the Control only when you need an implementation-ready protocol.</p>
    </div>
    <div className="research-strip" aria-label="Research basis">
      <span>Research basis</span>
      <p>Built from recurring oversight requirements in NIST AI RMF guidance, Article 14 of the EU AI Act, and UK ICO guidance on meaningful human intervention: defined roles, competence, system understanding, interpretability, automation-bias awareness, intervention authority, practical capacity, escalation, review records, and evaluation of whether oversight works.</p>
    </div>
    <HumanReviewForm />
    <section className="method-note">
      <div className="eyebrow">What this build does — and does not do</div>
      <h2>It turns a reassuring phrase into an architecture you can inspect.</h2>
      <p>The diagnostic is intentionally narrow. It does not certify legal compliance and it does not prove a human-review control is effective merely because it exists on paper. It exposes whether the core design choices are actually specified, highlights the gaps that matter first, and gives a team a concrete protocol to challenge, test, and improve.</p>
      <p><strong>If the result exposes a consequential gap:</strong> that is the point. The next question is not “how do we improve the score?” but “how should this workflow actually be redesigned so the human can meaningfully affect the outcome?”</p>
    </section>
    <section className="method-note" aria-label="Work with RN on a related system">
      <div className="eyebrow">Facing a related systems problem?</div>
      <h2>I work on the implementation layer between a reassuring policy and a system that actually behaves that way.</h2>
      <p>If you are trying to redesign an AI-assisted workflow, oversight process, evidence path, decision architecture, or implementation plan, the useful next step is usually to map the real system before adding another tool or policy.</p>
      <p><a className="btn" href="mailto:collins.ra@northeastern.edu?subject=Related%20systems%20problem%20%E2%80%94%20Build%20001">Talk to RN about the workflow →</a></p>
    </section>
  </main>
}
