// Release gate for The 100, read at build time from data/releases.json.
// Same rule as scripts/release-gate/rules.mjs: a build is public when releasedAt (Pacific/Honolulu) is today
// or earlier and hold is false. Server code only: never import this from a 'use client' file, so held builds'
// data cannot reach a browser bundle. Client components receive released builds as props instead.
import releaseRecords from '../../../../data/releases.json';
import {builds,phases,type CanonicalBuild} from '../../../../packages/registry/src/index';
import {siteUrl} from '../site';

export type ReleaseRecord={id:string;title:string;releasedAt:string;hold:boolean;postUrls:string[];longFormUrl:string;sourcePageUrl:string};

const records=releaseRecords as ReleaseRecord[];
const ISO=/^\d{4}-\d{2}-\d{2}$/;

function hawaiiToday(){
 return new Intl.DateTimeFormat('en-CA',{timeZone:'Pacific/Honolulu',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
}

const pinned=process.env.RELEASE_GATE_TODAY;
if(pinned&&!ISO.test(pinned))throw new Error(`RELEASE_GATE_TODAY must be YYYY-MM-DD, got "${pinned}"`);
export const gateToday=pinned||hawaiiToday();

// Local preview of every build (next dev and the browser tests only). A production build refuses it.
const preview=process.env.RELEASE_GATE_PREVIEW==='1';
if(preview&&process.env.NODE_ENV==='production')throw new Error('RELEASE_GATE_PREVIEW is for local preview only and cannot be used in a production build.');

const byId=new Map(records.map(r=>[r.id.replace(/^builds\//,''),r]));

function recordReleased(r:ReleaseRecord|undefined){
 return Boolean(r)&&r!.hold===false&&ISO.test(r!.releasedAt)&&r!.releasedAt<=gateToday;
}

export const releasedIds=new Set(builds.map(b=>b.id).filter(id=>preview||recordReleased(byId.get(id))));
export const isReleased=(id:string)=>releasedIds.has(id);
// Program-wide pages and downloads describe every build, so they wait until all 100 are released.
export const programReleased=builds.every(b=>releasedIds.has(b.id));
// Carousels, Canva packages and platform export bundles are their own pieces with no posting record yet,
// so they stay off the public site whatever the build's status. Keep in step with PRIVATE_PREFIXES in
// scripts/release-gate/rules.mjs.
// Local preview (RELEASE_GATE_PREVIEW=1, never in production) shows them so they can be reviewed.
export const productionPackagesPublic=preview;
export const releasedBuilds:CanonicalBuild[]=builds.filter(b=>releasedIds.has(b.id));
export const releasedPhases=phases.filter(p=>releasedBuilds.some(b=>b.phase===p.id));

export function releaseOf(id:string){return byId.get(id)??null}

export function neighbours(id:string){
 const index=releasedBuilds.findIndex(b=>b.id===id);
 return {
  previous:index>0?releasedBuilds[index-1]:null,
  next:index>=0&&index<releasedBuilds.length-1?releasedBuilds[index+1]:null
 };
}

export const galleryIndexUrl=new URL('/100-builds/',siteUrl).toString();
export function galleryPageUrl(id:string){return new URL(`/100-builds/${id}/`,siteUrl).toString()}

export type PieceLinkSet={
 id:string;
 title:string;
 postUrls:string[];
 sourcePageUrl:string;
 longFormUrl:string;
 galleryPage:string;
 galleryIndex:string;
 previous:{id:string;title:string}|null;
 next:{id:string;title:string}|null;
};

export function pieceLinks(id:string):PieceLinkSet|null{
 if(!isReleased(id))return null;
 const build=builds.find(b=>b.id===id);
 if(!build)return null;
 const r=releaseOf(id);
 const {previous,next}=neighbours(id);
 return {
  id,
  title:build.title,
  postUrls:r?.postUrls??[],
  sourcePageUrl:r?.sourcePageUrl??'',
  longFormUrl:r?.longFormUrl||new URL(`/100-builds/${id}/record/`,siteUrl).toString(),
  galleryPage:`/100-builds/${id}/`,
  galleryIndex:'/100-builds/',
  previous:previous?{id:previous.id,title:previous.title}:null,
  next:next?{id:next.id,title:next.title}:null
 };
}

// Turn an absolute URL on this site into a site path, so in-site links stay relative.
export function sitePath(url:string){
 try{const u=new URL(url);if(u.origin===siteUrl.origin)return u.pathname+u.search+u.hash}catch{}
 return url;
}

// Path rule, mirrored from scripts/release-gate/rules.mjs (idsInPath, PRIVATE_PREFIXES, PROGRAM_PREFIXES).
// Used to drop links to anything the static export will not contain.
export function idsInPath(relPath:string){
 const ids=new Set<string>();
 const add=(n:string|number)=>{const v=Number(n);if(Number.isInteger(v)&&v>=1&&v<=100)ids.add(String(v).padStart(3,'0'))};
 for(const segment of relPath.split('/')){
  if(!segment||segment==='100-builds')continue;
  if(/^\d{3}$/.test(segment)){add(segment);continue}
  let ranged=false;
  for(const m of segment.matchAll(/(?<!\d)(\d{3})-(\d{3})(?!\d)/g)){
   const a=Number(m[1]),b=Number(m[2]);
   if(a>=1&&b<=100&&a<=b){ranged=true;for(let n=a;n<=b;n++)add(n)}
  }
  const prefix=/^(\d{3})(?=[-_.])(?!-(?:builds?|cycle)\b)/.exec(segment);
  if(prefix&&!ranged)add(prefix[1]);
  for(const m of segment.matchAll(/build[-_]?(\d{3})(?!\d)/gi))add(m[1]);
 }
 return [...ids].sort();
}
const PRIVATE_PREFIXES=['100-builds/carousel-operations/','100-builds/carousel-slides/','100-builds/carousel-blueprints/','100-builds/carousel-packages/','100-builds/canva-package/','100-builds/platform-exports/'];
const PROGRAM_PREFIXES=['100-builds/archive/','100-builds/carousel-operations/','100-builds/netherlands-2026/','100-builds/carousel-blueprints/','100-builds/carousel-packages/','100-builds/canva-package/','100-builds/platform-exports/','data/'];
const under=(rel:string,prefixes:string[])=>prefixes.some(prefix=>rel===prefix.slice(0,-1)||rel.startsWith(prefix));

// Is this site path (for example /100-builds/004/a or /media/builds/004/x.mp4) part of the public build?
export function sitePathIsPublic(href:string){
 if(preview)return true;
 let rel=href;
 try{
  const u=new URL(href,siteUrl);
  if(u.origin!==siteUrl.origin)return true;
  rel=decodeURIComponent(u.pathname);
 }catch{return true}
 rel=rel.replace(/^\/+/,'');
 if(rel===''||rel==='/')return true;
 if(!productionPackagesPublic&&under(rel,PRIVATE_PREFIXES))return false;
 const ids=idsInPath(rel);
 if(ids.length)return ids.every(id=>releasedIds.has(id));
 if(under(rel,PROGRAM_PREFIXES))return programReleased;
 return true;
}

// The archive source reader publishes a retained document only when the builds it belongs to are released.
// Documents that belong to no single build describe the whole program and wait for all 100.
export function archiveDocumentIsPublic(docPath:string){
 return sitePathIsPublic(`/100-builds/archive/source/${docPath}`);
}
