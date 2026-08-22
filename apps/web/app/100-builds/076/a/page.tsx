import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('076','a');
import RegulatoryIntelligencePlatform from './RegulatoryIntelligencePlatform';
import s from '../jurisdiction-intelligence.module.css';

export default function Page() {
  return <main className={s.page} data-build="076" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>076-A</span></nav>
    <p className={s.kicker}>CROSS-JURISDICTION REGULATORY INTELLIGENCE · SYNTHETIC DEMONSTRATION</p>
    <h1>Compare the provision.<br />Inspect the source.</h1>
    <p className={s.lede}>A five-jurisdiction registry keeps language, provenance, date context, and interpretive limits attached while a comparative query reveals meaningful differences between similar-looking fictional laws.</p>
    <RegulatoryIntelligencePlatform />
  </main>;
}
