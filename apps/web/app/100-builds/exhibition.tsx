'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Build={id:string;sequence:number;title:string;description:string;phase:number;phaseName:string;status:string;functional:{status:string};visual:{status:string}};
type Phase={id:number;name:string;range:[number,number]};
declare global { interface Window { RN100_BUILDS?: Build[]; RN100_PHASES?: Phase[] } }

export default function Exhibition(){
  const [builds,setBuilds]=useState<Build[]>([]); const [phases,setPhases]=useState<Phase[]>([]);
  useEffect(()=>{const sync=()=>{if(window.RN100_BUILDS){setBuilds(window.RN100_BUILDS);setPhases(window.RN100_PHASES||[]);return true}return false};if(sync())return;const t=setInterval(()=>{if(sync())clearInterval(t)},50);return()=>clearInterval(t)},[]);
  if(!builds.length)return <p className="mono">Loading canonical registry…</p>;
  return <>{phases.map(phase=><section key={phase.id} style={{marginBottom:56}}><div className="eyebrow">Phase {String(phase.id).padStart(2,'0')}</div><h2 className="serif" style={{fontSize:34}}>{phase.name}</h2><div className="grid">{builds.filter(b=>b.phase===phase.id).map(b=><Link className="card" key={b.id} href={`/100-builds/${b.id}`}><div className="eyebrow">Build {b.id} / 100</div><h3>{b.title}</h3><p>{b.description}</p><div className="status">A · {b.functional.status} &nbsp; B · {b.visual.status}</div></Link>)}</div></section>)}</>;
}
