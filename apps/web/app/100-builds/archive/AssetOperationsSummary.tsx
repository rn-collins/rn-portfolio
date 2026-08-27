import Link from 'next/link';
import packages from '../../../../../docs/builds/visual-source-acquisition-001-100/packages.json';
import fallbackManifest from '../../../../../docs/builds/visual-source-acquisition-001-100/FALLBACK-ASSET-MANIFEST.json';
import renderedCaptures from '../../../../../docs/builds/visual-source-acquisition-001-100/RENDERED-CAPTURE-MANIFEST.json';
import s from './program-archive.module.css';

type AssetRecord={
 buildId:string;
 acquisitionDisposition:string;
 externalSelected:boolean;
 externalStaged:boolean;
 liveCoverSubstituted?:boolean;
 rnFallbackReady:boolean;
 productionStatus:string;
 visualCandidateSearch?:{
  selection?:{binaryRepositoryPath?:string|null;stagingStatus?:string};
  requiredBeforeExternalSubstitution?:string;
  generatedFallbackReason?:string;
 };
};

const records=packages.records as AssetRecord[];
const fallbackIds=new Set(fallbackManifest.files.map(item=>item.buildId));
const captureIds=new Set(renderedCaptures.records.map(item=>item.buildId));
const finalReviewed=renderedCaptures.counts.finalReviewed;
const count=(predicate:(record:AssetRecord)=>boolean)=>records.filter(predicate).length;
const selected=count(record=>record.externalSelected);
const staged=count(record=>record.externalStaged);
const substituted=count(record=>record.liveCoverSubstituted===true);
const hold=count(record=>record.acquisitionDisposition==='HOLD');
const preservedSources=new Set(records.flatMap(record=>{
 const path=record.visualCandidateSearch?.selection?.binaryRepositoryPath;
 return record.externalStaged&&path?[path]:[];
})).size;

function blocker(record:AssetRecord){
 if(record.liveCoverSubstituted)return 'None — external visual is live';
 if(record.acquisitionDisposition==='HOLD')return captureIds.has(record.buildId)
  ?'FINAL-REVIEWED · HOLD — promotion gates remain open; see the dossier review record'
  :'HOLD — no external visual is approved; creator-owned fallback remains live';
 if(!record.externalStaged)return 'Selected source binary is not repository-preserved';
 return 'Repository-preserved only — rendered output and substitution approval remain open';
}

export default function AssetOperationsSummary(){
 return <section className={s.section} aria-labelledby="asset-operations-heading">
  <span>VISUAL ASSET OPERATIONS</span>
  <h2 id="asset-operations-heading">One ledger. One hundred truthful states.</h2>
  <p className={s.lede}>This review surface is calculated directly from the canonical acquisition ledger and integrity manifests. It is not a second hand-maintained status report. “Staged” means the exact official source is preserved in the repository; it does not mean a rendered crop is approved or live.</p>
  <dl className={s.metrics}>
   <div><dt>Builds</dt><dd>{records.length}</dd></div>
   <div><dt>Selected</dt><dd>{selected}</dd></div>
   <div><dt>Repository-staged</dt><dd>{staged}</dd></div>
   <div><dt>Unique preserved sources</dt><dd>{preservedSources}</dd></div>
   <div><dt>Original HOLD fallbacks</dt><dd>{fallbackIds.size}</dd></div>
   <div><dt>Capture-review renders</dt><dd>{captureIds.size}</dd></div>
   <div><dt>Final-reviewed captures</dt><dd>{finalReviewed}</dd></div>
   <div><dt>HOLD</dt><dd>{hold}</dd></div>
   <div><dt>Live substitutions</dt><dd>{substituted}</dd></div>
  </dl>
  <p className={s.reviewFinding}><b>Capture-review disposition:</b> {renderedCaptures.finalReview.reason}</p>
  <section className={s.reviewFinding} aria-labelledby="canva-package-heading">
   <h3 id="canva-package-heading">Canva-ready 100-cover distribution</h3>
   <p>The deterministic handoff contains the current cover decision for every build: 26 live official source-context covers and 74 RN-owned covers. It includes one metadata sidecar per cover, a CSV/JSON inventory, credits, alt text, captions, source and rollback links, claim and no-endorsement boundaries, checksums, and import instructions. Packaging does not change any canonical cover decision.</p>
   <p><a href="/100-builds/canva-package/rn-100-builds-canva-ready.zip" download>DOWNLOAD 100-COVER ZIP ↓</a> · <a href="/100-builds/canva-package/inventory.json">JSON INVENTORY →</a> · <a href="/100-builds/canva-package/inventory.csv" download>CSV INVENTORY ↓</a> · <a href="/100-builds/canva-package/README.md">IMPORT INSTRUCTIONS →</a> · <a href="/100-builds/canva-package/PACKAGE-CHECKSUMS.json">PACKAGE CHECKSUM →</a></p>
  </section>
  <div className={s.tableWrap} tabIndex={0} role="region" aria-label="Asset status for all 100 builds">
   <table className={s.assetTable}>
    <caption>Canonical visual-asset state by build. Open a dossier for previews, exact sources, downloads, integrity records and review gates.</caption>
    <thead><tr><th scope="col">Build</th><th scope="col">Disposition</th><th scope="col">Selected</th><th scope="col">Staged</th><th scope="col">Fallback</th><th scope="col">Capture review</th><th scope="col">Live substitution</th><th scope="col">Remaining blocker</th><th scope="col">Review</th></tr></thead>
    <tbody>{records.map(record=><tr key={record.buildId}>
     <th scope="row">{record.buildId}</th>
     <td>{record.acquisitionDisposition}</td>
     <td>{record.externalSelected?'YES':'NO'}</td>
     <td>{record.externalStaged?'YES':'NO'}</td>
     <td>{record.rnFallbackReady?'READY':'NO'}</td>
     <td>{captureIds.has(record.buildId)?'RENDERED · HOLD':'—'}</td>
     <td>{record.liveCoverSubstituted?'YES':'NO'}</td>
     <td>{blocker(record)}</td>
     <td><Link href={`/100-builds/${record.buildId}/record#asset-review-heading`}>OPEN DOSSIER →</Link>{fallbackIds.has(record.buildId)&&<><br/><a href={`/100-builds/fallbacks/${record.buildId}-original-fallback.svg`} download={`${record.buildId}-original-rn-fallback.svg`}>FALLBACK SVG ↓</a></>}</td>
    </tr>)}</tbody>
   </table>
  </div>
 </section>;
}
