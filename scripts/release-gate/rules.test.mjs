// node --test scripts/release-gate/rules.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {idsInPath,isReleasedRecord,loadReleases,pathIsPublic,releasedIdSet,todayInHawaii} from './rules.mjs';

test('a build is released only on or after its Hawaii date and only when not held',()=>{
 assert.equal(isReleasedRecord({releasedAt:'2026-10-13',hold:false},'2026-10-13'),true);
 assert.equal(isReleasedRecord({releasedAt:'2026-10-14',hold:false},'2026-10-13'),false);
 assert.equal(isReleasedRecord({releasedAt:'2026-10-01',hold:true},'2026-10-13'),false);
 assert.equal(isReleasedRecord({releasedAt:'',hold:false},'2026-10-13'),false);
});

test('today is computed in Pacific/Honolulu',()=>{
 assert.equal(todayInHawaii(new Date('2026-10-13T09:59:00Z')),'2026-10-12');
 assert.equal(todayInHawaii(new Date('2026-10-13T10:00:00Z')),'2026-10-13');
});

test('data/releases.json is valid and holds every build without a verified date',()=>{
 const releases=loadReleases();
 assert.equal(releases.length,100);
 for(const r of releases)if(!r.releasedAt)assert.equal(r.hold,true,`${r.id} has no date and must be held`);
 assert.ok(releasedIdSet(releases,'2026-10-13').size<=100);
});

test('published paths map to the right builds',()=>{
 assert.deepEqual(idsInPath('100-builds/050/a/index.html'),['050']);
 assert.deepEqual(idsInPath('media/builds/007/build-007-linkedin.mp4'),['007']);
 assert.deepEqual(idsInPath('100-builds/rn-cover-exports/009-rn-owned-cover.svg'),['009']);
 assert.deepEqual(idsInPath('100-builds/archive/source/docs/builds/001-003-security-review.md/index.html'),['001','002','003']);
 assert.deepEqual(idsInPath('100-builds/archive/source/docs/100-cycle-master-syllabus.md/index.html'),[]);
 assert.deepEqual(idsInPath('100-builds/index.html'),[]);
});

test('held builds, program files and production packages stay out of the public build',()=>{
 const released=new Set(['001']);
 assert.equal(pathIsPublic('100-builds/001/index.html',released),true);
 assert.equal(pathIsPublic('100-builds/002/index.html',released),false);
 assert.equal(pathIsPublic('100-builds/archive/index.html',released),false);
 assert.equal(pathIsPublic('100-builds/carousel-slides/001/slide-01-hook.svg',released),false);
 assert.equal(pathIsPublic('100-builds/platform-exports/review.html',new Set(Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0')))),false);
 assert.equal(pathIsPublic('index.html',released),true);
});
