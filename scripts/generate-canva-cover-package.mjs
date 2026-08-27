#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=path.join(root,'docs/builds/visual-source-acquisition-001-100');
const publicRoot=path.join(root,'apps/web/public');
const out=path.join(publicRoot,'100-builds/canva-package');
const readJson=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
const official=readJson(path.join(docs,'CANVA-READY-OFFICIAL-COVERS.json'));
const rn=readJson(path.join(docs,'RN-OWNED-COVER-EXPORTS.json'));
const officialRecords=official.records.map(r=>({
 buildId:r.buildId,coverDecision:'OFFICIAL_SOURCE_CONTEXT',status:'LIVE',assetUrl:r.exportUrl,
 repositoryPath:r.exportPath,sha256:r.exportSha256,width:r.width,height:r.height,
 altText:r.altText,caption:r.caption,credit:r.credit,sourceUrl:r.sourceUrl,
 claimBoundary:r.claimBoundary,noEndorsement:r.noEndorsement,rightsLine:r.rightsLine,
 rollbackAssetUrl:r.rollbackAssetUrl
}));
const rnRecords=rn.records.map(r=>({
 buildId:r.buildId,coverDecision:'RN_OWNED',status:r.status,assetUrl:r.assetUrl||r.svgUrl||r.exportUrl,
 repositoryPath:r.path||r.svgPath||r.exportPath,sha256:r.sha256,width:r.width,height:r.height,
 altText:r.altText||r.accessibility?.alt||r.description,caption:r.caption||r.claimBoundary,
 credit:r.credit||'Original RN-owned cover',sourceUrl:null,
 claimBoundary:r.claimBoundary||r.rights?.claimBoundary,
 noEndorsement:r.noEndorsement||r.rights?.noEndorsement,
 rightsLine:r.rightsLine||r.rights?.ownership,
 rollbackAssetUrl:r.assetUrl||r.svgUrl||r.exportUrl
}));
const records=[...officialRecords,...rnRecords].sort((a,b)=>a.buildId.localeCompare(b.buildId));
const ids=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
if(records.length!==100||JSON.stringify(records.map(r=>r.buildId))!==JSON.stringify(ids))throw new Error('Canva distribution must contain exactly ordered builds 001-100');
if(officialRecords.length!==26||rnRecords.length!==74)throw new Error('Canva distribution must be 26 official + 74 RN-owned');
fs.mkdirSync(out,{recursive:true});
const normalizePath=p=>p.startsWith('apps/web/public/')?p.slice('apps/web/public/'.length):p.replace(/^\//,'');
const entries=[];
for(const r of records){
 const rel=normalizePath(r.repositoryPath||r.assetUrl);
 const bytes=fs.readFileSync(path.join(publicRoot,rel));
 if(sha(bytes)!==r.sha256)throw new Error('Source checksum mismatch for '+r.buildId);
 const stem=r.buildId+'-'+(r.coverDecision==='OFFICIAL_SOURCE_CONTEXT'?'official':'rn-owned');
 entries.push({name:'covers/'+stem+'.svg',bytes});
 const meta={schemaVersion:'1.0.0',...r,packagePath:'covers/'+stem+'.svg'};
 entries.push({name:'metadata/'+stem+'.json',bytes:Buffer.from(JSON.stringify(meta,null,2)+'\n')});
}
const inventory={schemaVersion:'1.0.0',generatedAt:'2026-08-27',scope:'Builds 001-100 current live-cover distribution for Canva import',counts:{records:100,officialSourceContext:26,rnOwned:74},coverDecisionsChanged:false,importOrder:'ascending buildId 001-100',records};
const inventoryBytes=Buffer.from(JSON.stringify(inventory,null,2)+'\n');
const esc=v=>'"'+String(v??'').replaceAll('"','""').replaceAll(/\r?\n/g,' ')+'"';
const columns=['buildId','coverDecision','status','assetUrl','sha256','width','height','altText','caption','credit','sourceUrl','claimBoundary','noEndorsement','rightsLine','rollbackAssetUrl'];
const csv=columns.join(',')+'\n'+records.map(r=>columns.map(k=>esc(r[k])).join(',')).join('\n')+'\n';
const readme=`# RN 100 Builds — Canva-ready cover distribution

This deterministic package contains the current cover decision for every build, ordered 001–100: 26 official source-context covers and 74 RN-owned covers.

## Import

1. Verify the ZIP SHA-256 in \`PACKAGE-CHECKSUMS.json\`.
2. Extract the archive without renaming files.
3. In Canva, upload the 100 SVG files from \`covers/\` in ascending filename order.
4. Use \`inventory.csv\` for bulk review and each file in \`metadata/\` for alt text, caption, credit, source, claim boundary, rights and rollback data.
5. Do not remove attribution or rights text from official-source covers.
6. Do not treat RN-owned HOLD covers as external evidence.
7. Canva import does not change any canonical selection, HOLD, staging or live-cover decision.

The package is a production handoff, not a new approval surface.
`;
entries.push({name:'inventory.json',bytes:inventoryBytes},{name:'inventory.csv',bytes:Buffer.from(csv)},{name:'README.md',bytes:Buffer.from(readme)});
const sums=entries.map(e=>sha(e.bytes)+'  '+e.name).join('\n')+'\n';
entries.push({name:'SHA256SUMS',bytes:Buffer.from(sums)});
function crc32(buf){let c=0xffffffff;for(const x of buf){c^=x;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return (c^0xffffffff)>>>0}
function zipStore(items){const local=[];const central=[];let offset=0;for(const item of items){const name=Buffer.from(item.name);const data=item.bytes;const crc=crc32(data);const h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt16LE(0x800,6);h.writeUInt16LE(0,8);h.writeUInt16LE(0,10);h.writeUInt16LE(33,12);h.writeUInt32LE(crc,14);h.writeUInt32LE(data.length,18);h.writeUInt32LE(data.length,22);h.writeUInt16LE(name.length,26);local.push(h,name,data);const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(0,10);c.writeUInt16LE(0,12);c.writeUInt16LE(33,14);c.writeUInt32LE(crc,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(name.length,28);c.writeUInt32LE(offset,42);central.push(c,name);offset+=h.length+name.length+data.length}const centralSize=central.reduce((n,b)=>n+b.length,0);const end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(items.length,8);end.writeUInt16LE(items.length,10);end.writeUInt32LE(centralSize,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,...central,end])}
const zip=zipStore(entries);
fs.writeFileSync(path.join(out,'rn-100-builds-canva-ready.zip'),zip);
fs.writeFileSync(path.join(out,'inventory.json'),inventoryBytes);
fs.writeFileSync(path.join(out,'inventory.csv'),csv);
fs.writeFileSync(path.join(out,'README.md'),readme);
fs.writeFileSync(path.join(out,'SHA256SUMS'),sums);
const checks={schemaVersion:'1.0.0',generatedAt:'2026-08-27',packageUrl:'/100-builds/canva-package/rn-100-builds-canva-ready.zip',packageBytes:zip.length,packageSha256:sha(zip),inventorySha256:sha(inventoryBytes),archiveEntries:entries.length,counts:inventory.counts};
fs.writeFileSync(path.join(out,'PACKAGE-CHECKSUMS.json'),JSON.stringify(checks,null,2)+'\n');
console.log(`Generated Canva package: 100 covers, ${entries.length} archive entries, ${zip.length} bytes, SHA-256 ${checks.packageSha256}`);
