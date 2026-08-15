import type {Metadata} from 'next';
import {builds} from '../../../../../packages/registry/src/index';

export function generateStaticParams(){return builds.map(b=>({id:b.id}))}
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
 const {id}=await params;const b=builds.find(x=>x.id===id);if(!b)return {title:`Build ${id}`,robots:{index:false,follow:false}};
 const active=['001','002','003'].includes(id);const title=`Build ${id} — ${b.title}`;const description=active?`${b.description} Explore the working A-side, interactive B-Web, public build record, evidence, limitations and lineage.`:`${b.description} Part of the frozen Canonical 100 syllabus; implementation is not yet released.`;
 return {title,description,alternates:{canonical:`/100-builds/${id}`},openGraph:{title,description,type:'website',url:`/100-builds/${id}`,images:[{url:'/og-image.png',width:1200,height:630,alt:`Build ${id} — ${b.title}`}]},twitter:{card:'summary_large_image',title,description,images:['/og-image.png']},robots:active?{index:true,follow:true}:{index:false,follow:true}};
}
export default function BuildLayout({children}:{children:React.ReactNode}){return children}
