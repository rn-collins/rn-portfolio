// The link set every released build carries: its posts, its source page, its long-form record,
// its gallery page, the gallery index, and the previous and next released builds.
// No hooks and no gate import, so server pages and the client A/B wrapper can both render it.
import type {PieceLinkSet} from './gate';
import s from './piece-links.module.css';

function postLabel(url:string){
 try{
  const host=new URL(url).hostname.replace(/^www\./,'');
  if(host.endsWith('linkedin.com'))return 'Post on LinkedIn';
  if(host==='x.com'||host.endsWith('twitter.com'))return 'Post on X';
  if(host.endsWith('instagram.com'))return 'Post on Instagram';
  if(host.endsWith('threads.net')||host.endsWith('threads.com'))return 'Post on Threads';
  return 'Post on '+host;
 }catch{return 'Post'}
}

export default function PieceLinks({links,current}:{links:PieceLinkSet;current?:'gallery'|'record'|'a'|'b'|'archive'}){
 return <nav className={s.links} aria-label={`Build ${links.id} links`}>
  <span className={s.heading}>BUILD {links.id} LINKS</span>
  <ul>
   {links.postUrls.map(url=><li key={url}><a href={url} rel="noreferrer">{postLabel(url)}</a></li>)}
   {links.sourcePageUrl&&<li><a href={links.sourcePageUrl}>Source page</a></li>}
   {current!=='record'&&<li><a href={links.longFormUrl}>Long-form record</a></li>}
   {current!=='gallery'&&<li><a href={links.galleryPage}>Gallery page for Build {links.id}</a></li>}
   <li><a href={links.galleryIndex}>All released builds</a></li>
   {links.previous&&<li><a href={`/100-builds/${links.previous.id}/`} rel="prev">Previous: Build {links.previous.id}, {links.previous.title}</a></li>}
   {links.next&&<li><a href={`/100-builds/${links.next.id}/`} rel="next">Next: Build {links.next.id}, {links.next.title}</a></li>}
  </ul>
 </nav>;
}
