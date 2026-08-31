import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('079','b');
import SearchToMapStory from './SearchToMapStory';
import s from '../evidence-navigation.module.css';
export default function Page(){return <main className={`${s.page} ${s.storyPage}`} data-build="079" data-variant="B"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>079-B</span></nav><p className={s.kicker}>A SEARCH RESULT IS NOT AN EVIDENCE MAP</p><h2>Results retrieve.<br/>Maps qualify.</h2><p className={s.lede}>Reorganize a flat synthetic results page by question, evidence type, quality, and applicability while keeping uncertainty and limits visible.</p><SearchToMapStory/></main>}
