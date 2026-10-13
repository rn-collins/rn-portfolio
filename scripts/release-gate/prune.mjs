// Remove everything from the static export that the release gate does not publish.
// 1. Pages and assets: any file whose path belongs to an unreleased build, any program-wide file while a build is
//    still held, and the private production packages (see rules.mjs).
// 2. Scripts and styles under _next/: only files reachable from the pages that remain are kept, so code that
//    only an unreleased page used cannot be fetched by guessing its URL.
import fs from 'node:fs';
import path from 'node:path';
import {pathIsPublic} from './rules.mjs';

export function walk(dir,base=dir,out=[]){
 if(!fs.existsSync(dir))return out;
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const abs=path.join(dir,entry.name);
  if(entry.isDirectory())walk(abs,base,out);
  else out.push(path.relative(base,abs).split(path.sep).join('/'));
 }
 return out;
}

const TEXT=/\.(html|txt|js|mjs|css|json|xml|svg|md|csv|vtt|map|webmanifest)$/i;
export const isText=rel=>TEXT.test(rel)||!/\.[a-z0-9]+$/i.test(rel.split('/').at(-1));

// Matches references to Next.js static files in HTML, RSC payloads, scripts and styles.
const STATIC_REF=/(?:_next\/)?static\/(?:chunks|media|css|[A-Za-z0-9_-]{8,})\/[A-Za-z0-9_.~%@+-]+(?:\/[A-Za-z0-9_.~%@+-]+)*/g;

export function staticRefs(text){
 const refs=new Set();
 for(const m of text.matchAll(STATIC_REF)){
  let ref=m[0].startsWith('_next/')?m[0]:'_next/'+m[0];
  ref=ref.replace(/[.,;:]+$/,'');
  refs.add(ref);
 }
 return refs;
}

function removeEmptyDirs(dir){
 if(!fs.existsSync(dir))return;
 for(const entry of fs.readdirSync(dir,{withFileTypes:true}))if(entry.isDirectory())removeEmptyDirs(path.join(dir,entry.name));
 if(fs.readdirSync(dir).length===0)fs.rmdirSync(dir);
}

export function prune(outDir,released){
 if(!fs.existsSync(path.join(outDir,'index.html')))throw new Error(`release gate: no static export at ${outDir}`);
 let routes=0,assets=0,chunks=0;
 for(const rel of walk(outDir)){
  if(rel.startsWith('_next/'))continue;
  if(pathIsPublic(rel,released))continue;
  fs.rmSync(path.join(outDir,rel));
  if(/\.(html|txt)$/.test(rel)||rel.endsWith('/opengraph-image')||/\/opengraph-image[^/]*$/.test(rel))routes++;else assets++;
 }
 // Keep only the _next files that the remaining pages reach.
 const all=walk(outDir);
 const nextFiles=new Set(all.filter(rel=>rel.startsWith('_next/')));
 const reached=new Set();
 const queue=[];
 const visit=text=>{for(const ref of staticRefs(text))if(nextFiles.has(ref)&&!reached.has(ref)){reached.add(ref);queue.push(ref)}};
 for(const rel of all)if(!rel.startsWith('_next/')&&isText(rel))visit(fs.readFileSync(path.join(outDir,rel),'utf8'));
 while(queue.length){
  const rel=queue.pop();
  if(isText(rel))visit(fs.readFileSync(path.join(outDir,rel),'utf8'));
 }
 for(const rel of nextFiles)if(!reached.has(rel)){fs.rmSync(path.join(outDir,rel));chunks++}
 removeEmptyDirs(outDir);
 return {files:routes+assets+chunks,routes,assets,chunks};
}
