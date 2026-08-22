import ChangeImpactExplorer from './ChangeImpactExplorer';
import s from '../change-impact.module.css';

export default function Page() {
  return <main className={s.page} data-build="077" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>077-A</span></nav>
    <p className={s.kicker}>REGULATORY CHANGE → CONSEQUENCE ENGINE · SYNTHETIC DEMONSTRATION</p>
    <h1>Trace the change.<br />Keep every limit.</h1>
    <p className={s.lede}>Translate one fixed fictional notice into affected actors, obligations, timelines, conditional risks, opportunities, and unresolved questions—without turning a synthetic trace into legal advice or a prediction.</p>
    <ChangeImpactExplorer />
  </main>;
}
