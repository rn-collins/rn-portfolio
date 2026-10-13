#!/usr/bin/env node
// Checks a pruned static export (apps/web/out) against the release gate. Returns a list of problems.
// Run on its own: node scripts/release-gate/verify.mjs [outDir]  (uses RELEASE_GATE_TODAY or today in Hawaii)
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ALL_IDS,buildIdOf,gateToday,loadHeldTitles,loadReleases,pathIsPublic,releasedIdSet,repoRoot} from './rules.mjs';
import {isText,staticRefs,walk} from './prune.mjs';

const SITE_ORIGINS=['https://rn-portfolio-khaki.vercel.app'];
if(process.env.NEXT_PUBLIC_SITE_URL)SITE_ORIGINS.push(new URL(/^https?:/.test(process.env.NEXT_PUBLIC_SITE_URL)?process.env.NEXT_PUBLIC_SITE_URL:'https://'+process.env.NEXT_PUBLIC_SITE_URL).origin);
if(process.env.VERCEL_PROJECT_PRODUCTION_URL)SITE_ORIGINS.push('https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL);

const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const decodeEntities=s=>s.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');

function resolves(outDir,urlPath){
 let p=decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
 if(!p.startsWith('/'))return true;
 p=p.replace(/^\/+/,'');
 const candidates=p===''?['index.html']:p.endsWith('/')?[p+'index.html']:[p,p+'/index.html',p+'.html'];
 return candidates.some(c=>fs.existsSync(path.join(outDir,c))&&fs.statSync(path.join(outDir,c)).isFile());
}

export function verify(outDir,released,releases){
 const problems=[];
 if(!fs.existsSync(path.join(outDir,'index.html')))return [`no static export at ${outDir}`];
 const files=walk(outDir);
 const fileSet=new Set(files);
 const held=ALL_IDS.filter(id=>!released.has(id));
 const titles=loadHeldTitles();

 // 1. No file of an unreleased build, no held program file, no private production package.
 for(const rel of files)if(!rel.startsWith('_next/')&&!pathIsPublic(rel,released))problems.push(`unreleased file published: ${rel}`);

 // 2. No page, script, payload or data file mentions an unreleased build's route or title.
 const routeCanary=held.length?new RegExp(`/100-builds/(${held.join('|')})(?=[/"'?#\\s\\\\)<]|$)`,'g'):null;
 const variantCanary=held.length?new RegExp(`(?<![\\w-])(${held.join('|')})-(A|B)(?![\\w-])`,'g'):null;
 const heldTitles=held.map(id=>[id,titles.get(id)]).filter(([,t])=>t);
 const titleCanary=heldTitles.length?new RegExp(heldTitles.map(([,t])=>escape(t)).join('|'),'g'):null;
 const titleOwner=new Map(heldTitles.map(([id,t])=>[t,id]));
 const textFiles=files.filter(isText);
 for(const rel of textFiles){
  const raw=fs.readFileSync(path.join(outDir,rel),'utf8');
  const text=decodeEntities(raw).replace(/\\u0026/g,'&').replace(/\\u0027/g,"'");
  if(routeCanary)for(const m of new Set([...text.matchAll(routeCanary)].map(m=>m[1])))problems.push(`${rel} links to unreleased Build ${m}`);
  if(variantCanary&&!rel.startsWith('_next/'))for(const m of new Set([...text.matchAll(variantCanary)].map(m=>m[0])))problems.push(`${rel} names unreleased ${m}`);
  if(titleCanary)for(const m of new Set([...text.matchAll(titleCanary)].map(m=>m[0])))problems.push(`${rel} contains the title of unreleased Build ${titleOwner.get(m)}: "${m}"`);
 }

 // 3. Every in-site link, image, video and poster on a published page resolves inside the export.
 const attr=/\s(?:href|src|poster|data-src)="([^"]+)"/g;
 for(const rel of files.filter(r=>r.endsWith('.html'))){
  const html=fs.readFileSync(path.join(outDir,rel),'utf8');
  for(const m of html.matchAll(attr)){
   let url=decodeEntities(m[1]);
   const origin=SITE_ORIGINS.find(o=>url===o||url.startsWith(o+'/'));
   if(origin)url=url.slice(origin.length)||'/';
   if(!url.startsWith('/')||url.startsWith('//'))continue;
   if(!resolves(outDir,url))problems.push(`${rel} has a broken in-site link: ${url}`);
  }
 }

 // 4. Every script and style a published page needs is still there.
 for(const rel of textFiles){
  const text=fs.readFileSync(path.join(outDir,rel),'utf8');
  for(const ref of staticRefs(text))if(/^_next\/static\/(chunks|css|media)\//.test(ref)&&!fileSet.has(ref))problems.push(`${rel} needs missing ${ref}`);
 }

 // 5. Every released build is present with its full link set, and the index and sitemap list it.
 const read=rel=>fileSet.has(rel)?fs.readFileSync(path.join(outDir,rel),'utf8'):null;
 const index=read('100-builds/index.html')??'';
 const sitemap=read('sitemap.xml')??'';
 const ordered=ALL_IDS.filter(id=>released.has(id));
 const byId=new Map(releases.map(r=>[buildIdOf(r.id),r]));
 ordered.forEach((id,i)=>{
  const r=byId.get(id);
  for(const page of ['','a/','b/','record/'])if(!fileSet.has(`100-builds/${id}/${page}index.html`))problems.push(`released Build ${id} is missing /100-builds/${id}/${page}`);
  const prev=ordered[i-1],next=ordered[i+1];
  for(const [page,label] of [['','gallery page'],['a/','A page'],['b/','B page'],['record/','long-form record']]){
   const html=read(`100-builds/${id}/${page}index.html`);
   if(!html)continue;
   const need=[
    ['gallery index','href="/100-builds/"'],
    ...(page!==''?[['gallery page',`href="/100-builds/${id}/"`]]:[]),
    ...(page!=='record/'&&r.longFormUrl?[['long-form',`href="${r.longFormUrl}"`]]:[]),
    ...(r.sourcePageUrl?[['source page',`href="${r.sourcePageUrl}"`]]:[]),
    ...r.postUrls.map(u=>['post',`href="${u}"`]),
    ...(prev?[['previous',`href="/100-builds/${prev}/"`]]:[]),
    ...(next?[['next',`href="/100-builds/${next}/"`]]:[])
   ];
   for(const [what,needle] of need)if(!html.includes(needle))problems.push(`Build ${id} ${label} does not link its ${what} (${needle})`);
  }
  if(!index.includes(`/100-builds/${id}`))problems.push(`gallery index does not list released Build ${id}`);
  if(!sitemap.includes(`/100-builds/${id}/<`))problems.push(`sitemap does not list released Build ${id}`);
 });
 return problems;
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const outDir=path.resolve(process.argv[2]??path.join(repoRoot,'apps','web','out'));
 const releases=loadReleases();
 const today=gateToday();
 const released=releasedIdSet(releases,today);
 const problems=verify(outDir,released,releases);
 console.log(`release gate verify: ${today}: ${released.size} released; ${problems.length} problem(s)`);
 for(const p of problems)console.log(' - '+p);
 process.exit(problems.length?1:0);
}
