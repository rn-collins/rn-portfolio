import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('074','a');
import AccessImplementationIndex from './AccessImplementationIndex';
import s from '../implementation-index.module.css';

export default function Page() {
  return <main className={s.page} data-build="074" data-variant="A">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>074-A</span></nav>
    <p className={s.kicker}>COMPARATIVE IMPLEMENTATION INDEX · SYNTHETIC EVIDENCE ONLY</p>
    <h1>Access is not enacted in a single moment.</h1>
    <p className={s.lede}>Compare what five invented jurisdictions can—and cannot—show about the distance between permission on paper and implementation in practice.</p>
    <AccessImplementationIndex />
  </main>;
}
