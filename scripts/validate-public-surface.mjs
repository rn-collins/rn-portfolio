#!/usr/bin/env node
import fs from 'node:fs';
import {createHash} from 'node:crypto';
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
for(const needle of ['aria-labelledby="asset-review-heading"','loading="lazy"','Open official source page','Open exact candidate asset','Original HOLD fallback graphic','Open the full fallback SVG','Download SVG ↓','download={`${id}-original-rn-fallback.svg`}','fallbackSpec?.accessibility.alt','fallbackSpec.caption','External candidate formally selected','External asset staged','readOnly disabled'])check(assetPanel.includes(needle),'asset review UI contract missing '+needle);
check(recordPage.includes('<AssetReviewPanel id={id}/>'),'every public build record must render the canonical asset review panel');
const visualPackages=JSON.parse(read('docs/builds/visual-source-acquisition-001-100/packages.json'));
check(Array.isArray(visualPackages.records)&&visualPackages.records.length===100,'visual package ledger must contain 100 records');
const visualIds=visualPackages.records.map(record=>record.buildId);
check(JSON.stringify(visualIds)===JSON.stringify(ids),'visual package ledger must be ordered 001-100');
const fallbackManifest=JSON.parse(read('docs/builds/visual-source-acquisition-001-100/FALLBACK-ASSET-MANIFEST.json'));
check(fallbackManifest.state?.status==='HOLD'&&fallbackManifest.state?.externalSelected===false&&fallbackManifest.state?.externalStaged===false&&fallbackManifest.state?.evidence===false,'fallback manifest must preserve HOLD/non-evidence state');
check(Array.isArray(fallbackManifest.files)&&fallbackManifest.files.length===76,'fallback manifest must contain 76 files');
const fallbackSpecs=JSON.parse(read('docs/builds/visual-source-acquisition-001-100/FALLBACK-SPECS-HOLD.json'));
check(Array.isArray(fallbackSpecs.records)&&fallbackSpecs.records.length===76,'fallback specs must contain 76 records');
const fallbackSpecById=new Map(fallbackSpecs.records.map(spec=>[spec.buildId,spec]));
check(fallbackSpecById.size===76,'fallback spec IDs must be unique');
const fallbackHooks=new Set(fallbackSpecs.records.map(spec=>spec.hook?.text));
check(fallbackHooks.size===76&&!fallbackHooks.has(undefined),'all fallback hooks must be present and unique');
const luminance=hex=>{const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]};
const contrast=(a,b)=>{const [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (hi+.05)/(lo+.05)};
for(const fallback of fallbackManifest.files){
 const expected=`/100-builds/fallbacks/${fallback.buildId}-original-fallback.svg`;
 check(fallback.path===expected,'unexpected fallback URL for '+fallback.buildId);
 const rel='apps/web/public'+fallback.path;
 try{
  const abs=path.join(root,rel);const st=fs.lstatSync(abs);check(st.isFile()&&!st.isSymbolicLink(),rel+' must be a regular non-symlink file');
  const bytes=fs.readFileSync(abs);const svg=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
  check(bytes.length===fallback.bytes,'fallback byte length drift for '+fallback.buildId);
  check(createHash('sha256').update(bytes).digest('hex')===fallback.sha256,'fallback checksum drift for '+fallback.buildId);
  check(/<svg\b[^>]*width="1200"[^>]*height="1500"[^>]*viewBox="0 0 1200 1500"[^>]*role="img"[^>]*aria-labelledby="title desc"/.test(svg),'fallback SVG root accessibility/dimensions invalid for '+fallback.buildId);
  check(/<title id="title">[^<]+<\/title>/.test(svg)&&/<desc id="desc">[^<]+<\/desc>/.test(svg),'fallback title/description missing for '+fallback.buildId);
  check(svg.includes('ORIGINAL RN FALLBACK • HOLD • NOT EVIDENCE')&&svg.includes('Concept illustration only. No affiliation, endorsement, or external validation implied.'),'fallback visible non-evidence label missing for '+fallback.buildId);
  check(!/<(?:script|foreignObject|image)\b/i.test(svg)&&!/(?:href|xlink:href)="(?:https?:|data:|\/\/)/i.test(svg),'fallback SVG must be self-contained and inert for '+fallback.buildId);
 }catch(e){fail.push('invalid fallback '+rel+': '+e.message)}
 check(fallback.label==='ORIGINAL RN FALLBACK • HOLD • NOT EVIDENCE','fallback label drift for '+fallback.buildId);
 const spec=fallbackSpecById.get(fallback.buildId);
 check(Boolean(spec),'fallback spec missing for '+fallback.buildId);
 if(spec){
  check(spec.status==='HOLD'&&spec.externalSelected===false&&spec.externalStaged===false,'fallback spec state drift for '+fallback.buildId);
  check(typeof spec.accessibility?.alt==='string'&&spec.accessibility.alt.length>=80,'fallback alt text too weak for '+fallback.buildId);
  check(typeof spec.caption==='string'&&spec.caption.includes('not evidence'),'fallback caption must state non-evidence for '+fallback.buildId);
  check(contrast(spec.palette.ink,spec.palette.bg)>=4.5,'fallback essential text contrast below AA for '+fallback.buildId);
  check(contrast(spec.palette.accent,spec.palette.bg)>=3,'fallback accent geometry contrast below 3:1 for '+fallback.buildId);
 }
}
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
console.log('PASS: 100 IDs; 200 A/B routes; 44 build archives; 116 safe UTF-8 allowlist records; 451 canonical sitemap paths; 100 dossier asset previews with explicit release gates and 76 checksum-verified, accessible, self-contained original HOLD fallback previews; fail-closed source reader.');
