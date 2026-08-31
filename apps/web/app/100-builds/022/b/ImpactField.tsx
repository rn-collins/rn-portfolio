'use client';
import {useState} from 'react';
import s from '../consequence.module.css';
const assumptions=[
 {label:'RECOMMENDATION ONLY',active:['Applicant','Reviewer'],line:'A bounded recommendation reaches an authorized reviewer before action.'},
 {label:'AUTOMATED ACTION',active:['Applicant','Household','Reviewer'],line:'Removing review sends the consequence directly into household conditions.'},
 {label:'REUSED AT SCALE',active:['Applicant','Household','Worker','Community'],line:'Reuse makes one workflow assumption travel across more people and places.'},
 {label:'RECOURSE ADDED',active:['Applicant','Household','Worker','Community','Correction path'],line:'Recourse does not erase consequence; it gives affected people a named way back in.'}
];
export default function ImpactField(){const [step,setStep]=useState(0);const a=assumptions[step];const nodes=['Applicant','Household','Reviewer','Worker','Community','Correction path'];return <section className={s.story}><header><span>BUILD 022-B</span><p>THE WORKFLOW ENDS. THE CONSEQUENCE KEEPS TRAVELING.</p><h2>Who lights up?</h2></header><div className={s.field} aria-label="Human impact field">{nodes.map((n,i)=><article key={n} className={a.active.includes(n)?s.lit:''}><small>{String(i+1).padStart(2,'0')}</small><h2>{n}</h2><p>{a.active.includes(n)?'Affected in this assumption':'Not yet exposed in this view'}</p></article>)}</div><footer><div><p role="status" aria-live="polite" aria-atomic="true">ASSUMPTION / {a.label}</p><span>{a.line}</span></div><button onClick={()=>setStep(v=>(v+1)%assumptions.length)}>CHANGE THE ASSUMPTION</button></footer><p className={s.note}>The nodes and sequence are derived explanatory copy. Lighting a node marks a plausible investigation path—not a prediction, causal finding, legal conclusion, or measure of lived experience.</p></section>}
