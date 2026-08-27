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
const recordPage=read('apps/web/app/100-builds/[id]/record/page.tsx');
const recordIds=[...recordPage.matchAll(/^\s*'(\d{3})':/gm)].map(m=>m[1]);
check(recordIds.length===100&&new Set(recordIds).size===100&&ids.every(id=>recordIds.includes(id)),'public build records must cover 001-100 exactly');
for(const needle of ['generateMetadata','alternates:{canonical:`/100-builds/${id}/record`}','robots:{index:true,follow:true}','robots:{index:false,follow:false}'])check(recordPage.includes(needle),'record metadata contract missing '+needle);
const dossierNav=read('apps/web/app/100-builds/001/DossierNav.tsx');
for(const route of ['/100-builds/001/record','/100-builds/001/making','/100-builds/001/method','/100-builds/001/evidence'])check(dossierNav.includes(`href="${route}"`),'dossier navigation missing '+route);

const assetPanel=read('apps/web/app/100-builds/AssetReviewPanel.tsx');
for(const needle of ['aria-labelledby="asset-review-heading"','loading="lazy"','Open official source page','Open exact candidate asset','External candidate formally selected','External asset staged','readOnly disabled'])check(assetPanel.includes(needle),'asset review UI contract missing '+needle);
check(recordPage.includes('<AssetReviewPanel id={id}/>'),'every public build record must render the canonical asset review panel');
const visualPackages=JSON.parse(read('docs/builds/visual-source-acquisition-001-100/packages.json'));
check(Array.isArray(visualPackages.records)&&visualPackages.records.length===100,'visual package ledger must contain 100 records');
const visualIds=visualPackages.records.map(record=>record.buildId);
check(JSON.stringify(visualIds)===JSON.stringify(ids),'visual package ledger must be ordered 001-100');
for(const record of visualPackages.records){
 check(record.rnFallbackReady===true,'RN fallback must remain ready for '+record.buildId);
 check(typeof record.externalSelected==='boolean'&&typeof record.externalStaged==='boolean','selection/staging status must be explicit for '+record.buildId);
 const expectedCover=`/media/builds/${record.buildId}/build-${record.buildId}-linkedin-poster.png`;
 check(record.cover?.assetUrl===expectedCover,'unexpected creator-owned cover path for '+record.buildId);
 const coverRel='apps/web/public'+expectedCover;
 try{const st=fs.lstatSync(path.join(root,coverRel));check(st.isFile()&&!st.isSymbolicLink(),coverRel+' must be a regular non-symlink file')}catch{fail.push(coverRel+' missing')}
 check(Number.isInteger(record.cover?.dimensions?.width)&&record.cover.dimensions.width>0&&Number.isInteger(record.cover?.dimensions?.height)&&record.cover.dimensions.height>0,'cover dimensions missing for '+record.buildId);
 check(typeof record.cover?.altText==='string'&&record.cover.altText.trim().length>20,'cover alt text missing for '+record.buildId);
 check(typeof record.cover?.credit==='string'&&record.cover.credit.trim(),'cover credit missing for '+record.buildId);
 for(const candidate of record.visualCandidateSearch?.searched||[]){
  for(const key of ['sourcePageUrl','exactAssetUrl'])if(candidate[key]){try{const u=new URL(candidate[key]);check(u.protocol==='https:','candidate URL must use HTTPS for '+record.buildId)}catch{fail.push('invalid candidate '+key+' for '+record.buildId)}}
 }
}

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
const expected=['/','/100-builds',...ids.flatMap(id=>[`/100-builds/${id}`,`/100-builds/${id}/a`,`/100-builds/${id}/b`,`/100-builds/${id}/record`]),'/100-builds/001/evidence','/100-builds/001/making','/100-builds/001/method','/100-builds/archive','/lineage',...archiveIds.map(id=>`/100-builds/${id}/archive`)];
check(expected.length===451&&new Set(expected).size===451,'expected 451 unique sitemap paths');

const reader=read('apps/web/app/100-builds/archive/source/[...path]/page.tsx');
for(const needle of ['publicArchiveDocumentSet.has(file)','path.resolve(repoRoot,file)','absolute.startsWith(repoRoot+path.sep)','fs.existsSync(absolute)','fs.lstatSync(absolute)','isSymbolicLink()','fs.realpathSync(absolute)','new TextDecoder(\'utf-8\',{fatal:true})','robots:{index:false,follow:true}','robots:{index:false,follow:false}'])check(reader.includes(needle),'archive reader invariant missing '+needle);
check(!reader.includes('has not been materialized yet'),'archive reader must not expose a success placeholder');

if(fail.length){console.error('Public-surface validation failed:\n- '+fail.join('\n- '));process.exit(1)}
console.log('PASS: 100 IDs; 200 A/B routes; 44 build archives; 116 safe UTF-8 allowlist records; 451 canonical sitemap paths; 100 dossier asset previews with explicit release gates; fail-closed source reader.');
