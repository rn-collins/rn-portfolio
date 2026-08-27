import packages from '../../../../../docs/builds/visual-source-acquisition-001-100/packages.json';

type Candidate={
  sourcePageUrl?:string;
  exactAssetUrl?:string;
  credit?:string;
  altText?:string;
  orientationDimensions?:{orientation?:string;width?:number;height?:number;note?:string};
  cropGuidance?:string;
  claimToVisualSupport?:string;
  permissionDecision?:string;
};
type AssetRecord={
  buildId:string;
  cover:{assetUrl:string;altText:string;credit:string;cropGuidance:string;dimensions:{width:number;height:number};claimToVisualSupport:string};
  visualCandidateSearch:{status:string;searched:Candidate[];requiredBeforeExternalSubstitution:string;generatedFallbackReason:string};
  acquisitionDisposition:string;
  externalSelected:boolean;
  externalStaged:boolean;
  rnFallbackReady:boolean;
  productionStatus:string;
};
const records=(packages.records as AssetRecord[]);

const panel={border:'1px solid currentColor',padding:'clamp(1rem,3vw,2rem)',margin:'2rem 0'} as const;
const grid={display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,18rem),1fr))',gap:'1rem'} as const;
const card={border:'1px solid color-mix(in srgb, currentColor 28%, transparent)',padding:'1rem'} as const;
const image={display:'block',width:'100%',height:'auto',aspectRatio:'4 / 5',objectFit:'contain',background:'#111'} as const;

export default function AssetReviewPanel({id}:{id:string}){
 const record=records.find(item=>item.buildId===id);
 if(!record)return null;
 const candidate=record.visualCandidateSearch.searched[0];
 return <section aria-labelledby="asset-review-heading" style={panel}>
  <p><b>VISUAL ASSET REVIEW</b></p>
  <h2 id="asset-review-heading">Hook image, source candidate, and release gates</h2>
  <p>The creator-owned cover remains live unless every external-candidate gate is explicitly complete. Disabled controls report canonical status; they do not imply an approval action occurred here.</p>
  <div style={grid}>
   <article style={card}>
    <h3>Live creator-owned cover</h3>
    <img src={record.cover.assetUrl} width={record.cover.dimensions.width} height={record.cover.dimensions.height} alt={record.cover.altText} loading="lazy" style={image}/>
    <p><b>Status:</b> {record.rnFallbackReady?'Release-eligible fallback':'Not release-eligible'}</p>
    <p><b>Credit:</b> {record.cover.credit}</p>
    <details><summary>Crop and claim boundary</summary><p>{record.cover.cropGuidance}</p><p>{record.cover.claimToVisualSupport}</p></details>
   </article>
   <article style={card}>
    <h3>Official visual candidate</h3>
    {candidate?<><p><b>Disposition:</b> {record.acquisitionDisposition}</p><p>{candidate.permissionDecision}</p>
     <p><a href={candidate.sourcePageUrl} rel="noreferrer">Open official source page →</a></p>
     {candidate.exactAssetUrl&&<p><a href={candidate.exactAssetUrl} rel="noreferrer">Open exact candidate asset →</a></p>}
     <details><summary>Production specification</summary>
      {candidate.orientationDimensions&&<p><b>Orientation/dimensions:</b> {candidate.orientationDimensions.orientation}; {candidate.orientationDimensions.width} × {candidate.orientationDimensions.height}. {candidate.orientationDimensions.note}</p>}
      <p><b>Crop:</b> {candidate.cropGuidance}</p><p><b>Alt text:</b> {candidate.altText}</p><p><b>Credit:</b> {candidate.credit}</p><p><b>Claim boundary:</b> {candidate.claimToVisualSupport}</p>
     </details></>:<p>No external candidate is approved. Use the creator-owned fallback.</p>}
   </article>
  </div>
  <fieldset style={{...card,marginTop:'1rem'}}>
   <legend><b>Canonical review gates</b></legend>
   <label style={{display:'block'}}><input type="checkbox" checked={record.rnFallbackReady} readOnly disabled/> Creator-owned fallback ready</label>
   <label style={{display:'block'}}><input type="checkbox" checked={record.externalSelected} readOnly disabled/> External candidate formally selected</label>
   <label style={{display:'block'}}><input type="checkbox" checked={record.externalStaged} readOnly disabled/> External asset staged</label>
   <p><b>Current production status:</b> {record.productionStatus}</p>
   <p><b>Required before substitution:</b> {record.visualCandidateSearch.requiredBeforeExternalSubstitution}</p>
   <p><b>Fallback reason:</b> {record.visualCandidateSearch.generatedFallbackReason}</p>
  </fieldset>
 </section>;
}
