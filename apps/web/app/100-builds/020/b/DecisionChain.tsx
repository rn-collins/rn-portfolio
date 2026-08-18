'use client';

import {useState} from 'react';
import s from '../ledger.module.css';

const stages=[
 ['DECISION','Enter bounded recovery mode'],
 ['ACTOR + AUTHORITY','Duty officer · delegation IC-4'],
 ['EVIDENCE','Severity · acknowledgement · impact'],
 ['ALTERNATIVES','Monitor · recover · shut down'],
 ['RESULT','Stabilized · review remains open'],
 ['CORRECTION','Append, link, never silently replace']
] as const;

export default function DecisionChain(){
 const [selected,setSelected]=useState(0);
 const stage=stages[selected];
 return <section className={s.story}>
  <header><span>BUILD 020-B</span><p>THE DECISION IS NOT THE RECORD</p><h1>Open the decision.</h1></header>
  <div className={s.chain}>
   {stages.map((item,index)=><article className={index<=selected?s.active:''} aria-current={index===selected?'step':undefined} key={item[0]}><small>{String(index+1).padStart(2,'0')}</small><h2>{item[0]}</h2><p>{item[1]}</p></article>)}
  </div>
  <footer><p id="selected-stage" role="status" aria-live="polite" aria-atomic="true">SELECTED STAGE / {stage[0]}. {stage[1]}</p><button aria-describedby="selected-stage" onClick={()=>setSelected(value=>(value+1)%stages.length)}>ADVANCE THE RECORD</button></footer>
 </section>;
}
