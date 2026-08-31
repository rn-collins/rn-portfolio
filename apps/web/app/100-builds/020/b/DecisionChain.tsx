'use client';

import {useState} from 'react';
import s from '../ledger.module.css';

const stages=[
 ['DECISION','Fixture state · bounded recovery selected'],
 ['ROLE FIELD','Synthetic duty role · invented delegation'],
 ['EVIDENCE FIELDS','Fixture severity · acknowledgement · impact'],
 ['OPTIONS','Monitor · recover · stop'],
 ['MODELED RESULT','Fixture stabilized · review remains open'],
 ['REVISION RULE','Append and link; preserve prior fixture state']
] as const;

export default function DecisionChain(){
 const [selected,setSelected]=useState(0);
 const stage=stages[selected];
 return <section className={s.story}>
  <header><span>BUILD 020-B · SYNTHETIC FIXTURE</span><p>A DECISION AND ITS LOG ARE DIFFERENT FIELDS</p><h2>Inspect a fictional decision log.</h2></header>
  <div className={s.chain}>
   {stages.map((item,index)=><article className={index<=selected?s.active:''} aria-current={index===selected?'step':undefined} key={item[0]}><small>{String(index+1).padStart(2,'0')}</small><h2>{item[0]}</h2><p>{item[1]}</p></article>)}
  </div>
  <footer><p id="selected-stage" role="status" aria-live="polite" aria-atomic="true">SELECTED FIXTURE FIELD / {stage[0]}. {stage[1]}</p><button aria-describedby="selected-stage" onClick={()=>setSelected(value=>(value+1)%stages.length)}>ADVANCE THE FIXTURE</button><p>This interface displays invented fields under fixed local rules. It does not establish real authority, evidence quality, causation, correctness, recovery, or record completeness.</p></footer>
 </section>;
}
