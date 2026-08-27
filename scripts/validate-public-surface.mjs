#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {TextDecoder} from 'node:util';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(path.join(root,p)));
const fail=[];const check=(ok,msg)=>{if(!ok)fail.push(msg)};
const ids=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
const registry=read('packages/registry/src/registry.generated.ts');
const registryIds=[...registry.matchAll(/^\s{4}"id":\s*"(\d{3})",$/gm)].map(m=>m[1]);
check(JSON.stringify(registryIds)===JSON.stringify(ids),'registry must be ordered 001-100');

for(const id of ids)for(const variant of ['a','b']){
 const rel=`apps/web/app/100-builds/${id}/${variant}/page.tsx`;
 try{const st=fs.lstatSync(path.join(root,rel));check(st.isFile()&&!st.isSymbolicLink(),rel+' must be a regular non-symlink file')}catch{fail.push(rel+' missing')}
}
const overview=read('apps/web/app/100-builds/[id]/page.tsx');
check(overview.includes('builds.find(b=>b.id===id)'),'overview must resolve through registry');

const archiveData=read('apps/web/app/100-builds/_archive/archive-data.ts');
const archiveIds=[...archiveData.matchAll(/^\s*'(\d{3})':\{id:'\1',title:/gm)].map(m=>m[1]);
check(archiveIds.length===44,'expected 44 build archives');
check(new Set(archiveIds).size===44,'build archive IDs must be unique');

const allowSource=read('apps/web/app/100-builds/_archive/public-documents.ts');
const body=allowSource.match(/export const publicArchiveDocuments=\[\s*([\s\S]*?)\s*\] as const;/)?.[1]||'';
const docs=[...body.matchAll(/^\s*'([^'\r\n]+)',?\s*$/gm)].map(m=>m[1]);
check(docs.length===116,'expected 116 public archive documents');
check(new Set(docs).size===docs.length,'archive allowlist must be unique');
const realRoot=fs.realpathSync(root);
for(const rel of docs){
 check(!path.isAbsolute(rel)&&!rel.includes('\\')&&!rel.includes('%')&&!rel.includes('?')&&!rel.includes('#'),'unsafe allowlist path '+rel);
 check(!rel.split('/').some(x=>!x||x==='.'||x==='..'||x.startsWith('.')),'unsafe allowlist segment '+rel);
 check(/\.(md|json|ts|tsx)$/i.test(rel),'non-text allowlist extension '+rel);
 const abs=path.resolve(root,rel);check(abs.startsWith(root+path.sep),'allowlist escapes root '+rel);
 try{
  const st=fs.lstatSync(abs);check(st.isFile()&&!st.isSymbolicLink(),'allowlist target must be regular non-symlink '+rel);
  const real=fs.realpathSync(abs);check(real.startsWith(realRoot+path.sep),'allowlist realpath escapes root '+rel);
  new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(abs));
 }catch(e){fail.push('invalid allowlist target '+rel+': '+e.message)}
}
for(const denied of ['package.json','../package.json','/etc/passwd','.env','docs/%2e%2e/package.json','docs/x.md?raw=1'])check(!docs.includes(denied),'denied path allowlisted '+denied);

const sitemap=read('apps/web/app/sitemap.ts');
for(const needle of ["'/100-builds/archive','/lineage'","...Object.keys(buildArchives).map(id=>`/100-builds/${id}/archive`)","path==='/'?path:`${path}/`"])check(sitemap.includes(needle),'sitemap contract missing '+needle);
const expected=['/','/100-builds',...ids.flatMap(id=>[`/100-builds/${id}`,`/100-builds/${id}/a`,`/100-builds/${id}/b`]),'/100-builds/archive','/lineage',...archiveIds.map(id=>`/100-builds/${id}/archive`)];
check(expected.length===348&&new Set(expected).size===348,'expected 348 unique sitemap paths');

const reader=read('apps/web/app/100-builds/archive/source/[...path]/page.tsx');
for(const needle of ['publicArchiveDocumentSet.has(file)','path.resolve(repoRoot,file)','absolute.startsWith(repoRoot+path.sep)','fs.existsSync(absolute)','fs.statSync(absolute).isFile()',"fs.readFileSync(absolute,'utf8')",'robots:{index:false,follow:true}','robots:{index:false,follow:false}'])check(reader.includes(needle),'archive reader invariant missing '+needle);
check(!reader.includes('has not been materialized yet'),'archive reader must not expose a success placeholder');

if(fail.length){console.error('Public-surface validation failed:\n- '+fail.join('\n- '));process.exit(1)}
console.log('PASS: 100 IDs; 200 A/B routes; 44 build archives; 116 safe UTF-8 allowlist records; 348 canonical sitemap paths; fail-closed source reader.');
