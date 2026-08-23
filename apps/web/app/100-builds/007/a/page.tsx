import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('007','a');
import Link from 'next/link';
import FeedbackLoopLab from './FeedbackLoopLab';
import shell from '../../001/room.module.css';
export default function Build007A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/007">← Build 007</Link><span>007-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 007-A</span><h1>Feedback Loop Product Architecture</h1></div><p>Map what the product can hear, who may act, and what must happen before feedback becomes a validated and communicated improvement.</p></header><FeedbackLoopLab/></main>}
