import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'Canva Batch 05 certification · 100 Builds',
  description:'Verification record for Builds 041–050 and the canonical Canva Batch 05 package.',
  alternates:{canonical:'/100-builds/carousel-operations/batch-05-certification'},
  robots:{index:false,follow:true}
};

const rows=[
  ['Published package checksum','Exact match'],
  ['Internal SHA256SUMS','73/73 passed'],
  ['Package contents','70 SVGs + inventory.json + inventory.csv + README.md'],
  ['Build coverage','041–050 · seven slides each'],
  ['Slide order','Hook → Problem → System → Evidence → Demo → Implications → CTA/Sources'],
  ['Canvas','1200 × 1500 · viewBox 0 0 1200 1500'],
  ['Naming, headers, stages, counters','Passed'],
  ['Accessible SVG title and description','Passed'],
  ['JSON/CSV inventory agreement','Passed'],
  ['Inventory sequence, filenames, bytes, hashes','Passed'],
  ['Rights, credits, and status metadata','Passed'],
  ['Defects','None']
] as const;

export default function Batch05Certification(){return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} style={{maxWidth:'60rem',margin:'0 auto',padding:'clamp(1rem,4vw,3rem)',fontFamily:'system-ui'}}>
  <p><Link href="/100-builds/carousel-operations">← Carousel operations</Link></p>
  <p><b>CERTIFICATION RECORD · BATCH 05</b></p>
  <h1>Builds 041–050 are certified</h1>
  <p><b>Status: CERTIFIED — no defects found</b></p>
  <dl><dt>Package</dt><dd><code>canva-batch-05-builds-041-050.zip</code></dd><dt>Size</dt><dd>240,903 bytes</dd><dt>SHA-256</dt><dd style={{overflowWrap:'anywhere'}}><code>ee9bd614e128f9d737b25d164cfc2cb1bbb0abac83dee49a608ec4e4775430a0</code></dd></dl>
  <h2>Verification results</h2>
  <div style={{overflowX:'auto'}}><table style={{borderCollapse:'collapse',width:'100%'}}><thead><tr><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Check</th><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Result</th></tr></thead><tbody>{rows.map(([check,result])=><tr key={check}><th scope="row" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>{check}</th><td style={{padding:'.75rem',border:'1px solid currentColor'}}>{result}</td></tr>)}</tbody></table></div>
  <h2>Asset status</h2><ul><li>Build 041: <code>LIVE_OFFICIAL_SOURCE_CONTEXT</code> · NIST official-source context</li><li>Builds 042–050: <code>RN_OWNED</code></li></ul>
  <p>Context-only references are retained in rights metadata for Builds 042–050. Their blank source URLs are intentional for RN-owned visuals.</p>
  <p>This record certifies the deterministic distribution package and its contents. It does not alter a build&apos;s approval, HOLD, rights, source, or live-cover status.</p>
</main></>}