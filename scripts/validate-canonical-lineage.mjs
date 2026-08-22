import { readFile } from 'node:fs/promises';

const path=new URL('../data/canonical-100-lineage-v1.json',import.meta.url);
const document=JSON.parse(await readFile(path,'utf8'));
const builds=document?.builds;
const expectedIds=Array.from({length:100},(_,index)=>String(index+1).padStart(3,'0'));
const failures=[];

if(!builds||typeof builds!=='object'||Array.isArray(builds)){
 failures.push('canonical lineage must expose a builds object');
}else{
 const ids=Object.keys(builds);
 if(ids.length!==100)failures.push(`canonical lineage must contain exactly 100 builds; found ${ids.length}`);
 for(const id of expectedIds){
  const edge=builds[id];
  if(!edge){failures.push(`missing canonical build ${id}`);continue}
  if(!Array.isArray(edge.uses)||!Array.isArray(edge.creates)){failures.push(`build ${id} must define uses[] and creates[]`);continue}
  if(new Set(edge.uses).size!==edge.uses.length)failures.push(`build ${id} has duplicate uses`);
  if(new Set(edge.creates).size!==edge.creates.length)failures.push(`build ${id} has duplicate creates`);
  for(const dependency of edge.uses){
   if(!expectedIds.includes(dependency))failures.push(`build ${id} references unknown dependency ${dependency}`);
   else if(Number(dependency)>=Number(id))failures.push(`build ${id} has non-earlier dependency ${dependency}`);
  }
 }
 for(const id of ids)if(!expectedIds.includes(id))failures.push(`unexpected canonical build ${id}`);
}

if(failures.length){
 for(const failure of failures)console.error(failure);
 process.exit(1);
}
const useCount=expectedIds.reduce((count,id)=>count+builds[id].uses.length,0);
console.log(`canonical lineage ok: 100 builds, ${useCount} earlier-build dependencies`);
