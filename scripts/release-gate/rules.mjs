// Release gate rules for The 100 (data/releases.json).
//
// A build is released when its releasedAt date (Pacific/Honolulu) is today or earlier and hold is false.
// An empty releasedAt means unreleased. Everything the site publishes for a build (pages, film, captions,
// transcript, poster, carousel slides, covers, archive documents, sitemap entries) follows that build's
// release. Program-wide material that describes every build (bulk ZIPs, blueprints, the program archive,
// carousel operations, the Netherlands studio, media manifests) is published only once all 100 are released.
//
// apps/web/app/_release/gate.ts applies the same rule inside the Next.js build. The verifier checks that the
// two agree on every build.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const repoRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','..');
export const releasesPath=path.join(repoRoot,'data','releases.json');
export const TIME_ZONE='Pacific/Honolulu';
export const ALL_IDS=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));

const ISO=/^\d{4}-\d{2}-\d{2}$/;
export function isIsoDate(value){
 if(typeof value!=='string'||!ISO.test(value))return false;
 const d=new Date(value+'T00:00:00Z');
 return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value;
}

export function todayInHawaii(now=new Date()){
 return new Intl.DateTimeFormat('en-CA',{timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}

// RELEASE_GATE_TODAY pins the date for a whole build so the pages and the pruning step cannot disagree
// when a build runs across midnight. It is also how a future release can be previewed locally.
export function gateToday(env=process.env){
 const pinned=env.RELEASE_GATE_TODAY;
 if(pinned!==undefined&&pinned!==''){
  if(!isIsoDate(pinned))throw new Error(`RELEASE_GATE_TODAY must be YYYY-MM-DD, got "${pinned}"`);
  return pinned;
 }
 return todayInHawaii();
}

export function buildIdOf(releaseId){
 const m=/^builds\/(\d{3})$/.exec(releaseId);
 return m?m[1]:null;
}

export function loadReleases(file=releasesPath){
 const releases=JSON.parse(fs.readFileSync(file,'utf8'));
 const problems=[];
 if(!Array.isArray(releases))throw new Error('data/releases.json must be an array of release records');
 const seen=new Set();
 for(const r of releases){
  const where=r&&r.id?r.id:JSON.stringify(r);
  const id=buildIdOf(r?.id);
  if(!id)problems.push(`${where}: id must look like builds/001`);
  else if(seen.has(id))problems.push(`${where}: duplicate id`);
  else seen.add(id);
  if(typeof r.releasedAt!=='string'||(r.releasedAt!==''&&!isIsoDate(r.releasedAt)))problems.push(`${where}: releasedAt must be YYYY-MM-DD or empty`);
  if(typeof r.hold!=='boolean')problems.push(`${where}: hold must be true or false`);
  if(!Array.isArray(r.postUrls)||r.postUrls.some(u=>!isHttpsUrl(u)))problems.push(`${where}: postUrls must be a list of https URLs`);
  for(const key of ['longFormUrl','sourcePageUrl'])if(typeof r[key]!=='string'||(r[key]!==''&&!isHttpsUrl(r[key])))problems.push(`${where}: ${key} must be an https URL or empty`);
 }
 for(const id of ALL_IDS)if(!seen.has(id))problems.push(`builds/${id}: missing from data/releases.json`);
 if(problems.length)throw new Error('data/releases.json is invalid:\n - '+problems.join('\n - '));
 return releases;
}

function isHttpsUrl(value){
 if(typeof value!=='string')return false;
 try{return new URL(value).protocol==='https:'}catch{return false}
}

export function isReleasedRecord(record,today){
 return Boolean(record)&&record.hold===false&&isIsoDate(record.releasedAt)&&record.releasedAt<=today;
}

export function releasedIdSet(releases,today){
 return new Set(releases.filter(r=>isReleasedRecord(r,today)).map(r=>buildIdOf(r.id)));
}

// Which builds does a published path belong to? Used to prune and to verify the static export.
// "100-builds" is the collection's own name, not Build 100, and "100-cycle" / "100-build" name the program.
export function idsInPath(relPath){
 const ids=new Set();
 const add=n=>{const v=Number(n);if(Number.isInteger(v)&&v>=1&&v<=100)ids.add(String(v).padStart(3,'0'))};
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

// Published areas that describe the whole program. A file here with no build id of its own is published only
// when every build is released.
export const PROGRAM_PREFIXES=[
 '100-builds/archive/',
 '100-builds/carousel-operations/',
 '100-builds/netherlands-2026/',
 '100-builds/carousel-blueprints/',
 '100-builds/carousel-packages/',
 '100-builds/canva-package/',
 '100-builds/platform-exports/',
 'data/'
];

// Carousel slides, blueprints, carousel operations records, Canva packages and platform export bundles are
// pieces of their own with no posting record and no release date, so none of them is published. Keep in step with
// productionPackagesPublic in apps/web/app/_release/gate.ts.
export const PRIVATE_PREFIXES=[
 '100-builds/carousel-operations/',
 '100-builds/carousel-slides/',
 '100-builds/carousel-blueprints/',
 '100-builds/carousel-packages/',
 '100-builds/canva-package/',
 '100-builds/platform-exports/'
];

export function isPrivatePath(relPath){
 return PRIVATE_PREFIXES.some(prefix=>relPath===prefix.slice(0,-1)||relPath.startsWith(prefix));
}

export function isProgramPath(relPath){
 return PROGRAM_PREFIXES.some(prefix=>relPath===prefix.slice(0,-1)||relPath.startsWith(prefix));
}

// Decide whether one file of the static export may be published.
export function pathIsPublic(relPath,released){
 if(isPrivatePath(relPath))return false;
 const ids=idsInPath(relPath);
 if(ids.length)return ids.every(id=>released.has(id));
 if(isProgramPath(relPath))return ALL_IDS.every(id=>released.has(id));
 return true;
}

export function loadHeldTitles(){
 const src=fs.readFileSync(path.join(repoRoot,'packages/registry/src/canonical-v1-meta.ts'),'utf8');
 const titles=new Map();
 for(const m of src.matchAll(/^'(\d{3})':\{title:'((?:\\'|[^'])*)'/gm))titles.set(m[1],m[2].replace(/\\'/g,"'"));
 return titles;
}
