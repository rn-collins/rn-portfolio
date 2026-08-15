import type { CanonicalBuild, CanonicalPhase } from './index';
import { builds as legacyBuilds } from './registry.generated';
import { canonV1Meta } from './canonical-v1-meta';
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
const comprehensionRange:NonNullable<CanonicalBuild['public']>['comprehensionRange']=['early-secondary','high-school','general-adult','college-nonspecialist','domain-professional','technical-expert'];
function slugify(value:string){return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}
const edges=lineage.builds as Record<string,{uses:string[];creates:string[]}>;
const reverseConsumers:Record<string,string[]>={};for(const [id,edge] of Object.entries(edges))for(const source of edge.uses)(reverseConsumers[source]??=[]).push(id);

export const builds:CanonicalBuild[]=legacyBuilds.map((legacy,index)=>{
 const meta=canonV1Meta[legacy.id]; if(!meta)throw new Error(`Canonical v1 metadata missing for Build ${legacy.id}`);
 const edge=edges[legacy.id]; if(!edge)throw new Error(`Canonical v1 lineage missing for Build ${legacy.id}`);
 const is001=legacy.id==='001',is002=legacy.id==='002',is003=legacy.id==='003',active=is001||is002||is003; const phase=Math.floor(index/10)+1;
 const activeUrl=is001?legacy.functional.url:is002?'/100-builds/002/a':is003?'/100-builds/003/a':null;
 const visualUrl=is001?legacy.visual.url:is002?'/100-builds/002/b':is003?'/100-builds/003/b':null;
 return {...legacy,sequence:index+1,title:meta.title,slug:`${legacy.id}-${slugify(meta.title)}`,phase,phaseName:phaseNames[phase-1],ecosystem:phaseNames[phase-1],missingSystem:meta.job,description:meta.job,
 functional:{...legacy.functional,status:active?'Building':'Planned',url:activeUrl,summary:meta.job},
 visual:{...legacy.visual,status:active?'Building':'Planned',url:visualUrl,title:is001?legacy.visual.title:`${meta.title} — Visual Build`,concept:meta.bWeb,mechanism:meta.bWeb},
 usesInfrastructure:[...edge.uses],createsInfrastructure:[...edge.creates],relatedBuilds:Array.from(new Set([...(legacy.relatedBuilds??[]),...(reverseConsumers[legacy.id]??[])])),
 public:{...(legacy.public??{}),plainPurpose:meta.job,comprehensionRange,evidenceStatus:is001?(legacy.public?.evidenceStatus??'researched'):active?'researched':'planned',novicePath:legacy.public?.novicePath??meta.job,saveablePayload:legacy.public?.saveablePayload,canonVerdict:'KEEP'}};
});
if(builds.length!==100)throw new Error(`Canonical v1 must contain exactly 100 builds; found ${builds.length}`);
for(let i=0;i<100;i++){const build=builds[i];const expected=String(i+1).padStart(3,'0');if(build?.id!==expected)throw new Error(`Canonical v1 sequence error at ${expected}`);for(const dep of build.usesInfrastructure)if(Number(dep)>=build.sequence)throw new Error(`Build ${build.id} has non-earlier dependency ${dep}`);}
