'use client';
import {useState} from 'react';
import s from './decision-path.module.css';

type Scenario={id:string;label:string;status:string;summary:string;metrics:string[];decision:string;owner:string;action:string;next:string;human:string;note:string};
const scenarios:Scenario[]=[
{id:'wall',label:'CHART WALL',status:'INFORMATION ONLY',summary:'Many values are visible, but no accountable decision path exists.',metrics:['Backlog 18%','Satisfaction 74%','Cycle time 9.2 days','Seven high-consequence cases unassigned'],decision:'Not named',owner:'Not assigned',action:'Not authorized',next:'Not defined',human:'A person must frame the decision before this display can guide action.',note:'Volume is not readiness. The display can inform attention, but it cannot assign accountability.'},
{id:'signal',label:'SIGNAL',status:'REVIEW REQUIRED',summary:'A threshold has been crossed. The evidence now calls for a named human review.',metrics:['Backlog 18% · target ≤10%','Seven high-consequence cases unassigned · trigger >0'],decision:'Should capacity be added and cases reassigned today?',owner:'Review owner not yet confirmed',action:'Hold action until authority and tradeoffs are confirmed',next:'Owner accepts or escalates the review',human:'The service operations lead must accept ownership or name the correct accountable person.',note:'A signal creates a review obligation—not an automatic decision.'},
{id:'ready',label:'DECISION READY',status:'DECISION READY',summary:'The evidence is connected to accountable authority, timing, action, and verification.',metrics:['Backlog 18% · target ≤10% · updated today','Seven unassigned · trigger >0 · one classification uncertain'],decision:'Add reviewer capacity and reassign high-consequence cases today.',owner:'Service operations lead · decision by 15:00',action:'Assign backup reviewer; rebalance queue; pause lower-consequence intake if needed',next:'Zero high-consequence cases unassigned; backlog below 10%',human:'The named owner reviews caveats, exercises pause power, records the decision, and owns escalation.',note:'Ready means the required path is explicit. It does not prove the evidence or decision is correct.'},
{id:'conflict',label:'CONFLICT',status:'ESCALATION REQUIRED',summary:'The action is clear, but available capacity and service obligations conflict.',metrics:['Urgent queue requires +1 reviewer','No trained reviewer is currently unallocated','Pausing intake breaches another service target'],decision:'Which obligation takes priority, and who accepts the consequence?',owner:'Accountable director',action:'Choose the priority explicitly; document the displaced obligation and mitigation',next:'A staffed urgent queue plus a dated recovery plan for the displaced work',human:'The accountable director—not the dashboard—must resolve the value and authority conflict.',note:'Conflicting evidence and obligations belong in an escalation path, not behind a composite score.'}
];

export default function DecisionPathField(){
 const[selected,setSelected]=useState(scenarios[0]);
 return <div className={s.field}>
  <nav className={s.switcher} aria-label="Decision path scenarios">{scenarios.map(x=><button key={x.id} aria-pressed={selected.id===x.id} onClick={()=>setSelected(x)}>{x.label}</button>)}</nav>
  <section className={s.hero} aria-live="polite"><p>SCENARIO / {selected.label}</p><h2>{selected.status}</h2><p className={s.summary}>{selected.summary}</p></section>
  <section className={s.wall} aria-label="Evidence wall"><header><span>01</span><h3>WHAT THE DISPLAY SHOWS</h3></header><div>{selected.metrics.map((metric,index)=><article key={metric}><small>METRIC {String(index+1).padStart(2,'0')}</small><p>{metric}</p></article>)}</div></section>
  <section className={s.path} aria-label="Decision path">
   <article><small>02 / DECISION</small><p>{selected.decision}</p></article><span aria-hidden="true">→</span>
   <article><small>03 / OWNER</small><p>{selected.owner}</p></article><span aria-hidden="true">→</span>
   <article><small>04 / ACTION</small><p>{selected.action}</p></article><span aria-hidden="true">→</span>
   <article><small>05 / NEXT STATE</small><p>{selected.next}</p></article>
  </section>
  <section className={s.human}><div aria-hidden="true">H</div><article><small>HUMAN CONTROL NODE</small><h3>A PERSON HOLDS THE DECISION.</h3><p>{selected.human}</p></article></section>
  <footer><strong>{selected.status}:</strong> {selected.note}</footer>
 </div>
}
