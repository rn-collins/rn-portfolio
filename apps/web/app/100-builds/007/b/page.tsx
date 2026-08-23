import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('007','b');
import Link from 'next/link';
import GovernedLoopField from './GovernedLoopField';
import shell from '../../001/room.module.css';
export default function Build007B(){return <main className={shell.screeningRoom}><nav className={shell.crumb}><Link href="/100-builds/007">← Build 007</Link><span>007-B / Interactive visual build</span></nav><header className={shell.label}><div className={shell.accession}>BUILD 007-B<br/>IN THE LAB</div><div><h1>The Product That Learns</h1><p>Change the scenario and watch one-way delivery close into a visible, governed loop—with a person who can decide, pause, validate, and communicate.</p></div></header><GovernedLoopField/></main>}
