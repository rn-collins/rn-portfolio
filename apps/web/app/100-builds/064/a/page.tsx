import CannabisMemoryArchive from './CannabisMemoryArchive';
import s from '../memory.module.css';

export default function Page(){
  return <main className={s.page} data-build="064" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>064-A</span></nav>
    <p className={s.kicker}>SYNTHETIC CANNABIS INSTITUTIONAL MEMORY ARCHIVE</p>
    <h1>An industry with amnesia repeats itself.</h1>
    <p className={s.lede}>Preserve what a fixed institution recorded, changed, contested, corrected, restricted, and still does not know—without turning an archive into legal authority, medical advice, cultural permission, or historical truth.</p>
    <CannabisMemoryArchive/>
  </main>
}
