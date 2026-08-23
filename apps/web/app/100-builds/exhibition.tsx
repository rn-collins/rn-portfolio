'use client';

import {useMemo,useState} from 'react';
import Link from 'next/link';
import {builds,phases,type CanonicalBuild,type PublicBuildState} from '../../../../packages/registry/src/index';
import s from './gallery.module.css';

const stateLabel:Record<PublicBuildState,string>={OnView:'ON VIEW',InLab:'IN THE LAB',ComingNext:'COMING NEXT'};
const featuredIds=new Set(['001','014','038','055','068','071','084','100']);
const pathways={
 all:{label:'Everyone',phases:[1,2,3,4,5,6,7,8,9,10]},
 client:{label:'Clients',phases:[1,2,4,5,8,10]},
 collaborator:{label:'Collaborators',phases:[5,6,7,9,10]},
 employer:{label:'Employers',phases:[1,2,3,4,6,7,8,10]},
 media:{label:'Media',phases:[5,6,8,9]}
} as const;
type Pathway=keyof typeof pathways;
type Format='all'|'tool'|'story'|'featured';

function searchable(build:CanonicalBuild){
 return [build.id,build.title,build.description,build.phaseName,build.ecosystem,build.artifactType,build.functional.summary,build.visual.mechanism,build.public?.plainPurpose,build.public?.practiceRelevance?.join(' ')].filter(Boolean).join(' ').toLowerCase();
}

export default function Exhibition(){
 const[query,setQuery]=useState('');
 const[pathway,setPathway]=useState<Pathway>('all');
 const[phase,setPhase]=useState('all');
 const[format,setFormat]=useState<Format>('all');
 const visible=useMemo(()=>builds.filter(build=>{
  const matchesQuery=!query.trim()||searchable(build).includes(query.trim().toLowerCase());
  const matchesPath=pathways[pathway].phases.includes(build.phase as never);
  const matchesPhase=phase==='all'||String(build.phase)===phase;
  const matchesFormat=format!=='featured'||featuredIds.has(build.id);
  return matchesQuery&&matchesPath&&matchesPhase&&matchesFormat;
 }),[query,pathway,phase,format]);
 const grouped=phases.map(item=>({...item,works:visible.filter(build=>build.phase===item.id)})).filter(item=>item.works.length);
 return <div>
  <section className={s.finder} aria-labelledby="find-builds">
   <div className={s.finderIntro}><p>FIND YOUR WAY IN</p><h2 id="find-builds">Start with your question—not Build 001.</h2><p>Search the full collection or choose the visitor path closest to why you are here. Every result opens a plain-language overview before the working tool and visual story.</p></div>
   <div className={s.controls}>
    <label><span>Search builds</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Try evidence, cannabis, creators, governance…" /></label>
    <label><span>Visitor pathway</span><select value={pathway} onChange={event=>setPathway(event.target.value as Pathway)}>{Object.entries(pathways).map(([value,item])=><option key={value} value={value}>{item.label}</option>)}</select></label>
    <label><span>Field</span><select value={phase} onChange={event=>setPhase(event.target.value)}><option value="all">All fields</option>{phases.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
    <label><span>Format</span><select value={format} onChange={event=>setFormat(event.target.value as Format)}><option value="all">Tool + story</option><option value="tool">Working tools</option><option value="story">Visual stories</option><option value="featured">Featured work</option></select></label>
   </div>
   <div className={s.results} role="status" aria-live="polite"><strong>{visible.length}</strong> of 100 builds shown{(query||pathway!=='all'||phase!=='all'||format!=='all')&&<button type="button" onClick={()=>{setQuery('');setPathway('all');setPhase('all');setFormat('all')}}>Clear filters</button>}</div>
  </section>
  {grouped.map(item=><section className={s.phase} id={'phase-'+item.id} key={item.id}><header className={s.phaseHead}><span>FIELD {String(item.id).padStart(2,'0')}</span><h2>{item.name}</h2><i>{item.works.length} SHOWN</i></header><div className={s.works}>{item.works.map(build=>{const state=build.publicState??'ComingNext';return <article className={`${s.work} ${state==='OnView'?s.onView:state==='InLab'?s.inLab:s.planned}`} key={build.id}><div className={s.accession}><span>{build.id} / 100</span><span>{featuredIds.has(build.id)?'FEATURED · ':''}{stateLabel[state]}</span></div><h3><Link href={`/100-builds/${build.id}`}>{build.title}</Link></h3><p>{build.public?.plainPurpose??build.description}</p><div className={s.cardActions}><Link href={`/100-builds/${build.id}`}>Overview</Link><Link href={`/100-builds/${build.id}/a`}>{format==='story'?'Open tool':'Use A'}</Link><Link href={`/100-builds/${build.id}/b`}>{format==='tool'?'Open story':'Watch + explore B'}</Link></div></article>})}</div></section>)}
  {!visible.length&&<section className={s.empty}><h2>No builds match those filters.</h2><p>Try a broader word, another field, or clear the filters to reopen the full collection.</p><button type="button" onClick={()=>{setQuery('');setPathway('all');setPhase('all');setFormat('all')}}>Show all 100 builds</button></section>}
 </div>;
}
