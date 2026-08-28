import packages from '../../../../docs/builds/visual-source-acquisition-001-100/packages.json';
import fallbackManifest from '../../../../docs/builds/visual-source-acquisition-001-100/FALLBACK-ASSET-MANIFEST.json';
import fallbackSpecs from '../../../../docs/builds/visual-source-acquisition-001-100/FALLBACK-SPECS-HOLD.json';
import renderedCaptures from '../../../../docs/builds/visual-source-acquisition-001-100/RENDERED-CAPTURE-MANIFEST.json';
import promotionReview from '../../../../docs/builds/visual-source-acquisition-001-100/FINAL-COVER-PROMOTION-REVIEW.json';
import remainingHoldReview from '../../../../docs/builds/visual-source-acquisition-001-100/HOLD-SOURCE-REVIEW-REMAINING-65.json';
import carouselBlueprints from '../../../../docs/builds/visual-source-acquisition-001-100/CAROUSEL-PRODUCTION-BLUEPRINTS.json';

type Candidate={
  sourcePageUrl:string;
  exactAssetUrl?:string;
  credit:string;
  altText:string;
  orientationDimensions?:{orientation?:string;width?:number;height?:number;note?:string};
  cropGuidance:string;
  claimToVisualSupport:string;
  permissionDecision:string;
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
  liveCoverSubstituted?:boolean;
  liveCover?:{assetUrl:string;width:number;height:number;sha256:string;altText:string;caption:string;credit:string;sourceUrl:string;claimBoundary:string;noEndorsement:string;rightsLine?:string};
  rollbackCover?:{assetUrl:string;altText:string;credit:string;cropGuidance:string;dimensions:{width:number;height:number};claimToVisualSupport:string};
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
 const originalFallback=fallbackManifest.files.find(item=>item.buildId===id);
 const fallbackSpec=fallbackSpecs.records.find(item=>item.buildId===id);
 const reviewExcerpt=renderedCaptures.records.find(item=>item.buildId===id);
 const promotion=promotionReview.records.find(item=>item.buildId===id);
 const holdSourceReview=remainingHoldReview.records.find(item=>item.buildId===id);
 const carouselBlueprint=carouselBlueprints.records.find(item=>item.buildId===id);
 return <section aria-labelledby="asset-review-heading" style={panel}>
  <p><b>VISUAL ASSET REVIEW</b></p>
  <h2 id="asset-review-heading">Hook image, source candidate, and release gates</h2>
  <p>The creator-owned cover remains live unless every external-candidate gate is explicitly complete. Disabled controls report canonical status; they do not imply an approval action occurred here.</p>
  <div style={grid}>
   <article style={card}>
    <h3>{record.liveCoverSubstituted?'Live official source-context cover':'Live creator-owned cover'}</h3>
    {record.liveCoverSubstituted&&record.liveCover?<><img src={record.liveCover.assetUrl} width={record.liveCover.width} height={record.liveCover.height} alt={record.liveCover.altText} loading="lazy" style={image}/>
     <p><b>Status:</b> Promoted after direct-fit review</p><p>{record.liveCover.caption}</p><p><b>Credit:</b> {record.liveCover.credit}</p><p><a href={record.liveCover.sourceUrl} rel="noreferrer">Open official source →</a></p>
     <details><summary>Integrity, rights, and claim boundary</summary><p><b>SHA-256:</b> <code>{record.liveCover.sha256}</code></p>{record.liveCover.rightsLine&&<p><b>Rights:</b> {record.liveCover.rightsLine}</p>}<p>{record.liveCover.claimBoundary}</p><p>{record.liveCover.noEndorsement}</p></details>
    </>:<><img src={record.cover.assetUrl} width={record.cover.dimensions.width} height={record.cover.dimensions.height} alt={record.cover.altText} loading="lazy" style={image}/>
     <p><b>Status:</b> {record.rnFallbackReady?'Release-eligible fallback':'Not release-eligible'}</p><p><b>Credit:</b> {record.cover.credit}</p>
     <details><summary>Crop and claim boundary</summary><p>{record.cover.cropGuidance}</p><p>{record.cover.claimToVisualSupport}</p></details></>}
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
  {promotion&&<article style={{...card,marginTop:'1rem'}} aria-labelledby={`promotion-${id}-heading`}>
   <h3 id={`promotion-${id}-heading`}>Final hook-image decision</h3>
   <p><b>{promotion.decision==='PROMOTED'?'PROMOTED · LIVE':'RETAINED RN COVER · OFFICIAL CANDIDATE REVIEW-ONLY'}</b></p>
   <p>{promotion.reason}</p>
   <p><b>Rollback:</b> The prior RN cover remains preserved at <a href={promotion.rollbackAssetUrl}>its canonical asset URL</a>.</p>
  </article>}
  {holdSourceReview&&<article style={{...card,marginTop:'1rem'}} aria-labelledby={`hold-source-${id}-heading`}>
   <p><b>EXTERNAL SOURCE REVIEW · HOLD · NOT SELECTED · NOT STAGED</b></p>
   <h3 id={`hold-source-${id}-heading`}>Exact-source acquisition decision</h3>
   <p><b>Classification:</b> {holdSourceReview.classification.replaceAll('_',' ')}</p>
   <p>{holdSourceReview.rights.decision}</p>
   {holdSourceReview.candidate.sourcePageUrl&&<p><a href={holdSourceReview.candidate.sourcePageUrl} rel="noreferrer">Open authoritative context source →</a></p>}
   {holdSourceReview.candidate.exactAssetUrl&&<p><a href={holdSourceReview.candidate.exactAssetUrl} rel="noreferrer">Open exact candidate asset →</a></p>}
   <details><summary>Capture, attribution, and claim boundaries</summary>
    <p><b>Capture status:</b> {holdSourceReview.capture.status}</p>
    {holdSourceReview.capture.cropBoundary&&<p><b>Crop:</b> {holdSourceReview.capture.cropBoundary}</p>}
    <p><b>Attribution:</b> {holdSourceReview.reviewCopy.attribution}</p>
    <p><b>Alt text:</b> {holdSourceReview.reviewCopy.altText}</p>
    <p><b>Caption:</b> {holdSourceReview.reviewCopy.caption}</p>
    <p><b>Claim boundary:</b> {holdSourceReview.reviewCopy.claimBoundary}</p>
   </details>
   <p><b>Fallback decision:</b> Retain the original RN cover. No external promotion is authorized.</p>
  </article>}
  {originalFallback&&<article style={{...card,marginTop:'1rem'}} aria-labelledby={`fallback-${id}-heading`}>
   <h3 id={`fallback-${id}-heading`}>Original HOLD fallback graphic</h3>
   <a href={originalFallback.path}><img src={originalFallback.path} width={originalFallback.width} height={originalFallback.height} alt={fallbackSpec?.accessibility.alt||`Build ${id} original RN fallback graphic. HOLD; not evidence.`} loading="lazy" style={image}/></a>
   <p><b>{originalFallback.label}</b></p>
   {fallbackSpec&&<p>{fallbackSpec.caption}</p>}
   <p>This generated RN-owned fallback is available for review while the third-party candidate remains on HOLD. It is not selected external evidence and does not change staging status.</p>
   <p><a href={originalFallback.path}>Open the full fallback SVG →</a> · <a href={originalFallback.path} download={`${id}-original-rn-fallback.svg`}>Download SVG ↓</a></p>
   <details><summary>Integrity record</summary><p><b>SHA-256:</b> <code>{originalFallback.sha256}</code></p><p><b>Dimensions:</b> {originalFallback.width} × {originalFallback.height}; {originalFallback.mediaType}; {originalFallback.bytes} bytes.</p></details>
  </article>}
  {reviewExcerpt&&<article style={{...card,marginTop:'1rem'}} aria-labelledby={`source-excerpt-${id}-heading`}>
   <p><b>{reviewExcerpt.status==='APPROVED'?'APPROVED SOURCE-CONTEXT EXCERPT · SELECTED · STAGED':'REJECTED REVIEW HISTORY · NOT SELECTED · NOT STAGED'}</b></p>
   <h3 id={`source-excerpt-${id}-heading`}>{reviewExcerpt.status==='APPROVED'?'Approved source-context excerpt':'Rejected source-excerpt review'}</h3>
   <a href={`/${reviewExcerpt.path.replace('apps/web/public/','')}`}><img src={`/${reviewExcerpt.path.replace('apps/web/public/','')}`} width={reviewExcerpt.width} height={reviewExcerpt.height} alt={reviewExcerpt.alt} loading="lazy" style={image}/></a>
   <p>{reviewExcerpt.caption}</p>
   <p>{reviewExcerpt.claimState}</p>
   <p><a href={`/${reviewExcerpt.path.replace('apps/web/public/','')}`}>Open the full review SVG →</a> · <a href={`/${reviewExcerpt.path.replace('apps/web/public/','')}`} download={`${id}-source-excerpt-review-hold.svg`}>Download review SVG ↓</a> · <a href={reviewExcerpt.sourceUrl} rel="noreferrer">Open official source →</a></p>
   <details><summary>Integrity, rights, and disposition</summary><p><b>SHA-256:</b> <code>{reviewExcerpt.sha256}</code></p><p><b>Source SHA-256:</b> <code>{reviewExcerpt.sourceSha256}</code></p><p><b>Dimensions:</b> {reviewExcerpt.width} × {reviewExcerpt.height}; {reviewExcerpt.mimeType}.</p><p><b>Notice:</b> {reviewExcerpt.notice}</p><p><b>{reviewExcerpt.gatesOpen.length?'Disposition':'Gates'}:</b> {reviewExcerpt.gatesOpen.length?reviewExcerpt.gatesOpen.join('; '):'All excerpt promotion gates passed'}.</p></details>
  </article>}
  {carouselBlueprint&&<article style={{...card,marginTop:'1rem'}} aria-labelledby={`carousel-blueprint-${id}-heading`}>
   <p><b>CANONICAL SEVEN-SLIDE PRODUCTION BLUEPRINT</b></p>
   <h3 id={`carousel-blueprint-${id}-heading`}>Build-specific carousel plan</h3>
   <p><b>Cover:</b> <a href={carouselBlueprint.coverMapping.assetUrl}>Open exact mapped asset →</a></p>
   <ol>{carouselBlueprint.slides.map(slide=><li key={slide.slide} style={{marginBottom:'1rem'}}><b>{slide.slide}. {slide.stage}</b><br/>{slide.headline}<details><summary>Visual, rights, and accessibility instructions</summary><p>{slide.visualGuidance}</p><p><b>Claim boundary:</b> {slide.claimBoundary}</p><p><b>Accessibility:</b> {slide.accessibility}</p><p><b>Rights:</b> {slide.rights}</p></details></li>)}</ol>
   <details><summary>Platform repurposing</summary><p><b>Instagram:</b> {carouselBlueprint.platformRepurposing.instagram}</p><p><b>LinkedIn:</b> {carouselBlueprint.platformRepurposing.linkedin}</p><p><b>Reels/TikTok:</b> {carouselBlueprint.platformRepurposing.reelsTikTok}</p><p><b>Web/newsletter:</b> {carouselBlueprint.platformRepurposing.webNewsletter}</p></details>
   <p><a href="/100-builds/carousel-blueprints/CAROUSEL-PRODUCTION-BLUEPRINTS.json" download>Download all 100 structured blueprints ↓</a> · <a href="/100-builds/carousel-blueprints/README.md">Read production instructions →</a></p>
  </article>}
  <article style={{...card,marginTop:'1rem'}} aria-labelledby={`canva-package-${id}-heading`}>
   <h3 id={`canva-package-${id}-heading`}>Canva-ready distribution</h3>
   <p>This build’s current cover and complete metadata are included in the deterministic 100-cover handoff. The package preserves this dossier’s official/RN decision, source, rights, claim boundary, and rollback state.</p>
   <p><a href="/100-builds/canva-package/rn-100-builds-canva-ready.zip" download>Download the complete Canva-ready ZIP ↓</a> · <a href="/100-builds/canva-package/inventory.json">Open package inventory →</a> · <a href="/100-builds/canva-package/README.md">Read import instructions →</a></p>
  </article>
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
