#!/usr/bin/env node
import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const repo=path.resolve('.'),out=path.resolve(process.argv[2]||'repo-media-generator/output');fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const run=file=>execFileSync(process.execPath,[path.join(repo,file)],{cwd:repo,stdio:'inherit'});
const copy=(source,ids)=>{for(const id of ids){const src=path.join(repo,source,id),dest=path.join(out,id);fs.mkdirSync(dest,{recursive:true});for(const suffix of ['.mp4','-poster.png','-captions.vtt','-transcript.txt']){const name=`build-${id}-linkedin${suffix}`;fs.copyFileSync(path.join(src,name),path.join(dest,name));}}};
const ids=(a,b)=>Array.from({length:b-a+1},(_,i)=>String(a+i).padStart(3,'0'));

run('build_linkedin_recuts_001_024.mjs');copy('staged-linkedin-recuts-001-014-019-024',[...ids(1,14),...ids(19,24)]);
run('build_early_linkedin_recuts.mjs');copy('staged-linkedin-recuts-015-018-022',[...ids(15,18),'022']); // Explicitly overwrite 022 with the selected Human Impact Nodes recut.
run('build_linkedin_recuts_025_034.mjs');copy('staged-linkedin-recuts-025-034',ids(25,34));
run('generate_035_050.mjs');copy('staged-final-linkedin-035-050',ids(35,50));
run('linkedin-cut-pipeline/generate-final-recuts-051-062.mjs');copy('linkedin-cut-pipeline/final-creative-recuts',ids(51,62));
execFileSync(process.execPath,[path.join(repo,'repo-media-generator/generate-063-067.mjs'),path.join(repo,'repo-media-generator/work/063-067')],{cwd:repo,stdio:'inherit'});copy('repo-media-generator/work/063-067',ids(63,67));
run('linkedin-cut-pipeline/generate-final-recuts-068-071.mjs');copy('linkedin-cut-pipeline/final-creative-recuts',ids(68,71));
run('build_linkedin_recuts_072_083.mjs');copy('staged-linkedin-recuts-072-083',ids(72,83));
run('generate_084_100.mjs');copy('staged-final-linkedin-084-100',ids(84,100));

// Concat demuxing can yield one extra frame. Normalize every public cut to an exact 30.000 seconds.
for(const id of ids(1,100)){const file=path.join(out,id,`build-${id}-linkedin.mp4`),tmp=`${file}.normalized.mp4`;execFileSync('ffmpeg',['-loglevel','error','-y','-i',file,'-map','0:v:0','-an','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-t','30',tmp]);fs.renameSync(tmp,file);}
execFileSync(process.execPath,[path.join(repo,'repo-media-generator/verify.mjs'),out],{cwd:repo,stdio:'inherit'});
