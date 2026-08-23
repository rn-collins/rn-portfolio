#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const mediaRoots=[path.join(root,'public','media'),path.join(root,'apps','web','public','media')];
const media=(id,suffix)=>{
  for(const dir of mediaRoots){const file=path.join(dir,`build-${id}-linkedin${suffix}`);if(fs.existsSync(file))return file;}
  throw new Error(`Missing ${id}${suffix}`);
};
const cues=text=>text.replace(/\r/g,'').trim().split(/\n\n+/).filter(b=>b&&!b.startsWith('WEBVTT')).map(b=>b.split('\n').slice(2).join('\n').trim()).filter(Boolean);
for(let n=1;n<=100;n++){
 const id=String(n).padStart(3,'0');
 const transcript=fs.readFileSync(media(id,'-transcript.txt'),'utf8').replace(/\r\n/g,'\n').trim();
 const vtt=fs.readFileSync(media(id,'-captions.vtt'),'utf8').replace(/\r\n/g,'\n');
 if(!transcript)throw new Error(`Empty transcript ${id}`);
 const scenes=cues(vtt);
 if(scenes.length!==6)throw new Error(`Expected six VTT scenes for ${id}; found ${scenes.length}`);
 for(const scene of scenes)if(!transcript.includes(scene))throw new Error(`Transcript/VTT divergence ${id}: ${scene}`);
 for(const suffix of ['.mp4','-poster.png'])media(id,suffix);
}
const component=fs.readFileSync(path.join(root,'apps','web','app','100-builds','_components','BExperience.tsx'),'utf8');
for(const marker of ["fs.readFileSync","<pre","{transcript}","cueScenes(vtt)","scenes.length!==6"])if(!component.includes(marker))throw new Error(`BExperience missing ${marker}`);
if(component.includes('linkedin-experience-overrides'))throw new Error('Retired override architecture remains');
console.log('PASS: 100 transcripts, 600 VTT scenes, 200 binary assets, one fail-closed rendering contract.');
