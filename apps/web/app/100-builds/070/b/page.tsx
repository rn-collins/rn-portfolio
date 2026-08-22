import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('070','b');
import LegalizationLifecycleStory from './LegalizationLifecycleStory';
import s from '../regulatory-lifecycle.module.css';

export default function Page() {
  return <main className={s.page} data-build="070" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>070-B</span></nav>
    <p className={s.kicker}>LEGALIZATION IS A LIFECYCLE, NOT A VOTE.</p>
    <h1>The vote does not finish the story.</h1>
    <LegalizationLifecycleStory />
  </main>;
}

