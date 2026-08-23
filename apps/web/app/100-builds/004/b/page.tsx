import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('004','b');
import type {Metadata} from 'next';
import Link from 'next/link';
import IntelligenceChainStory from './IntelligenceChainStory';
import s from './manual-intelligence-story.module.css';

const gates=[['01','COLLECT','What is the source, where did it come from, and why is it here?'],['02','SEPARATE','What does the source actually contain—and what is the analyst claiming?'],['03','VERIFY','What survives checking, what conflicts, and what remains uncertain?'],['04','BRIEF','What can a decision-maker responsibly act on now?']];
export default function Build004B(){return <main className={s.page}><nav><Link href="/100-builds/004">← BUILD 004</Link><span>004-B / INTERACTIVE VISUAL MASTER</span></nav><header><p>BEFORE THE AUTOMATION</p><h1>Research does not become intelligence because you collected more of it.</h1><p className={s.dek}>The method is the transformation layer.</p></header><IntelligenceChainStory/><div className={s.arrow}>↓</div><section className={s.gates} aria-label="Passive intelligence-chain summary">{gates.map(([n,h,p])=><article key={n}><strong>{n}</strong><div><h2>{h}</h2><p>{p}</p></div></article>)}</section><div className={s.arrow}>↓</div><section className={s.output}><span>DECISION-READY OUTPUT</span><h2>Verified findings stay separate from contradiction, uncertainty, and open questions.</h2><p>Only after the human method is explicit do you know which parts are safe to automate—and which parts must remain judgment.</p></section><footer><Link href="/100-builds/004/a">OPEN THE WORKING ENGINE →</Link></footer></main>}
