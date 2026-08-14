import { readFile, access } from 'node:fs/promises';
const manifest=JSON.parse(await readFile(new URL('../docs/infrastructure-manifest.json',import.meta.url),'utf8'));
const names=new Set();let failures=0;
for(const a of manifest.artifacts){if(names.has(a.name)){console.error(`duplicate infrastructure name: ${a.name}`);failures++}names.add(a.name);try{await access(new URL(`../${a.path}`,import.meta.url))}catch{console.error(`missing infrastructure artifact: ${a.name} -> ${a.path}`);failures++}}
for(const use of manifest.uses){if(!names.has(use.name)){console.error(`unresolved infrastructure use: ${use.name}`);failures++}}
if(failures)process.exit(1);console.log(`lineage ok: ${manifest.artifacts.length} registered artifacts, ${manifest.uses.length} uses`);
