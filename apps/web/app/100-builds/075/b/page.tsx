import SameGoalDifferentMachine from './SameGoalDifferentMachine';
import s from '../regulatory-design.module.css';

export default function Page() {
  return <main className={`${s.page} ${s.storyPage}`} data-build="075" data-variant="B">
    <nav aria-label="Build navigation"><a href="/100-builds">100 BUILDS</a><span>075-B</span></nav>
    <p className={s.kicker}>SAME GOAL, DIFFERENT REGULATORY MACHINE · SYNTHETIC STORY</p>
    <h1>Swap one gear.<br />Watch the work move.</h1>
    <p className={s.lede}>Model Alpha keeps its invented policy goal and seven design choices. Change only its licensing machine to reveal new administrative tensions—never predicted outcomes.</p>
    <SameGoalDifferentMachine />
  </main>;
}
