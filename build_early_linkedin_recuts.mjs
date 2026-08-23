import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = path.resolve('staged-linkedin-recuts-015-018-022');
const bold = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
const regular = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';

const builds = {
  '015': {
    title: 'From Matter Work to Reusable System',
    proposition: 'Productize the reusable structure—not the legal judgment.',
    scenes: [
      ['BUILD 015', 'REPETITION IS A SIGNAL', 'Not permission to automate.'],
      ['OBSERVE', 'FIND THE PATTERN', 'Compare supervised matters.'],
      ['DECOMPOSE', 'MAP THE WORK', 'Inputs. Authority. Decisions. Review.'],
      ['REMOVE', 'STRIP CLIENT-SPECIFIC FACTS', 'Keep evidence rules and controls.'],
      ['ASSEMBLE', 'BUILD THE REUSABLE SYSTEM', 'Name limits, reviewers, and corrections.'],
      ['GOVERN', 'PRODUCTIZE STRUCTURE', 'Judgment stays with authorized humans.'],
    ],
  },
  '016': {
    title: 'The Matter Beneath the Matter',
    proposition: 'A legal task becomes manageable only when its hidden workflow is visible.',
    scenes: [
      ['BUILD 016', '“PREPARE THE ANSWER”', 'That is a request—not a workflow.'],
      ['ACTORS', 'WHO CAN ACT?', 'Name owners, reviewers, and authority.'],
      ['EVIDENCE', 'WHAT SUPPORTS THE ANSWER?', 'Connect documents to sources.'],
      ['CONTROL', 'WHAT CAN STOP THE WORK?', 'Expose deadlines, dependencies, and risk.'],
      ['RECORD', 'WHAT MUST REMAIN?', 'Preserve decisions and review history.'],
      ['MAP IT', 'SEE THE MATTER BENEATH', 'Visible workflows make handoffs governable.'],
    ],
  },
  '017': {
    title: 'The Risk Lives Between the Boxes',
    proposition: 'Control the handoff, not just each organization.',
    scenes: [
      ['BUILD 017', 'BOTH BOXES LOOK CONTROLLED', 'The handoff may not be.'],
      ['WORK', 'WHO OWNS THE TRANSFER?', 'Name responsibility before movement.'],
      ['EVIDENCE', 'WHAT TRAVELS WITH IT?', 'Require proof, not assumptions.'],
      ['PERMISSION', 'DOES CONSENT FOLLOW?', 'Verify scope at every boundary.'],
      ['INCIDENT', 'WHO RESPONDS WHEN IT FAILS?', 'Define escalation and recourse.'],
      ['THE HANDOFF', 'CONTROL THE SPACE BETWEEN', 'Accountability must cross the boundary.'],
    ],
  },
  '018': {
    title: 'The Process Is Part of the Outcome',
    proposition: 'Institutional burden is a design variable, not background noise.',
    scenes: [
      ['BUILD 018', 'ONE REQUEST', 'The experienced path is rarely one step.'],
      ['SUBMIT', 'WHERE DOES IT GO?', 'A process needs a visible owner.'],
      ['WAIT', '96 HOURS', 'Unexplained time becomes uncertainty.'],
      ['REPEAT', 'THREE TIMES', 'Loops transfer institutional work to people.'],
      ['DECIDE', 'ONE NOTICE', 'The outcome cannot erase the burden.'],
      ['REPAIR', 'REDESIGN THE PATH', 'Remove dead ends, loops, and avoidable delay.'],
    ],
  },
  '022': {
    title: 'Human Impact Nodes',
    proposition: 'An AI workflow ends; its consequences keep traveling.',
    scenes: [
      ['BUILD 022', 'THE WORKFLOW ENDS', 'The consequence keeps traveling.'],
      ['APPLICANT', 'WHO RECEIVES THE DECISION?', 'Trace direct effects first.'],
      ['HOUSEHOLD', 'WHO ABSORBS THE AFTERSHOCK?', 'Consequences move beyond the user.'],
      ['WORKER + REVIEWER', 'WHO CARRIES THE BURDEN?', 'Automation redistributes human work.'],
      ['COMMUNITY', 'WHAT SCALES WITH THE SYSTEM?', 'Repeated choices become patterns.'],
      ['CORRECTION PATH', 'WHO CAN REVERSE HARM?', 'Every impact map needs recourse.'],
    ],
  },
};

const palettes = {
  '015':['#071a17','#c5ff52','#f6f2e8'], '016':['#101629','#ffcf66','#f7f4ed'],
  '017':['#1b1015','#ff786b','#fff4ec'], '018':['#111820','#7bdff2','#f6f0e8'],
  '022':['#171126','#d6a8ff','#fff8ee'],
};
function esc(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');}
function wrap(text,max){const out=[];let line='';for(const word of text.split(/\s+/)){const next=line?`${line} ${word}`:word;if(line&&next.length>max){out.push(line);line=word}else line=next}if(line)out.push(line);return out;}
function spans(lines,x,y,size,gap,klass=''){return `<text x="${x}" y="${y}" font-size="${size}" class="${klass}">${lines.map((l,i)=>`<tspan x="${x}" dy="${i?gap:0}">${esc(l)}</tspan>`).join('')}</text>`;}
function ts(sec){return `00:00:${String(sec).padStart(2,'0')}.000`;}
function run(name,args){execFileSync(name,args,{stdio:'pipe'});}

fs.mkdirSync(root,{recursive:true});
const report=[];
for(const [id,b] of Object.entries(builds)){
  const dir=path.join(root,id); fs.mkdirSync(dir,{recursive:true});
  const [bg,accent,ink]=palettes[id];
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
