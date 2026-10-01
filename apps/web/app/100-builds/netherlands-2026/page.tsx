import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
 title:'The 100 × Netherlands 2026 research studio',
 description:'The research foundation joining Dutch Design Week 2026, AI & Big Data Expo Europe 2026 and forensic reconstruction of RN Builds.',
 alternates:{canonical:'/100-builds/netherlands-2026'},
 robots:{index:false,follow:true}
};

const card={border:'2px solid #121212',padding:'clamp(1rem,3vw,2rem)',display:'grid',gap:'.75rem',alignContent:'start'} as const;
const tag={fontSize:'.78rem',letterSpacing:'.12em',fontWeight:800,textTransform:'uppercase' as const};

export default function Netherlands2026(){
 return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} style={{maxWidth:'78rem',margin:'0 auto',padding:'clamp(1rem,4vw,4rem)',fontFamily:'system-ui',color:'#121212'}}>
  <p><Link href="/100-builds/">← THE 100</Link></p>
  <header style={{borderTop:'12px solid #121212',paddingTop:'1.5rem',display:'grid',gap:'1rem',gridTemplateColumns:'repeat(auto-fit,minmax(18rem,1fr))'}}>
   <div><p style={tag}>RESEARCH STUDIO · OCTOBER 2026</p><h1 style={{fontSize:'clamp(2.8rem,8vw,7rem)',lineHeight:.86,margin:0}}>THE 100 × NETHERLANDS</h1></div>
   <div style={{fontSize:'clamp(1.1rem,2vw,1.5rem)',lineHeight:1.35}}><p><b>One body of work read through two frontiers:</b> the technical frontier of AI & Big Data Expo Europe and the creative, material and cultural frontier of Dutch Design Week.</p><p>The governing question is not merely what a system can do. It is what changes when an AI system is treated as both technical infrastructure and a designed cultural object.</p></div>
  </header>

  <section aria-labelledby="foundation" style={{marginTop:'4rem'}}>
   <p style={tag}>FOUNDATION · THREE VERIFIED LANES</p><h2 id="foundation" style={{fontSize:'clamp(2rem,5vw,4rem)',margin:'.35rem 0 1.5rem'}}>Research before visual production.</h2>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(18rem,1fr))',gap:'1rem'}}>
    <article style={card}><p style={tag}>DESIGN FRONTIER</p><h3 style={{fontSize:'1.8rem',margin:0}}>Dutch Design Week 2026</h3><p>R.A.W., programme architecture, Design + AI nodes, Dutch-design lineages, rights boundaries, field capture and a sixteen-module case-study blueprint.</p><Link href="/100-builds/netherlands-2026/ddw-research">Open the DDW research atlas →</Link></article>
    <article style={card}><p style={tag}>TECHNICAL FRONTIER</p><h3 style={{fontSize:'1.8rem',margin:0}}>AI & Big Data Expo Europe</h3><p>A ranked frontier map, agenda synthesis, production-architecture questions, contradictions to test and a twenty-part technical explanation contract.</p><Link href="/100-builds/netherlands-2026/ai-big-data-research">Open the technical frontier map →</Link></article>
    <article style={card}><p style={tag}>SOURCE REALITY</p><h3 style={{fontSize:'1.8rem',margin:0}}>Builds 001, 017 and 100</h3><p>Forensic reconstruction from source code and public records: capability, architecture, data, workflow, safeguards, replication and unresolved evidence.</p><Link href="/100-builds/netherlands-2026/pilot-builds">Open the pilot-build forensics →</Link></article>
   </div>
   <article style={{...card,marginTop:'1rem',background:'#d8ff36'}}><p style={tag}>100-BUILD DECISION GATE</p><h3 style={{fontSize:'1.8rem',margin:0}}>Are the builds worth continuing?</h3><p>Three independent reviews examine technical reality, intellectual substance and external value across every build—and reconcile what should become a hero, supporting evidence, a repaired concept or a merge.</p><Link href="/100-builds/netherlands-2026/method-audit">Open the complete RN method audit →</Link></article>
  </section>

  <section aria-labelledby="findings" style={{marginTop:'4rem',background:'#121212',color:'#fff',padding:'clamp(1.25rem,4vw,3rem)'}}>
   <p style={{...tag,color:'#ff5d47'}}>DECISIONS NOW LOCKED</p><h2 id="findings" style={{fontSize:'clamp(2rem,5vw,4rem)',margin:'.35rem 0 1rem'}}>Do not decorate the old carousel system.</h2>
   <ul style={{fontSize:'clamp(1rem,1.8vw,1.3rem)',lineHeight:1.55,maxWidth:'64rem'}}>
    <li><b>R.A.W. means inspectable construction:</b> versions, failures, prompts, architecture, tests, tradeoffs and human overrides—not fake tape, torn-paper effects or borrowed conference colors.</li>
    <li><b>Every factual layer must declare its evidence status:</b> verified fact, vendor claim, RN inference or unknown.</li>
    <li><b>The first three pilot builds are deterministic client-side systems.</b> They do not presently invoke AI models, agents, databases, external runtime APIs or server storage.</li>
    <li><b>The series must preserve the difference between implemented capability and proposed frontier.</b> The trip can generate the evidence and questions for later versions; it cannot retroactively turn prototypes into deployed AI infrastructure.</li>
   </ul>
  </section>

  <section aria-labelledby="next" style={{marginTop:'4rem',display:'grid',gridTemplateColumns:'minmax(16rem,1fr) minmax(18rem,2fr)',gap:'2rem'}}>
   <div><p style={tag}>NEXT PRODUCTION GATE</p><h2 id="next" style={{fontSize:'clamp(2rem,5vw,4rem)',margin:'.35rem 0'}}>Three creative systems. Three honest pilots.</h2></div>
   <ol style={{fontSize:'1.1rem',lineHeight:1.6,margin:0}}>
    <li>Translate this research into three genuinely different systems: R.A.W. Process Archive, Technical Exhibition Catalogue and Radical Instruction Manual.</li>
    <li>Apply every system to Builds 001, 017 and 100 using only evidence the source records support.</li>
    <li>Test stopping power, technical clarity, twelve-year-old reproducibility, RN authorship, 320px legibility, accessibility and rights.</li>
    <li>Select or deliberately hybridize a winner before changing Canva or scaling across the remaining ninety-seven builds.</li>
    <li>After Amsterdam and Eindhoven, reconcile RN&apos;s photographs, observations, interviews and captured artifacts before mass production.</li>
   </ol>
  </section>

  <footer style={{marginTop:'4rem',borderTop:'2px solid #121212',paddingTop:'1rem'}}><p><b>Independence notice:</b> This is RN Collins&apos;s independent research and design work. It is not produced by, affiliated with or endorsed by Dutch Design Week, Dutch Design Foundation, AI & Big Data Expo Europe or TechEx.</p></footer>
 </main></>;
}
