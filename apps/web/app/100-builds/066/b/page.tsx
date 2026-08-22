import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('066','b');
import FirmMemoryStory from'./FirmMemoryStory';
import s from'../legal-memory.module.css';

export default function Page(){return <main className={s.page} data-build="066" data-variant="B"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>066-B</span></nav><p className={s.kicker}>FILES HOLD DOCUMENTS. RELATIONSHIPS HOLD MEMORY.</p><h1>The firm knows more than its folders.</h1><FirmMemoryStory/></main>}
