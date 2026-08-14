'use client';
import { useState } from 'react';

const beats=[
  {k:'slogan',eyebrow:'THE PHRASE',title:<><span>HUMAN</span><span className="visual-accent">IN THE</span><span>LOOP</span></>,copy:'It sounds reassuring.'},
  {k:'crack',eyebrow:'BUT WHERE, EXACTLY?',title:<>A HUMAN<br/>EXISTS<br/><i>somewhere.</i></>,copy:'That is not the same thing as oversight.'},
  {k:'questions',eyebrow:'MAKE THE CONTROL VISIBLE',title:<>WHO<br/>CAN SAY<br/><i>NO?</i></>,copy:'Who reviews? What do they inspect? When do they intervene? What standard do they use? Can they override the system? What happens when review fails?'},
  {k:'principle',eyebrow:'THE DESIGN TEST',title:<>PRESENCE<br/>≠<br/><span className="visual-accent">POWER</span></>,copy:'A reviewer needs competence, evidence, time, authority, an escalation path, and a record of what happened.'},
  {k:'reveal',eyebrow:'RN BUILDS · 001 / 100',title:<>SO I<br/>BUILT<br/><span className="visual-accent">ONE.</span></>,copy:'Human Review Design Framework — turn “human in the loop” into an explicit, inspectable review architecture.'}
];

export function HumanLoopReveal(){
  const [step,setStep]=useState(0);
  const beat=beats[step];
  const next=()=>setStep((step+1)%beats.length);
  return <div className="visual-shell">
    <div className={`visual-frame visual-${beat.k}`} role="button" tabIndex={0} aria-label={`Human in the Loop visual, scene ${step+1} of ${beats.length}. Activate to advance.`} onClick={next} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '||e.key==='ArrowRight'){e.preventDefault();next()}if(e.key==='ArrowLeft'){e.preventDefault();setStep((step-1+beats.length)%beats.length)}}}>
      <div className="visual-noise" aria-hidden="true"/>
      <div className="visual-index">{String(step+1).padStart(2,'0')} / {String(beats.length).padStart(2,'0')}</div>
      <div className="visual-content">
        <div className="visual-eyebrow">{beat.eyebrow}</div>
        <div className="visual-title">{beat.title}</div>
        <p className="visual-copy">{beat.copy}</p>
      </div>
      {beat.k==='questions'&&<div className="question-orbit" aria-hidden="true">{['WHO?','WHAT?','WHEN?','STANDARD?','AUTHORITY?','FAILURE?'].map((q,i)=><span key={q} style={{'--i':i} as React.CSSProperties}>{q}</span>)}</div>}
      <div className="visual-footer"><span>RN COLLINS · BUILD 001-B</span><span>CLICK / → TO ADVANCE</span></div>
    </div>
    <div className="visual-controls" aria-label="Visual scenes">{beats.map((b,i)=><button key={b.k} onClick={()=>setStep(i)} aria-label={`Show scene ${i+1}`} aria-current={i===step?'step':undefined}>{i+1}</button>)}</div>
  </div>
}
