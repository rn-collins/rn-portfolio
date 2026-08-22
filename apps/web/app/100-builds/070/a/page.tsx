import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('070','a');
import RegulatoryLifecycleTracker from './RegulatoryLifecycleTracker';
import s from '../regulatory-lifecycle.module.css';

export default function Page() {
  return <main className={s.page} data-build="070" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>070-A</span></nav>
    <p className={s.kicker}>FICTIONAL POLICY · SYNTHETIC EVIDENCE · NO LEGAL ADVICE</p>
    <h1>A vote is one event in a much longer lifecycle.</h1>
    <p className={s.lede}>Inspect a fictional psychedelic-policy record from advocacy and proposal through implementation, contestation, evaluation, and revision—without treating legalization as proof of access, equity, safety, effectiveness, legitimacy, or completion.</p>
    <RegulatoryLifecycleTracker />
  </main>;
}

