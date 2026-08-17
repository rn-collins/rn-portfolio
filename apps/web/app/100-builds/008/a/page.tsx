import type {Metadata} from 'next';
import Link from 'next/link';
import DecisionDashboardLab from './DecisionDashboardLab';
import shell from '../../001/room.module.css';
export const metadata:Metadata={title:'Build 008-A — Decision-Ready Dashboard Standard',description:'Turn a wall of metrics into a decision, owner, action and next state.',alternates:{canonical:'/100-builds/008/a'}};
export default function Build008A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/008">← Build 008</Link><span>008-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 008-A</span><h1>Decision-Ready Dashboard Standard</h1></div><p>Keep only the information that can change a named decision—then make ownership, authority, action, timing, escalation, and the next observable state explicit.</p></header><DecisionDashboardLab/></main>}
