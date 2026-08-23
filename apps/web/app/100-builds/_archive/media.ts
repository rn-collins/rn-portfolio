import manifest from '../../../../../docs/builds/linkedin-media-manifest-v2.json';
import availability from '../../../public/data/linkedin-media-availability-v1.json';
import current from '../../../public/data/linkedin-media-current-v3.json';

export type LinkedInMedia={
  id:string;
  title:string;
  path:string;
  poster:string;
  width:number;
  height:number;
  fps:number;
  durationSeconds:number;
  silentFirst:boolean;
  sha256:string;
  bytes:number;
  generator:string;
  spec:string;
  finalProposition:string;
  captions?:string;
  transcript?:string;
  posterSha256?:string;
  captionsSha256?:string;
  transcriptSha256?:string;
};

export type LinkedInMediaAvailability={
 id:string;
 status:'PUBLISHED'|'NOT_PUBLISHED';
 mp4:string|null;
 poster:string|null;
 reason:string;
};

const availabilityById=new Map(
 (availability.builds as LinkedInMediaAvailability[]).map(item=>[item.id,item])
);
const currentById=new Map((current.builds as Array<{id:string;durationSeconds:number;width:number;height:number;video:{path:string;bytes:number;sha256:string};poster:{path:string;sha256:string};captions:{path:string;sha256:string};transcript:{path:string;sha256:string}}>).map(item=>[item.id,item]));
const publishedById=new Map(
 (manifest.builds as LinkedInMedia[])
  .filter(item=>availabilityById.get(item.id)?.status==='PUBLISHED')
  .map(item=>{const verified=currentById.get(item.id);return [item.id,verified?{...item,path:verified.video.path,poster:verified.poster.path,width:verified.width,height:verified.height,durationSeconds:verified.durationSeconds,bytes:verified.video.bytes,sha256:verified.video.sha256,captions:verified.captions.path,transcript:verified.transcript.path,posterSha256:verified.poster.sha256,captionsSha256:verified.captions.sha256,transcriptSha256:verified.transcript.sha256}:item]})
);

export function getLinkedInMedia(id:string){
 return publishedById.get(id)??null;
}

export function getLinkedInMediaAvailability(id:string){
 return availabilityById.get(id)??null;
}

export const linkedInMedia=[...publishedById.values()];
export const linkedInMediaAvailability=[...availabilityById.values()];
