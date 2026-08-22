import RegulatoryDesignWorkspace from './RegulatoryDesignWorkspace';
import s from '../regulatory-design.module.css';

export default function Page() {
  return <main className={s.page} data-build="075" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>075-A</span></nav>
    <p className={s.kicker}>REGULATORY DESIGN COMPARISON SYSTEM · SYNTHETIC MODELS ONLY</p>
    <h1>Regulation is a machine made of choices.</h1>
    <p className={s.lede}>Hold one invented policy goal steady, then inspect how five synthetic designs distribute governance, licensing, rights, data, financing, and implementation work.</p>
    <RegulatoryDesignWorkspace />
  </main>;
}
