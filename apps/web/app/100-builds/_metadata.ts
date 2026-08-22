import type { Metadata } from 'next';
import { builds } from '../../../../packages/registry/src/index';

type BuildVariant = 'a' | 'b';

export function buildVariantMetadata(id:string,variant:BuildVariant):Metadata{
 const build=builds.find(candidate=>candidate.id===id);
 if(!build)throw new Error(`Metadata requested for unknown Build ${id}`);
 const isFunctional=variant==='a';
 const kind=isFunctional?'Functional Build':'Interactive Visual Build';
 const artifact=isFunctional?build.functional:build.visual;
 const title=`Build ${id}-${variant.toUpperCase()}: ${build.title} — ${kind}`;
 const description=artifact.summary??build.description;
 const canonical=`/100-builds/${id}/${variant}`;
 return {
  title,
  description,
  alternates:{canonical},
  openGraph:{title,description,type:'website',url:canonical,images:[{url:'/og-image.png',width:1200,height:630,alt:title}]},
  twitter:{card:'summary_large_image',title,description,images:['/og-image.png']}
 };
}
