import type { MetadataRoute } from 'next';
import { builds } from '../../../packages/registry/src/index';
import { buildArchives } from './100-builds/_archive/archive-data';

export const dynamic='force-static';
import { siteUrl } from './site';

export default function sitemap():MetadataRoute.Sitemap{
 const updatedAt=new Date('2026-08-27T00:00:00.000Z');
 const paths=['/','/100-builds',...builds.flatMap(build=>[
  `/100-builds/${build.id}`,
  `/100-builds/${build.id}/a`,
  `/100-builds/${build.id}/b`
 ]),'/100-builds/archive','/lineage',...Object.keys(buildArchives).map(id=>`/100-builds/${id}/archive`)];
 return paths.map(path=>({
  url:new URL(path==='/'?path:`${path}/`,siteUrl).toString(),
  lastModified:updatedAt,
  changeFrequency:path==='/'?'weekly':'monthly',
  priority:path==='/'?1:path==='/100-builds'?0.9:path.endsWith('/a')||path.endsWith('/b')?0.7:path==='/100-builds/archive'||path==='/lineage'?0.65:0.6
 }));
}
