import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

const root = path.resolve('staged-final-linkedin-084-100');
const stories = {
  '084': ['Who created the value—and who gets it?', 'Trace every contribution', 'Name the knowledge source', 'Attach rights and agreements', 'Test who bears the risk', 'Distribute benefits by design'],
  '085': ['Who is shaping this decision?', 'Map money, access and ownership', 'Separate evidence from inference', 'Remove weak links', 'Keep prohibited conclusions visible', 'A power map is not a verdict'],
  '086': ['Use the post as a prototype', 'Publish one clear hypothesis', 'Listen for the audience’s language', 'Record demand and contradiction', 'Change one product assumption', 'Let evidence choose the next test'],
  '087': ['Build your own media system', 'Start with one canonical source', 'Carry rights into every derivative', 'Track claims, versions and approvals', 'Publish for each channel', 'Reuse without losing the lineage'],
  '088': ['Your network is not a contact list', 'Store context, not just names', 'Track reciprocity and open loops', 'Respect permission boundaries', 'Match proof to the introduction', 'Move relationships with care'],
  '089': ['Stop being the only database', 'Externalize decisions and research', 'Connect IP, risk and signals', 'Expose stale or missing evidence', 'Keep the human decision owner', 'Make founder memory inspectable'],
  '090': ['Build agents that show their work', 'Assign distinct research roles', 'Bind every claim to a source', 'Make agents challenge each other', 'Escalate unresolved disagreement', 'Use only the verified answer'],
  '091': ['What may this AI remember?', 'Define a memory space', 'Permit retrieval by context', 'Block unapproved inference paths', 'Make forgetting enforceable', 'Memory is a governed resource'],
  '092': ['The work lives between the tools', 'Turn an event into a workflow', 'Route people, agents and software', 'Retry failures; block unsafe states', 'Escalate exceptions to a human', 'Orchestrate the handoffs, not just apps'],
  '093': ['Compliance happens in motion', 'Attach rules to every state', 'Require evidence before transition', 'Route approvals and deadlines', 'Refuse invalid handoffs', 'Let the rules travel with the work'],
  '094': ['Can you prove how work happened?', 'Bind the rule to its version', 'Record evidence and consent', 'Name each human approval', 'Preserve action and timestamp', 'An audit trail reconstructs the decision'],
  '095': ['Governance reaches the body', 'Rules can shape control and dignity', 'Sensory load changes participation', 'Chronic uncertainty taxes attention', 'Measure conditions without overclaiming', 'Design institutions people can inhabit'],
  '096': ['Experience is more than a label', 'Record product composition', 'Include person, context and time', 'Follow patterns longitudinally', 'Separate observation from causation', 'Learn without flattening the person'],
  '097': ['Personalization you can control', 'Use only consented context', 'Show every adaptive input', 'Explain why the system changed', 'Offer a working off switch', 'Adaptation should remain inspectable'],
  '098': ['Care continues between big moments', 'Prepare with informed consent', 'Coordinate care and education', 'Protect boundaries across referrals', 'Support integration and follow-up', 'Continuity is part of safety'],
  '099': ['Build an island resilience commons', 'Map capacity, assets and dependency', 'Preserve community ownership', 'Carry provenance with every record', 'Govern access before sharing', 'Shared data should strengthen sovereignty'],
  '100': ['Put resilience decisions in the room', 'Choose a plausible island scenario', 'Test dependencies and constraints', 'Compare actions and tradeoffs', 'Record evidence and decision owners', 'Turn the scenario into accountable action'],
};
const desc = {
  '084':'Trace contributions, rights, risk and benefit distribution.', '085':'Map influence without turning evidence into accusation.',
  '086':'Use publishing signals to choose the next product test.', '087':'Coordinate source, rights, versions, channels and reuse.',
  '088':'Track context, reciprocity, permission and open loops.', '089':'Externalize founder knowledge without automating judgment.',
  '090':'Govern discovery, challenge, verification and escalation.', '091':'Control retrieval, inference, sharing and forgetting.',
  '092':'Route events, people, agents, approvals and exceptions.', '093':'Execute regulated work through valid, evidenced states.',
  '094':'Reconstruct the rule, consent, evidence, action and approval.', '095':'Examine how institutional conditions shape lived experience.',
  '096':'Learn patterns across composition, person, context and time.', '097':'Adapt through consented context with explanations and control.',
  '098':'Connect preparation, care, integration, referral and follow-up.', '099':'Share resilience knowledge with provenance and community governance.',
  '100':'Compare island scenarios, tradeoffs, evidence and accountable action.'
};
const palettes = [
  ['#071f1b','#6fffc8','#f6f2e8'],['#171326','#ffcf5c','#f8f4ec'],['#25110d','#ff8066','#fff5eb'],
  ['#081b2c','#6ed7ff','#f7fbff'],['#201224','#f4a9ff','#fff8ff'],['#171b0e','#c9f45b','#fbfff1']
];
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('—','&#8212;');
function wrap(s, max=26) { const w=s.split(/\s+/), lines=[]; let cur=''; for(const x of w){const n=cur?cur+' '+x:x;if(n.length>max&&cur){lines.push(cur);cur=x}else cur=n} if(cur) lines.push(cur); return lines; }
function tspans(lines, x, y, step){return lines.map((l,i)=>`<tspan x="${x}" y="${y+i*step}">${esc(l)}</tspan>`).join('');}
function svg(id, scene, i) {
  const [bg,accent,ink]=palettes[(Number(id)-84)%palettes.length];
  const headline=wrap(scene, 23), body=wrap(i===0?desc[id]:'', 34);
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
    const [bg,accent,ink]=palettes[(Number(id)-84)%palettes.length];
    const head=wrap(s,23).join('\n');
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
