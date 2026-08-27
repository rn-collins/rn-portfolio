#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {TextDecoder} from 'node:util';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(path.join(root,p)));
const manifest=JSON.parse(read('docs/builds/visual-source-acquisition-001-100/OFFICIAL-PDF-PRESERVATION.json'));
const expectedIds=['001','007','008','009','012','013','017','019','021','022','025','028','031','032'];
const ids=manifest.sources.flatMap(source=>source.assignments).sort();
if(manifest.status!=='BUILD-TIME VERIFIED PRESERVATION'||manifest.failClosed!==true)throw Error('preservation manifest state invalid');
if(JSON.stringify(ids)!==JSON.stringify(expectedIds))throw Error('14-assignment set drift');
if(manifest.sources.length!==3)throw Error('expected exactly three PDF sources');
for(const source of manifest.sources){
 if(!/^https:\/\/nvlpubs\.nist\.gov\//.test(source.url))throw Error(source.key+': source host invalid');
 if(!/^apps\/web\/public\/100-builds\/official-sources\/official-(01|07|09)-.+\.pdf$/.test(source.output))throw Error(source.key+': output path invalid');
 if(!/^[a-f0-9]{64}$/.test(source.sha256)||!Number.isInteger(source.bytes)||source.bytes<=0||!Number.isInteger(source.pages)||source.pages<=0)throw Error(source.key+': integrity metadata invalid');
 const absolute=path.join(root,source.output);
 const st=fs.lstatSync(absolute);
 if(!st.isFile()||st.isSymbolicLink())throw Error(source.key+': output not regular file');
 const bytes=fs.readFileSync(absolute);
 const digest=createHash('sha256').update(bytes).digest('hex');
 const prefix=bytes.subarray(0,8).toString('latin1');
 const tail=bytes.subarray(Math.max(0,bytes.length-2048)).toString('latin1');
 const latin=bytes.toString('latin1');
 const pages=(latin.match(/\/Type\s*\/Page\b/g)||[]).length;
 if(bytes.length!==source.bytes||digest!==source.sha256)throw Error(source.key+': byte/hash mismatch');
 if(!prefix.startsWith('%PDF-'+source.pdfVersion)||!tail.includes('%%EOF'))throw Error(source.key+': PDF container mismatch');
 if(pages!==source.pages)throw Error(source.key+': page-object count mismatch');
}
console.log(JSON.stringify({status:'PASS',sources:3,assignments:14,bytes:manifest.sources.reduce((n,s)=>n+s.bytes,0),failClosed:true}));
