import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const path=fileURLToPath(new URL('../docs/builds/visual-source-acquisition-001-100/packages.json',import.meta.url));
const p=JSON.parse(fs.readFileSync(path,'utf8'));
const CLEAR=['001','002','003','004','005','006','007','008','009','011','012','013','017','018','019','020','021','022','025','026','028','029','031','032'];
const STAGED=['001','002','003','004','005','006','007','008','009','011','012','013','017','018','019','020','021','022','025','026','028','029','031','032'];
const REPLACEMENT_PROMOTED=['002','007','008','013','017','025','028','029','032'];
const PROMOTED=['001','003','004','005','006','012','018','019','022','026','031',...REPLACEMENT_PROMOTED];
const EXCERPT_PROMOTED=['010','030','036','041','057','058'];
const EARLY_HOLD=['014','015','016','023','024','027','033','034'];
const ALL=Array.from({length:100},(_,i)=>String(i+1).padStart(3,'0'));
const HOLD=ALL.filter(id=>!CLEAR.includes(id)&&!EXCERPT_PROMOTED.includes(id));
const nonempty=(v)=>typeof v==='string'&&v.trim().length>0;
const url=(v)=>{if(!nonempty(v))return null;try{const u=new URL(v);return u.protocol==='https:'?u:null}catch{return null}};
function clearedCandidate(r){return (r.visualCandidateSearch?.searched||[]).find(c=>/CLEARED/.test(c.permissionDecision||'')&&!/HOLD|NOT CLEARED/.test(c.permissionDecision||''));}
function validateCleared(r){
 const c=clearedCandidate(r);if(!c)throw Error(r.buildId+': no positive candidate');
 for(const k of ['sourcePageUrl','sourceLocator','issuerCreator','rightsStatement','permissionDecision','credit','cropGuidance','claimToVisualSupport'])if(!nonempty(c[k]))throw Error(r.buildId+': cleared missing '+k);
 const asset=url(c.exactAssetUrl),source=url(c.sourcePageUrl),terms=url(c.termsUrl);if(!asset||!source||!terms)throw Error(r.buildId+': invalid asset/source/terms URL');
 const issuer=(c.issuerCreator||'').toLowerCase();const ah=asset.hostname,th=terms.hostname;
 if((issuer.includes('nist')||issuer.includes('national institute of standards'))&&(!/nist\.gov$/.test(ah)||!/nist\.gov$/.test(th)))throw Error(r.buildId+': NIST host mismatch');
 if(issuer.includes('w3c')&&(!/w3\.org$/.test(ah)||!/w3\.org$/.test(th)))throw Error(r.buildId+': W3C host mismatch');
 if(issuer.includes('government digital service')&&(!/gov\.uk$/.test(ah)||th!=='www.nationalarchives.gov.uk'))throw Error(r.buildId+': OGL host mismatch');
 const version=c.assetDate||c.assetDateVersion;if(!nonempty(version)||!/\d{4}/.test(version)||/unknown|unspecified/i.test(version))throw Error(r.buildId+': missing/wrong date-version');
 if(!/clear|public domain|open|licen|royalty|reuse|reprint/i.test(c.rightsStatement+' '+c.permissionDecision))throw Error(r.buildId+': weak license semantics');
 const g=c.orientationDimensions||c.dimensions;const responsive=g&&/responsive|html|web page/i.test(g.note||'');if(!g||!nonempty(g.orientation)||(!(Number(g.width)>0&&Number(g.height)>0)&&!responsive))throw Error(r.buildId+': geometry absent');
 if(!/crop|use only|preserve/i.test(c.cropGuidance)||!/exclude|third-party|logo|seal|personal/i.test(c.cropGuidance))throw Error(r.buildId+': crop/exclusions weak');
 if(c.claimToVisualSupport.length<80||!/does not|not prove|limited|only/i.test(c.claimToVisualSupport))throw Error(r.buildId+': claim fit weak');
 const boundary=[r.recognizableEntity?.authorizationBoundary,c.cropGuidance,c.claimToVisualSupport].filter(Boolean).join(' ');if(!/endorsement/i.test(boundary)||!/no |not |does not|never/i.test(boundary))throw Error(r.buildId+': no-endorsement absent');
 if(!REPLACEMENT_PROMOTED.includes(r.buildId)&&!/not substituted|remains in production|until separately approved|current RN/i.test((r.dispositionBasis||'')+' '+(c.decision||'')))throw Error(r.buildId+': substitution boundary absent');
}
function validate(p){
 if(JSON.stringify(p.records.map(r=>r.buildId))!==JSON.stringify(ALL))throw Error('range loss/order');
 const ids=d=>p.records.filter(r=>r.acquisitionDisposition===d).map(r=>r.buildId);
 if(JSON.stringify(ids('CLEARED-NOT-SUBSTITUTED'))!==JSON.stringify(CLEAR))throw Error('mandatory clear set drift');
 if(JSON.stringify(ids('EXCERPT-PROMOTED'))!==JSON.stringify(EXCERPT_PROMOTED))throw Error('excerpt promotion set drift');
 if(JSON.stringify(ids('HOLD'))!==JSON.stringify(HOLD))throw Error('mandatory hold set drift');
 for(const id of EARLY_HOLD)if(p.records.find(r=>r.buildId===id)?.acquisitionDisposition!=='HOLD')throw Error(id+': mandatory early HOLD promoted');
 for(const r of p.records){if(!r.dispositionBasis)throw Error(r.buildId+': no basis');const cleared=r.acquisitionDisposition==='CLEARED-NOT-SUBSTITUTED';const excerpt=r.acquisitionDisposition==='EXCERPT-PROMOTED';const staged=STAGED.includes(r.buildId)||excerpt;if(r.externalSelected!==(cleared||excerpt)||r.externalStaged!==staged||r.rnFallbackReady!==true||r.canva?.generationAuthorized!==false)throw Error(r.buildId+': estate safety state');if(cleared){const s=r.visualCandidateSearch?.selection;if(!s||s.binaryPresent!==staged||(staged?!/^apps\/web\/public\/100-builds\/official-sources\/official-\d{2}-.+\.(?:html\.source\.txt|pdf)$/.test(s.binaryRepositoryPath||''):s.binaryRepositoryPath!==null))throw Error(r.buildId+': selected source preservation truth boundary absent');if(PROMOTED.includes(r.buildId)){
 if(r.liveCoverSubstituted!==true||(!REPLACEMENT_PROMOTED.includes(r.buildId)&&s.renderApproved!==true))throw Error(r.buildId+': approved promotion state absent');
 for(const k of ['assetUrl','sha256','altText','caption','credit','sourceUrl','claimBoundary','noEndorsement'])if(!nonempty(r.liveCover?.[k]))throw Error(r.buildId+': live cover missing '+k);
 if(!REPLACEMENT_PROMOTED.includes(r.buildId)&&!nonempty(r.liveCover?.repositoryPath))throw Error(r.buildId+': live cover missing repositoryPath');
 if(r.liveCover.width!==1200||r.liveCover.height!==1500||!/^\/media\/100-builds\/(?:production-source-variants|production-source-context|replacement-production-covers)\/.+\.svg$/.test(r.liveCover.assetUrl))throw Error(r.buildId+': invalid live derivative');
 if(!r.rollbackCover||r.rollbackCover.assetUrl!==r.cover.assetUrl||r.rnFallbackReady!==true)throw Error(r.buildId+': rollback cover absent');
 }else if(staged&&(!/NOT APPROVED/.test(s.stagingStatus||'')||r.liveCoverSubstituted===true||s.renderApproved===true))throw Error(r.buildId+': review-only source promoted');
 validateCleared(r);}else if(excerpt){
 for(const k of ['assetUrl','repositoryPath','sha256','altText','caption','credit','sourceUrl','claimBoundary','noEndorsement'])if(!nonempty(r.liveCover?.[k]))throw Error(r.buildId+': excerpt live cover missing '+k);
 if(r.liveCoverSubstituted!==true||r.liveCover.width!==1200||r.liveCover.height!==1500||!/^\/media\/100-builds\/source-excerpts\/build-\d{3}-source-excerpt-hold\.svg$/.test(r.liveCover.assetUrl))throw Error(r.buildId+': invalid excerpt live cover');
 if(!r.rollbackCover||r.rollbackCover.assetUrl!==r.cover.assetUrl)throw Error(r.buildId+': excerpt rollback absent');
 if(!/No affiliation or endorsement/.test(r.liveCover.noEndorsement)||!/APPROVED SOURCE-CONTEXT/.test(r.liveCover.claimBoundary))throw Error(r.buildId+': excerpt safety boundary absent');
 }else{const s=r.visualCandidateSearch?.searched||[];if(!s.length||!s.some(c=>nonempty(c.nextStep)||nonempty(c.acquisitionNextStep)))throw Error(r.buildId+': HOLD lacks next route');}if(JSON.stringify(r).match(/"selectedForUse":\s*true|"stagedAssetPath":\s*"|"provenanceSidecarPath":\s*"/))throw Error(r.buildId+': hidden selection/staging');}
 return {records:100,clear:24,excerptPromoted:6,hold:70,fallback:100,selected:30,staged:30,uniquePreservedSources:9,livePromoted:26,reviewOnlyCleared:4,canva:0};
}
const got=validate(p);const c0=()=>{const q=structuredClone(p);return[q,q.records.find(r=>r.acquisitionDisposition==='CLEARED-NOT-SUBSTITUTED'),q.records.find(r=>r.acquisitionDisposition==='HOLD')]};
const mutations=[
()=>{const[q,r]=c0();clearedCandidate(r).exactAssetUrl=null;return q},()=>{const[q,r]=c0();clearedCandidate(r).exactAssetUrl=false;return q},()=>{const[q,r]=c0();clearedCandidate(r).termsUrl='https://evil.invalid/terms';return q},()=>{const[q,r]=c0();clearedCandidate(r).assetDate='unknown';return q},()=>{const[q,r]=c0();clearedCandidate(r).termsUrl='';return q},()=>{const[q,r]=c0();clearedCandidate(r).credit='';return q},()=>{const[q,r]=c0();clearedCandidate(r).orientationDimensions={orientation:'',width:null,height:null,note:''};return q},()=>{const[q,r]=c0();clearedCandidate(r).cropGuidance='Use image.';return q},()=>{const[q,r]=c0();r.recognizableEntity.authorizationBoundary='Recognizable authority.';clearedCandidate(r).cropGuidance='Crop to title; exclude logo.';clearedCandidate(r).claimToVisualSupport='Supports the claim completely and establishes the result.';return q},()=>{const[q,,r]=c0();r.acquisitionDisposition='CLEARED-NOT-SUBSTITUTED';return q},()=>{const[q,r]=c0();r.externalSelected=false;return q},()=>{const[q,r]=c0();r.canva.generationAuthorized=true;return q}];
for(const [i,make] of mutations.entries()){let failed=false;try{validate(make())}catch{failed=true}if(!failed)throw Error('adversarial mutation escaped #'+i);}
console.log(JSON.stringify({...got,mandatoryEarlyHolds:EARLY_HOLD,promotedBuilds:[...PROMOTED,...EXCERPT_PROMOTED],mutationsRejected:mutations.length,status:'PASS'}));
