import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const manifestPath=path.join(root,'docs/builds/visual-source-acquisition-001-100/RENDERED-CAPTURE-MANIFEST.json');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const finalReviewPath=path.join(root,'docs/builds/visual-source-acquisition-001-100/FINAL-EXCERPT-REVIEW.json');
const finalReview=JSON.parse(fs.readFileSync(finalReviewPath,'utf8'));
const expected=['010','030','036','038','039','040','041','049','055','057','058'];
if(manifest.status!=='MIXED-FINAL-DISPOSITION')throw Error('capture manifest disposition drift');
if(manifest.finalReview?.decision!=='MIXED'||manifest.finalReview?.report!=='docs/builds/visual-source-acquisition-001-100/FINAL-EXCERPT-REVIEW.json')throw Error('final review linkage absent');
if(manifest.counts.finalReviewed!==11||manifest.counts.approvedForPromotion!==6||manifest.counts.rejected!==5||manifest.counts.blocked!==5)throw Error('final review count drift');
if(finalReview.summary.reviewed!==11||finalReview.summary.approvedForPromotion!==6||finalReview.summary.rejected!==5||finalReview.summary.remainHold!==5||finalReview.summary.selected!==6||finalReview.summary.staged!==6)throw Error('final review summary drift');
if(JSON.stringify(finalReview.records.map(r=>r.buildId).sort())!==JSON.stringify(expected))throw Error('final review exact set drift');
const approved=new Set(['010','030','036','041','057','058']);
for(const r of finalReview.records){
 if(approved.has(r.buildId)){if(r.decision!=='APPROVED-FOR-PROMOTION'||r.failed.length!==0||r.promotionBlocker!==null)throw Error(r.buildId+': approval contract drift');}
 else if(r.decision!=='REJECTED-CONTEXT-MISMATCH'||!Array.isArray(r.failed)||r.failed.length<1||!r.promotionBlocker)throw Error(r.buildId+': rejection is not fail closed');
}
if(JSON.stringify(manifest.records.map(r=>r.buildId).sort())!==JSON.stringify(expected))throw Error('exact capture set drift');
for(const r of manifest.records){
 if(approved.has(r.buildId)){if(r.status!=='APPROVED'||r.renderStatus!=='PROMOTION-APPROVED'||r.selected!==true||r.staged!==true||r.gatesOpen.length!==0)throw Error(r.buildId+': approved state drift');}else if(r.status!=='REJECTED'||r.renderStatus!=='REVIEW-HISTORY-ONLY'||r.selected!==false||r.staged!==false)throw Error(r.buildId+': rejected state drift');
 if(r.width!==1200||r.height!==1500||r.mimeType!=='image/svg+xml')throw Error(r.buildId+': geometry/type drift');
 if(!/^[a-f0-9]{64}$/.test(r.sha256)||!/^[a-f0-9]{64}$/.test(r.sourceSha256))throw Error(r.buildId+': checksum absent');
 if(!r.sourceUrl.startsWith('https://')||!r.alt||!r.caption||!r.notice||!r.claimState)throw Error(r.buildId+': provenance/accessibility field absent');
 const file=path.join(root,r.path), bytes=fs.readFileSync(file), svg=bytes.toString('utf8');
 if(crypto.createHash('sha256').update(bytes).digest('hex')!==r.sha256)throw Error(r.buildId+': render hash mismatch');
 if(!svg.includes('width="1200" height="1500"')||!svg.includes('role="img" aria-labelledby="title desc"')||!svg.includes('<title id="title">')||!svg.includes('<desc id="desc">'))throw Error(r.buildId+': SVG accessibility/dimension contract');
 if(/<image\b|<use\b|data:image|<script\b|foreignObject/i.test(svg))throw Error(r.buildId+': embedded/active/external visual content forbidden');
 if(!/HOLD · REVIEW RENDER · NOT SELECTED OR STAGED/.test(svg)||!/No affiliation or endorsement/.test(svg))throw Error(r.buildId+': visible safety boundary absent');
 if(!/\.body\{font:40px/.test(svg)||!/\.foot\{font:32px/.test(svg))throw Error(r.buildId+': mobile-readable font contract absent');
 if(/<text x="616"/.test(svg))throw Error(r.buildId+': nonsequential second-column reading order returned');
 if(/w3\.org/.test(r.sourceUrl)&&!/(Copyright © 20(13|17|19|23) W3C®)/.test(r.notice))throw Error(r.buildId+': W3C copyright/status notice absent');
}
if(manifest.counts.renderedReviewOnly!==11||manifest.counts.selected!==6||manifest.counts.staged!==6)throw Error('count drift');
console.log(JSON.stringify({renders:11,approved:6,rejected:5,selected:6,staged:6,status:'PASS'}));
