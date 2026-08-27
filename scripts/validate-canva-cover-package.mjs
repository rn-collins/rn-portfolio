#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'apps/web/public/100-builds/canva-package');
const fail=[];const check=(ok,msg)=>{if(!ok)fail.push(msg)};
const sha=b=>createHash('sha256').update(b).digest('hex');
const json=JSON.parse(fs.readFileSync(path.join(dir,'inventory.json'),'utf8'));
const checks=JSON.parse(fs.readFileSync(path.join(dir,'PACKAGE-CHECKSUMS.json'),'utf8'));
const zip=fs.readFileSync(path.join(dir,'rn-100-builds-canva-ready.zip'));
const ids=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
check(json.schemaVersion==='1.0.0','inventory schema drift');
check(json.coverDecisionsChanged===false,'package must not change cover decisions');
check(json.counts?.records===100&&json.counts?.officialSourceContext===26&&json.counts?.rnOwned===74,'package counts must be 100 = 26 official + 74 RN-owned');
check(JSON.stringify(json.records?.map(r=>r.buildId))===JSON.stringify(ids),'inventory must be ordered 001-100');
check(new Set(json.records?.map(r=>r.assetUrl)).size===100,'all packaged cover URLs must be unique');
for(const r of json.records||[]){
 check(/^[0-9a-f]{64}$/.test(r.sha256),'invalid checksum '+r.buildId);
 check(r.width===1200&&r.height===1500,'invalid dimensions '+r.buildId);
 check(typeof r.altText==='string'&&r.altText.trim().length>20,'missing alt text '+r.buildId);
 check(typeof r.caption==='string'&&r.caption.trim(),'missing caption '+r.buildId);
 check(typeof r.credit==='string'&&r.credit.trim(),'missing credit '+r.buildId);
 check(typeof r.claimBoundary==='string'&&r.claimBoundary.trim(),'missing claim boundary '+r.buildId);
 check(typeof r.noEndorsement==='string'&&r.noEndorsement.trim(),'missing no-endorsement boundary '+r.buildId);
 check(typeof r.rollbackAssetUrl==='string'&&r.rollbackAssetUrl.startsWith('/'),'missing rollback URL '+r.buildId);
 if(r.coverDecision==='OFFICIAL_SOURCE_CONTEXT'){check(r.status==='LIVE','official packaged cover must be live '+r.buildId);check(/^https:\/\//.test(r.sourceUrl||''),'official source URL missing '+r.buildId);check(typeof r.rightsLine==='string'&&r.rightsLine.trim(),'official rights line missing '+r.buildId)}
 else check(r.coverDecision==='RN_OWNED','unexpected cover decision '+r.buildId);
}
check(checks.packageSha256===sha(zip),'ZIP checksum drift');
check(checks.packageBytes===zip.length,'ZIP byte count drift');
check(checks.archiveEntries===204,'ZIP must contain 100 covers + 100 sidecars + 4 package records');
let p=0,locals=0;const names=[];while(p+4<=zip.length&&zip.readUInt32LE(p)===0x04034b50){const size=zip.readUInt32LE(p+18),nl=zip.readUInt16LE(p+26),xl=zip.readUInt16LE(p+28);const name=zip.subarray(p+30,p+30+nl).toString('utf8');names.push(name);locals++;p+=30+nl+xl+size}
check(locals===checks.archiveEntries,'ZIP local-entry count drift');
check(new Set(names).size===names.length,'ZIP entry names must be unique');
check(names.filter(n=>n.startsWith('covers/')&&n.endsWith('.svg')).length===100,'ZIP must contain 100 SVG covers');
check(names.filter(n=>n.startsWith('metadata/')&&n.endsWith('.json')).length===100,'ZIP must contain 100 metadata sidecars');
for(const required of ['inventory.json','inventory.csv','README.md','SHA256SUMS'])check(names.includes(required),'ZIP missing '+required);
for(const file of ['inventory.json','inventory.csv','README.md','SHA256SUMS','PACKAGE-CHECKSUMS.json','rn-100-builds-canva-ready.zip']){const st=fs.lstatSync(path.join(dir,file));check(st.isFile()&&!st.isSymbolicLink(),'package output must be regular non-symlink '+file)}
if(fail.length){console.error('Canva package validation failed:\n- '+fail.join('\n- '));process.exit(1)}
console.log('PASS: deterministic Canva distribution contains 100 ordered covers (26 official + 74 RN-owned), 100 metadata sidecars, integrity records, import instructions and rollback/source boundaries.');
