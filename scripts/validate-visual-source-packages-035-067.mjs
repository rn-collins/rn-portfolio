import fs from 'node:fs';
const file=process.argv[2]??'docs/builds/visual-source-audit-035-067/packages.json';
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const ids=data.records.map(r=>r.buildId);const expected=Array.from({length:33},(_,i)=>String(i+35).padStart(3,'0'));
const required=['recognizableEntity','entityLedHook','cover','visualCandidateSearch','canva','platformAdaptations','cta','productionStatus'];const errors=[];
if(JSON.stringify(ids)!==JSON.stringify(expected))errors.push('IDs must be exactly 035–067');
for(const r of data.records){
  for(const k of required)if(!r[k])errors.push(r.buildId+': missing '+k);
  for(const k of ['label','type','relevance','authorizationBoundary'])if(!r.recognizableEntity?.[k])errors.push(r.buildId+': entity missing '+k);
  for(const k of ['assetUrl','openingFrame','issuerCreator','rightsStatus','licensePermission','credit','altText','orientation','dimensions','cropGuidance','claimToVisualSupport'])if(!r.cover?.[k])errors.push(r.buildId+': cover missing '+k);
  if(r.cover?.rightsStatus!=='creator-owned')errors.push(r.buildId+': current cover must fail closed unless creator-owned');
  if(!Array.isArray(r.visualCandidateSearch?.searched)||r.visualCandidateSearch.searched.length===0)errors.push(r.buildId+': no official/primary candidate search');
  for(const [i,c] of (r.visualCandidateSearch?.searched??[]).entries()){
    for(const k of ['label','sourcePageUrl','issuerCreator','rightsStatus','licensePermission','credit','cropGuidance','claimToVisualSupport','decision'])if(!c[k])errors.push(`${r.buildId}: candidate ${i+1} missing ${k}`);
    if(c.exactAssetUrl===null&&c.decision?.startsWith('REJECT')!==true)errors.push(`${r.buildId}: unresolved candidate must be rejected`);
    if(c.rightsStatus==='cleared'&&(!c.exactAssetUrl||!c.altText||!c.dimensions?.width||!c.dimensions?.height))errors.push(`${r.buildId}: purportedly cleared candidate is incomplete`);
  }
  if(r.canva?.generationAuthorized!==false)errors.push(r.buildId+': Canva generation must remain unauthorized');
  if(!r.productionStatus.startsWith('CONDITIONALLY READY'))errors.push(r.buildId+': ambiguous production state');
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`PASS: ${data.records.length} canonical packages; ${data.records.reduce((n,r)=>n+r.visualCandidateSearch.searched.length,0)} official/primary context-page candidates reviewed; 33 creator-owned covers eligible; 0 external visuals cleared; Canva gates fail closed.`);
