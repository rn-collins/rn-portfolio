import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'Canva Batch 09 certification · 100 Builds',
  description:'Verification record for Builds 081–090 and the canonical Canva Batch 09 package.',
  alternates:{canonical:'/100-builds/carousel-operations/batch-09-certification'},
  robots:{index:false,follow:true}
};

const rows=[
  ['Published package checksum','Exact match'],
  ['Internal SHA256SUMS','73/73 passed'],
  ['Package contents','70 SVGs + inventory.json + inventory.csv + README.md'],
  ['Build coverage','081–090 · seven slides each'],
  ['Slide order','Hook → Problem → System → Evidence → Demo → Implications → CTA/Sources'],
  ['Canvas','1200 × 1500 · viewBox 0 0 1200 1500'],
  ['Naming, headers, stages, counters','Passed'],
  ['Accessible SVG title and description','Passed'],
  ['Inventory sequence, filenames, bytes, hashes','Passed'],
  ['Rights, credits, claim boundaries, provenance','Passed'],
  ['Defects','None']
] as const;

export default function Batch09Certification(){return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} style={{maxWidth:'60rem',margin:'0 auto',padding:'clamp(1rem,4vw,3rem)',fontFamily:'system-ui'}}>
  <p><Link href="/100-builds/carousel-operations">← Carousel operations</Link></p>
  <p><b>CERTIFICATION RECORD · BATCH 09</b></p>
  <h1>Builds 081–090 are certified</h1>
  <p><b>Status: CERTIFIED — no defects found</b></p>
  <dl><dt>Package</dt><dd><code>canva-batch-09-builds-081-090.zip</code></dd><dt>Size</dt><dd>238,977 bytes</dd><dt>SHA-256</dt><dd style={{overflowWrap:'anywhere'}}><code>ff77ae24b5ded8f6314b70389fc597ae625d43378de5334168d3fea075b8577a</code></dd></dl>
  <h2>Verification results</h2>
  <div style={{overflowX:'auto'}}><table style={{borderCollapse:'collapse',width:'100%'}}><thead><tr><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Check</th><th scope="col" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>Result</th></tr></thead><tbody>{rows.map(([check,result])=><tr key={check}><th scope="row" style={{textAlign:'left',padding:'.75rem',border:'1px solid currentColor'}}>{check}</th><td style={{padding:'.75rem',border:'1px solid currentColor'}}>{result}</td></tr>)}</tbody></table></div>
  <h2>Asset status</h2><p>Builds 081–090: <code>RN_OWNED</code>. Contextual evidence sources are retained in metadata; no third-party visual was substituted.</p>
  <p>This record certifies the deterministic distribution package and its contents. It does not alter a build&apos;s approval, HOLD, rights, source, or live-cover status.</p>
</main></>}