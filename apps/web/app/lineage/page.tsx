import type {Metadata} from 'next';
import Link from 'next/link';
import {builds,phases} from '../../../../packages/registry/src/index';
import s from './lineage.module.css';

export const metadata:Metadata={title:'Capability Lineage',description:'Trace the concrete earlier-build capabilities inherited by each build in The 100.',alternates:{canonical:'/lineage'}};

export default function Lineage(){
 return <main className={s.page}>
  <header className={s.mast}><Link href="/100-builds">← THE 100</Link><span>CAPABILITY LINEAGE / 001–100</span></header>
  <section className={s.hero}><span>ROOM 03 / INFRASTRUCTURE</span><h1>Nothing starts from zero.</h1><p>Every connection below is a declared prerequisite in the frozen lineage record. The links show capability inheritance—not thematic similarity, endorsement, or proof that a later build is production-ready.</p></section>
  <nav className={s.jump} aria-label="Jump to lineage phase">{phases.map(p=><a key={p.id} href={'#lineage-phase-'+p.id}>{String(p.id).padStart(2,'0')} · {p.name}</a>)}</nav>
  {phases.map(phase=><section className={s.phase} id={'lineage-phase-'+phase.id} key={phase.id}><header><span>PHASE {String(phase.id).padStart(2,'0')}</span><h2>{phase.name}</h2></header><ol>{builds.filter(b=>b.phase===phase.id).map(b=><li key={b.id}><div className={s.identity}><Link href={'/100-builds/'+b.id}><b>{b.id}</b><strong>{b.title}</strong></Link><span>{b.publicState==='OnView'?'ON VIEW':b.publicState==='InLab'?'IN THE LAB':'COMING NEXT'}</span></div><div className={s.dependencies}><small>DIRECT PREREQUISITES</small>{b.usesInfrastructure.length?<p>{b.usesInfrastructure.map((id,i)=><span key={id}><Link href={'/100-builds/'+id}>{id}</Link>{i<b.usesInfrastructure.length-1?' · ':''}</span>)}</p>:<p>Foundation build · no earlier prerequisite declared</p>}</div><div className={s.output}><small>CREATED CAPABILITY</small><p>{b.createsInfrastructure.join(' · ')}</p></div></li>)}</ol></section>)}
  <footer><Link href="/100-builds">RETURN TO MAIN GALLERY →</Link><Link href="/100-builds/archive">CHECK ARCHIVE COVERAGE →</Link></footer>
 </main>
}
