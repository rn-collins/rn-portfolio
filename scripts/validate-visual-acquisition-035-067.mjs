import fs from 'node:fs';
const file=process.argv[2]??'docs/builds/visual-source-audit-035-067/packages.json';const d=JSON.parse(fs.readFileSync(file,'utf8'));const errors=[];const ids=Array.from({length:33},(_,i)=>String(i+35).padStart(3,'0'));
if(JSON.stringify(d.records.map(r=>r.buildId))!==JSON.stringify(ids))errors.push('IDs must be exactly 035–067');
let candidates=0,selected=0,staged=0;
for(const r of d.records){
 if(r.cover?.rightsStatus!=='creator-owned')errors.push(r.buildId+': current cover must remain creator-owned');
 if(r.canva?.generationAuthorized!==false)errors.push(r.buildId+': Canva must remain unauthorized');
 if(r.productionStatus!=='CURRENT COVER READY / EXTERNAL VISUAL HOLD / CANVA NOT AUTHORIZED')errors.push(r.buildId+': status drift');
 if(r.visualCandidateSearch?.status!=='PRIMARY-SOURCE ACQUISITION REVIEW COMPLETE / 0 EXTERNAL ASSETS SELECTED / FALLBACK READY')errors.push(r.buildId+': acquisition status drift');
 for(const c of r.visualCandidateSearch?.searched||[]){candidates++;
  for(const k of ['sourceContextPage','sourceLocator','issuerCreator','assetDateVersion','rightsTermsUrl','rightsEvidence','permissionDecision','credit','cropGuidance','claimToVisualSupport','entityRelevance','endorsementBoundary','acquisitionStatus','acquisitionCheckedAt','acquisitionBreadth','acquisitionQuery','acquisitionResult','acquisitionNextStep','repositorySuitability','decision'])if(typeof c[k]!=='string'||!c[k].trim())errors.push(r.buildId+': candidate '+k+' missing');
  if(!/^https?:/.test(c.sourceContextPage)||!/^https?:/.test(c.rightsTermsUrl))errors.push(r.buildId+': acquisition URL invalid');
  if(!/HOLD|REJECT|not[- ]?cleared/i.test(c.permissionDecision)||/\b(cleared|approved|authorized)\b/i.test(c.permissionDecision)&&!/not[- ]?cleared|not authorized|no exact asset-level authorization/i.test(c.permissionDecision))errors.push(r.buildId+': permission is not fail-closed');
  if(c.selectedForUse!==false||c.exactAssetUrl!==null){selected++;errors.push(r.buildId+': external asset selected without clearance')}
  if(c.stagedAssetPath!==null||c.provenanceSidecarPath!==null){staged++;errors.push(r.buildId+': unselected external asset staged')}
  if(!Array.isArray(c.acquisitionChecks)||c.acquisitionChecks.length<2)errors.push(r.buildId+': acquisition checks incomplete');
  for(const x of c.acquisitionChecks){for(const k of ['assetKind','issuerCreator','result','decision'])if(typeof x[k]!=='string'||!x[k].trim())errors.push(r.buildId+': acquisition check '+k+' missing');if(!/HOLD|REJECT|Do not/i.test(x.result+' '+x.decision))errors.push(r.buildId+': acquisition check not fail-closed')}
 }
}
const s=d.acquisitionSummary;if(!s||s.builds!==33||s.candidateSourceRecords!==candidates||s.externalAssetsSelected!==0||s.externalAssetsCleared!==0||s.stagedExternalAssets!==0||s.creatorOwnedFallbacksReady!==33)errors.push('summary count mismatch');
if(candidates!==40)errors.push('Expected exactly 40 candidate source records');
if(selected||staged)errors.push('External selection/staging must be zero');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('PASS: 33 builds; 40 primary-source candidate records HOLD/REJECT; 0 external selected/cleared/staged; 33 creator-owned fallbacks ready; Canva disabled.');
