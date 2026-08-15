import Link from 'next/link';
import MeaningArchitecture from './MeaningArchitecture';
import LocalReset from '../../_components/LocalReset';
import room from '../../001/room.module.css';

export default function Build002A(){return <main className={room.toolRoom}>
<nav className={room.crumb}><Link href="/100-builds/002">← Build 002</Link><span>002-A / Working tool</span></nav>
<header className={room.label}><div className={room.accession}>BUILD 002-A<br/>ACTIVE PROTOTYPE</div><div><h1>Multi-Audience Meaning Architecture</h1><p>Change the language for the person in front of you without quietly changing the claim underneath it.</p></div></header>
<section className={room.wallText}><strong>Who can use it</strong><p>If you have one idea that needs to make sense to different people, you can use this. You do not need communications training, prompt-engineering knowledge, or linguistic terminology.</p></section>
<section className={room.wallText}><strong>What is technologically different</strong><p>The adaptation layer and the truth-check layer are separate. This prototype transforms register locally in the browser, then audits numbers, negation, uncertainty, named anchors, and facts you explicitly lock. Later model-based generation can plug into the same verification architecture without becoming the judge of its own output.</p></section>
<section className={room.worktable} style={{boxSizing:'border-box',width:'100%',minWidth:0}} aria-label="Meaning architecture worktable"><MeaningArchitecture/><div style={{marginTop:16}}><LocalReset /></div></section>
<section className={room.method}><strong>Core rule</strong><div><h2>Change the door. Do not move the room behind it.</h2><p>A high preservation score is not proof that two statements mean exactly the same thing. For legal, scientific, clinical, regulatory, multilingual, or culturally sensitive communication, review the transformed version with the relevant human expertise.</p></div></section>
</main>}
