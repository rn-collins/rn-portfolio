import {buildVariantMetadata} from '../../_metadata';\nexport const metadata=buildVariantMetadata('004','a');\nimport type {Metadata} from 'next';
import Link from 'next/link';
import ManualIntelligenceEngine from './ManualIntelligenceEngine';
import s from '../../001/room.module.css';
import fix from './release-fix.module.css';

export default function Build004A(){return <main className={`${s.toolRoom} ${fix.room}`}><nav className={s.crumb}><Link href="/100-builds/004/">← Build 004</Link><span>004-A / Working tool</span></nav><header className={s.label}><div className={s.accession}>BUILD 004-A<br/>IN THE LAB</div><div><h1>Manual Intelligence Engine Method</h1><p>Turn disciplined human research into a repeatable intelligence workflow before deciding what deserves automation.</p></div></header><section className={s.wallText}><strong>Automation should inherit a method, not invent one.</strong><p>Collect sources under an explicit protocol, separate source facts from analyst claims, verify each claim, preserve contradictions and uncertainty, then generate a brief only from material that has actually cleared review.</p></section><section className={s.worktable}><ManualIntelligenceEngine/></section></main>}
