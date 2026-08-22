import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('077','b');
import OneSentenceStory from './OneSentenceStory';
import s from '../change-impact.module.css';

export default function Page() {
  return <main className={`${s.page} ${s.storyPage}`} data-build="077" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>077-B</span></nav>
    <p className={s.kicker}>WHAT DOES THIS CHANGE ACTUALLY DO?</p>
    <h1>One notice.<br />A whole ecosystem.</h1>
    <p className={s.lede}>Propagate one fictional regulatory notice to reveal the actors, obligations, deadlines, dependencies, risks, and unknowns attached to its compact language.</p>
    <OneSentenceStory />
  </main>;
}
