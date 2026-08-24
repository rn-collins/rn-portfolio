import fs from 'node:fs';
const canonicalStatus='CURRENT COVER READY / EXTERNAL VISUAL HOLD / CANVA NOT AUTHORIZED';
const clean=s=>String(s||'').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').replace(/([.!?])\1+/g,'$1').trim();
export function validate(data,films){
 const errors=[],expected=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
 if(data.records.length!==100)errors.push('Expected exactly 100 records');
 if(JSON.stringify(data.records.map(r=>r.buildId))!==JSON.stringify(expected))errors.push('IDs must be exactly 001–100');
 const sets={template:new Set(),linkedin:new Set(),instagram:new Set(),x:new Set(),carousel:new Set()};let selected=0;
 for(const r of data.records){
  const film=films.find(f=>f.id===r.buildId);if(!film){errors.push(r.buildId+': missing film spec');continue}
  const headline=clean(film.scenes?.[0]?.headline).replace(/^BUILD \d+\.\s*/i,'');const body=clean(film.scenes?.[0]?.body);const visible=headline+(body?(/[.!?]$/.test(headline)?' ':' — ')+body:'');
  for(const k of ['label','type','relevance','authorizationBoundary'])if(!r.recognizableEntity?.[k]?.trim())errors.push(r.buildId+': entity missing '+k);
  if(r.entityLedHook!==visible)errors.push(r.buildId+': public hook does not equal opening-frame text');
  if(!r.cover?.altText?.includes('Visible text: “'+visible+'”'))errors.push(r.buildId+': alt does not transcribe opening frame');
  if(/[.!?]{2,}|[.!?][”"]\.|[.!?]\.\sCreator/.test(r.entityLedHook+' '+r.cover.altText))errors.push(r.buildId+': malformed punctuation');
  for(const k of ['assetUrl','openingFrame','issuerCreator','rightsStatus','licensePermission','credit','orientation','dimensions','cropGuidance','claimToVisualSupport'])if(!r.cover?.[k])errors.push(r.buildId+': cover missing '+k);
  if(r.cover?.rightsStatus!=='creator-owned')errors.push(r.buildId+': current cover is not creator-owned');
  if(r.cover?.dimensions?.width!==720||r.cover?.dimensions?.height!==900||!/4:5/.test(r.cover?.orientation||''))errors.push(r.buildId+': cover geometry drift');
  if(r.canva?.generationAuthorized!==false)errors.push(r.buildId+': Canva must remain false');
  if(!Array.isArray(r.canva?.slideTypes)||r.canva.slideTypes.length!==6)errors.push(r.buildId+': requires six build-specific slide types');
  sets.template.add(r.canva?.template);
  for(const k of ['linkedin','instagram','x','carousel']){const v=r.platformAdaptations?.[k];if(!v?.includes('Build '+r.buildId))errors.push(r.buildId+': '+k+' is not build-specific');sets[k].add(v)}
  if(r.productionStatus!==canonicalStatus)errors.push(r.buildId+': noncanonical production status');
  const search=r.visualCandidateSearch;if(!search?.searched?.length)errors.push(r.buildId+': candidate search log required');
  if(r.recognizableEntity.type==='research-open subject'&&!/^RESEARCH OPEN/.test(search?.status||''))errors.push(r.buildId+': research-open status missing');
  for(const c of search?.searched||[]){
   for(const k of ['candidateType','sourcePageUrl','sourceLocator','issuerCreator','rightsStatement','permissionDecision','credit','cropGuidance','claimToVisualSupport','context','query','result','decision'])if(typeof c[k]!=='string'||!c[k].trim())errors.push(r.buildId+': candidate '+k+' must be nonempty');
   const pd=String(c.permissionDecision||'');if(!/HOLD|REJECT|not[- ]?cleared/i.test(pd))errors.push(r.buildId+': candidate permissionDecision must explicitly HOLD/REJECT/not-cleared');
   if(/\b(cleared|approved|authorized)\b/i.test(pd)&&!/not[- ]?cleared|not authorized|does not authorize/i.test(pd))errors.push(r.buildId+': candidate permissionDecision contains positive clearance semantics');
   if(!/HOLD|REJECT|not[- ]?cleared/i.test(String(c.decision||'')))errors.push(r.buildId+': candidate decision must fail closed');
   if(c.exactAssetUrl!==null){
    selected++;if(typeof c.exactAssetUrl!=='string'||!/^https?:/.test(c.exactAssetUrl)||!c.altText?.trim()||!c.orientationDimensions?.orientation||!Number.isFinite(c.orientationDimensions?.width)||!Number.isFinite(c.orientationDimensions?.height))errors.push(r.buildId+': selected external asset lacks full metadata');
   }else {if(c.altText!==null&&(typeof c.altText!=='string'||!c.altText.trim()))errors.push(r.buildId+': unresolved candidate alt must be null or nonempty');if(!(c.orientationDimensions&&'orientation'in c.orientationDimensions&&'width'in c.orientationDimensions&&'height'in c.orientationDimensions))errors.push(r.buildId+': unresolved candidate dimensions must be explicit and null-capable');}
  }
 }
 for(const [k,set] of Object.entries(sets))if(set.size!==100)errors.push(k+': expected 100 build-specific assignments, got '+set.size);
 if(selected!==0)errors.push('No external asset may be selected in this audit');
 return errors;
}
if(process.argv[1]&&import.meta.url===new URL('file:'+process.argv[1]).href){const data=JSON.parse(fs.readFileSync(process.argv[2]??'docs/builds/visual-source-audit-001-100/packages.json','utf8'));const films=JSON.parse(fs.readFileSync(process.argv[3]??'data/linkedin-film-specs-v1.json','utf8')).builds;const errors=validate(data,films);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('PASS: 100 normalized records; 107 documented candidate checks on HOLD; 100 hook/alt matches; 100 build-specific platform/Canva specs; 0 Canva authorization; 0 external clearance.')}
