export type ReviewAssessment={score:number;grade:'Strong'|'Partial'|'Weak';gaps:string[];protocol:string};

export function ProtocolResult({assessment}:{assessment:ReviewAssessment}){
  return <section className="result result-rich" aria-live="polite" id="generated-protocol">
    <div className="result-head">
      <div><div className="eyebrow">Generated review design</div><h2>Your oversight architecture</h2></div>
      <div className={`score score-${assessment.grade.toLowerCase()}`}><strong>{assessment.score}/8</strong><span>{assessment.grade}</span></div>
    </div>
    {assessment.gaps.length>0&&<div className="gap-panel"><h3>Control gaps to resolve</h3><ul>{assessment.gaps.map(g=><li key={g}>{g}</li>)}</ul></div>}
    <pre className="protocol-output">{assessment.protocol}</pre>
    <p className="result-note">Design aid only. A high score means the review architecture is more explicit; it does not prove the control is legally sufficient, effective in practice, or appropriate for a particular regulated use.</p>
  </section>
}
