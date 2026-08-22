import fs from 'node:fs';
import path from 'node:path';

const [rawId,...titleParts]=process.argv.slice(2);
const id=String(rawId??'').padStart(3,'0');
const title=titleParts.join(' ').trim();
if(!/^\d{3}$/.test(id)||Number(id)<1||Number(id)>100||!title){
  console.error('Usage: pnpm scaffold:archive <001-100> "Build title"');
  process.exit(1);
}
const root=process.cwd();
const docsDir=path.join(root,'docs','builds',id);
const recordPath=path.join(docsDir,'ARCHIVE.md');
const dataPath=path.join(root,'data',`build-${id}-archive-v1.json`);
for(const target of [recordPath,dataPath]){
  if(fs.existsSync(target)){
    console.error(`Refusing to overwrite existing archive record: ${path.relative(root,target)}`);
    process.exit(1);
  }
}
fs.mkdirSync(docsDir,{recursive:true});
fs.mkdirSync(path.dirname(dataPath),{recursive:true});
const created=new Date().toISOString().slice(0,10);
const record=`# Build ${id} — ${title} — Complete Archive Record

Status: WORKING RECORD / must be completed before release
Created: ${created}

## Chat-independence rule
No material research, decision, artifact, audit result, media output, limitation, or forward dependency may exist only in chat, temporary runtime storage, or an unlinked scratch file.

## 01 / Question + problem
- Public question:
- Job to be done:
- Thesis:
- Intended user value:

## 02 / Research + evidence
- Source families:
- Primary-source/provenance record:
- Evidence status and freshness:
- Source-vs-heuristic boundaries:
- Research gaps:

## 03 / Created
- A-Web:
- B-Web:
- B-LinkedIn:
- Exports/data:
- Reusable infrastructure:

## 04 / Architecture + decisions
- Technological-ceiling survey:
- Architecture decisions:
- Product/design decisions:
- Rejected approaches:
- Deferred approaches:
- Non-claims:

## 05 / Audit + release
- Acceptance matrix:
- Adversarial fixtures:
- Browser/device evidence:
- Accessibility:
- Privacy/security:
- Resilience/performance:
- Exact certified SHA + CI run:

## 06 / Media
- Spec:
- Generator:
- MP4:
- Poster:
- Dimensions / fps / runtime:
- SHA-256 / bytes:
- Final proposition:
- Download routes:

## 07 / Canonical source inventory
- Implementation:
- Research/evidence:
- Tests:
- Release records:
- Media records:

## 08 / Lineage
- Concrete infrastructure inherited:
- Import/schema/service/test evidence:
- Infrastructure created:
- Later dependents:

## 09 / Plans + open threads
- Consequential remaining work:
- Future dependencies:

## 10 / Limits
- What this build cannot claim:
- What remains manual:
- Evidence/capability required to strengthen it:

## Release closure
- [ ] Public archive route exists
- [ ] Full approved retained records are allowlisted and readable
- [ ] A-Web, B-Web, and B-LinkedIn are durably retrievable
- [ ] Media spec, generator, output, poster, checksum, and QA are retained
- [ ] Canonical source inventory is current
- [ ] Lineage validator passes
- [ ] Chromium + WebKit + 320px tests pass
- [ ] Exact-head certification is recorded
`;
fs.writeFileSync(recordPath,record);
fs.writeFileSync(dataPath,JSON.stringify({
  schemaVersion:'1.0',
  buildId:id,
  title,
  status:'working-record',
  created,
  question:'',
  thesis:'',
  archiveClasses:{
    research:[],created:[],decisions:[],audits:[],media:[],sourceFiles:[],lineage:[],plans:[],limits:[]
  },
  certification:{sha:null,workflowRunId:null,testCount:null}
},null,2)+'\n');
console.log(`Created ${path.relative(root,recordPath)}`);
console.log(`Created ${path.relative(root,dataPath)}`);
console.log('Next: register approved retained records in the public archive allowlist and keep this record current during the build.');
