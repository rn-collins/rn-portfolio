import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('078','b');
import EvidenceTravelStory from './EvidenceTravelStory';
import s from '../evidence-translation.module.css';

export default function Page(){return <main className={`${s.page} ${s.storyPage}`} data-build="078" data-variant="B"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>078-B</span></nav><p className={s.kicker}>EVIDENCE DOES NOT TRAVEL INTACT BY ACCIDENT</p><h1>Every retelling<br/>needs guardrails.</h1><p className={s.lede}>Send one fixed synthetic evidence record through an audience translation and inspect what must survive the journey.</p><EvidenceTravelStory/></main>}
