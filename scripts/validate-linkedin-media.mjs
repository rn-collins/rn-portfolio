import { access, readFile } from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('docs/builds/linkedin-media-manifest-v2.json',root),'utf8'));
const availability=JSON.parse(await readFile(new URL('apps/web/public/data/linkedin-media-availability-v1.json',root),'utf8'));
const expectedIds=Array.from({length:100},(_,index)=>String(index+1).padStart(3,'0'));
const records=new Map(availability.builds.map(record=>[record.id,record]));
const media=new Map(manifest.builds.map(record=>[record.id,record]));
const failures=[];

if(records.size!==100)failures.push(`availability inventory must contain 100 unique builds; found ${records.size}`);
for(const id of expectedIds){
 const record=records.get(id);
 if(!record){failures.push(`missing availability record for Build ${id}`);continue}
 const expectedMp4=`/media/builds/${id}/build-${id}-linkedin.mp4`;
 const expectedPoster=`/media/builds/${id}/build-${id}-linkedin-poster.png`;
 const item=media.get(id);
 if(record.status==='PUBLISHED'){
  if(record.mp4!==expectedMp4||record.poster!==expectedPoster)failures.push(`Build ${id} published paths do not match canonical paths`);
  if(!item)failures.push(`Build ${id} is published without production metadata`);
  else if(item.path!==record.mp4||item.poster!==record.poster)failures.push(`Build ${id} availability and production metadata disagree`);
  for(const publicPath of [expectedMp4,expectedPoster]){
   try{await access(new URL(`apps/web/public${publicPath}`,root))}
   catch{failures.push(`Build ${id} claims missing public file ${publicPath}`)}
  }
 }else if(record.status==='NOT_PUBLISHED'){
  if(record.mp4!==null||record.poster!==null)failures.push(`Build ${id} is not published but exposes a media path`);
  try{await access(new URL(`apps/web/public${expectedMp4}`,root));failures.push(`Build ${id} has an MP4 but is marked not published`)}catch{}
 }else failures.push(`Build ${id} has unsupported status ${record.status}`);
}
for(const id of records.keys())if(!expectedIds.includes(id))failures.push(`unexpected availability record ${id}`);
const published=[...records.values()].filter(record=>record.status==='PUBLISHED').length;
if(availability.publishedCount!==published||availability.notPublishedCount!==100-published)failures.push('declared media counts do not match records');

if(failures.length){for(const failure of failures)console.error(failure);process.exit(1)}
const metadataOnly=[...media.keys()].filter(id=>records.get(id)?.status!=='PUBLISHED');
console.log(`media availability ok: ${published} published, ${100-published} not published, ${metadataOnly.length} metadata-only candidates withheld`);
