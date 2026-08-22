import LawSaysYes from './LawSaysYes';
import s from '../implementation-index.module.css';

export default function Page() {
  return <main className={s.page} data-build="074" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>074-B</span></nav>
    <p className={s.kicker}>THE LAW SAYS YES · THE SYSTEM SAYS NOT YET</p>
    <h1>A legal opening is not an operating system.</h1>
    <p className={s.lede}>Reveal five fictional implementation records one evidence layer at a time. Permission begins the inquiry; it does not answer whether access exists.</p>
    <LawSaysYes />
  </main>;
}
