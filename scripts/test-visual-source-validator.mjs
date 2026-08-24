import fs from 'node:fs';import {validate} from './validate-visual-source-packages.mjs';
const data=JSON.parse(fs.readFileSync('docs/builds/visual-source-audit-001-100/packages.json','utf8'));const films=JSON.parse(fs.readFileSync('data/linkedin-film-specs-v1.json','utf8')).builds;
const cases=[
 ['null sourcePageUrl',c=>c.sourcePageUrl=null,'sourcePageUrl must be nonempty'],
 ['null rightsStatement',c=>c.rightsStatement=null,'rightsStatement must be nonempty'],
 ['null permissionDecision',c=>c.permissionDecision=null,'permissionDecision must be nonempty'],
 ['null credit',c=>c.credit=null,'credit must be nonempty'],
 ['positive cleared permission',c=>c.permissionDecision='cleared','permissionDecision must explicitly HOLD/REJECT/not-cleared']
];
for(const [name,mutate,needle] of cases){const x=structuredClone(data);mutate(x.records[0].visualCandidateSearch.searched[0]);const e=validate(x,films);if(!e.some(v=>v.includes(needle)))throw new Error(name+' mutation did not fail as expected: '+e.join(' | '));}
{const x=structuredClone(data);x.records[0].canva.generationAuthorized=true;const e=validate(x,films);if(!e.some(v=>v.includes('Canva must remain false')))throw new Error('Canva mutation did not fail');}
console.log('PASS: 6 negative mutations rejected: null source, rights, permission, credit; positive cleared permission; Canva authorization.');
