import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const bp=JSON.parse(fs.readFileSync(path.join(root,'docs/builds/visual-source-acquisition-001-100/CAROUSEL-PRODUCTION-BLUEPRINTS.json'),'utf8'));
const out=path.join(root,'apps/web/public/100-builds/carousel-slides');
const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
if(bp.records.length!==100||manifest.buildCount!==100||manifest.slideCount!==700||manifest.slides.length!==700)throw new Error('Expected exact 100-build / 700-slide surface');
const seen=new Set();const sums=[];
for(const record of bp.records){const bm=JSON.parse(fs.readFileSync(path.join(out,record.buildId,'manifest.json'),'utf8'));if(bm.slideCount!==7||bm.slides.length!==7)throw new Error('Bad per-build manifest '+record.buildId);
 for(const slide of record.slides){const item=manifest.slides.find(x=>x.buildId===record.buildId&&x.slide===slide.slide);if(!item)throw new Error(`Missing ${record.buildId}/${slide.slide}`);if(seen.has(item.file))throw new Error('Duplicate '+item.file);seen.add(item.file);
  const bytes=fs.readFileSync(path.join(out,item.file));const sha=crypto.createHash('sha256').update(bytes).digest('hex');if(sha!==item.sha256||bytes.length!==item.bytes)throw new Error('Integrity mismatch '+item.file);sums.push(`${sha}  ${item.file}`);
  const svg=bytes.toString('utf8');for(const needle of ['width="1200"','height="1500"','role="img"','aria-labelledby="title desc"','<title id="title">','<desc id="desc">'])if(!svg.includes(needle))throw new Error('Accessibility/dimension invariant '+needle+' '+item.file);
  for(const exact of [slide.headline,slide.claimBoundary]){const escaped=exact.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');if(!svg.includes(escaped)&&!item.altText.includes(exact))throw new Error('Exact canonical copy missing '+item.file)}
  if(/<script|foreignObject|javascript:|(?:href|src)=["']https?:\/\//i.test(svg))throw new Error('Unsafe embedded content '+item.file);
  if(item.visualGuidance!==slide.visualGuidance||item.rights!==slide.rights||item.claimBoundary!==slide.claimBoundary)throw new Error('Metadata drift '+item.file);
 }
}
if(seen.size!==700)throw new Error('Expected exactly 700 unique SVGs');
if(fs.readFileSync(path.join(out,'SHA256SUMS'),'utf8')!==sums.join('\n')+'\n')throw new Error('SHA256SUMS drift');
const allSvg=[];for(const id of fs.readdirSync(out).filter(x=>/^\d{3}$/.test(x)))for(const f of fs.readdirSync(path.join(out,id)).filter(x=>x.endsWith('.svg')))allSvg.push(`${id}/${f}`);if(allSvg.length!==700)throw new Error('Unexpected SVG count '+allSvg.length);
console.log('Carousel slides valid: 100 builds, 700 deterministic accessible 1200x1500 SVGs, exact copy/metadata, hashes, and no embedded third-party content.');
