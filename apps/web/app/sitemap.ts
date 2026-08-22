import type { MetadataRoute } from 'next';
import { builds } from '../../../packages/registry/src/index';
import { siteUrl } from './site';

export default function sitemap():MetadataRoute.Sitemap{
 const updatedAt=new Date('2026-08-22T00:00:00.000Z');
 const paths=['/','/100-builds',...builds.flatMap(build=>[
  `/100-builds/${build.id}`,
  `/100-builds/${build.id}/a`,
  `/100-builds/${build.id}/b`
 ])];
 return paths.map(path=>({
  url:new URL(path,siteUrl).toString(),
  lastModified:updatedAt,
  changeFrequency:path==='/'?'weekly':'monthly',
  priority:path==='/'?1:path==='/100-builds'?0.9:path.endsWith('/a')||path.endsWith('/b')?0.7:0.6
 }));
}
