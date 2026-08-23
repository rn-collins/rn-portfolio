import fs from 'node:fs';
const ids=Array.from({length:33},(_,i)=>String(i+68).padStart(3,'0'));
const late=['071','072','081','092','093','094','095','098','099'];
const retired=['Collaborative Decision Room','verified unmet-need signals','across a real workflow','A live topology','Compliance happens in motion','Prove the Work Was Done the Right Way','Governance reaches the body','Continuity is part of safety','Hāmākua Water Hui','Maui Resilience Table','Molokaʻi Steward Council','Shared data should strengthen sovereignty'];
const overrides=JSON.parse(fs.readFileSync('data/linkedin-experience-overrides-068-100.json','utf8')).builds;
if(Object.keys(overrides).length!==33)throw new Error('Expected 33 experience overrides');
for(const id of ids){
 const item=overrides[id];
 if(!item||item.scenes.length!==6)throw new Error(`Missing six-scene override ${id}`);
 const root=`apps/web/public/media/builds/${id}/build-${id}-linkedin`;
 const transcript=fs.readFileSync(`${root}-transcript.txt`,'utf8');
 const vtt=fs.readFileSync(`${root}-captions.vtt`,'utf8');
 if(item.transcript!==transcript)throw new Error(`Transcript drift ${id}`);
 const cues=vtt.split(/\r?\n/).filter(line=>line&&!/^WEBVTT$|^\d+$|-->/.test(line));
 if(JSON.stringify(cues)!==JSON.stringify(item.scenes.map(x=>x.headline)))throw new Error(`Caption/motion drift ${id}`);
}
const b=fs.readFileSync('apps/web/app/100-builds/_components/BExperience.tsx','utf8');
if(!b.includes('<pre>{override.transcript}</pre>')||!b.includes('scenes={scenes}'))throw new Error('BExperience is not bound to the override source');
const overview=fs.readFileSync('apps/web/app/100-builds/[id]/page.tsx','utf8');
for(const id of late)if(!overview.includes(`'${id}'`))throw new Error(`Missing late evidence state ${id}`);
if(!overview.includes('REMEDIATED PUBLIC CLAIMS · INDEPENDENT POST-FIX REVIEW PENDING'))throw new Error('Missing truthful pending label');
const distribution=['operations/public-launch-system/linkedin-copy-and-order.csv','operations/public-launch-system/publishing-tracker.csv','operations/public-launch-system/release-calendar.md'].map(p=>fs.readFileSync(p,'utf8')).join('\n');
for(const phrase of retired)if(distribution.includes(phrase))throw new Error(`Retired distribution phrase survives: ${phrase}`);
console.log(JSON.stringify({builds:33,transcriptParity:33,captionMotionParity:33,lateEvidenceLabels:9,retiredDistributionPhrases:0},null,2));
