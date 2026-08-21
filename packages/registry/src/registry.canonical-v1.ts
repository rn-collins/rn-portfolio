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
 const released=['001','002','003'].includes(legacy.id); const inLab=['004','005','006','007','008','009','010','011','012','013','014','015','016','017','018','019','020','021','022','023','024','025','026','027','028','029','030','031','032','033','034','035','036','037','038','039','040','041','042','043','044','045','046','047','048'].includes(legacy.id); const active=released||inLab; const phase=Math.floor(index/10)+1;
 const publicState:CanonicalBuild['publicState']=released?'OnView':inLab?'InLab':'ComingNext';
 const artifactStatus=released?'Live':inLab?'Building':'Planned';
 const activeUrl=legacy.id==='001'?legacy.functional.url:active?`/100-builds/${legacy.id}/a`:null;
 const visualUrl=legacy.id==='001'?legacy.visual.url:active?`/100-builds/${legacy.id}/b`:null;
 return {...legacy,sequence:index+1,title:meta.title,slug:`${legacy.id}-${slugify(meta.title)}`,phase,phaseName:phaseNames[phase-1],ecosystem:phaseNames[phase-1],missingSystem:meta.job,description:meta.job,status:artifactStatus,publicState,
 functional:{...legacy.functional,status:artifactStatus,url:activeUrl,summary:meta.job},
 visual:{...legacy.visual,status:artifactStatus,url:visualUrl,title:legacy.id==='001'?legacy.visual.title:`${meta.title} — Visual Build`,concept:meta.bWeb,mechanism:meta.bWeb},
 usesInfrastructure:[...edge.uses],createsInfrastructure:[...edge.creates],relatedBuilds:Array.from(new Set([...(legacy.relatedBuilds??[]),...(reverseConsumers[legacy.id]??[])])),
 public:{...(legacy.public??{}),plainPurpose:meta.job,comprehensionRange,evidenceStatus:released?(legacy.public?.evidenceStatus??'researched'):inLab?'researched':'planned',novicePath:legacy.public?.novicePath??meta.job,saveablePayload:legacy.public?.saveablePayload,canonVerdict:'KEEP'}};
});
if(builds.length!==100)throw new Error(`Canonical v1 must contain exactly 100 builds; found ${builds.length}`);
for(let i=0;i<100;i++){const build=builds[i];const expected=String(i+1).padStart(3,'0');if(build?.id!==expected)throw new Error(`Canonical v1 sequence error at ${expected}`);for(const dep of build.usesInfrastructure)if(Number(dep)>=build.sequence)throw new Error(`Build ${build.id} has non-earlier dependency ${dep}`);}
