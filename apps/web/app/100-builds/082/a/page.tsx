import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('082','a');
import AudienceKnowledgeGraph from './AudienceKnowledgeGraph';
import s from '../audience-graph.module.css';
export default function Page(){return <main className={s.page} data-build="082" data-variant="A"><nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>082-A</span></nav><p className={s.kicker}>AUDIENCE INTELLIGENCE KNOWLEDGE GRAPH · SYNTHETIC DEMONSTRATION</p><h1>How does this audience<br/>actually think?</h1><p className={s.lede}>Map a fixed synthetic audience context through needs, language, behavior, trust references, misconceptions, channels, relationships, and conversion evidence—without reducing people to demographic boxes.</p><AudienceKnowledgeGraph/></main>}
