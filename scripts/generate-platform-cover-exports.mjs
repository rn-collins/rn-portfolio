#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {deflateRawSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=path.join(root,'apps/web/public');
const canvaDir=path.join(publicRoot,'100-builds/canva-package');
const out=path.join(publicRoot,'100-builds/platform-exports');
const requireFromWeb=createRequire(path.join(root,'apps/web/package.json'));
let sharp;
try{sharp=requireFromWeb('sharp')}catch(error){throw new Error('Platform export generation requires the Sharp package installed with Next.js: '+error.message)}
const sha=b=>createHash('sha256').update(b).digest('hex');
const inventory=JSON.parse(fs.readFileSync(path.join(canvaDir,'inventory.json'),'utf8'));
if(inventory.records?.length!==100)throw new Error('Canonical Canva inventory must contain 100 records');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
function crc32(buf){let c=0xffffffff;for(const x of buf){c^=x;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^0xffffffff)>>>0}
function zip(items){const local=[],central=[];let offset=0;for(const item of items){const name=Buffer.from(item.name),raw=item.bytes,data=deflateRawSync(raw,{level:9}),crc=crc32(raw),h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt16LE(0x800,6);h.writeUInt16LE(8,8);h.writeUInt16LE(0,10);h.writeUInt16LE(33,12);h.writeUInt32LE(crc,14);h.writeUInt32LE(data.length,18);h.writeUInt32LE(raw.length,22);h.writeUInt16LE(name.length,26);local.push(h,name,data);const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(8,10);c.writeUInt16LE(0,12);c.writeUInt16LE(33,14);c.writeUInt32LE(crc,16);c.writeUInt32LE(data.length,20);c.writeUInt32LE(raw.length,24);c.writeUInt16LE(name.length,28);c.writeUInt32LE(offset,42);central.push(c,name);offset+=h.length+name.length+data.length}const cs=central.reduce((n,b)=>n+b.length,0),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(items.length,8);end.writeUInt16LE(items.length,10);end.writeUInt32LE(cs,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,...central,end])}
const platforms=[
 {key:'instagram',label:'Instagram portrait',filename:'rn-100-builds-instagram-portrait.zip'},
 {key:'linkedin',label:'LinkedIn portrait',filename:'rn-100-builds-linkedin-portrait.zip'}
];
const records=[],platformEntries=Object.fromEntries(platforms.map(p=>[p.key,[]]));
for(const r of inventory.records){
 const rel=(r.repositoryPath||r.assetUrl).replace(/^apps\/web\/public\//,'').replace(/^\//,'');
 const source=fs.readFileSync(path.join(publicRoot,rel));
 if(sha(source)!==r.sha256)throw new Error('Canonical source checksum mismatch '+r.buildId);
 const png=await sharp(source,{density:96,limitInputPixels:40_000_000}).resize(1200,1500,{fit:'fill'}).png({compressionLevel:9,adaptiveFiltering:false,palette:false,quality:100}).toBuffer();
 const meta={buildId:r.buildId,width:1200,height:1500,mimeType:'image/png',sha256:sha(png),bytes:png.length,sourceSvgSha256:r.sha256,coverDecision:r.coverDecision,altText:r.altText,caption:r.caption,credit:r.credit,sourceUrl:r.sourceUrl,rightsLine:r.rightsLine,claimBoundary:r.claimBoundary,noEndorsement:r.noEndorsement};
 records.push(meta);
 for(const p of platforms)platformEntries[p.key].push({name:`${r.buildId}-cover.png`,bytes:png});
}
const manifest={schemaVersion:'1.0.0',generatedAt:'2026-08-28',deterministic:true,scope:'Builds 001-100 platform-ready portrait exports derived from canonical Canva cover inventory',dimensions:{width:1200,height:1500,aspectRatio:'4:5'},counts:{builds:100,officialSourceContext:26,rnOwned:74},platforms:platforms.map(p=>({key:p.key,label:p.label,dimensions:'1200x1500',bundleUrl:'/100-builds/platform-exports/'+p.filename})),records};
const manifestBytes=Buffer.from(JSON.stringify(manifest,null,2)+'\n');
const cols=['buildId','width','height','mimeType','sha256','bytes','sourceSvgSha256','coverDecision','altText','caption','credit','sourceUrl','rightsLine','claimBoundary','noEndorsement'];
const esc=v=>'"'+String(v??'').replaceAll('"','""').replaceAll(/\r?\n/g,' ')+'"';
const csv=cols.join(',')+'\n'+records.map(r=>cols.map(k=>esc(r[k])).join(',')).join('\n')+'\n';
const credit=Buffer.from('# RN 100 Builds — platform export credits\n\nEach PNG retains the canonical cover decision. Use manifest.json for build-specific alt text, captions, source URLs, rights notices, claim boundaries and no-endorsement language. RN-owned HOLD covers are not documentary evidence. Third-party official/source-context covers require their recorded attribution.\n');
const packageFiles=[{name:'manifest.json',bytes:manifestBytes},{name:'manifest.csv',bytes:Buffer.from(csv)},{name:'CREDITS.md',bytes:credit}];
const bundleChecks={};
for(const p of platforms){const entries=[...platformEntries[p.key],...packageFiles];const sums=Buffer.from(entries.map(e=>sha(e.bytes)+'  '+e.name).join('\n')+'\n');entries.push({name:'SHA256SUMS',bytes:sums});const bytes=zip(entries);fs.writeFileSync(path.join(out,p.filename),bytes);bundleChecks[p.key]={url:'/100-builds/platform-exports/'+p.filename,sha256:sha(bytes),bytes:bytes.length,entries:entries.length,width:1200,height:1500}}
fs.writeFileSync(path.join(out,'manifest.json'),manifestBytes);fs.writeFileSync(path.join(out,'manifest.csv'),csv);
const cards=records.map(r=>`<figure><img loading="lazy" src="../${inventory.records.find(x=>x.buildId===r.buildId).assetUrl.replace(/^\/100-builds\//,'')}" alt="${String(r.altText).replaceAll('&','&amp;').replaceAll('"','&quot;')}"><figcaption><strong>Build ${r.buildId}</strong> — ${String(r.caption).replaceAll('&','&amp;').replaceAll('<','&lt;')}<br><small>${String(r.credit).replaceAll('&','&amp;').replaceAll('<','&lt;')}</small></figcaption></figure>`).join('');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>RN 100 Builds platform export review</title><style>body{font:16px system-ui;margin:2rem;background:#f8fafc;color:#111827}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem}figure{margin:0;background:white;padding:1rem;border:1px solid #cbd5e1;border-radius:.5rem}img{width:100%;height:auto}figcaption{margin-top:.75rem;line-height:1.45}a:focus{outline:3px solid #0ea5e9}</style></head><body><h1>RN 100 Builds — platform export review</h1><p>Accessible contact sheet for 100 canonical 4:5 covers. Download <a href="manifest.json">JSON metadata</a>, <a href="manifest.csv">CSV metadata</a>, <a href="rn-100-builds-instagram-portrait.zip">Instagram PNG bundle</a>, or <a href="rn-100-builds-linkedin-portrait.zip">LinkedIn PNG bundle</a>.</p><main>${cards}</main></body></html>`;
fs.writeFileSync(path.join(out,'review.html'),html);
const checks={schemaVersion:'1.0.0',generatedAt:'2026-08-28',manifestSha256:sha(manifestBytes),reviewSha256:sha(Buffer.from(html)),counts:manifest.counts,bundles:bundleChecks};
fs.writeFileSync(path.join(out,'PACKAGE-CHECKSUMS.json'),JSON.stringify(checks,null,2)+'\n');
console.log('Generated platform exports:',JSON.stringify(bundleChecks));
