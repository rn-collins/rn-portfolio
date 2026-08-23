import type {ReactNode} from 'react';
import filmSpec from '../../../../../data/linkedin-film-specs-v1.json';
import experienceOverrides from '../../../../../data/linkedin-experience-overrides-068-100.json';
import MotionStory from './MotionStory';
import s from './b-experience.module.css';
type Scene={eyebrow:string;headline:string;body:string};
type Film={id:string;title:string;final:string;scenes:Scene[]};
type ExperienceOverride={id:string;title:string;transcript:string;scenes:Scene[]};

export default function BExperience({id,children}:{id:string;children:ReactNode}){
 const film=(filmSpec.builds as Film[]).find(item=>item.id===id);
 if(!film)throw new Error(`Missing film spec for Build ${id}`);
 const override=(experienceOverrides.builds as Record<string,ExperienceOverride>)[id];
 const title=override?.title??film.title;
 const scenes=override?.scenes??film.scenes;
 const root=`/media/builds/${id}/build-${id}-linkedin`;
 return <div className={s.experience}>
  <section className={s.section} aria-labelledby={`watch-${id}`}>
   <p className={s.kicker}>DISTRIBUTABLE SOCIAL ARTIFACT</p>
   <h2 id={`watch-${id}`}>Watch the LinkedIn cut</h2>
   <p>This silent-first 4:5 film is designed for the LinkedIn feed. Its complete argument appears as on-screen text; captions and the transcript preserve the same words.</p>
   <video className={s.video} controls playsInline preload="metadata" poster={`${root}-poster.png`} aria-label={`Build ${id}: ${title} — LinkedIn cut`}>
    <source src={`${root}.mp4`} type="video/mp4"/>
    <track kind="captions" src={`${root}-captions.vtt`} srcLang="en" label="English" default/>
    Your browser cannot play this video.
   </video>
   <div className={s.actions}><a href={`${root}.mp4`} download>Download LinkedIn MP4</a><a href={`${root}-transcript.txt`} download>Download transcript</a><a href={`${root}-captions.vtt`} download>Download captions</a></div>
   <details className={s.transcript}><summary>Read the transcript</summary>{override?<pre>{override.transcript}</pre>:<><ol>{film.scenes.map((scene,index)=><li key={index}><strong>{scene.eyebrow}: {scene.headline}</strong><p>{scene.body}</p></li>)}</ol><p><strong>Final proposition:</strong> {film.final}</p></>}</details>
  </section>
  <section className={s.section} aria-labelledby={`motion-${id}`}><p className={s.kicker}>INTERACTIVE MOTION STORY</p><h2 id={`motion-${id}`}>Explore the motion argument</h2><p>The film distributes the idea. This motion story lets you pause, move between scenes and inspect the exact same six-scene argument at your own pace.</p><MotionStory id={id} title={title} scenes={scenes}/></section>
  <section className={s.bridge} aria-labelledby={`interactive-${id}`}><p className={s.kicker}>RICHER WEB MASTER</p><h2 id={`interactive-${id}`}>Explore the interactive version</h2><p>The LinkedIn cut is the shareable social artifact. The original B build below is the fuller web experience: use its controls, change its state and test the idea for yourself.</p></section>
  {children}
 </div>
}