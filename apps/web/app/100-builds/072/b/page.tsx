import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('072','b');
import AccessChangesByIsland from './AccessChangesByIsland';
import s from '../hawaii-access.module.css';

export default function Page() {
  return <main className={s.page} data-build="072" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>072-B</span></nav>
    <p className={s.kicker}>ISLAND COMPARISON VIEW · FICTIONAL FIXTURES</p>
    <h1>Access changes by island.</h1>
    <p className={s.lede}>Reveal five synthetic island contexts. A statewide category never erases the distinct systems a person must navigate.</p>
    <AccessChangesByIsland />
  </main>;
}
