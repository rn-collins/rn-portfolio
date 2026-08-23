import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const spec=JSON.parse(fs.readFileSync('remediation-copy-050-052-065.json','utf8')).builds;
const out=path.resolve('claim-remediation-050-052-065-media');
const colors={
  '050':['#071f1b','#6fffc8','#f6f2e8'],
  '051':['#171326','#ffcf5c','#f8f4ec'],
  '052':['#25110d','#ff8066','#fff5eb'],
  '065':['#081b2c','#6ed7ff','#f7fbff']
};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function wrap(text,max){const lines=[];let line='';for(const word of text.split(/\s+/)){const next=line?`${line} ${word}`:word;if(next.length>max&&line){lines.push(line);line=word}else line=next}if(line)lines.push(line);return lines}
function draw(id,scene,index,file){const [bg,accent,ink]=colors[id],head=wrap(scene.heading,21).join('\n'),body=wrap(scene.body,42).join('\n');execFileSync('convert',['-size','720x900',`xc:${bg}`,'-fill',accent,'-font','DejaVu-Sans-Bold','-pointsize','20','-annotate','+64+82',`RN BUILDS / ${id}-B`,'-fill',ink,'-font','DejaVu-Sans','-pointsize','17','-annotate','+64+140',`SCENE ${index+1} OF 6 · SYNTHETIC DEMONSTRATION`,'-fill',ink,'-font','DejaVu-Sans-Bold','-pointsize','39','-interline-spacing','6','-annotate','+64+286',head,'-fill',ink,'-font','DejaVu-Sans','-pointsize','24','-interline-spacing','8','-annotate','+64+470',body,'-fill',ink,'-font','DejaVu-Sans-Bold','-pointsize','18','-annotate','+64+820','WATCH THE CUT. EXPLORE THE INTERACTIVE.','-fill',accent,'-font','DejaVu-Sans','-pointsize','16','-annotate','+64+853',`rn-portfolio-khaki.vercel.app/100-builds/${id}/b/`,file])}
const stamp=s=>`00:00:${String(s).padStart(2,'0')}.000`;
fs.mkdirSync(out,{recursive:true});
for(const id of ['050','051','052','065']){const dir=path.join(out,id);fs.mkdirSync(dir,{recursive:true});const scenes=spec[id].filmAndMotionScenes;for(let i=0;i<6;i++)draw(id,scenes[i],i,path.join(dir,`scene-${i+1}.png`));fs.copyFileSync(path.join(dir,'scene-1.png'),path.join(dir,`build-${id}-linkedin-poster.png`));fs.writeFileSync(path.join(dir,'concat.txt'),scenes.map((_,i)=>`file 'scene-${i+1}.png'\nduration 5`).join('\n')+"\nfile 'scene-6.png'\n");execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i','concat.txt','-vf','fps=30,format=yuv420p','-c:v','libx264','-profile:v','high','-level','4.0','-movflags','+faststart','-t','30',`build-${id}-linkedin.mp4`],{cwd:dir});const lines=scenes.map(x=>`${x.heading}. ${x.body}`);fs.writeFileSync(path.join(dir,`build-${id}-linkedin-captions.vtt`),`WEBVTT\n\n${lines.map((x,i)=>`${i+1}\n${stamp(i*5)} --> ${stamp((i+1)*5)}\n${x}`).join('\n\n')}\n`);fs.writeFileSync(path.join(dir,`build-${id}-linkedin-transcript.txt`),`BUILD ${id}-B — ${spec[id].title}\n\n${lines.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\nLIMITATION\n${spec[id].b.footer}\n`);execFileSync('convert',['scene-1.png','scene-2.png','scene-3.png','+append','(','scene-4.png','scene-5.png','scene-6.png','+append',')','-append','-resize','1080x1350',`build-${id}-linkedin-contact-sheet.png`],{cwd:dir})}
