'use client';
import {useEffect,useMemo,useState,useSyncExternalStore} from 'react';
import s from './doors.module.css';
const doors=[
 {name:'TEENAGER',line:'A person checking AI needs enough information, enough time, and real power to stop a bad decision.'},
 {name:'PUBLIC',line:'Human review only works when the reviewer can understand the situation and actually change the outcome.'},
 {name:'REGULATOR',line:'Human oversight is meaningful only when evidence, timing, authority, escalation, and recordkeeping support effective intervention.'},
 {name:'LAWYER',line:'The presence of a human reviewer does not itself establish an effective control; the reviewer must have sufficient information, timely intervention, and operative authority.'}
];
const anchors=['HUMAN REVIEW','ENOUGH INFORMATION','BEFORE OUTCOME','REAL AUTHORITY'];
function subscribeReduced(callback:()=>void){if(typeof window==='undefined')return()=>{};const m=window.matchMedia('(prefers-reduced-motion: reduce)');m.addEventListener('change',callback);return()=>m.removeEventListener('change',callback)}
function reducedSnapshot(){return typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches}
export default function MeaningDoors(){
 const reduced=useSyncExternalStore(subscribeReduced,reducedSnapshot,()=>false);const [active,setActive]=useState(0);const [auto,setAuto]=useState(true);const [open,setOpen]=useState(true);const effectiveAuto=auto&&!reduced;
 useEffect(()=>{if(!effectiveAuto)return;let closeTimer:ReturnType<typeof setTimeout>|undefined;let openTimer:ReturnType<typeof setTimeout>|undefined;const id=setInterval(()=>{setOpen(false);closeTimer=setTimeout(()=>setActive(x=>(x+1)%doors.length),250);openTimer=setTimeout(()=>setOpen(true),520)},3600);return()=>{clearInterval(id);if(closeTimer)clearTimeout(closeTimer);if(openTimer)clearTimeout(openTimer)}},[effectiveAuto]);
 const d=doors[active];const drift=useMemo(()=>active===2?'more precise, not more certain':active===0?'simpler, not less true':'different register, same anchors',[active]);
 return <div className={s.stage}>
  <div className={s.top}><span>002-B / INTERACTIVE VISUAL BUILD</span><button type="button" aria-pressed={!effectiveAuto} onClick={()=>setAuto(x=>!x)} disabled={reduced}>{reduced?'MOTION REDUCED':effectiveAuto?'PAUSE':'PLAY'}</button></div>
  <div className={s.truth}><small>THE THING THAT MUST NOT MOVE</small><h2>Human review only matters when a person can understand enough, act in time, and actually change what happens.</h2><div className={s.anchors}>{anchors.map(a=><i key={a}>{a}</i>)}</div></div>
  <div className={s.corridor}><div className={s.doors} role="group" aria-label="Choose an audience door">{doors.map((x,i)=><button type="button" key={x.name} aria-pressed={i===active} data-active={i===active} onClick={()=>{setAuto(false);setActive(i);setOpen(true)}}>{x.name}</button>)}</div><div className={s.portal} data-open={open}><div className={s.door} aria-hidden="true"><span>{d.name}</span></div><div className={s.output} aria-live="polite" aria-atomic="true"><small>{d.name} / {drift}</small><p>{d.line}</p></div></div></div>
  <div className={s.check}><span>WHAT CHANGED</span><b>language · emphasis · level of detail</b><span>WHAT DID NOT</span><b>the factual anchors</b></div><div className={s.footer}>CHANGE THE LANGUAGE. NOT THE TRUTH.</div>
 </div>
}