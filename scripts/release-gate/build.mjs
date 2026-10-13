#!/usr/bin/env node
// Production build for apps/web with the release gate applied (this is `pnpm --filter @rn/web build`, which
// Vercel runs). It fixes the Hawaii date once, builds the static export with that date, removes everything
// that belongs to an unreleased build from apps/web/out, then verifies the result. Any verification failure
// fails the build, so a deploy can never publish a held piece.
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {gateToday,loadReleases,releasedIdSet,repoRoot} from './rules.mjs';
import {prune} from './prune.mjs';
import {verify} from './verify.mjs';

if(process.env.RELEASE_GATE_PREVIEW){
 console.error('release gate: RELEASE_GATE_PREVIEW is for local preview only. Unset it to build the public site.');
 process.exit(1);
}

const appDir=path.join(repoRoot,'apps','web');
const outDir=path.join(appDir,'out');
const today=gateToday();
const releases=loadReleases();
const released=releasedIdSet(releases,today);
console.log(`release gate: ${today} (Pacific/Honolulu): ${released.size} of 100 builds released${released.size?': '+[...released].sort().join(' '):''}`);

const next=path.join(appDir,'node_modules','.bin',process.platform==='win32'?'next.cmd':'next');
const result=spawnSync(next,['build'],{cwd:appDir,stdio:'inherit',env:{...process.env,RELEASE_GATE_TODAY:today}});
if(result.status!==0)process.exit(result.status??1);

const removed=prune(outDir,released);
console.log(`release gate: removed ${removed.files} unreleased files (${removed.routes} page files, ${removed.assets} assets, ${removed.chunks} unreferenced scripts and styles)`);

const problems=verify(outDir,released,releases);
if(problems.length){
 console.error(`release gate: ${problems.length} problem(s) in the static export:`);
 for(const p of problems.slice(0,200))console.error(' - '+p);
 if(problems.length>200)console.error(` - and ${problems.length-200} more`);
 process.exit(1);
}
console.log('release gate: verified. Only released builds are in apps/web/out.');
