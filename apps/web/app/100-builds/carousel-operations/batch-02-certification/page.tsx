import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'Canva Batch 02 certification · 100 Builds',
  description:'Verification record for Builds 011–020 and the canonical Canva Batch 02 package.',
  alternates:{canonical:'/100-builds/carousel-operations/batch-02-certification'},
  robots:{index:false,follow:true}
};

const rows=[
  ['Published package checksum','Exact match'],
  ['Internal SHA256SUMS','73/73 passed'],
  ['Package contents','70 SVGs + inventory.json + inventory.csv + README.md'],
  ['Build coverage','011–020 · seven slides each'],
  ['Slide order','Hook → Problem → System → Evidence → Demo → Implications → CTA/Sources'],
  ['Canvas','1200 × 1500 · viewBox 0 0 1200 1500'],
  ['Naming, headers, stages, counters','Passed'],
  ['Accessible SVG title and description','Passed'],
  ['Inventory sequence, filenames, bytes, hashes','Passed'],
  ['Rights, credits, claim boundaries, provenance','Passed'],
  ['Defects','None']
] as const;

export default function Batch02Certification(){return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} style={{maxWidth:'60rem',margin:'0 auto',padding:'clamp(1rem,4vw,3rem)',fontFamily:'system-ui'}}>
  <p><Link href="/100-builds/carousel-operations">← Carousel operations</Link></p>
  <p><b>CERTIFICATION RECORD · BATCH 02</b></p>
  <h1>Builds 011–020 are certified</h1>
  <p><b>Status: CERTIFIED — no defects found</b></p>
  <dl><dt>Package</dt><dd><code>canva-batch-02-builds-011-020.zip</code></dd><dt>Size</dt><dd>241,767 bytes</dd><dt>SHA-256</dt><dd style={{overflowWrap:'anywhere'}}><code>84a8fa3d59af63a58ffbc96f084cb6d26d7fc7d3cf5fcdfbaa4e118ff2bf0c8b</code></dd></dl>
  <h2>Verification results</h2>
  <div style={{overflowX:'auto'}}><table style={{borderCollapse:'collapse',width:'100%'}}><thead><tr><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Check</th><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Result</th></tr></thead><tbody>{rows.map(([check,result])=><tr key={check}><th scope="row" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>{check}</th><td style={{padding:'.75rem',border:'1px solid currentColor'}}>{result}</td></tr>)}</tbody></table></div>
  <h2>Asset status</h2>
  <p>Builds 011, 014–016, and 020: <code>RN_OWNED</code>. Builds 012, 013, and 017–019: <code>LIVE_OFFICIAL_SOURCE_CONTEXT</code>. Rights, credits, source URLs, claim boundaries, live-cover mappings, and rollback mappings are retained in the canonical metadata.</p>
  <p>This record certifies the deterministic distribution package and its contents. It does not alter a build&apos;s approval, HOLD, rights, source, or live-cover status.</p>
</main></>}