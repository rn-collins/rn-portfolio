import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'Canva Batch 07 certification · 100 Builds',
  description:'Verification record for Builds 061–070 and the canonical Canva Batch 07 package.',
  alternates:{canonical:'/100-builds/carousel-operations/batch-07-certification'},
  robots:{index:false,follow:true}
};

const rows=[
  ['Published package checksum','Exact match'],
  ['Internal SHA256SUMS','73/73 passed'],
  ['Package contents','70 SVGs + inventory.json + inventory.csv + README.md'],
  ['Build coverage','061–070 · seven slides each'],
  ['Slide order','Hook → Problem → System → Evidence → Demo → Implications → CTA/Sources'],
  ['Canvas','1200 × 1500 · viewBox 0 0 1200 1500'],
  ['Naming, headers, stages, counters','Passed'],
  ['Accessible SVG title and description','Passed'],
  ['Inventory sequence, filenames, bytes, hashes','Passed'],
  ['Rights, credits, claim boundaries, provenance','Passed'],
  ['Defects','None']
] as const;

export default function Batch07Certification(){return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} style={{maxWidth:'60rem',margin:'0 auto',padding:'clamp(1rem,4vw,3rem)',fontFamily:'system-ui'}}>
  <p><Link href="/100-builds/carousel-operations">← Carousel operations</Link></p>
  <p><b>CERTIFICATION RECORD · BATCH 07</b></p>
  <h1>Builds 061–070 are certified</h1>
  <p><b>Status: CERTIFIED — no defects found</b></p>
  <dl><dt>Package</dt><dd><code>canva-batch-07-builds-061-070.zip</code></dd><dt>Size</dt><dd>240,454 bytes</dd><dt>SHA-256</dt><dd style={{overflowWrap:'anywhere'}}><code>c9dc52d7c6baf6a0e10a6a35576213f6af48eeef2bd624af504a9a172488e40f</code></dd></dl>
  <h2>Verification results</h2>
  <div style={{overflowX:'auto'}}><table style={{borderCollapse:'collapse',width:'100%'}}><thead><tr><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Check</th><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Result</th></tr></thead><tbody>{rows.map(([check,result])=><tr key={check}><th scope="row" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>{check}</th><td style={{padding:'.75rem',border:'1px solid currentColor'}}>{result}</td></tr>)}</tbody></table></div>
  <h2>Asset status</h2><p>Builds 061–070: <code>RN_OWNED</code>. Contextual evidence sources are retained in metadata; no third-party visual was substituted.</p>
  <p>This record certifies the deterministic distribution package and its contents. It does not alter a build&apos;s approval, HOLD, rights, source, or live-cover status.</p>
</main></>}