import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('082','b');
import PersonaRelationshipStory from './PersonaRelationshipStory';
import s from '../audience-graph.module.css';
export default function Page(){return <main className={`${s.page} ${s.storyPage}`} data-build="082" data-variant="B"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>082-B</span></nav><p className={s.kicker}>AN AUDIENCE IS NOT A DEMOGRAPHIC BOX</p><h2>Retire the persona card.<br/>Reveal the relationships.</h2><p className={s.lede}>Expand one fictional context card into a bounded graph of needs, language, trust references, relationships, and unknowns.</p><PersonaRelationshipStory/></main>}
