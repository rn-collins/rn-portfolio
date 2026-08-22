import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('080','b');
import ArticleFirstOutput from './ArticleFirstOutput';
import s from '../reporting-infrastructure.module.css';
export default function Page(){return <main className={`${s.page} ${s.storyPage}`} data-build="080" data-variant="B"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>080-B</span></nav><p className={s.kicker}>THE ARTICLE WAS ONLY THE FIRST OUTPUT</p><h1>Publish the story.<br/>Unfold the system.</h1><p className={s.lede}>A fixed synthetic article opens into a sourced pipeline of reusable datasets, maps, timelines, trackers, and tools.</p><ArticleFirstOutput/></main>}
