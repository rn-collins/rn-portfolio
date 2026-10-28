import type {Metadata} from 'next';
import Link from 'next/link';
import contentMap from '../../../../../../content/100-builds/content-opportunity-map.json';
import seriesArchitecture from '../../../../../../content/100-builds/series.json';
import styles from './studio.module.css';

export const metadata:Metadata={
  title:'The 100 content studio | RN',
  description:'The evidence-bounded editorial map for turning The 100 into unforced pieces, series, phase chapters and an honest public atlas.',
  alternates:{canonical:'/100-builds/netherlands-2026/content-studio'},
  robots:{index:false,follow:false}
};

const treatmentLabels:Record<string,string>={
  'pilot-now':'Launch pilot',
  'method-anchor':'Method anchor',
  'evidence-sprint':'Evidence sprint',
  'editorial-lab':'Editorial lab',
  'supporting-module':'Supporting module',
  'merged-module':'Merge into parent',
  'archive-concept':'Archive concept'
};

const counts=[
  ['2','launch pilots'],
  ['2','method anchors'],
  ['15','proof-dependent candidates'],
  ['10','explicit merges'],
  ['7','archive concepts'],
  ['64','supporting modules']
];

export default function ContentStudio(){
  return <><a className="skip-link" href="#main-content">Skip to main content</a><main id="main-content" tabIndex={-1} className={styles.main}>
    <nav className={styles.nav} aria-label="Breadcrumb"><Link href="/100-builds/">The 100</Link><span>/</span><Link href="/100-builds/netherlands-2026/">Netherlands 2026 studio</Link><span>/</span><b>Content system</b></nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>EDITORIAL SOURCE SYSTEM · 100 BUILDS · ZERO QUOTAS</p>
      <h1>Every build may contribute. No build is owed a post.</h1>
      <p className={styles.dek}>The 100 is a research corpus and executable method. It becomes public only where a distinct audience need, an inspectable RN proposition, honest technical language, sufficient evidence and an earned format coincide.</p>
    </header>

    <section className={styles.thesis} aria-labelledby="thesis">
      <p className={styles.eyebrow}>PROJECT THESIS</p><h2 id="thesis">{seriesArchitecture.projectThesis}</h2>
      <div className={styles.lenses}>
        <article><b>01 · Capability</b><p>{seriesArchitecture.conferenceLens.capability}</p></article>
        <article><b>02 · Experience</b><p>{seriesArchitecture.conferenceLens.experience}</p></article>
        <article><b>03 · Governance</b><p>{seriesArchitecture.conferenceLens.governance}</p></article>
      </div>
    </section>

    <section className={styles.section} aria-labelledby="shape">
      <p className={styles.eyebrow}>HONEST PORTFOLIO SHAPE</p><h2 id="shape">A source system, not a 100-post queue.</h2>
      <div className={styles.metrics}>{counts.map(([number,label])=><article key={label}><strong>{number}</strong><span>{label}</span></article>)}</div>
      <p className={styles.note}>The 15 proof-dependent candidates are nine evidence sprints and six editorial labs. They compete for later flagship status; they are not promised publication.</p>
    </section>

    <section className={styles.section} aria-labelledby="series">
      <p className={styles.eyebrow}>SEVEN CROSS-BUILD PUBLIC SERIES</p><h2 id="series">Organize around audience questions, not build numbers.</h2>
      <div className={styles.seriesGrid}>{seriesArchitecture.series.map((series,index)=><article key={series.id}>
        <span>{String(index+1).padStart(2,'0')}</span><h3>{series.title}</h3><p className={styles.question}>{series.question}</p><p>{series.promise}</p><small>{series.builds.length} contributing builds · {series.builds.join(', ')}</small>
      </article>)}</div>
    </section>

    <section className={styles.section} aria-labelledby="phases">
      <p className={styles.eyebrow}>TEN PHASE CHAPTERS</p><h2 id="phases">The intellectual progression of the full corpus.</h2>
      <ol className={styles.phaseList}>{contentMap.phaseSeries.map(phase=><li key={phase.phase}><b>{String(phase.phase).padStart(2,'0')}</b><span><strong>{phase.title}</strong><small>Builds {phase.builds.join(', ')}</small></span></li>)}</ol>
    </section>

    <section className={styles.section} aria-labelledby="atlas">
      <p className={styles.eyebrow}>COMPLETE CONTENT-OPPORTUNITY ATLAS</p><h2 id="atlas">One decision record for every build.</h2>
      <p className={styles.note}>Open a build to see its core question, five evidence-bounded content angles, natural formats, audience, verified technical reality, release trigger and explicit boundary against forced claims.</p>
      <div className={styles.atlas}>{contentMap.builds.map(build=><details key={build.id}>
        <summary><b>{build.id}</b><span>{build.title}</span><em>{treatmentLabels[build.treatment]??build.treatment}</em></summary>
        <div className={styles.buildBody}>
          <div><h3>Core question</h3><p>{build.coreQuestion}</p><h3>Could become</h3><ul>{build.contentAngles.map(angle=><li key={`${build.id}-${angle.kind}`}><b>{angle.kind.replaceAll('-',' ')}:</b> {angle.idea}</li>)}</ul></div>
          <div><h3>Natural formats</h3><p>{build.naturalFormats.join(' · ')}</p><h3>Audience</h3><p>{build.audiences.join(' · ')}</p><h3>Technical truth</h3><p>{build.verifiedTechnicalReality.workingFunctionality}</p></div>
          <div className={styles.boundary}><h3>Do not force</h3><p>{build.doNotForce}</p><h3>Release only when</h3><p>{build.releaseTrigger}</p>{build.parentBuild&&<p><b>Parent build:</b> {build.parentBuild}</p>}</div>
        </div>
      </details>)}</div>
    </section>

    <section className={styles.gate} aria-labelledby="gate">
      <p className={styles.eyebrow}>NON-COMPENSABLE RELEASE GATE</p><h2 id="gate">A piece advances only if every answer is yes.</h2>
      <ol><li>Is the question distinct?</li><li>Does a named audience have a real job?</li><li>Does it reveal an RN proposition rather than a generic topic?</li><li>Does the language match what the artifact actually does?</li><li>Is the evidence sufficient for every material claim?</li><li>Are synthetic inputs, missing validation and counterevidence visible?</li><li>Does it earn a separate piece instead of becoming a section?</li><li>Does the format make the idea clearer or more usable?</li></ol>
    </section>

    <footer className={styles.footer}><p><b>Release status:</b> all 100 builds remain held. This studio is an internal editorial source of truth, not an announcement that the builds are public or production-ready.</p></footer>
  </main></>;
}
