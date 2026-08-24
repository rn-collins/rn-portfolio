import fs from 'node:fs';
const path='docs/builds/visual-source-acquisition-001-100/packages.json';
const p=JSON.parse(fs.readFileSync(path,'utf8'));
function validate(p){
 const ids=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
 if(JSON.stringify(p.records.map(r=>r.buildId))!==JSON.stringify(ids))throw Error('range loss/order');
 const n=x=>p.records.filter(x).length;
 const got={clear:n(r=>r.acquisitionDisposition==='CLEARED-NOT-SUBSTITUTED'),hold:n(r=>r.acquisitionDisposition==='HOLD'),fallback:n(r=>r.rnFallbackReady===true),selected:n(r=>r.externalSelected===true),staged:n(r=>r.externalStaged===true),canva:n(r=>r.canva?.generationAuthorized===true)};
 if(JSON.stringify(got)!==JSON.stringify({clear:24,hold:76,fallback:100,selected:0,staged:0,canva:0}))throw Error('estate counts '+JSON.stringify(got));
 for(const r of p.records){if(!r.dispositionBasis)throw Error(r.buildId+': no basis');if(r.acquisitionDisposition==='HOLD'){const s=r.visualCandidateSearch?.searched||[];if(!s.length||!s.some(c=>c.nextStep||c.acquisitionNextStep))throw Error(r.buildId+': HOLD lacks next route');}if(JSON.stringify(r).match(/"selectedForUse":\s*true|"stagedAssetPath":\s*"|"provenanceSidecarPath":\s*"/))throw Error(r.buildId+': hidden selection/staging');}
 return got;
}
const got=validate(p);
const mutations=[q=>{q.records[0].externalSelected=true},q=>{q.records[1].externalStaged=true},q=>{q.records[2].canva.generationAuthorized=true},q=>{q.records.pop()},q=>{q.records.find(r=>r.acquisitionDisposition==='HOLD').visualCandidateSearch.searched=[]}];
for(const mutate of mutations){const q=structuredClone(p);mutate(q);let failed=false;try{validate(q)}catch{failed=true}if(!failed)throw Error('mutation escaped');}
console.log(JSON.stringify({...got,mutationsRejected:mutations.length,status:'PASS'}));
