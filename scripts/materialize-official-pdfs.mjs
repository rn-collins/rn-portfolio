#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {TextDecoder} from 'node:util';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifestPath=path.join(root,'docs/builds/visual-source-acquisition-001-100/OFFICIAL-PDF-PRESERVATION.json');
const manifest=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(manifestPath)));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');

async function fetchExact(source){
 let last;
 for(let attempt=1;attempt<=3;attempt++){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),45000);
  try{
   const response=await fetch(source.url,{redirect:'follow',signal:controller.signal,headers:{'user-agent':'RN-Portfolio-Preservation/1.0'}});
   if(!response.ok)throw Error('HTTP '+response.status);
   const bytes=Buffer.from(await response.arrayBuffer());
   const digest=hash(bytes);
   const prefix=bytes.subarray(0,8).toString('latin1');
   const tail=bytes.subarray(Math.max(0,bytes.length-2048)).toString('latin1');
   const latin=bytes.toString('latin1');
   const pages=(latin.match(/\/Type\s*\/Page\b/g)||[]).length;
   const version=prefix.match(/^%PDF-(\d+\.\d+)/)?.[1];
   if(bytes.length!==source.bytes)throw Error('byte length '+bytes.length+' != '+source.bytes);
   if(digest!==source.sha256)throw Error('SHA-256 '+digest+' != '+source.sha256);
   if(!prefix.startsWith('%PDF-')||!tail.includes('%%EOF'))throw Error('invalid PDF container boundaries');
   if(version!==source.pdfVersion)throw Error('PDF version '+version+' != '+source.pdfVersion);
   if(pages!==source.pages)throw Error('page-object count '+pages+' != '+source.pages);
   const output=path.join(root,source.output);
   fs.mkdirSync(path.dirname(output),{recursive:true});
   const temp=output+'.tmp-'+process.pid;
   fs.writeFileSync(temp,bytes,{flag:'wx'});
   const reread=fs.readFileSync(temp);
   if(reread.length!==source.bytes||hash(reread)!==source.sha256){fs.unlinkSync(temp);throw Error('post-write integrity mismatch')}
   fs.renameSync(temp,output);
   return {key:source.key,bytes:bytes.length,sha256:digest,pages,version};
  }catch(error){last=error}
  finally{clearTimeout(timer)}
  if(attempt<3)await sleep(attempt*1000);
 }
 throw Error(source.key+': '+last.message);
}

const assignments=manifest.sources.flatMap(source=>source.assignments);
if(new Set(assignments).size!==14||assignments.length!==14)throw Error('manifest must contain exactly 14 unique assignments');
const results=[];
for(const source of manifest.sources)results.push(await fetchExact(source));
console.log(JSON.stringify({status:'PASS',failClosed:true,sources:results,assignments:assignments.length}));
