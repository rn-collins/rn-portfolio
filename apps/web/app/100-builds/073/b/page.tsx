import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('073','b');
import AccessForWhom from './AccessForWhom';
import s from '../psychedelic-equity.module.css';

export default function Page() {
  return <main className={s.page} data-build="073" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>073-B</span></nav>
    <p className={s.kicker}>ACCESS FOR WHOM? · SYNTHETIC COMPARISON</p>
    <h1>A reform map is not an access map.</h1>
    <p className={s.lede}>Redraw one celebratory signal through five fictional barriers. Each reveal asks what the headline leaves out.</p>
    <AccessForWhom />
  </main>;
}
