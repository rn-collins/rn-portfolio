import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'Dutch Design Week 2026 research atlas · The 100',
  description:'A sourced visual and intellectual atlas connecting Dutch Design Week 2026 to the redesign of RN’s 100 Builds.',
  alternates:{canonical:'/100-builds/netherlands-2026/ddw-research'},
  robots:{index:false,follow:true}
};

const sourceStyle={color:'#101010',textDecorationThickness:'2px',textUnderlineOffset:'3px'} as const;
const card={border:'2px solid #111',padding:'clamp(1rem,3vw,1.6rem)',background:'#fff'} as const;

const programme=[
  ['Five missions','Digital Future · Equal Society · Health & Wellbeing · Living Environment · Thriving Planet'],
  ['Five perspectives','Independent & Critical · Product & Craft · Service & Innovative · Signature & Collectible · Speculative & Social'],
  ['Nine areas','Canal · Center · Hallenweg · Other · Sectie-C · Station · Strijp-S · Strijp T+R · West'],
  ['Formats','Exhibitions · seminars · workshops · networking · talks, debates and presentations'],
  ['Scale','2,500+ designers · about 100 locations · 350,000 visitors stated by DDW'],
] as const;

const ai=[
  ['5th Design & AI Symposium','20 October · TU/e, TU Delft and University of Twente researchers take stock of what AI has gained and cost design after years of hype.','https://ddw.nl/en/programme/5th-design-ai-symposium-1'],
  ['Slow & Small AI','A counter-model to scale-at-all-costs: small, situated systems; slower communication; doubt and reflection.','https://ddw.nl/en/programme/slow-small-ai'],
  ['CODE 2026: Terms of Intimacy','Seven works turn biometric consent, AI companionship, moderation, hidden ML labour and refusal into bodily experiences.','https://ddw.nl/en/programme/code-2026-terms-of-intimacy'],
  ['transparent.citizen','Mees Boeijen makes AI surveillance reciprocal: the watched designer and observing visitor become part of the experiment.','https://ddw.nl/en/programme/transparent-citizen'],
  ['National Design Debate: Shaping Europe','Frames digital design as cultural and political infrastructure: which values, whose tools, and for whom?','https://ddw.nl/en/programme/het-nationaal-design-debat'],
  ['Building SFF + Next Nature Museum','The official highlights identify these as 2026 hubs for digital design, AI, AI art and debate.','https://ddw.nl/en/press/press-releases/these-are-the-highlights-of-dutch-design-week-2026'],
] as const;

const lineages=[
  ['De Stijl','Reduction, modular relations and asymmetric balance—not a license to paste red/yellow/blue rectangles onto everything.'],
  ['Dutch modernist graphics','Grid discipline, direct type, public-information clarity and serial systems.'],
  ['Critical and speculative design','Objects and scenarios as arguments: make consequences tangible enough to debate.'],
  ['Droog and conceptual product design','Ordinary materials, wit and conceptual economy; the idea remains visible in the object.'],
  ['Eindhoven’s industrial ecosystem','Making, testing and restarting; Philips/TU/e/Design Academy/Strijp as a working ecology rather than décor.'],
  ['Contemporary social and biodesign','Design as collaboration with communities, institutions, organisms and material systems—not surface styling.'],
] as const;

const adaptation=[
  ['System skeleton','A persistent technical grid: build number, version, input, transformation, output, test, failure, status.'],
  ['Evidence as image','Use real screens, code, source fragments, model traces, test outputs and documented iterations—never generic AI icons.'],
  ['Productive interruption','Allow one element per slide to break the grid when it marks uncertainty, conflict, failure or a human decision.'],
  ['Materials, not filters','RN’s photographs, scans, tickets, field notes, workshop surfaces and conference observations supply texture.'],
  ['Radical instruction','Every step names the exact tool, action, input, output, branch, failure state and verification. No “connect the API.”'],
  ['Exhibition label','End with readable sources, rights, limits, live URL, repository, build status and explicit non-affiliation.'],
] as const;

const capture=[
  ['Process','Prototype versions, discarded pieces, taped annotations, jigs, molds, test coupons, error states.'],
  ['Decision','Ask: What did you refuse? What failed? What changed after a user touched it?'],
  ['System','Inputs, transformations, outputs, dependencies, human interventions, energy/material/data costs.'],
  ['Consequence','Who gains agency? Who performs hidden labour? What can a person contest, delete or refuse?'],
  ['Material','Front, back, joins, fasteners, wear, residue, scale reference and surrounding context.'],
  ['Attribution','Maker, project, venue, date, permission/press-kit status and exact source URL before reuse.'],
] as const;

export default function DDWResearch(){
  return <><a className="skip-link" href="#main-content">Skip to main content</a>
  <main id="main-content" tabIndex={-1} style={{background:'#f2f0ea',color:'#111',minHeight:'100vh',fontFamily:'Arial, Helvetica, sans-serif'}}>
    <header style={{background:'#ff4f00',borderBottom:'4px solid #111',padding:'clamp(1rem,5vw,4rem)'}}>
      <p style={{fontWeight:900,letterSpacing:'.08em',textTransform:'uppercase'}}>Research atlas · 01 October 2026 · pre-fieldwork</p>
      <h1 style={{fontSize:'clamp(3rem,10vw,8rem)',lineHeight:'.84',letterSpacing:'-.07em',margin:'.5rem 0 1rem',maxWidth:'11ch'}}>THE RAW SYSTEM</h1>
      <p style={{fontSize:'clamp(1.25rem,2.7vw,2.25rem)',lineHeight:1.05,maxWidth:'28ch',fontWeight:800}}>Dutch Design Week as a critical lens for opening up the technical and human construction of RN’s 100 Builds.</p>
      <p style={{maxWidth:'68ch',fontSize:'1.05rem',lineHeight:1.55}}>Independent editorial research. Not produced by, partnered with, endorsed by or affiliated with Dutch Design Week or Dutch Design Foundation. “Dutch Design Week,” “DDW” and “R.A.W.” are referenced descriptively.</p>
    </header>

    <div style={{maxWidth:'78rem',margin:'0 auto',padding:'clamp(1rem,4vw,4rem)',display:'grid',gap:'2rem'}}>
      <nav aria-label="Breadcrumb"><Link href="/100-builds" style={sourceStyle}>100 Builds</Link> / Netherlands 2026 / DDW research</nav>

      <section style={card}>
        <p style={{fontWeight:900,color:'#d33600'}}>OFFICIAL FACT</p>
        <h2 style={{fontSize:'clamp(2rem,5vw,4rem)',margin:0}}>DDW26: 17–25 October, Eindhoven</h2>
        <p style={{fontSize:'1.25rem',lineHeight:1.5}}>The 26th edition uses <b>R.A.W.—Rebel Authentic Worth</b> to foreground the unpolished, investigative and experimental. DDW describes design as questioning, experimenting and revealing alternatives—not only presenting outcomes.</p>
        <p><a href="https://ddw.nl/en/updates/the-theme-of-dutch-design-week" style={sourceStyle}>Official theme statement · 23 July 2026</a> · <a href="https://ddw.nl/en/press" style={sourceStyle}>Official press page</a></p>
      </section>

      <section>
        <p style={{fontWeight:900,color:'#d33600'}}>OFFICIAL PROGRAMME ARCHITECTURE</p>
        <h2 style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>The programme is a matrix, not a single aesthetic</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(16rem,1fr))',gap:'1rem'}}>
          {programme.map(([a,b],i)=><article key={a} style={{...card,background:i===0?'#111':'#fff',color:i===0?'#fff':'#111'}}><h3 style={{fontSize:'1.4rem',marginTop:0}}>{a}</h3><p style={{lineHeight:1.5}}>{b}</p></article>)}
        </div>
        <p>The live programme is dynamic. This atlas records its architecture and priority nodes; it does not claim a frozen item-by-item export of every listing. <a href="https://ddw.nl/en/programme" style={sourceStyle}>Browse the official 2026 programme</a>.</p>
      </section>

      <section style={{border:'4px solid #111',background:'#111',color:'#fff',padding:'clamp(1rem,4vw,3rem)'}}>
        <p style={{fontWeight:900,color:'#ff4f00'}}>SOURCED INTERPRETATION</p>
        <h2 style={{fontSize:'clamp(2.5rem,7vw,5rem)',lineHeight:.95,margin:'.3rem 0 1rem'}}>R.A.W. is a method, not a distressed texture.</h2>
        <p style={{fontSize:'1.3rem',lineHeight:1.5,maxWidth:'58ch'}}>For The 100, “raw” should mean that the decisions remain inspectable: versions, prompts, architecture, failed attempts, tradeoffs, human overrides, test evidence and unresolved questions. Artificial tape, torn-paper effects or fluorescent color alone would imitate an appearance while hiding the process DDW is asking viewers to examine.</p>
      </section>

      <section>
        <p style={{fontWeight:900,color:'#d33600'}}>DESIGN + AI PRIORITY MAP</p>
        <h2 style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>The conference’s useful friction with the AI expo</h2>
        <div style={{display:'grid',gap:'.75rem'}}>{ai.map(([name,note,url],i)=><article key={name} style={{...card,display:'grid',gridTemplateColumns:'minmax(3rem,5rem) 1fr',gap:'1rem',background:i%2?'#ffdd00':'#fff'}}><div style={{fontSize:'2.5rem',fontWeight:900}}>{String(i+1).padStart(2,'0')}</div><div><h3 style={{marginTop:0,fontSize:'1.4rem'}}><a href={url} style={sourceStyle}>{name}</a></h3><p style={{lineHeight:1.5}}>{note}</p></div></article>)}</div>
      </section>

      <section style={card}>
        <p style={{fontWeight:900,color:'#d33600'}}>BEACONS + MATERIAL FRONTIER</p>
        <h2>Emma van der Leest and Anab Jain</h2>
        <p style={{fontSize:'1.15rem',lineHeight:1.55}}>DDW’s 2026 Beacons establish two complementary modes: Van der Leest makes living systems, material research and scaling tangible through biodesign; Jain and Superflux make possible futures experiential so present choices can be debated. The official highlights widen that field through 3D-printed architecture, recycled and insect-derived materials, energy visualisation and collective-action design.</p>
        <p><a href="https://ddw.nl/en/updates/design-pionieers-emma-van-der-leest-and-anab-jain-are-the-beacons-van-ddw" style={sourceStyle}>Official Beacons announcement · 1 September 2026</a> · <a href="https://ddw.nl/en/press/press-releases/these-are-the-highlights-of-dutch-design-week-2026" style={sourceStyle}>Official highlights · 29 September 2026</a></p>
      </section>

      <section>
        <p style={{fontWeight:900,color:'#d33600'}}>HISTORICAL LINEAGES · INTERPRETIVE, NOT DDW CLAIMS</p>
        <h2 style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>What “Dutch design” can legitimately teach the system</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(19rem,1fr))',gap:'1rem'}}>{lineages.map(([name,note])=><article key={name} style={card}><h3>{name}</h3><p style={{lineHeight:1.5}}>{note}</p></article>)}</div>
        <p style={{lineHeight:1.55}}><b>Boundary:</b> these are broad historical reference lines selected for RN’s project, not a claim that DDW26 endorses one canonical “Dutch style.” The contemporary programme is deliberately plural and international.</p>
      </section>

      <section style={{background:'#2d43ff',color:'#fff',padding:'clamp(1rem,4vw,3rem)',border:'4px solid #111'}}>
        <p style={{fontWeight:900}}>PROPOSED RN ADAPTATION</p>
        <h2 style={{fontSize:'clamp(2.5rem,7vw,5rem)',lineHeight:.95,marginTop:'.3rem'}}>A technical exhibition catalogue a twelve-year-old can rebuild.</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(18rem,1fr))',gap:'1rem'}}>{adaptation.map(([name,note])=><article key={name} style={{border:'2px solid #fff',padding:'1rem'}}><h3>{name}</h3><p style={{lineHeight:1.5}}>{note}</p></article>)}</div>
      </section>

      <section>
        <p style={{fontWeight:900,color:'#d33600'}}>THE 100 · CONTENT BLUEPRINT</p>
        <h2 style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>Four acts, sixteen modules</h2>
        <ol style={{fontSize:'1.1rem',lineHeight:1.7,columns:'22rem 2'}}>
          <li>Provocation</li><li>Situation and user</li><li>Design position</li><li>Capability contract</li>
          <li>Inputs and prerequisites</li><li>User journey</li><li>Architecture</li><li>Data flow and state</li>
          <li>AI versus deterministic logic</li><li>Exact workflow and branches</li><li>Safeguards and permissions</li><li>Actual interface</li>
          <li>Build chronology and failures</li><li>Evaluation and remaining uncertainty</li><li>Replication sheet</li><li>Design reflection + exhibition label</li>
        </ol>
        <p><b>Instruction rule:</b> every step must identify the tool, exact action, required input, resulting output, possible failure, recovery route and test proving completion.</p>
      </section>

      <section style={card}>
        <p style={{fontWeight:900,color:'#d33600'}}>FIELD CAPTURE PROTOCOL</p>
        <h2>What RN should collect in Eindhoven</h2>
        <div style={{overflowX:'auto'}}><table style={{borderCollapse:'collapse',width:'100%'}}><thead><tr><th style={{textAlign:'left',borderBottom:'3px solid #111',padding:'.8rem'}}>Capture</th><th style={{textAlign:'left',borderBottom:'3px solid #111',padding:'.8rem'}}>Minimum evidence</th></tr></thead><tbody>{capture.map(([a,b])=><tr key={a}><th scope="row" style={{textAlign:'left',verticalAlign:'top',borderBottom:'1px solid #111',padding:'.8rem'}}>{a}</th><td style={{borderBottom:'1px solid #111',padding:'.8rem',lineHeight:1.5}}>{b}</td></tr>)}</tbody></table></div>
      </section>

      <section style={{...card,background:'#ffdd00'}}>
        <p style={{fontWeight:900}}>RIGHTS + IDENTITY BOUNDARY</p>
        <h2>Conference-informed, never conference-branded</h2>
        <ul style={{lineHeight:1.65}}>
          <li>Do not use the DDW logo, wordmark, event lock-up, official identity files or a confusingly similar series mark without written permission.</li>
          <li>Do not describe RN, The 100 or its publication as an official partner, participant, production or endorsed project.</li>
          <li>Press-page availability is not a blanket licence. Preserve the named creator/photographer credit and verify permitted editorial reuse for each downloaded asset.</li>
          <li>Use RN’s own field photography and documentation by default; record permission when a work, person or installation is the subject.</li>
          <li>Reference programme titles and theme terms only to report, critique and contextualise the visit, with source links and dates.</li>
          <li>Keep an explicit independent-editorial disclaimer on every Netherlands-series landing surface.</li>
        </ul>
        <p>This is a conservative production boundary, not legal advice. Confirm ambiguous asset uses with <a href="mailto:press@dutchdesignfoundation.com" style={sourceStyle}>DDW press</a>. <a href="https://ddw.nl/en/press" style={sourceStyle}>Official press, brand-assets and image-library gateway</a>.</p>
      </section>

      <section>
        <p style={{fontWeight:900,color:'#d33600'}}>DECISION</p>
        <h2 style={{fontSize:'clamp(2rem,5vw,3.5rem)'}}>What to build next</h2>
        <ol style={{fontSize:'1.15rem',lineHeight:1.7}}>
          <li>Freeze mass Canva import; retain the 700 certified slides as content inventory.</li>
          <li>Reconstruct three technically different builds from repositories, deployments and commit histories.</li>
          <li>Design one complete pilot in this “raw system / radical instruction” language.</li>
          <li>Create two materially different alternatives for the same build, not palette swaps.</li>
          <li>Test cold-reader comprehension, replication accuracy, mobile legibility and unmistakable non-affiliation.</li>
          <li>Use RN’s October field material to revise the chosen system before scaling across all 100.</li>
        </ol>
      </section>

      <section style={card}>
        <p style={{fontWeight:900,color:'#d33600'}}>SOURCES + COVERAGE</p>
        <h2>Primary-source register</h2>
        <ul style={{lineHeight:1.7}}>
          <li><a href="https://ddw.nl/en" style={sourceStyle}>DDW26 official home</a> — event dates and current overview.</li>
          <li><a href="https://ddw.nl/en/programme" style={sourceStyle}>Official programme</a> — missions, perspectives, topics, areas and listings.</li>
          <li><a href="https://ddw.nl/en/updates/the-theme-of-dutch-design-week" style={sourceStyle}>Official R.A.W. theme statement</a> — 23 July 2026.</li>
          <li><a href="https://ddw.nl/en/press/press-releases/these-are-the-highlights-of-dutch-design-week-2026" style={sourceStyle}>Official 2026 highlights</a> — 29 September 2026.</li>
          <li><a href="https://ddw.nl/en/updates/design-pionieers-emma-van-der-leest-and-anab-jain-are-the-beacons-van-ddw" style={sourceStyle}>Official Beacons announcement</a> — 1 September 2026.</li>
          <li><a href="https://ddw.nl/en/programme/design-academy-eindhoven-graduation-show-2026" style={sourceStyle}>Design Academy Eindhoven Graduation Show 2026</a>.</li>
          <li><a href="https://ddw.nl/en/programme/class-of-26" style={sourceStyle}>Class of 26</a> — international design education.</li>
        </ul>
        <p><b>Open gaps as of 1 October 2026:</b> the live programme may still change; field observations do not yet exist; official 2026 brand-asset files and their embedded licence terms were not reproduced here; venue-level wayfinding, motion behavior and printed identity require direct observation; creator-specific photo permissions must be cleared asset by asset. Those gaps are labeled rather than converted into assumptions.</p>
      </section>
    </div>
  </main></>;
}
