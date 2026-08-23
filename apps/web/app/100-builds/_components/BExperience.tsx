import fs from 'node:fs';
import path from 'node:path';
import type {ReactNode} from 'react';
import MotionStory from './MotionStory';
import s from './b-experience.module.css';

type Scene={eyebrow:string;headline:string;body:string};

function mediaFile(id:string,suffix:string){
 const relative=path.join('media','builds',id,`build-${id}-linkedin${suffix}`);
 const candidates=[path.join(process.cwd(),'public',relative),path.join(process.cwd(),'apps','web','public',relative)];
 const file=candidates.find(candidate=>fs.existsSync(candidate));
 if(!file)throw new Error(`Missing Build ${id} media text: ${suffix}`);
 return fs.readFileSync(file,'utf8').replaceAll('\r\n','\n');
}

function cueScenes(vtt:string):Scene[]{
 return vtt.trim().split(/\n\s*\n/).filter(block=>block&&!block.startsWith('WEBVTT')).map((block,index)=>{
  const text=block.split('\n').filter(line=>line&&!/^\d+$/.test(line)&&!line.includes('-->')).join(' ').trim();
  return {eyebrow:`SCENE ${index+1}`,headline:text,body:''};
 });
}

export default function BExperience({id,children}:{id:string;children:ReactNode}){
 const transcript=mediaFile(id,'-transcript.txt');
 const scenes=cueScenes(mediaFile(id,'-captions.vtt'));
 if(scenes.length!==6)throw new Error(`Build ${id} must have exactly six caption-aligned scenes`);
 const title=transcript.split('\n')[0]?.replace(/^BUILD \d+(?:-B)? — /,'')||`Build ${id}`;
 const root=`/media/builds/${id}/build-${id}-linkedin`;
 return <div className={s.experience}><section className={s.section} aria-labelledby={`watch-${id}`}><p className={s.kicker}>DISTRIBUTABLE SOCIAL ARTIFACT</p><h2 id={`watch-${id}`}>Watch the LinkedIn cut</h2><p>This silent-first 4:5 film is designed for the LinkedIn feed. Its complete argument appears as on-screen text; captions, the visible transcript and the download preserve the same words.</p><video className={s.video} controls playsInline preload="metadata" poster={`${root}-poster.png`} aria-label={`Build ${id}: ${title} — LinkedIn cut`}><source src={`${root}.mp4`} type="video/mp4"/><track kind="captions" src={`${root}-captions.vtt`} srcLang="en" label="English" default/>Your browser cannot play this video.</video><div className={s.actions}><a href={`${root}.mp4`} download>Download LinkedIn MP4</a><a href={`${root}-transcript.txt`} download>Download transcript</a><a href={`${root}-captions.vtt`} download>Download captions</a></div><details className={s.transcript}><summary>Read the transcript</summary><pre style={{whiteSpace:'pre-wrap',font:'inherit'}}>{transcript}</pre></details></section><section className={s.section} aria-labelledby={`motion-${id}`}><p className={s.kicker}>INTERACTIVE MOTION STORY</p><h2 id={`motion-${id}`}>Explore the motion argument</h2><p>The film distributes the idea. This motion story uses the caption track as its source of truth, so every scene preserves the film text while letting you control the pace.</p><MotionStory id={id} title={title} scenes={scenes}/></section><section className={s.bridge} aria-labelledby={`interactive-${id}`}><p className={s.kicker}>RICHER WEB MASTER</p><h2 id={`interactive-${id}`}>Explore the interactive version</h2><p>The LinkedIn cut is the shareable social artifact. The original B build below is the fuller web experience: use its controls, change its state and test the idea for yourself.</p></section>{children}</div>
}