import type { CanonicalBuild, CanonicalPhase } from './index';
import { builds as legacyBuilds } from './registry.generated';
import catalog from './canonical.catalog.json';
import lineage from '../../../data/canonical-100-lineage-v1.json';

const phaseNames=[
  'Understand & structure the problem',
  'Actors, consequences, workflow & accountability',
  'Access, data, privacy & inclusive systems',
  'Evidence, reliability & AI behavior',
  'Organizations, regulation, place & embodied experience',
  'Learning, adaptation, provenance & rights',
  'Durable memory & context',
  'Shared decisions, comparison, consequences & evidence navigation',
  'Audiences, creators, relationships & operating intelligence',
  'Governed agents, ecosystems & convergence'
];

export const phases:CanonicalPhase[]=phaseNames.map((name,i)=>({id:i+1,name,range:[i*10+1,i*10+10]} as CanonicalPhase));

const slugify=(s:string)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const byId=new Map(legacyBuilds.map(b=>[b.id,b]));
const lineageBuilds=(lineage as {builds:Record<string,{uses:string[];creates:string[]}>}).builds;

export const builds:CanonicalBuild[]=catalog.map((entry,index)=>{
  const sequence=index+1;
  const phase=Math.ceil(sequence/10);
  const old=byId.get(entry.id);
  if(!old) throw new Error(`Canonical build ${entry.id} has no legacy scaffold record`);
  const deps=lineageBuilds[entry.id]||{uses:[],creates:[]};
  const is001=entry.id==='001';
  return {
    ...old,
    sequence,
    title:entry.title,
    slug:`${entry.id}-${slugify(entry.title)}`,
    phase,
    phaseName:phaseNames[phase-1],
    ecosystem:phaseNames[phase-1],
    description:entry.job,
    missingSystem:entry.job,
    usesInfrastructure:deps.uses,
    createsInfrastructure:deps.creates,
    relatedBuilds:Array.from(new Set([...(old.relatedBuilds||[]),...deps.uses])),
    functional:{
      ...old.functional,
      status:is001?old.functional.status:'Planned',
      url:is001?old.functional.url:null,
      summary:entry.job
    },
    visual:{
      ...old.visual,
      status:is001?old.visual.status:'Planned',
      url:is001?old.visual.url:null,
      title:is001?old.visual.title:`${entry.title} — Visual Build`,
      concept:entry.mechanism,
      mechanism:entry.mechanism
    },
    public:{
      ...(old.public||{}),
      plainPurpose:entry.job,
      novicePath:entry.job,
      comprehensionRange:['early-secondary','high-school','general-adult','college-nonspecialist','domain-professional','technical-expert'],
      evidenceStatus:is001?'researched':'planned',
      canonVerdict:'KEEP'
    }
  } as CanonicalBuild;
});

if(builds.length!==100) throw new Error(`Canonical registry expected 100 builds; got ${builds.length}`);
builds.forEach((b,i)=>{
  const expected=String(i+1).padStart(3,'0');
  if(b.id!==expected) throw new Error(`Canonical registry sequence mismatch at ${i+1}: ${b.id}`);
  for(const dep of b.usesInfrastructure){
    if(Number(dep)>=b.sequence) throw new Error(`Build ${b.id} depends on non-earlier build ${dep}`);
  }
});
