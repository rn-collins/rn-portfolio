import type { CanonicalBuild } from './index';
import { builds as legacyBuilds, phases } from './registry.generated';
import { canonV1Meta } from './canonical-v1-meta';
import lineage from '../../../data/canonical-100-lineage-v1.json';

const comprehensionRange:NonNullable<CanonicalBuild['public']>['comprehensionRange']=[
  'early-secondary','high-school','general-adult','college-nonspecialist','domain-professional','technical-expert'
];

function slugify(value:string){return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}

const reverseConsumers:Record<string,string[]>={};
for(const [id,edge] of Object.entries(lineage.builds as Record<string,{uses:string[];creates:string[]}>)){
  for(const source of edge.uses){(reverseConsumers[source]??=[]).push(id);}
}

export { phases };
export const builds:CanonicalBuild[]=legacyBuilds.map((legacy)=>{
  const meta=canonV1Meta[legacy.id];
  if(!meta) throw new Error(`Canonical v1 metadata missing for Build ${legacy.id}`);
  const edge=(lineage.builds as Record<string,{uses:string[];creates:string[]}>)[legacy.id];
  if(!edge) throw new Error(`Canonical v1 lineage missing for Build ${legacy.id}`);
  const is001=legacy.id==='001';
  return {
    ...legacy,
    title:meta.title,
    slug:`${legacy.id}-${slugify(meta.title)}`,
    missingSystem:meta.job,
    description:meta.job,
    functional:{...legacy.functional,summary:meta.job},
    visual:{
      ...legacy.visual,
      title:is001?legacy.visual.title:`${meta.title} — Visual Build`,
      concept:meta.bWeb,
      mechanism:meta.bWeb
    },
    usesInfrastructure:[...edge.uses],
    createsInfrastructure:[...edge.creates],
    relatedBuilds:Array.from(new Set([...(legacy.relatedBuilds??[]),...(reverseConsumers[legacy.id]??[])])),
    public:{
      ...(legacy.public??{}),
      plainPurpose:meta.job,
      comprehensionRange,
      evidenceStatus:legacy.public?.evidenceStatus??'planned',
      novicePath:legacy.public?.novicePath??meta.job,
      saveablePayload:legacy.public?.saveablePayload,
      canonVerdict:'KEEP'
    }
  };
});

if(builds.length!==100) throw new Error(`Canonical v1 must contain exactly 100 builds; found ${builds.length}`);
for(let i=0;i<100;i++){
  const expected=String(i+1).padStart(3,'0');
  if(builds[i]?.id!==expected) throw new Error(`Canonical v1 sequence error at ${expected}`);
}
