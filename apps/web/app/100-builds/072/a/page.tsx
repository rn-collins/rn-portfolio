import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('072','a');
import HawaiiAccessSystemsMap from './HawaiiAccessSystemsMap';
import s from '../hawaii-access.module.css';

export default function Page() {
  return <main className={s.page} data-build="072" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>072-A</span></nav>
    <p className={s.kicker}>SYNTHETIC ISLAND SYSTEM · COMPARISON, NOT AUTHORITY</p>
    <h1>One statewide policy. Many access realities.</h1>
    <p className={s.lede}>Trace how the same fictional policy record meets different clinician, transportation, supply, infrastructure, and community-context conditions across five invented island scenarios.</p>
    <HawaiiAccessSystemsMap />
  </main>;
}
