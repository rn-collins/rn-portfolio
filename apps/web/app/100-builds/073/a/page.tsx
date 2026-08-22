import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('073','a');
import PsychedelicAccessEquityIndex from './PsychedelicAccessEquityIndex';
import s from '../psychedelic-equity.module.css';

export default function Page() {
  return <main className={s.page} data-build="073" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>073-A</span></nav>
    <p className={s.kicker}>SYNTHETIC EQUITY INDEX · INDICATORS, NOT A VERDICT</p>
    <h1>Access is more than reform on paper.</h1>
    <p className={s.lede}>Inspect cost, geography, eligibility, culture, disability, language, workforce, and legal-risk signals across five invented access contexts—without turning a model into proof.</p>
    <PsychedelicAccessEquityIndex />
  </main>;
}
