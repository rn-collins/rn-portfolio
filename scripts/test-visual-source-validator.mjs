import fs from 'node:fs';import {validate} from './validate-visual-source-packages.mjs';
const data=JSON.parse(fs.readFileSync('docs/builds/visual-source-audit-001-100/packages.json','utf8'));const films=JSON.parse(fs.readFileSync('data/linkedin-film-specs-v1.json','utf8')).builds;const clone=x=>structuredClone(x);
const clean=validate(data,films);if(clean.length)throw new Error('clean ledger failed: '+clean.join(' | '));
const cases=[
 ['cleared null asset',x=>x.records[0].visualCandidateSearch.searched[0].exactAssetUrl=null,'exactAssetUrl must be nonempty'],
 ['cleared null terms',x=>x.records[0].visualCandidateSearch.searched[0].termsUrl=null,'termsUrl must be nonempty'],
 ['cleared unresolved geometry',x=>x.records[0].visualCandidateSearch.searched[0].orientationDimensions={orientation:null,width:null,height:null},'geometry unresolved'],
 ['hold falsely cleared without asset',x=>{const c=x.records[13].visualCandidateSearch.searched[0];c.permissionDecision='CLEARED';c.decision='SELECTED/CLEARED';x.records[13].productionStatus='CURRENT COVER READY / EXTERNAL CANDIDATE CLEARED / NOT YET SUBSTITUTED / CANVA NOT AUTHORIZED';x.acquisitionRange001_034.clearedBuilds.splice(13,0,'014')},'cleared candidate exactAssetUrl must be nonempty'],
 ['hold loses explicit permission decision',x=>x.records[13].visualCandidateSearch.searched[0].permissionDecision='unknown','must explicitly HOLD'],
 ['Canva true',x=>x.records[0].canva.generationAuthorized=true,'Canva must remain false']
];
for(const [name,mutate,needle] of cases){const x=clone(data);mutate(x);const e=validate(x,films);if(!e.some(v=>v.includes(needle)))throw new Error(name+' mutation did not fail: '+e.join(' | '))}
console.log('PASS: clean acquisition ledger plus 6 adversarial rights/asset/Canva mutations.');
