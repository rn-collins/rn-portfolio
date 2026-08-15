import Link from 'next/link';
import { builds, phases } from '../../../../packages/registry/src/index';
import s from './gallery.module.css';

export default function Exhibition(){
  return <>{phases.map(phase=>{
    const works=builds.filter(b=>b.phase===phase.id);
    return <section className={s.phase} key={phase.id}>
      <header className={s.phaseHead}>
        <span>ROOM {String(phase.id).padStart(2,'0')}</span>
        <h2>{phase.name}</h2>
        <i>BUILDS {String(phase.range[0]).padStart(3,'0')}—{String(phase.range[1]).padStart(3,'0')}</i>
      </header>
      <div className={s.works}>{works.map(b=>{
        const active=b.id==='001'||b.functional.status!=='Planned'||b.visual.status!=='Planned';
        return <Link className={`${s.work} ${active?s.onView:s.planned}`} key={b.id} href={`/100-builds/${b.id}`}>
          <div className={s.accession}><span>{b.id} / 100</span><span>{active?'ON VIEW':'PLANNED'}</span></div>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <div className={s.status}>A / {b.functional.status}<br/>B / {b.visual.status}</div>
        </Link>;
      })}</div>
    </section>;
  })}</>;
}
