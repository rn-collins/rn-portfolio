import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const canonicalPath=root+'/docs/builds/visual-source-acquisition-001-100/CAROUSEL-PRODUCTION-BLUEPRINTS.json';
const publicPath=root+'/apps/web/public/100-builds/carousel-blueprints/CAROUSEL-PRODUCTION-BLUEPRINTS.json';
const readmePath=root+'/apps/web/public/100-builds/carousel-blueprints/README.md';
const canonical=fs.readFileSync(canonicalPath,'utf8');
const published=fs.readFileSync(publicPath,'utf8');
if(canonical!==published)throw new Error('Published carousel blueprint JSON differs from canonical source');
const p=JSON.parse(canonical);
const ids=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
if(p.schemaVersion!=='1.0.0'||p.range!=='001-100')throw new Error('Carousel blueprint schema/range mismatch');
if(p.records.length!==100||p.expected?.totalSlides!==700)throw new Error('Expected 100 records and 700 slides');
if(new Set(p.records.map(r=>r.buildId)).size!==100)throw new Error('Duplicate carousel build IDs');
const stages=['Hook','Problem','System','Evidence','Demo','Implications','CTA + sources'];
for(const id of ids){
 const r=p.records.find(x=>x.buildId===id);
 if(!r)throw new Error('Missing carousel blueprint '+id);
 if(!r.title||!r.coverMapping?.assetUrl||!r.coverMapping?.altText||!r.coverMapping?.credit)throw new Error('Incomplete cover mapping '+id);
 if(r.slides?.length!==7)throw new Error('Build '+id+' must have seven slides');
 r.slides.forEach((s,i)=>{
  if(s.slide!==i+1||s.stage!==stages[i])throw new Error('Bad slide order '+id+' slide '+(i+1));
  for(const key of ['headline','visualGuidance','claimBoundary','accessibility','rights'])if(!s[key])throw new Error('Missing '+key+' '+id+' slide '+(i+1));
 });
 for(const key of ['instagram','linkedin','reelsTikTok','webNewsletter'])if(!r.platformRepurposing?.[key])throw new Error('Missing '+key+' repurposing '+id);
 if(r.finalGates?.length!==9)throw new Error('Expected nine final gates '+id);
}
const readme=fs.readFileSync(readmePath,'utf8');
for(const needle of ['Required slide order','Accessibility','Rights','Claims','Release gate'])if(!readme.includes(needle))throw new Error('Instructions missing '+needle);
console.log('Carousel blueprints valid: 100 records, 700 ordered slides, exact cover mappings, accessibility/rights/claim gates, platform repurposing, and published mirror.');
