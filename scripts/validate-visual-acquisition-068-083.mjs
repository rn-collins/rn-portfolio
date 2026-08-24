import fs from 'node:fs';
const p=JSON.parse(fs.readFileSync('docs/builds/visual-source-acquisition-068-083/packages.json','utf8'));
const ids=Array.from({length:16},(_,i)=>String(i+68).padStart(3,'0'));
if(JSON.stringify(p.records.map(r=>r.buildId))!==JSON.stringify(ids)) throw Error('Expected exact 068–083 sequence');
for(const r of p.records){
 if(r.canva.generationAuthorized!==false) throw Error(`${r.buildId}: Canva must be false`);
 if(!r.cover.assetUrl||r.cover.rightsStatus!=='creator-owned') throw Error(`${r.buildId}: fallback invalid`);
 for(const c of r.visualCandidateSearch.searched){
  for(const k of ['sourcePageUrl','sourceLocator','issuerCreator','rightsStatement','permissionDecision','credit','cropGuidance','claimToVisualSupport','decision','nextStep']) if(!c[k]) throw Error(`${r.buildId}: missing ${k}`);
  if(c.exactAssetUrl!==null||!/HOLD|REJECT|NOT CLEARED/.test(c.permissionDecision)) throw Error(`${r.buildId}: unsafe clearance`);
 }
}
console.log(JSON.stringify({records:p.records.length,candidates:p.records.reduce((n,r)=>n+r.visualCandidateSearch.searched.length,0),externalCleared:0,externalHold:16,rnFallbackReady:16,canvaAuthorized:0,status:'PASS'}));
