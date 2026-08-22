import manifest from '../../../../../docs/builds/linkedin-media-manifest-v2.json';
import availability from '../../../public/data/linkedin-media-availability-v1.json';

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
const publishedById=new Map(
 (manifest.builds as LinkedInMedia[])
  .filter(item=>availabilityById.get(item.id)?.status==='PUBLISHED')
  .map(item=>[item.id,item])
);

export function getLinkedInMedia(id:string){
 return publishedById.get(id)??null;
}

export function getLinkedInMediaAvailability(id:string){
 return availabilityById.get(id)??null;
}

export const linkedInMedia=[...publishedById.values()];
export const linkedInMediaAvailability=[...availabilityById.values()];
