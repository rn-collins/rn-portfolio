import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('..',import.meta.url));
const blueprintPath=path.join(root,'docs/builds/visual-source-acquisition-001-100/CAROUSEL-PRODUCTION-BLUEPRINTS.json');
const outRoot=path.join(root,'apps/web/public/100-builds/carousel-slides');
const stages=['Hook','Problem','System','Evidence','Demo','Implications','CTA + sources'];
const palette=[['#081a2c','#54d6c3','#f7f0df'],['#20152f','#ef7f73','#fff4e8'],['#17251d','#d8bd67','#f4f0e2'],['#262037','#9ca8ff','#fff7df']];

const esc=(s='')=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const wrap=(s,max)=>{const words=String(s).trim().split(/\s+/);const lines=[];let line='';for(const w of words){if((line+' '+w).trim().length>max&&line){lines.push(line);line=w}else line=(line+' '+w).trim()}if(line)lines.push(line);return lines};
const textLines=(lines,x,y,size,dy,weight=500,fill='#fff',max=99)=>lines.slice(0,max).map((l,i)=>`<text x="${x}" y="${y+i*dy}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(l)}</text>`).join('');

function diagram(stage,colors){
 const [bg,accent,paper]=colors;
 if(stage==='Problem')return `<g aria-hidden="true"><path d="M170 710H490L600 820L710 710H1030" fill="none" stroke="${accent}" stroke-width="18"/><circle cx="600" cy="820" r="54" fill="${accent}"/><path d="M575 820h50M600 795v50" stroke="${bg}" stroke-width="12"/></g>`;
 if(stage==='System')return `<g aria-hidden="true">${[200,500,800].map((x,i)=>`<rect x="${x}" y="690" width="200" height="150" rx="28" fill="none" stroke="${accent}" stroke-width="12"/><text x="${x+100}" y="780" text-anchor="middle" font-family="Arial" font-size="32" font-weight="700" fill="${paper}">${['INPUT','DECISION','OUTPUT'][i]}</text>`).join('')}<path d="M400 765h100M700 765h100" stroke="${accent}" stroke-width="12" marker-end="url(#arrow)"/></g>`;
 if(stage==='Evidence')return `<g aria-hidden="true"><rect x="260" y="660" width="680" height="230" rx="30" fill="${paper}"/><path d="M310 730h560M310 785h450M310 840h520" stroke="${bg}" stroke-width="18"/><circle cx="890" cy="840" r="28" fill="${accent}"/></g>`;
 if(stage==='Demo')return `<g aria-hidden="true"><rect x="210" y="650" width="780" height="260" rx="30" fill="none" stroke="${accent}" stroke-width="12"/><rect x="260" y="710" width="210" height="130" rx="18" fill="${accent}"/><path d="M520 735h390M520 790h300M520 845h350" stroke="${paper}" stroke-width="18"/></g>`;
 if(stage==='Implications')return `<g aria-hidden="true"><circle cx="600" cy="770" r="70" fill="${accent}"/>${[[600,620],[790,690],[840,880],[410,690],[360,880]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="28" fill="${paper}"/><path d="M600 770L${x} ${y}" stroke="${accent}" stroke-width="10"/>`).join('')}</g>`;
 if(stage==='CTA + sources')return `<g aria-hidden="true"><rect x="270" y="690" width="660" height="150" rx="75" fill="${accent}"/><path d="M480 765h240M660 705l70 60-70 60" fill="none" stroke="${bg}" stroke-width="16"/></g>`;
 return `<g aria-hidden="true"><circle cx="600" cy="770" r="145" fill="none" stroke="${accent}" stroke-width="18"/><path d="M520 845l160-150M540 680h150v150" fill="none" stroke="${accent}" stroke-width="18"/></g>`;
}

function render(record,slide){
 const n=Number(record.buildId)+slide.slide;const colors=palette[n%palette.length];const [bg,accent,paper]=colors;
 const headline=wrap(slide.headline,31);const boundary=wrap(slide.claimBoundary,72);const credit=wrap(slide.rights,78);
 const alt=`Build ${record.buildId}, ${record.title}. Slide ${slide.slide} of 7, ${slide.stage}. ${slide.headline} Visual: ${slide.visualGuidance} Boundary: ${slide.claimBoundary}`;
 const source=record.coverMapping?.sourceUrl||`/100-builds/${record.buildId}/`;
 return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500" role="img" aria-labelledby="title desc"><title id="title">${esc(`Build ${record.buildId}: ${record.title} — ${slide.stage}`)}</title><desc id="desc">${esc(alt)}</desc><defs><marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0 0l12 6-12 6z" fill="${accent}"/></marker></defs><rect width="1200" height="1500" fill="${bg}"/><rect x="0" y="0" width="1200" height="20" fill="${accent}"/><text x="90" y="105" font-family="Arial,Helvetica,sans-serif" font-size="28" font-weight="700" letter-spacing="3" fill="${accent}">RN BUILDS · ${esc(record.buildId)} · ${esc(slide.stage.toUpperCase())}</text>${textLines(headline,90,205,58,70,800,paper,6)}${diagram(slide.stage,colors)}<rect x="70" y="1010" width="1060" height="2" fill="${accent}" opacity=".65"/><text x="90" y="1070" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="${accent}">BOUNDARY</text>${textLines(boundary,90,1120,25,34,500,paper,4)}<text x="90" y="1280" font-family="Arial,Helvetica,sans-serif" font-size="21" font-weight="700" fill="${accent}">RIGHTS / CREDIT</text>${textLines(credit,90,1325,19,28,500,paper,3)}<text x="90" y="1435" font-family="Arial,Helvetica,sans-serif" font-size="18" fill="${paper}" opacity=".8">${esc(source.slice(0,105))}</text><text x="1110" y="1435" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700" fill="${accent}">${slide.slide}/7</text></svg>\n`;
}

const blueprint=JSON.parse(fs.readFileSync(blueprintPath,'utf8'));
if(blueprint.records?.length!==100||blueprint.expected?.totalSlides!==700)throw new Error('Refusing generation: canonical blueprint is not exactly 100 builds / 700 slides');
fs.rmSync(outRoot,{recursive:true,force:true});fs.mkdirSync(outRoot,{recursive:true});
const global=[];
for(const record of blueprint.records){
 if(!/^\d{3}$/.test(record.buildId)||record.slides?.length!==7)throw new Error('Invalid record '+record.buildId);
 const dir=path.join(outRoot,record.buildId);fs.mkdirSync(dir,{recursive:true});const slides=[];
 for(const [i,slide] of record.slides.entries()){
  if(slide.slide!==i+1||slide.stage!==stages[i])throw new Error(`Invalid slide order ${record.buildId}/${i+1}`);
  for(const k of ['headline','visualGuidance','claimBoundary','accessibility','rights'])if(!slide[k])throw new Error(`Missing ${k} ${record.buildId}/${i+1}`);
  const file=`slide-${String(i+1).padStart(2,'0')}-${slide.stage.toLowerCase().replaceAll(/[^a-z]+/g,'-').replace(/-$/,'')}.svg`;const bytes=Buffer.from(render(record,slide));fs.writeFileSync(path.join(dir,file),bytes);
  const item={buildId:record.buildId,slide:i+1,stage:slide.stage,file:`${record.buildId}/${file}`,sha256:hash(bytes),bytes:bytes.length,width:1200,height:1500,status:record.status,headline:slide.headline,altText:`Build ${record.buildId}, ${record.title}. Slide ${i+1} of 7, ${slide.stage}. ${slide.headline} Visual: ${slide.visualGuidance} Boundary: ${slide.claimBoundary}`,visualGuidance:slide.visualGuidance,claimBoundary:slide.claimBoundary,rights:slide.rights,credit:record.coverMapping?.credit||slide.rights,sourceUrl:record.coverMapping?.sourceUrl||null,liveCoverAsset:record.coverMapping?.assetUrl||null,rollbackAsset:record.coverMapping?.rollbackAssetUrl||null};slides.push(item);global.push(item);
 }
 fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify({schemaVersion:'1.0.0',buildId:record.buildId,title:record.title,status:record.status,slideCount:7,slides},null,2)+'\n');
}
const manifest={schemaVersion:'1.0.0',generatedFrom:'CAROUSEL-PRODUCTION-BLUEPRINTS.json',buildCount:100,slideCount:700,width:1200,height:1500,policy:'Deterministic RN-owned diagrams and typography; approved live cover assets are mapped but not copied or embedded.',slides:global};
fs.writeFileSync(path.join(outRoot,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(outRoot,'SHA256SUMS'),global.map(x=>`${x.sha256}  ${x.file}`).join('\n')+'\n');
fs.writeFileSync(path.join(outRoot,'README.md'),'# RN 100 Builds — 700 carousel slides\n\nDeterministic, accessible 1200×1500 SVG production assets generated from the canonical 100-build blueprint. Each build contains seven ordered slides and a manifest. Third-party imagery is neither copied nor embedded; only approved live-cover mappings and recorded source/rights metadata are retained.\n');
console.log(`Generated ${global.length} accessible SVG slides across ${blueprint.records.length} builds.`);
