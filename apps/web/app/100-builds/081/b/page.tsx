import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('081','b');
import MissingSystemStory from './MissingSystemStory';
import s from '../unmet-need.module.css';
export default function Page(){return <main className={`${s.page} ${s.storyPage}`} data-build="081" data-variant="B"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>081-B</span></nav><p className={s.kicker}>LISTENING FOR THE MISSING SYSTEM</p><h2>Posts repeat.<br/>Decisions remain unresolved.</h2><p className={s.lede}>Resolve a fictional conversation field into repeated unmet decisions and bounded need hypotheses while keeping every validation gap visible.</p><MissingSystemStory/></main>}
