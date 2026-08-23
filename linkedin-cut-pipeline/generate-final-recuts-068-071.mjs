#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const output=path.resolve('linkedin-cut-pipeline/final-creative-recuts');
const builds={
  '068':{title:'From Knowing You to Acting for You',scenes:[
    'BUILD 068. KNOWING YOU IS NOT AUTHORITY TO ACT.',
    'ADD THE RUNTIME: CONTEXT, PLAN, EXPLICIT APPROVAL.',
    'A PROPOSAL IS NOT PERMISSION. PLACE THE GATE BEFORE EVERY TOOL STEP.',
    'MISSING CONTEXT, DENIED APPROVAL, OR OUT-OF-SCOPE TOOLS PRODUCE A VISIBLE STOP.',
    'THIS SIMULATION HAS ZERO SIDE EFFECTS AND USES NO REAL ACCOUNTS OR DATA.',
    'ACTION IS ACCOUNTABLE WHEN SCOPE, APPROVAL, OUTCOME, RECOVERY, AND AUDIT STAY CONNECTED.'
  ]},
  '069':{title:'Enacted Is Not Implemented',scenes:[
    'BUILD 069. ENACTED IS NOT IMPLEMENTED.',
    'MAP RULES, FUNDING, SYSTEMS, WORKFORCE, OWNERS, BLOCKERS, READINESS, AND EVIDENCE.',
    'ENACTED, EFFECTIVE, AND FUNDED ARE DIFFERENT CHECKPOINTS.',
    'MAKE DELIVERY INSPECTABLE: OWNER, BLOCKER, EVIDENCE, AND UNKNOWN STATE.',
    'READINESS IS NOT IMPLEMENTATION. THIS FICTIONAL TRACKER MAKES NO REAL-WORLD CLAIM.',
    'TRACK DELIVERY, NOT CEREMONY. KEEP ENACTMENT, OWNERS, BLOCKERS, AND EVIDENCE CONNECTED.'
  ]},
  '070':{title:'Legalization Is a Lifecycle, Not a Vote',scenes:[
    'BUILD 070. LEGALIZATION IS A LIFECYCLE, NOT A VOTE.',
    'FOLLOW ADVOCACY, ENACTMENT, RULEMAKING, LICENSING, OPERATIONS, LITIGATION, EVALUATION, AND REVISION.',
    'ATTACH SOURCE, STATE, BLOCKER, AND UNKNOWN TO EVERY MILESTONE.',
    'PASSED MEASURES CAN STILL FACE DISPUTED RULES, BLOCKED OPERATIONS, AND LITIGATION.',
    'A LIFECYCLE RECORD IS NOT CURRENT LAW OR PROOF OF IMPLEMENTATION.',
    'FOLLOW THE WHOLE SYSTEM: DELIVERY, EVIDENCE, CONTEST, EVALUATION, AND REVISION.'
  ]},
  '071':{title:'Legal Does Not Mean Accessible',scenes:[
    'BUILD 071. LEGAL DOES NOT MEAN ACCESSIBLE.',
    'ACCESS DEPENDS ON ELIGIBILITY, CLINICIANS, GEOGRAPHY, SUPPLY, COST, AND ACCOMMODATION.',
    'A POLICY RECORD CANNOT REMOVE PRACTICAL BARRIERS OR PROVE ELIGIBILITY.',
    'KEEP DISABILITY, LANGUAGE, DIGITAL ACCESS, CONSENT, AND PRIVACY VISIBLE.',
    'A DASHBOARD IS NOT A CARE OR LEGAL DETERMINATION.',
    'TRACK THE DISTANCE BETWEEN LEGAL AND REACHABLE. KEEP EVERY ACCESS GATE CONNECTED.'
  ]}
};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const words=s=>s.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)||[];
function wrap(s,max=19){const lines=[];let line='';for(const word of s.split(/\s+/)){const next=line?`${line} ${word}`:word;if(next.length>max&&line){lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines}
const stamp=n=>`00:00:${String(n).padStart(2,'0')}.000`;
fs.mkdirSync(output,{recursive:true});
for(const [id,build] of Object.entries(builds)){
  const dir=path.join(output,id);fs.mkdirSync(dir,{recursive:true});const concat=[];
  build.scenes.forEach((scene,i)=>{
    const count=words(scene).length;if(count>15)throw new Error(`${id} scene ${i+1}: ${count} words`);
    const lines=wrap(scene),size=lines.length<=2?48:lines.length===3?43:38,start=185;
    const tspans=lines.map((line,j)=>`<tspan x="52" dy="${j?size+11:0}">${esc(line)}</tspan>`).join('');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900"><rect width="720" height="900" fill="#07161a"/><rect x="52" y="46" width="616" height="5" fill="#65e0c1"/><style>text{fill:#f5f1e8;font-family:'DejaVu Sans'}.b{font-weight:700}.muted{fill:#65e0c1}</style><text x="52" y="100" font-size="22" class="b muted">RN / BUILD ${id}</text><text x="52" y="${start}" font-size="${size}" class="b">${tspans}</text><text x="52" y="796" font-size="17" class="muted">${esc(build.title.toUpperCase())}</text><text x="52" y="844" font-size="18" class="b muted">${String(i+1).padStart(2,'0')} / 06  •  RN BUILDS</text><rect x="52" y="862" width="616" height="3" fill="#65e0c1"/></svg>`;
    const svgFile=path.join(dir,`scene-${i+1}.svg`),pngFile=path.join(dir,`scene-${i+1}.png`);fs.writeFileSync(svgFile,svg);execFileSync('ffmpeg',['-loglevel','error','-y','-i',svgFile,'-frames:v','1',pngFile]);concat.push(`file '${pngFile}'\nduration 5\n`);
  });
  concat.push(`file '${path.join(dir,'scene-6.png')}'\n`);fs.writeFileSync(path.join(dir,'concat.txt'),concat.join(''));
  fs.copyFileSync(path.join(dir,'scene-1.png'),path.join(dir,`build-${id}-linkedin-poster.png`));
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-captions.vtt`),'WEBVTT\n\n'+build.scenes.map((s,i)=>`${i+1}\n${stamp(i*5)} --> ${stamp((i+1)*5)}\n${s}\n`).join('\n'));
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-transcript.txt`),`BUILD ${id}-B — ${build.title}\n\nSilent-first LinkedIn cut transcript\n\n${build.scenes.map((s,i)=>`SCENE ${i+1}\n${s}`).join('\n\n')}\n\nFINAL PROPOSITION\n${build.scenes[5]}\n\nThis film has no spoken audio. All meaning is presented as on-screen text.\n`);
  execFileSync('ffmpeg',['-loglevel','error','-y','-f','concat','-safe','0','-i',path.join(dir,'concat.txt'),'-vf','fps=24,format=yuv420p','-c:v','libx264','-movflags','+faststart',path.join(dir,`build-${id}-linkedin.mp4`)]);
}
console.log(output);
