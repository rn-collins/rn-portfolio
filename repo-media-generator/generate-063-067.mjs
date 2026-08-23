#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const output=path.resolve(process.argv[2]||'repo-media-generator/work/063-067');
const builds={
  '063':{title:'Research That Does Not Die in a Folder',scenes:[
    'BUILD 063. RESEARCH THAT DOES NOT DIE IN A FOLDER.',
    'WHAT CHANGED, AND WHY? KEEP SOURCES AND CLAIMS CONNECTED.',
    'NOT A FOLDER. CONNECT QUESTION, EVIDENCE, GAPS, AND OUTPUTS.',
    'EVERY UPDATE PRESERVES THE TRAIL.',
    'THE RESEARCH KEEPS MOVING. ADD A SOURCE. REVISE A CLAIM.',
    'RESOLVE A GAP. KEEP THE RESEARCH USABLE.'
  ]},
  '064':{title:'An Industry With Amnesia',scenes:[
    'BUILD 064. WHEN PEOPLE LEAVE, WHAT DOES THE INSTITUTION REMEMBER?',
    'KNOWLEDGE HELD BY ONE PERSON OR AN INBOX IS AT RISK.',
    'MEMORY NEEDS STRUCTURE: RECORD, CONTEXT, SOURCE, AND CHANGE.',
    'NO PERSONAL RECORDS. NO INVENTED CERTAINTY.',
    'MAKE THE TRAIL. CAPTURE THE DECISION. CONNECT ITS CONTEXT.',
    'CHANGE EXPLAINED. THE MEMORY SURVIVES TURNOVER.'
  ]},
  '065':{title:'Continuity Beyond the Session',scenes:[
    'BUILD 065. ONE SESSION IS NOT THE SYSTEM.',
    'CONNECT PREPARATION, SESSION, FOLLOW-UP, REFERRALS, AND ACCOUNTABLE HANDOFFS.',
    'SHOW WHO OWNS THE NEXT STEP, ITS DEADLINE, AND ACCEPTANCE.',
    'KEEP UNACCEPTED, WITHDRAWN, AND OVERDUE STATES DISTINCT.',
    'A PATHWAY CANNOT DIAGNOSE, TREAT, TRIAGE, OR PROVIDE EMERGENCY RESPONSE.',
    'CARE CONTINUES WHEN OWNERSHIP, PERMISSION, EVIDENCE, AND RECOURSE STAY VISIBLE.'
  ]},
  '066':{title:'The Firm Knows More Than Its Folders',scenes:[
    'BUILD 066. THE FIRM KNOWS MORE THAN ITS FOLDERS.',
    'CONNECT MATTERS, AUTHORITIES, ARGUMENTS, DOCUMENTS, OUTCOMES, WORKFLOWS, AND LESSONS.',
    'LINK EACH OBJECT TO SOURCE, ACCESS, REVIEW STATE, AND CONTEXT.',
    'UNVERIFIED, RESTRICTED, CONTESTED, AND UNREVIEWED ARE DIFFERENT STATES.',
    'SEARCH DOES NOT ESTABLISH CURRENT LAW, PRIVILEGE, RELEVANCE, OR REUSE PERMISSION.',
    'LEGAL MEMORY WORKS WHEN RELATIONSHIPS AND LIMITS STAY VISIBLE.'
  ]},
  '067':{title:'A Digital Twin Begins With Gaps',scenes:[
    'BUILD 067. A DIGITAL TWIN BEGINS WITH GAPS.',
    'KEEP KNOWLEDGE, PREFERENCES, ROLES, PERMISSIONS, SOURCES, AND USE LIMITS DISTINCT.',
    'DECLARED IS NOT INFERRED. SIMILARITY IS NOT AUTHORITY.',
    'WITHHELD, EXPIRED, UNDECLARED, AND BLOCKED REMAIN VALID STATES.',
    'NEVER INVENT PERMISSION, OWNERSHIP, PERSONAL TRAITS, MOTIVES, OR DIAGNOSES.',
    'A PERSONAL MODEL WORKS WHEN UNKNOWN REMAINS VISIBLE.'
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
    if(words(scene).length>15)throw new Error(`${id} scene ${i+1} exceeds 15 words`);
    const lines=wrap(scene),size=lines.length<=2?48:lines.length===3?43:38;
    const tspans=lines.map((line,j)=>`<tspan x="52" dy="${j?size+11:0}">${esc(line)}</tspan>`).join('');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900"><rect width="720" height="900" fill="#07161a"/><rect x="52" y="46" width="616" height="5" fill="#65e0c1"/><style>text{fill:#f5f1e8;font-family:'DejaVu Sans'}.b{font-weight:700}.m{fill:#65e0c1}</style><text x="52" y="100" font-size="22" class="b m">RN / BUILD ${id}</text><text x="52" y="185" font-size="${size}" class="b">${tspans}</text><text x="52" y="796" font-size="17" class="m">${esc(build.title.toUpperCase())}</text><text x="52" y="844" font-size="18" class="b m">${i+1} / 06 • RN BUILDS</text></svg>`;
    const svgFile=path.join(dir,`scene-${i+1}.svg`),pngFile=path.join(dir,`scene-${i+1}.png`);fs.writeFileSync(svgFile,svg);execFileSync('ffmpeg',['-loglevel','error','-y','-i',svgFile,'-frames:v','1',pngFile]);concat.push(`file '${pngFile}'\nduration 5\n`);
  });
  concat.push(`file '${path.join(dir,'scene-6.png')}'\n`);fs.writeFileSync(path.join(dir,'concat.txt'),concat.join(''));
  fs.copyFileSync(path.join(dir,'scene-1.png'),path.join(dir,`build-${id}-linkedin-poster.png`));
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-captions.vtt`),'WEBVTT\n\n'+build.scenes.map((s,i)=>`${i+1}\n${stamp(i*5)} --> ${stamp((i+1)*5)}\n${s}\n`).join('\n'));
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-transcript.txt`),`BUILD ${id}-B — ${build.title}\n\nSilent-first LinkedIn cut transcript\n\n${build.scenes.map((s,i)=>`SCENE ${i+1}\n${s}`).join('\n\n')}\n\nFINAL PROPOSITION\n${build.scenes[5]}\n\nThis film has no spoken audio. All meaning is presented as on-screen text.\n`);
  execFileSync('ffmpeg',['-loglevel','error','-y','-f','concat','-safe','0','-i',path.join(dir,'concat.txt'),'-vf','fps=24,format=yuv420p','-c:v','libx264','-movflags','+faststart','-t','30',path.join(dir,`build-${id}-linkedin.mp4`)]);
}

