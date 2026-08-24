import fs from 'node:fs';
const clean=s=>String(s||'').replace(/\s+/g,' ').replace(/\s+([,.;:!?])/g,'$1').replace(/([.!?])\1+/g,'$1').trim();
const isPositive=s=>/\b(SELECTED\/CLEARED|CLEARED|APPROVED|AUTHORIZED)\b/i.test(String(s||''))&&!/\b(not|un|no)\s*[- ]?(cleared|approved|authorized)\b/i.test(String(s||''));
const isHold=s=>/\b(HOLD|REJECT|not[- ]?cleared|not authorized|unresolved)\b/i.test(String(s||''));
export function validate(data,films){
 const errors=[],expected=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0')),sets={template:new Set(),linkedin:new Set(),instagram:new Set(),x:new Set(),carousel:new Set()};let cleared=0,held=0;
 if(data.records?.length!==100)errors.push('Expected exactly 100 records');
 if(JSON.stringify(data.records?.map(r=>r.buildId))!==JSON.stringify(expected))errors.push('IDs must be exactly 001–100');
 for(const r of data.records||[]){
  const film=films.find(f=>f.id===r.buildId);if(!film){errors.push(r.buildId+': missing film spec');continue}
  const headline=clean(film.scenes?.[0]?.headline).replace(/^BUILD \d+\.\s*/i,'');const body=clean(film.scenes?.[0]?.body);const visible=headline+(body?(/[.!?]$/.test(headline)?' ':' — ')+body:'');
  for(const k of ['label','type','relevance','authorizationBoundary'])if(!r.recognizableEntity?.[k]?.trim())errors.push(r.buildId+': entity missing '+k);
  if(r.entityLedHook!==visible)errors.push(r.buildId+': public hook does not equal opening-frame text');
  if(!r.cover?.altText?.includes('Visible text: “'+visible+'”'))errors.push(r.buildId+': alt does not transcribe opening frame');
  for(const k of ['kind','assetUrl','openingFrame','issuerCreator','rightsStatus','licensePermission','credit','orientation','dimensions','cropGuidance','claimToVisualSupport'])if(!r.cover?.[k])errors.push(r.buildId+': cover missing '+k);
  if(r.cover?.rightsStatus!=='creator-owned')errors.push(r.buildId+': live cover must remain creator-owned');
  if(r.cover?.dimensions?.width!==720||r.cover?.dimensions?.height!==900||!/4:5/.test(r.cover?.orientation||''))errors.push(r.buildId+': cover geometry drift');
  if(r.canva?.generationAuthorized!==false)errors.push(r.buildId+': Canva must remain false');
  if(!Array.isArray(r.canva?.slideTypes)||r.canva.slideTypes.length!==6)errors.push(r.buildId+': requires six slide types');
  sets.template.add(r.canva?.template);for(const k of ['linkedin','instagram','x','carousel']){const v=r.platformAdaptations?.[k];if(!v?.includes('Build '+r.buildId))errors.push(r.buildId+': '+k+' is not build-specific');sets[k].add(v)}
  const list=r.visualCandidateSearch?.searched;if(!Array.isArray(list)||!list.length){errors.push(r.buildId+': candidate search log required');continue}
  for(const c of list){
   for(const k of ['candidateType','sourcePageUrl','sourceLocator','issuerCreator','rightsStatement','permissionDecision','credit','cropGuidance','claimToVisualSupport','context','query','result','searchBreadth','nextStep','decision'])if(typeof c[k]!=='string'||!c[k].trim())errors.push(r.buildId+': candidate '+k+' must be nonempty');
   const positive=isPositive(c.permissionDecision)||isPositive(c.decision);
   if(positive){
    cleared++;for(const k of ['exactAssetUrl','assetDate','assetFormat','termsUrl','altText'])if(typeof c[k]!=='string'||!c[k].trim())errors.push(r.buildId+': cleared candidate '+k+' must be nonempty');
    if(!/^https?:\/\//.test(c.exactAssetUrl||'')||!/^https?:\/\//.test(c.termsUrl||''))errors.push(r.buildId+': cleared candidate requires exact asset and terms URLs');
    const g=c.orientationDimensions,finite=Number.isFinite(g?.width)&&Number.isFinite(g?.height),nonintrinsic=/no intrinsic|responsive document/i.test(String(g?.orientation)+' '+String(g?.note));
    if(!g||(!finite&&!nonintrinsic))errors.push(r.buildId+': cleared candidate geometry unresolved');
    if(!/attribution|credit|courtesy|copyright|source:/i.test(c.credit+' '+c.rightsStatement))errors.push(r.buildId+': cleared candidate lacks attribution basis');
    if(!/does not|no endorsement|not prove|does not prove/i.test(c.claimToVisualSupport+' '+r.recognizableEntity.authorizationBoundary))errors.push(r.buildId+': cleared candidate lacks no-endorsement/claim boundary');
    if(r.productionStatus!=='CURRENT COVER READY / EXTERNAL CANDIDATE CLEARED / NOT YET SUBSTITUTED / CANVA NOT AUTHORIZED')errors.push(r.buildId+': cleared candidate status mismatch');
   }else{
    held++;if(!isHold(c.permissionDecision)||!isHold(c.decision))errors.push(r.buildId+': unresolved candidate must explicitly HOLD/REJECT/not-cleared in both decisions');
    if(r.productionStatus!=='CURRENT COVER READY / EXTERNAL VISUAL HOLD / CANVA NOT AUTHORIZED')errors.push(r.buildId+': held candidate status mismatch');
   }
  }
 }
 for(const [k,set] of Object.entries(sets))if(set.size!==100)errors.push(k+': expected 100 build-specific assignments, got '+set.size);
 if(cleared!==30)errors.push('Expected exactly 30 cleared candidates, got '+cleared);
 if(held!==77)errors.push('Expected exactly 77 held candidates, got '+held);
 const clearIds=data.records?.filter(r=>(r.visualCandidateSearch?.searched||[]).some(c=>isPositive(c.permissionDecision)||isPositive(c.decision))).map(r=>r.buildId)||[];
 if(JSON.stringify(clearIds)!==JSON.stringify(data.acquisitionRange001_034?.clearedBuilds||[]))errors.push('Cleared build ledger mismatch');
 if(data.acquisitionRange001_034?.permissionHold!==4)errors.push('Expected four acquisition holds in Builds 001–034');
 return errors;
}
if(process.argv[1]&&import.meta.url===new URL('file:'+process.argv[1]).href){const data=JSON.parse(fs.readFileSync(process.argv[2]??'docs/builds/visual-source-audit-001-100/packages.json','utf8'));const films=JSON.parse(fs.readFileSync(process.argv[3]??'data/linkedin-film-specs-v1.json','utf8')).builds;const errors=validate(data,films);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('PASS: 100 records; 30 exact official candidates cleared but not substituted; 77 candidate checks on HOLD; 100 creator-owned live covers; 0 Canva authorization.')}
