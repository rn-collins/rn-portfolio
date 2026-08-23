#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const specPath=path.join(root,'data/linkedin-film-specs-v1.json');
const spec=JSON.parse(fs.readFileSync(specPath,'utf8'));
const ids=Array.from({length:33},(_,i)=>String(i+35).padStart(3,'0'));

function parseTranscript(text,id){
  const title=text.match(/^BUILD \d+-B — (.+)$/m)?.[1]??`Build ${id}`;
  const numbered=[...text.matchAll(/^\d+\.\s+(.+)$/gm)].map(m=>m[1].trim());
  const scenes=numbered.length===6?numbered:[...text.matchAll(/^SCENE \d+\n([\s\S]*?)(?=\n\nSCENE \d+|\n\nFINAL PROPOSITION|\n*$)/gm)].map(m=>m[1].replace(/\s+/g,' ').trim());
  if(scenes.length!==6)throw new Error(`Build ${id}: expected 6 transcript scenes, found ${scenes.length}`);
  return {title,scenes};
}

for(const id of ids){
  const transcriptPath=path.join(root,'apps/web/public/media/builds',id,`build-${id}-linkedin-transcript.txt`);
  const {title,scenes}=parseTranscript(fs.readFileSync(transcriptPath,'utf8'),id);
  const film=spec.builds.find(item=>item.id===id);
  if(!film)throw new Error(`Build ${id}: film spec missing`);
  film.title=title;
  film.scenes=scenes.map(headline=>({eyebrow:'',headline,body:''}));
  film.final=scenes[5];
}
fs.writeFileSync(specPath,JSON.stringify(spec,null,2)+'\n');
console.log(`Aligned ${ids.length} film specifications to downloadable transcripts.`);
