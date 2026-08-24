import fs from 'node:fs';
const packageFile=process.argv[2]??'docs/builds/visual-source-audit-001-100/packages.json';
const filmFile=process.argv[3]??'data/linkedin-film-specs-v1.json';
const data=JSON.parse(fs.readFileSync(packageFile,'utf8'));
const films=JSON.parse(fs.readFileSync(filmFile,'utf8')).builds;
const expected=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
const canonicalStatus='CURRENT COVER READY / EXTERNAL VISUAL HOLD / CANVA NOT AUTHORIZED';
const clean=s=>String(s||'').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').replace(/([.!?])\1+/g,'$1').trim();
const errors=[];
if(data.records.length!==100)errors.push('Expected exactly 100 records');
if(JSON.stringify(data.records.map(r=>r.buildId))!==JSON.stringify(expected))errors.push('IDs must be exactly 001–100');
const templates=new Set(),linkedin=new Set(),instagram=new Set(),x=new Set(),carousel=new Set();
for(const r of data.records){
 const film=films.find(f=>f.id===r.buildId);if(!film){errors.push(r.buildId+': missing film spec');continue}
 const headline=clean(film.scenes?.[0]?.headline).replace(/^BUILD \d+\.\s*/i,'');
 const body=clean(film.scenes?.[0]?.body);const visible=clean([headline,body].filter(Boolean).join('. '));
 for(const k of ['label','type','relevance','authorizationBoundary'])if(!r.recognizableEntity?.[k]?.trim())errors.push(r.buildId+': entity missing '+k);
 if(clean(r.entityLedHook)!==visible)errors.push(r.buildId+': public hook does not equal opening-frame text');
 if(!r.cover?.altText?.includes('Visible text: “'+visible.replace(/[.?!]+$/,'')+'”'))errors.push(r.buildId+': alt does not transcribe opening frame');
 for(const k of ['assetUrl','openingFrame','issuerCreator','rightsStatus','licensePermission','credit','orientation','dimensions','cropGuidance','claimToVisualSupport'])if(!r.cover?.[k])errors.push(r.buildId+': cover missing '+k);
 if(r.cover?.rightsStatus!=='creator-owned')errors.push(r.buildId+': current cover is not creator-owned');
 if(r.cover?.dimensions?.width!==720||r.cover?.dimensions?.height!==900||!/4:5/.test(r.cover?.orientation||''))errors.push(r.buildId+': cover geometry drift');
 if(r.canva?.generationAuthorized!==false)errors.push(r.buildId+': Canva must remain false');
 if(!Array.isArray(r.canva?.slideTypes)||r.canva.slideTypes.length!==6)errors.push(r.buildId+': requires six build-specific slide types');
 templates.add(r.canva?.template);for(const [k,set] of [['linkedin',linkedin],['instagram',instagram],['x',x],['carousel',carousel]]){if(!r.platformAdaptations?.[k]?.includes('Build '+r.buildId))errors.push(r.buildId+': '+k+' is not build-specific');set.add(r.platformAdaptations?.[k])}
 if(r.productionStatus!==canonicalStatus)errors.push(r.buildId+': noncanonical production status');
 const search=r.visualCandidateSearch;if(!search)errors.push(r.buildId+': missing search');
 if((search?.searched||[]).length===0){if(r.recognizableEntity?.type!=='research-open subject'||!/^RESEARCH OPEN/.test(search?.status||''))errors.push(r.buildId+': empty search must be explicit research-open')}
 else if(search?.status!=='CONTEXT SOURCE FOUND / EXTERNAL ASSET HOLD')errors.push(r.buildId+': sourced context must use canonical HOLD status');
 for(const c of search?.searched||[]){
  for(const k of ['candidateType','sourcePageUrl','sourceLocator','exactAssetUrl','issuerCreator','rightsStatement','permissionDecision','credit','altText','orientationDimensions','cropGuidance','claimToVisualSupport','decision'])if(!(k in c))errors.push(r.buildId+': candidate missing '+k);
  if(c.exactAssetUrl!==null)errors.push(r.buildId+': external asset unexpectedly selected');
  if(!/HOLD|REJECT|not cleared/i.test(String(c.decision)))errors.push(r.buildId+': candidate does not fail closed');
 }
 if(/[.!?]{2,}|[.!?][”"]\./.test(r.entityLedHook+' '+r.cover.altText))errors.push(r.buildId+': malformed punctuation');
}
for(const [label,set] of [['template',templates],['linkedin',linkedin],['instagram',instagram],['x',x],['carousel',carousel]])if(set.size!==100)errors.push(label+': expected 100 build-specific assignments, got '+set.size);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PASS: 100 normalized records; 100 hook/alt opening-frame matches; 37 explicit research-open; 70 context candidates on HOLD; 100 creator-owned covers; 100 build-specific platform/Canva specs; 0 Canva authorization; 0 external clearance.');
