import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('076','b');
import DifferenceAwareMap from './DifferenceAwareMap';
import s from '../jurisdiction-intelligence.module.css';

export default function Page() {
  return <main className={`${s.page} ${s.mapPage}`} data-build="076" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>076-B</span></nav>
    <p className={s.kicker}>THE MAP THAT KNOWS THE DIFFERENCE BETWEEN SIMILAR LAWS</p>
    <h1>Same label.<br />Different rule.</h1>
    <p className={s.lede}>Five fictional jurisdictions appear aligned until the comparison opens the source record. Move through the registry to see why matching labels are not interchangeable legal meaning.</p>
    <DifferenceAwareMap />
  </main>;
}
