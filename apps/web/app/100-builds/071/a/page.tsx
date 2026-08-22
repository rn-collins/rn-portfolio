import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('071','a');
import MedicalCannabisAccessDashboard from './MedicalCannabisAccessDashboard';
import s from '../access-intelligence.module.css';

export default function Page() {
  return <main className={s.page} data-build="071" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>071-A</span></nav>
    <p className={s.kicker}>FICTIONAL PROGRAM · SYNTHETIC RECORDS · NO MEDICAL OR LEGAL ADVICE</p>
    <h1>“Legal” does not mean accessible.</h1>
    <p className={s.lede}>Inspect the distance between a fictional policy status and a person’s practical path through eligibility, clinicians, geography, supply, cost, disability, language, privacy, and evidence.</p>
    <MedicalCannabisAccessDashboard />
  </main>;
}
