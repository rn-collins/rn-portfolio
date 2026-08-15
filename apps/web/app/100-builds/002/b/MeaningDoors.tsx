'use client';
import {useEffect,useMemo,useState} from 'react';
import s from './doors.module.css';
const doors=[
 {name:'TEENAGER',line:'A person checking AI needs enough information, enough time, and real power to stop a bad decision.'},
 {name:'PUBLIC',line:'Human review only works when the reviewer can understand the situation and actually change the outcome.'},
 {name:'REGULATOR',line:'Human oversight is meaningful only when evidence, timing, authority, escalation, and recordkeeping support effective intervention.'},
 {name:'LAWYER',line:'The presence of a human reviewer does not itself establish an effective control; the reviewer must have sufficient information, timely intervention, and operative authority.'}
];
const anchors=['HUMAN REVIEW','ENOUGH INFORMATION','BEFORE OUTCOME','REAL AUTHORITY'];
export default function MeaningDoors(){
 const [active,setActive]=useState(0); const [auto,setAuto]=useState(true); const [open,setOpen]=useState(false); const [reduced,setReduced]=useState(false);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const apply=()=>{setReduced(media.matches);if(media.matches)setAuto(false)};apply();media.addEventListener?.('change',apply);return()=>media.removeEventListener?.('change',apply)},[]);
 useEffect(()=>{if(!auto||reduced){setOpen(true);return}const id=setInterval(()=>{setOpen(false);setTimeout(()=>setActive(x=>(x+1)%doors.length),250);setTimeout(()=>setOpen(true),520)},3600);setOpen(true);return()=>clearInterval(id)},[auto,reduced]);
 const d=doors[active]; const drift=useMemo(()=>active===2?'more precise, not more certain':active===0?'simpler, not less true':'different register, same anchors',[active]);
 return <div className={s.stage}>
  <div className={s.top}><span>002-B / INTERACTIVE VISUAL BUILD</span><button aria-pressed={!auto} onClick={()=>setAuto(x=>!x)} disabled={reduced}>{reduced?'MOTION REDUCED':auto?'PAUSE':'PLAY'}</button></div>
  <div className={s.truth}><small>THE THING THAT MUST NOT MOVE</small><h1>Human review only matters when a person can understand enough, act in time, and actually change what happens.</h1><div className={s.anchors}>{anchors.map(a=><i key={a}>{a}</i>)}</div></div>
  <div className={s.corridor}>
   <div className={s.doors} role="group" aria-label="Choose an audience door">{doors.map((x,i)=><button key={x.name} aria-pressed={i===active} data-active={i===active} onClick={()=>{setAuto(false);setActive(i);setOpen(true)}}>{x.name}</button>)}</div>
   <div className={s.portal} data-open={open}><div className={s.door} aria-hidden="true"><span>{d.name}</span></div><div className={s.output} aria-live="polite" aria-atomic="true"><small>{d.name} / {drift}</small><p>{d.line}</p></div></div>
  </div>
  <div className={s.check}><span>WHAT CHANGED</span><b>language · emphasis · level of detail</b><span>WHAT DID NOT</span><b>the factual anchors</b></div>
  <div className={s.footer}>CHANGE THE LANGUAGE. NOT THE TRUTH.</div>
 </div>
}