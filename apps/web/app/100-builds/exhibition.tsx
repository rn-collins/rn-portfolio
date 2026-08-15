import Link from 'next/link';
import { builds, phases } from '../../../../packages/registry/src/index';
import s from './gallery.module.css';

const stateLabel={OnView:'ON VIEW',InLab:'IN THE LAB',ComingNext:'COMING NEXT'} as const;
export default function Exhibition(){
  return <>{phases.map(phase=>{
    const works=builds.filter(b=>b.phase===phase.id);
    return <section className={s.phase} key={phase.id} aria-labelledby={`phase-${phase.id}`}>
      <header className={s.phaseHead}>
        <span>ROOM {String(phase.id).padStart(2,'0')}</span>
        <h2 id={`phase-${phase.id}`}>{phase.name}</h2>
        <i>BUILDS {String(phase.range[0]).padStart(3,'0')}—{String(phase.range[1]).padStart(3,'0')}</i>
      </header>
      <div className={s.works}>{works.map(b=>{
        const stateClass=b.publicState==='OnView'?s.onView:b.publicState==='InLab'?s.inLab:s.comingNext;
        return <Link className={`${s.work} ${stateClass}`} key={b.id} href={`/100-builds/${b.id}`} aria-label={`Build ${b.id}: ${b.title}. ${stateLabel[b.publicState]}.`}>
          <div className={s.buildMeta}><span>{b.id} / 100</span><span className={s.state}>{stateLabel[b.publicState]}</span></div>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <div className={s.status}>{b.publicState==='OnView'?'WORKING A + INTERACTIVE B AVAILABLE':b.publicState==='InLab'?'WORKING BUILD · CERTIFICATION IN PROGRESS':'FROZEN CANON · FUTURE CYCLE'}</div>
        </Link>;
      })}</div>
    </section>;
  })}</>;
}
