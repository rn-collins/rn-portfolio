import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import earlyBuilds from './linkedin_recuts_072_083_data.mjs';

const root = path.resolve('staged-linkedin-recuts-072-083');
const bold = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
const regular = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';

const oldBuilds = {
  '025': {
    title: 'Readiness Has Layers',
    proposition: 'Readiness is the ability to operate controls—not the desire to deploy.',
    scenes: [
      ['BUILD 025', 'A USE CASE IS NOT A PLAN', 'A demo cannot operate itself.'],
      ['PEOPLE', 'WHO CAN RUN THE CONTROL?', 'Name owners, authority, skill, and time.'],
      ['DATA', 'IS THE EVIDENCE FIT?', 'Test quality, coverage, rights, and limits.'],
      ['WORKFLOW', 'TRACE THE REAL WORK', 'Map review, decisions, and accountable handoffs.'],
      ['CONTROLS', 'CAN THEY STOP FAILURE?', 'Test monitoring, correction, rollback, and exit.'],
      ['READINESS', 'REVEAL EVERY LAYER', 'Desire to deploy proves nothing.'],
    ],
  },
  '026': {
    title: 'Records Normalize Without Losing Their Past',
    proposition: 'Messy data can support decisions only when its limits remain visible.',
    scenes: [
      ['BUILD 026', 'A CLEAN TABLE CAN HIDE', 'Messy history still matters.'],
      ['RAW', 'PRESERVE THE SOURCE', 'Keep collection, time, owner, and permitted use.'],
      ['NORMALIZE', 'STANDARDIZE—DO NOT ERASE', 'Missingness and conflict remain signals.'],
      ['REVIEW', 'ASK WHO IS MISSING', 'Large coverage can still exclude.'],
      ['TRACE', 'MAKE TRANSFORMATIONS REVERSIBLE', 'Every field needs a path home.'],
      ['DECISION FITNESS', 'DO NOT CLEAN AWAY WARNINGS', 'Visible limits make data usable.'],
    ],
  },
  '027': {
    title: 'Ownership Exposure Board',
    proposition: 'Platform reach is rented; your ownership stack must survive the platform.',
    scenes: [
      ['BUILD 027', 'POSTING IS NOT OWNERSHIP', 'Distribution does not equal control.'],
      ['OWN', 'KEEP THE SOURCE FILES', 'Track authorship, licenses, and permissions.'],
      ['OWN', 'BUILD DIRECT AUDIENCE ACCESS', 'Portable, consent-based relationships survive algorithms.'],
      ['OWN', 'KEEP THE CANONICAL COPY', 'Use your domain, archive, exports, and backups.'],
      ['RENT', 'LET PLATFORMS DISTRIBUTE', 'Measure dependency and maintain exits.'],
      ['DEPEND', 'REACH IS NOT CONTROL', 'Your stack must survive the platform.'],
    ],
  },
  '028': {
    title: 'Ranking Rationale',
    proposition: 'Knowledge you cannot reliably find is knowledge you cannot reliably use.',
    scenes: [
      ['BUILD 028', 'STORED IS NOT FOUND', 'Archives fail when retrieval fails.'],
      ['INTENT', 'START WITH THE QUESTION', 'Rank for the real task.'],
      ['STRUCTURE', 'GIVE KNOWLEDGE RELATIONSHIPS', 'Connect provenance, dates, status, and audience.'],
      ['RETRIEVAL', 'BALANCE RELEVANCE + AUTHORITY', 'Similarity alone is insufficient.'],
      ['EVALUATION', 'TEST REAL QUESTIONS', 'Measure misses, false confidence, and corrections.'],
      ['FINDING', 'RELIABLE USE REQUIRES RETRIEVAL', 'The question changes the order.'],
    ],
  },
  '029': {
    title: 'Consequence Propagation',
    proposition: 'A change is not small when its consequences travel beyond its author.',
    scenes: [
      ['BUILD 029', 'CHANGE DOES NOT STAY LOCAL', 'Every edit enters a system.'],
      ['BOUND', 'NAME WHAT CHANGED', 'Record actor, object, purpose, and prior state.'],
      ['TRACE', 'FOLLOW EVERY REGISTERED PATH', 'Map direct and downstream effects.'],
      ['TEST', 'EXPECTED. EDGE. FAILURE. MISUSE.', 'Compare severity, scale, and reversibility.'],
      ['GOVERN', 'OWNER. MONITOR. STOP. REMEDY.', 'Release requires observable controls.'],
      ['CONSEQUENCE', 'FOLLOW IT PAST THE CHANGE', 'Distance can make small edits large.'],
    ],
  },
  '030': {title:'Interface Repair in Motion',proposition:'Accessibility is whether people can complete the work.',scenes:[
    ['BUILD 030','CHECKLISTS ARE NOT EXPERIENCES','Passing rules can still block people.'],
    ['TASK','TEST THE WHOLE JOURNEY','Entry. Action. Feedback. Recovery. Completion.'],
    ['CONDITIONS','CHANGE MORE THAN THE VIEW','Include devices, bandwidth, language, and assistive technology.'],
    ['BARRIER','NAME WHERE WORK BREAKS','Record action, evidence, consequence, owner, and severity.'],
    ['REPAIR','FIX THE SYSTEM','Change structure, language, controls, feedback, timing, and alternatives.'],
    ['RETEST','CAN PEOPLE COMPLETE THE WORK?','Access is the outcome.'],
  ]},
  '031': {title:'Telemetry Privacy Field',proposition:'Privacy is what the product does when nobody reads the policy.',scenes:[
    ['BUILD 031','THE PRODUCT IS WATCHING','Telemetry choices create privacy load.'],
    ['TRACE','FOLLOW DATA END TO END','Collection. Purpose. Storage. Sharing. Deletion.'],
    ['DEFAULTS','WHAT HAPPENS BEFORE CHOICE?','Optional tracking should not quietly activate.'],
    ['COMPARE','PROMISE → CONTROL → RESULT','Does notice match runtime behavior?'],
    ['RECOURSE','ACCESS. CORRECT. WITHDRAW. DELETE.','Every route needs an owner.'],
    ['BEHAVIOR','READ THE PRODUCT ITSELF','The policy is not the system.'],
  ]},
  '032': {title:'Release Blocker Door',proposition:'A release is ready only when controls are operable, evidenced, and owned.',scenes:[
    ['BUILD 032','A SCORE CANNOT AUTHORIZE RELEASE','Evidence must survive operations.'],
    ['BOUND','LOCK VERSION + CONSEQUENCE','Name purpose, people, environment, and unacceptable outcomes.'],
    ['GATES','EVIDENCE. CONTROL. OWNER. AUTHORITY.','Test every required record.'],
    ['FAILURE','EXPECTED. EDGE. MISUSE. OUTAGE.','Use predeclared thresholds and scenarios.'],
    ['DECIDE','HOLD. REMEDIATE. PILOT. RELEASE.','Record conditions, expiry, monitoring, and stops.'],
    ['READINESS','MISSING EVIDENCE BLOCKS THE DOOR','Controls must be operable and owned.'],
  ]},
  '033': {title:'Attack Graph',proposition:'Adversarial testing must make systems safer without making harm easier.',scenes:[
    ['BUILD 033','TEST WITHOUT TEACHING ATTACKS','Expose weakness; withhold harmful instructions.'],
    ['BOUND','ASSET. THREAT. SCOPE. AUTHORITY.','Name owners, limits, and stop conditions.'],
    ['MODEL','PRESSURE CONTROLS—NOT PEOPLE','Use abstract defensive scenarios.'],
    ['CONTAIN','ISOLATE. MINIMIZE. MONITOR. STOP.','Keep live targets outside.'],
    ['DEFEND','DETECT. REPAIR. RETEST. RECORD.','Assign evidence, owner, deadline, and residual risk.'],
    ['SAFETY','MAKE HARM HARDER','That is the test.'],
  ]},
  '034': {title:'Incident Replay Graph',proposition:'An incident closes only when evidence, correction, and prevention are reconstructable.',scenes:[
    ['BUILD 034','FAILURE EXCEEDS THE ERROR','People, workflow, and evidence matter.'],
    ['PRESERVE','FREEZE EVIDENCE FIRST','Keep time, version, actions, owners, and provenance.'],
    ['RECONSTRUCT','FACT ≠ INFERENCE','Trace chronology, dependencies, contradictions, and gaps.'],
    ['RESPOND','NOTICE. STOP. CORRECT. REMEDY.','Contain impact and preserve appeal.'],
    ['PREVENT','CAUSE. CONTROL. OWNER. RETEST.','Verify repair and monitor residual risk.'],
    ['RECOURSE','RECONSTRUCTION MUST LEAD SOMEWHERE','Closed means harm cannot quietly recur.'],
  ]},
};

const builds = earlyBuilds;

const palettes = {
  '025':['#101820','#6fe7d8','#f8f4ea'], '026':['#171713','#f0d06b','#fff9e8'],
  '027':['#101a2b','#80b8ff','#f8f7f0'], '028':['#171128','#d5a3ff','#fff7ed'],
  '029':['#201116','#ff8479','#fff5ec'], '030':['#111b1d','#7de6c1','#f5f2e9'],
  '031':['#15121f','#bd9bff','#fff7ef'], '032':['#1c1610','#ffbe5c','#fff8ed'],
  '033':['#0e1720','#75d7ff','#f5f5ed'], '034':['#201216','#ff8b85','#fff5ed'],
};
const paletteCycle=[['#101820','#6fe7d8','#f8f4ea'],['#171713','#f0d06b','#fff9e8'],['#101a2b','#80b8ff','#f8f7f0'],['#171128','#d5a3ff','#fff7ed'],['#201116','#ff8479','#fff5ec']];
function esc(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
function wrap(text,max){const out=[];let line='';for(const word of text.split(/\s+/)){const next=line?`${line} ${word}`:word;if(line&&next.length>max){out.push(line);line=word}else line=next}if(line)out.push(line);return out;}
function spans(lines,x,y,size,gap,klass=''){return `<text x="${x}" y="${y}" font-size="${size}" class="${klass}">${lines.map((l,i)=>`<tspan x="${x}" dy="${i?gap:0}">${esc(l)}</tspan>`).join('')}</text>`;}
function ts(sec){return `00:00:${String(sec).padStart(2,'0')}.000`;}
function run(name,args){execFileSync(name,args,{stdio:'pipe'});}

fs.mkdirSync(root,{recursive:true});
const report=[];
for(const [buildIndex,[id,b]] of Object.entries(builds).entries()){
  const dir=path.join(root,id); fs.mkdirSync(dir,{recursive:true});
  const [bg,accent,ink]=paletteCycle[buildIndex%paletteCycle.length];
  const clips=[];
  for(let i=0;i<6;i++){
    const [eyebrow,headline,body]=b.scenes[i];
    const heads=wrap(headline,19), bodies=wrap(body,34);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900">
      <rect width="720" height="900" fill="${bg}"/>
      <circle cx="620" cy="110" r="170" fill="${accent}" opacity=".07"/>
      <path d="M52 54 H668" stroke="${accent}" stroke-width="5"/>
      <style>text{fill:${ink};font-family:'DejaVu Sans'} .b{font-weight:700} .a{fill:${accent}}</style>
      ${spans([eyebrow],52,112,22,28,'b a')}
      ${spans(heads,52,226,48,58,'b')}
      ${spans(bodies,52,226+heads.length*58+56,24,35,'')}
      <g transform="translate(52 744)"><rect width="616" height="2" fill="${accent}" opacity=".45"/>${Array.from({length:6},(_,j)=>`<rect x="${j*102.7}" y="0" width="${j===i?102.7:0}" height="5" fill="${accent}"/>`).join('')}</g>
      ${spans([`${String(i+1).padStart(2,'0')} / 06`],52,815,18,22,'b a')}
      ${spans(['RN BUILDS  •  LINKEDIN CUT'],450,815,16,22,'b a')}
      ${spans([b.title.toUpperCase()],52,856,14,18,'b')}
    </svg>`;
    const svgPath=path.join(dir,`scene-${i+1}.svg`), pngPath=path.join(dir,`scene-${i+1}.png`), clip=path.join(dir,`scene-${i+1}.mp4`);
    fs.writeFileSync(svgPath,svg); run('ffmpeg',['-loglevel','error','-y','-i',svgPath,'-frames:v','1',pngPath]);
    const zoom=i%2===0?"min(zoom+0.00018,1.022)":"if(eq(on,0),1.022,max(zoom-0.00018,1.0))";
    run('ffmpeg',['-loglevel','error','-y','-loop','1','-i',pngPath,'-vf',`zoompan=z='${zoom}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=120:s=720x900:fps=24,format=yuv420p`,'-t','5','-an','-c:v','libx264','-profile:v','high','-level','4.0','-crf','18','-movflags','+faststart',clip]);
    clips.push(clip);
  }
  const concat=path.join(dir,'concat.txt'); fs.writeFileSync(concat,clips.map(p=>`file '${p}'`).join('\n')+'\n');
  const mp4=path.join(dir,`build-${id}-linkedin.mp4`);
  run('ffmpeg',['-loglevel','error','-y','-f','concat','-safe','0','-i',concat,'-c','copy','-movflags','+faststart',mp4]);
  fs.copyFileSync(path.join(dir,'scene-1.png'),path.join(dir,`build-${id}-linkedin-poster.png`));
  const captionLines=b.scenes.map(s=>s.join('. ').replace(/([.!?])\./g,'$1'));
  const vtt='WEBVTT\n\n'+captionLines.map((line,i)=>`${i+1}\n${ts(i*5)} --> ${ts((i+1)*5)}\n${line}\n`).join('\n');
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-captions.vtt`),vtt);
  const transcript=`BUILD ${id} — ${b.title}\n\n${b.scenes.map((s,i)=>`SCENE ${i+1}\n${captionLines[i]}`).join('\n\n')}\n\nFINAL PROPOSITION\n${b.proposition}\n`;
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-transcript.txt`),transcript);
  run('ffmpeg',['-loglevel','error','-y',...Array.from({length:6},(_,i)=>['-i',path.join(dir,`scene-${i+1}.png`)]).flat(),'-filter_complex','[0:v][1:v][2:v][3:v][4:v][5:v]xstack=inputs=6:layout=0_0|720_0|1440_0|0_900|720_900|1440_900,scale=1080:900','-frames:v','1',path.join(dir,`build-${id}-contact-sheet.jpg`)]);
  const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=codec_name,pix_fmt,width,height,r_frame_rate','-of','json',mp4],{encoding:'utf8'}));
  run('ffmpeg',['-v','error','-i',mp4,'-f','null','-']);
  run('ffmpeg',['-v','error','-i',path.join(dir,`build-${id}-linkedin-poster.png`),'-frames:v','1','-f','null','-']);
  const mp4Bytes=fs.readFileSync(mp4), moov=mp4Bytes.indexOf(Buffer.from('moov')), mdat=mp4Bytes.indexOf(Buffer.from('mdat'));
  const words=captionLines.map(x=>x.replace(/[“”+—]/g,' ').trim().split(/\s+/).length);
  report.push({build:id,title:b.title,video:probe.format,stream:probe.streams[0],scene_words:words,max_scene_words:Math.max(...words),captions_match_transcript:captionLines.every(x=>transcript.includes(x)),vtt_header:vtt.startsWith('WEBVTT\n\n')?'pass':'fail',poster_decode:'pass',video_decode:'pass',faststart:moov>0&&mdat>0&&moov<mdat?'pass':'fail'});
}
fs.writeFileSync(path.join(root,'validation-report.json'),JSON.stringify({generated:new Date().toISOString(),criteria:{duration_seconds:30,scenes:6,scene_seconds:5,frame:'720x900',codec:'h264',pixel_format:'yuv420p',silent_first:true},builds:report},null,2)+'\n');
const files=[];function walk(d){for(const e of fs.readdirSync(d)){if(e.startsWith('.'))continue;const p=path.join(d,e);if(fs.statSync(p).isDirectory())walk(p);else if(!p.endsWith('SHA256SUMS.txt'))files.push(p)}}walk(root);
fs.writeFileSync(path.join(root,'SHA256SUMS.txt'),files.sort().map(p=>`${crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')}  ${path.relative(root,p)}`).join('\n')+'\n');
console.log(root);
