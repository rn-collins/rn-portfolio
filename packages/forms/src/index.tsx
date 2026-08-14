'use client';
import { FormEvent, useState } from 'react';
import { ProtocolResult, type ReviewAssessment } from '@rn/results';

const riskOptions=['Low — internal assistance with limited consequence','Moderate — output informs a consequential workflow','High — output may materially affect a person, right, safety, money, access, or legal position'];

export function HumanReviewForm(){
  const [assessment,setAssessment]=useState<ReviewAssessment|null>(null);
  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const val=(k:string)=>String(fd.get(k)||'').trim();
    const has=(k:string)=>val(k).length>2;
    const gaps:string[]=[];
    let score=0;
    const checks:[boolean,string][]=[
      [has('reviewer'),'Name a reviewer role with enough competence to challenge the AI output.'],
      [has('trigger'),'Define exactly when human review occurs rather than saying only “a human is involved.”'],
      [has('standard'),'Specify the rule, evidence standard, policy, professional norm, or acceptance criterion used to judge the output.'],
      [has('evidence'),'Specify what underlying evidence, inputs, sources, logs, or context the reviewer can inspect.'],
      [val('authority')==='Can reject, revise, override, stop, or escalate','Give the reviewer practical authority to change the outcome, not merely observe it.'],
      [has('failure'),'Define a failure and escalation path for disagreement, uncertainty, anomaly, or unsafe output.'],
      [has('record'),'Record what the reviewer saw, decided, changed, and why so the control can later be evaluated.'],
      [val('independence')==='Yes — time, incentives, interface, and workflow allow genuine challenge','Reduce rubber-stamping risk by giving reviewers enough time, usable information, and incentives to disagree.']
    ];
    checks.forEach(([ok,msg])=>{if(ok)score++;else gaps.push(msg)});
    const grade:ReviewAssessment['grade']=score>=7?'Strong':score>=4?'Partial':'Weak';
    const fallback=(k:string,f:string)=>val(k)||f;
    const protocol=`REVIEW OBJECT\n${fallback('decision','Not specified')}\n\nCONSEQUENCE / RISK CONTEXT\n${fallback('risk','Not specified')}\n${fallback('impact','No affected person, group, or operational consequence specified.')}\n\nQUALIFIED REVIEWER\n${fallback('reviewer','Not specified')}\n\nREVIEW TRIGGER\n${fallback('trigger','Not specified')}\n\nREVIEW STANDARD\n${fallback('standard','Not specified')}\n\nEVIDENCE AVAILABLE TO REVIEWER\n${fallback('evidence','Not specified')}\n\nREVIEWER AUTHORITY\n${fallback('authority','Not specified')}\n\nCHALLENGE CONDITIONS\n${fallback('independence','Not specified')}\n\nFAILURE / ESCALATION PATH\n${fallback('failure','Not specified')}\n\nREVIEW RECORD\n${fallback('record','Not specified')}\n\nIMPLEMENTATION TEST\nA real control should let a qualified person understand enough of the system and decision context to critically assess an output, intervene at the right time, change or stop the outcome when warranted, and leave evidence that the review actually happened.`;
    setAssessment({score,grade,gaps,protocol});
    setTimeout(()=>document.getElementById('generated-protocol')?.scrollIntoView({behavior:'smooth',block:'start'}),0);
  }
  return <>
    <form className="form-panel oversight-form" onSubmit={submit}>
      <div className="form-intro"><div className="eyebrow">Design the control, not the slogan</div><p>Work through the decision architecture. Nothing you enter is sent anywhere; this prototype runs entirely in your browser.</p></div>
      <Section n="01" title="Decision context" hint="What is the AI doing, and what could happen because of it?">
        <Field name="decision" label="AI-assisted output or decision" placeholder="e.g. Draft legal research memo; applicant risk score; clinical note summary" required/>
        <Select name="risk" label="Consequence level" options={riskOptions}/>
        <Area name="impact" label="Who or what could be affected if this is wrong?" placeholder="Name the person, group, right, safety issue, financial consequence, workflow, or downstream decision."/>
      </Section>
      <Section n="02" title="Reviewer" hint="A human only matters if the human can actually perform the review.">
        <Field name="reviewer" label="Who is qualified to review it?" placeholder="Role + relevant competence, not just a name"/>
        <Select name="independence" label="Can this person genuinely challenge the system?" options={['Choose…','Yes — time, incentives, interface, and workflow allow genuine challenge','Partly — challenge is possible but constrained','No — reviewer is expected to approve or lacks practical ability to disagree']}/>
      </Section>
      <Section n="03" title="Review moment" hint="Oversight that occurs after the consequential action may be too late.">
        <Field name="trigger" label="Exactly when must review occur?" placeholder="e.g. Before the recommendation is sent to the decision-maker; whenever confidence falls below X; before external filing"/>
      </Section>
      <Section n="04" title="Basis for judgment" hint="The reviewer needs both a standard and enough evidence to apply it.">
        <Area name="standard" label="Against what standard is the output judged?" placeholder="Policy, statute, source-of-truth record, professional standard, rubric, tolerance, safety threshold…"/>
        <Area name="evidence" label="What can the reviewer inspect?" placeholder="Underlying sources, inputs, model output, retrieved documents, logs, uncertainty indicators, conflicting evidence…"/>
      </Section>
      <Section n="05" title="Power to intervene" hint="A reviewer who cannot change the outcome is closer to a witness than a control.">
        <Select name="authority" label="What authority does the reviewer have?" options={['Choose…','Can reject, revise, override, stop, or escalate','Can approve or reject only','Can recommend a change but another actor decides','Can observe or comment but cannot change the outcome']}/>
        <Area name="failure" label="What happens when review fails, the reviewer disagrees, or uncertainty remains?" placeholder="Stop workflow, return for correction, switch to manual process, second review, escalation, incident route…"/>
      </Section>
      <Section n="06" title="Evidence that oversight happened" hint="If the control matters, you should be able to inspect its operation later.">
        <Area name="record" label="What will be recorded about the review?" placeholder="Reviewer, timestamp, evidence inspected, decision, override, rationale, escalation, final outcome…"/>
      </Section>
      <div className="submit-zone"><button className="btn btn-large" type="submit">Evaluate my review architecture →</button><span>8 control dimensions · deterministic assessment</span></div>
    </form>
    {assessment&&<ProtocolResult assessment={assessment}/>} 
  </>
}

function Section({n,title,hint,children}:{n:string;title:string;hint:string;children:React.ReactNode}){return <fieldset className="form-section"><legend><span>{n}</span><strong>{title}</strong><em>{hint}</em></legend>{children}</fieldset>}
function Field({name,label,placeholder,required=false}:{name:string;label:string;placeholder?:string;required?:boolean}){return <div className="field"><label htmlFor={name}>{label}</label><input id={name} name={name} placeholder={placeholder} required={required}/></div>}
function Area({name,label,placeholder}:{name:string;label:string;placeholder?:string}){return <div className="field"><label htmlFor={name}>{label}</label><textarea id={name} name={name} placeholder={placeholder}/></div>}
function Select({name,label,options}:{name:string;label:string;options:string[]}){return <div className="field"><label htmlFor={name}>{label}</label><select id={name} name={name}>{options.map(x=><option key={x}>{x}</option>)}</select></div>}
