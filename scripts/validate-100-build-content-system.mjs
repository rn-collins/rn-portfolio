import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const map=JSON.parse(await readFile(new URL('content/100-builds/content-opportunity-map.json',root),'utf8'));
const architecture=JSON.parse(await readFile(new URL('content/100-builds/series.json',root),'utf8'));

assert.equal(map.builds.length,100,'content map must contain exactly 100 builds');
assert.equal(new Set(map.builds.map(build=>build.id)).size,100,'build IDs must be unique');
assert.deepEqual(map.builds.map(build=>build.id),Array.from({length:100},(_,index)=>String(index+1).padStart(3,'0')),'build IDs must be complete and ordered');
assert.equal(map.phaseSeries.length,10,'content map must define ten phase series');
assert.equal(architecture.series.length,7,'series architecture must define seven cross-build series');

const validTreatments=new Set(['pilot-now','method-anchor','evidence-sprint','editorial-lab','supporting-module','merged-module','archive-concept']);
const validStandalone=new Set(['yes-now','usually-embedded','compete-after-proof','no-support-only','no-archive-only']);

for(const build of map.builds){
  assert(validTreatments.has(build.treatment),`${build.id}: invalid treatment`);
  assert(validStandalone.has(build.standalone),`${build.id}: invalid standalone status`);
  assert.equal(build.contentAngles.length,5,`${build.id}: expected five content opportunities`);
  assert(build.coreQuestion.trim(),`${build.id}: missing core question`);
  assert(build.doNotForce.trim(),`${build.id}: missing do-not-force boundary`);
  assert(build.releaseTrigger.trim(),`${build.id}: missing release trigger`);
  assert(build.verifiedTechnicalReality.runtime.trim(),`${build.id}: missing verified runtime`);
}

const knownBuilds=new Set(map.builds.map(build=>build.id));
for(const series of architecture.series){
  assert(series.id&&series.title&&series.question&&series.promise,`${series.id||'unknown'}: incomplete series`);
  assert(series.builds.length>0,`${series.id}: empty series`);
  for(const id of series.builds)assert(knownBuilds.has(id),`${series.id}: unknown build ${id}`);
}

const counted=Object.values(map.counts).reduce((sum,count)=>sum+count,0);
assert.equal(counted,100,'treatment counts must reconcile to 100');

console.log(`Content system valid: ${map.builds.length} builds, ${map.phaseSeries.length} phase chapters, ${architecture.series.length} cross-build series.`);
