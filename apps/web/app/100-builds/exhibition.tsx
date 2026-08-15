'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import s from './gallery.module.css';

type Build={id:string;sequence:number;title:string;description:string;phase:number;phaseName:string;status:string;functional:{status:string};visual:{status:string}};
type Phase={id:number;name:string;range:[number,number]};
declare global { interface Window { RN100_BUILDS?: Build[]; RN100_PHASES?: Phase[] } }

export default function Exhibition(){
  const [builds,setBuilds]=useState<Build[]>([]); const [phases,setPhases]=useState<Phase[]>([]);
  useEffect(()=>{const sync=()=>{if(window.RN100_BUILDS){setBuilds(window.RN100_BUILDS);setPhases(window.RN100_PHASES||[]);return true}return false};if(sync())return;const t=setInterval(()=>{if(sync())clearInterval(t)},50);return()=>clearInterval(t)},[]);
  if(!builds.length)return <p>Preparing gallery registry…</p>;
  return <>{phases.map(phase=>{const works=builds.filter(b=>b.phase===phase.id);return <section className={s.phase} key={phase.id}><header className={s.phaseHead}><span>ROOM {String(phase.id).padStart(2,'0')}</span><h2>{phase.name}</h2><i>ACCESSIONS {String(phase.range[0]).padStart(3,'0')}—{String(phase.range[1]).padStart(3,'0')}</i></header><div className={s.works}>{works.map(b=>{const active=b.id==='001'||b.functional.status!=='planned'||b.visual.status!=='planned';return <Link className={`${s.work} ${active?s.onView:s.planned}`} key={b.id} href={`/100-builds/${b.id}`}><div className={s.accession}><span>{b.id} / 100</span><span>{active?'ON VIEW':'PLANNED'}</span></div><h3>{b.title}</h3><p>{b.description}</p><div className={s.status}>A / {b.functional.status}<br/>B / {b.visual.status}</div></Link>})}</div></section>})}</>;
}
