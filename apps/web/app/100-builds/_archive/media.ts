import manifest from '../../../../../docs/builds/linkedin-media-manifest-v2.json';

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

const byId=new Map((manifest.builds as LinkedInMedia[]).map(item=>[item.id,item]));
export function getLinkedInMedia(id:string){return byId.get(id)??null;}
export const linkedInMedia=[...byId.values()];
