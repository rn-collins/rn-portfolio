import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('072','a');
import HawaiiAccessSystemsMap from './HawaiiAccessSystemsMap';
import s from '../hawaii-access.module.css';

export default function Page() {
  return <main className={s.page} data-build="072" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>072-A</span></nav>
    <p className={s.kicker}>FULLY FICTIONAL ISLAND SCENARIOS · NO REAL PLACE OR COMMUNITY</p>
    <h1>Invented constraints. Fictional access paths.</h1>
    <p className={s.lede}>Compare how invented provider, transport, supply, infrastructure, and administration constraints alter a fictional access path. No real island, policy, or community is represented.</p>
    <HawaiiAccessSystemsMap />
  </main>;
}
