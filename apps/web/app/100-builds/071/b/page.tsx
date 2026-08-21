import LegalDoesNotMeanAccessible from './LegalDoesNotMeanAccessible';
import s from '../access-intelligence.module.css';

export default function Page() {
  return <main className={s.page} data-build="071" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>071-B</span></nav>
    <p className={s.kicker}>SYSTEM X-RAY · FICTIONAL ACCESS PATH</p>
    <h1>Between “legal” and accessible is an entire system.</h1>
    <p className={s.lede}>Advance through eleven separate gates. Passing one never proves the next.</p>
    <LegalDoesNotMeanAccessible />
  </main>;
}
