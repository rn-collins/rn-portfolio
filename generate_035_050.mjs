import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const root = path.resolve('staged-final-linkedin-035-050');
const stories = {
  '035': ['An export button is not an exit', 'Map everything that must leave', 'Preserve provenance and consent history', 'Test readability in another system', 'Protect exclusions and sensitive data', 'Portability means usable independence'],
  '036': ['Offline is a product state', 'Name the essential work', 'Cache only minimum trusted data', 'Queue actions with visible status', 'Resolve conflicts during recovery', 'Design disconnection before it happens'],
  '037': ['Feedback is a signal, not a command', 'Capture purpose, consent and context', 'Separate identity from sensitive detail', 'Classify correction, need or preference', 'Test impact before changing product', 'Govern the route from signal to change'],
  '038': ['A benchmark is not performance', 'Name the domain decision', 'Lock model, version and conditions', 'Test failures that matter here', 'Include people and workflow consequences', 'Bound exactly what the score proves'],
  '039': ['A trace is evidence, not truth', 'Bound the agent session', 'Log tools, data and approvals', 'Reconstruct sequence and state', 'Separate observation from intent', 'Escalate gaps before judging the outcome'],
  '040': ['Confidence is not permission', 'Declare consequence and evidence thresholds', 'Stop when required controls fail', 'Escalate uncertainty to a human', 'Record the reason and fallback', 'Govern when AI must not continue'],
  '041': ['AI work needs an owner', 'Map tool, vendor and workflow', 'Name the accountable role', 'Attach approval and review dates', 'Expose fragmented responsibility', 'Ownership must follow every decision'],
  '042': ['A prompt is not a job description', 'Define purpose, input and output', 'Limit tools and authority', 'Name prohibited actions', 'Assign owner and review gate', 'Give the AI a bounded job'],
  '043': ['More agents create more handoffs', 'Give each role one bounded job', 'Define evidence contracts between agents', 'Preserve context across transfers', 'Own coordination failures', 'Design the team, not just agents'],
  '044': ['Requirements are not copy-paste blocks', 'Bind each component to authority', 'Carry purpose, evidence and owner', 'Version rules by effective date', 'Block reuse outside valid context', 'Reuse structure without losing regulation'],
  '045': ['Availability is not access', 'Trace learning, eligibility and cost', 'Map travel, supply and support', 'Expose privacy and language barriers', 'Test continuity after entry', 'Design cannabis care around the journey'],
  '046': ['Essential systems cross the shore', 'Map source, route and service', 'Connect local assets and operators', 'Test inventory and alternatives', 'Reveal geographic choke points', 'Resilience starts with dependencies'],
  '047': ['A good idea is not context-free', 'Define the intervention and outcome', 'Compare people, place and authority', 'Test workforce and infrastructure', 'Preserve nonnegotiable limits', 'Adapt the model before importing it'],
  '048': ['The rule and journey differ', 'Map authority, steps and evidence', 'Locate discretion and notice', 'Count time, cost and exposure', 'Preserve challenge and recourse routes', 'Judge policy through lived navigation'],
  '049': ['A preference is not permanent', 'Collect only chosen private context', 'Name purpose, source and expiry', 'Include setting, goal and energy', 'Offer correction, deletion and export', 'Personalization should remain revisable'],
  '050': ['A room is not neutral', 'Read light, sound and layout', 'Include task, timing and control', 'Compare different people and goals', 'Keep uncertainty visible', 'Design space from lived response'],
};
const desc = {
  '035':'Test whether exported data creates usable independence.', '036':'Keep essential work safe through disconnection and recovery.',
  '037':'Turn feedback into governed evidence for change.', '038':'Evaluate AI inside the domain and decision that matter.',
  '039':'Inspect agent activity without overstating what logs prove.', '040':'Stop or escalate when consequence outruns evidence.',
  '041':'Connect every AI decision to accountable ownership.', '042':'Define purpose, authority, tools and human review.',
  '043':'Coordinate specialized agents without losing context or ownership.', '044':'Reuse regulated structure while preserving legal context.',
  '045':'Reveal barriers across the full cannabis care journey.', '046':'Trace island systems through local and external dependencies.',
  '047':'Test whether an intervention fits a different place.', '048':'Compare formal policy with the burden of navigating it.',
  '049':'Build private personalization that can change with context.', '050':'Examine how environmental conditions shape different experiences.'
};
const palettes = [
  ['#071f1b','#6fffc8','#f6f2e8'],['#171326','#ffcf5c','#f8f4ec'],['#25110d','#ff8066','#fff5eb'],
  ['#081b2c','#6ed7ff','#f7fbff'],['#201224','#f4a9ff','#fff8ff'],['#171b0e','#c9f45b','#fbfff1']
];
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('—','&#8212;');
function wrap(s, max=26) { const w=s.split(/\s+/), lines=[]; let cur=''; for(const x of w){const n=cur?cur+' '+x:x;if(n.length>max&&cur){lines.push(cur);cur=x}else cur=n} if(cur) lines.push(cur); return lines; }
function tspans(lines, x, y, step){return lines.map((l,i)=>`<tspan x="${x}" y="${y+i*step}">${esc(l)}</tspan>`).join('');}
function svg(id, scene, i) {
  const [bg,accent,ink]=palettes[(Number(id)-35)%palettes.length];
  const headline=wrap(scene, 18), body=wrap(i===0?desc[id]:'', 34);
  const hy=300-(headline.length-1)*28;
  const nodes=[0,1,2,3,4,5].map((_,j)=>`<circle cx="${95+j*106}" cy="690" r="${j===i?18:8}" fill="${j<=i?accent:'#52605c'}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900">
  <rect width="720" height="900" fill="${bg}"/><path d="M-80 130 L800 40 M-70 820 L790 730" stroke="${accent}" stroke-opacity=".16" stroke-width="90"/>
  <text x="64" y="82" fill="${accent}" font-family="DejaVu Sans" font-size="20" font-weight="700" letter-spacing="3">RN BUILDS / ${id}-B</text>
  <text x="64" y="142" fill="${ink}" fill-opacity=".65" font-family="DejaVu Sans" font-size="17" font-weight="700" letter-spacing="2">SCENE ${i+1} OF 6</text>
  <text fill="${ink}" font-family="DejaVu Sans" font-size="48" font-weight="700">${tspans(headline,64,hy,58)}</text>
  <rect x="64" y="${hy+headline.length*58+24}" width="76" height="6" rx="3" fill="${accent}"/>
  <text fill="${ink}" fill-opacity=".82" font-family="DejaVu Sans" font-size="24">${tspans(body,64,hy+headline.length*58+82,34)}</text>
  <line x1="95" y1="690" x2="625" y2="690" stroke="${ink}" stroke-opacity=".22" stroke-width="2"/>${nodes}
  <text x="64" y="820" fill="${ink}" font-family="DejaVu Sans" font-size="18" font-weight="700">WATCH THE CUT. EXPLORE THE INTERACTIVE.</text>
  <text x="64" y="853" fill="${accent}" font-family="DejaVu Sans" font-size="16">rn-portfolio-khaki.vercel.app/100-builds/${id}/b/</text></svg>`;
}
function ts(t){const s=String(t%60).padStart(2,'0'); return `00:00:${s}.000`;}
const punct = s => /[?!\.]$/.test(s) ? s : `${s}.`;
fs.mkdirSync(root,{recursive:true});
for (const [id, scenes] of Object.entries(stories)) {
  const dir=path.join(root,id); fs.mkdirSync(dir,{recursive:true});
  scenes.forEach((s,i)=>{
    fs.writeFileSync(path.join(dir,`scene-${i+1}.svg`),svg(id,s,i));
    const [bg,accent,ink]=palettes[(Number(id)-35)%palettes.length];
    const head=wrap(s,18).join('\n');
    const body=wrap(i===0?desc[id]:'',34).join('\n');
    execFileSync('convert',['-size','720x900',`xc:${bg}`,
      '-fill',accent,'-font','DejaVu-Sans-Bold','-pointsize','20','-annotate','+64+82',`RN BUILDS / ${id}-B`,
      '-fill',ink,'-font','DejaVu-Sans-Bold','-pointsize','17','-annotate','+64+142',`SCENE ${i+1} OF 6`,
      '-fill',ink,'-font','DejaVu-Sans-Bold','-pointsize','48','-interline-spacing','8','-annotate','+64+300',head,
      '-fill',accent,'-draw','rectangle 64,540 140,546',
      '-fill',ink,'-font','DejaVu-Sans','-pointsize','24','-interline-spacing','8','-annotate','+64+610',body,
      '-fill',ink,'-font','DejaVu-Sans-Bold','-pointsize','18','-annotate','+64+820','WATCH THE CUT. EXPLORE THE INTERACTIVE.',
      '-fill',accent,'-font','DejaVu-Sans','-pointsize','16','-annotate','+64+853',`rn-portfolio-khaki.vercel.app/100-builds/${id}/b/`,
      path.join(dir,`scene-${i+1}.png`)]);
  });
  fs.copyFileSync(path.join(dir,'scene-1.png'),path.join(dir,`build-${id}-linkedin-poster.png`));
  const concat=scenes.map((_,i)=>`file 'scene-${i+1}.png'\nduration 5`).join('\n')+`\nfile 'scene-6.png'\n`;
  fs.writeFileSync(path.join(dir,'concat.txt'),concat);
  execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i','concat.txt','-vf','fps=30,format=yuv420p','-c:v','libx264','-profile:v','high','-level','4.0','-movflags','+faststart','-t','30',`build-${id}-linkedin.mp4`],{cwd:dir});
  const cue=scenes.map((s,i)=>`${i+1}\n${ts(i*5)} --> ${ts((i+1)*5)}\n${punct(s)} ${i===0?desc[id]:''}`.trim()).join('\n\n');
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-captions.vtt`),`WEBVTT\n\n${cue}\n`);
  fs.writeFileSync(path.join(dir,`build-${id}-linkedin-transcript.txt`),`BUILD ${id}-B — ${scenes[0]}\n\n${scenes.map((s,i)=>`${i+1}. ${punct(s)}${i===0?' '+desc[id]:''}`).join('\n')}\n`);
  execFileSync('convert',['scene-1.png','scene-2.png','scene-3.png','+append','(', 'scene-4.png','scene-5.png','scene-6.png','+append',')','-append','-resize','1080x1350',`build-${id}-contact-sheet.jpg`],{cwd:dir});
}
const hashes=[];
for(const id of Object.keys(stories)) for(const f of fs.readdirSync(path.join(root,id)).filter(x=>/\.(mp4|png|vtt|txt|jpg)$/.test(x))){const p=path.join(root,id,f);hashes.push(`${crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')}  ${id}/${f}`)}
fs.writeFileSync(path.join(root,'SHA256SUMS.txt'),hashes.join('\n')+'\n');
