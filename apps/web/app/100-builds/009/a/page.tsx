import type {Metadata} from 'next';
import Link from 'next/link';
import PlaceReadinessLab from './PlaceReadinessLab';
import shell from '../../001/room.module.css';
export const metadata:Metadata={title:'Build 009-A — Place-Sensitive Technology Readiness',description:'Test technology requirements against evidenced local capacity before assuming transferability.',alternates:{canonical:'/100-builds/009/a'}};
export default function Build009A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/009">← Build 009</Link><span>009-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 009-A</span><h1>Place-Sensitive Technology Readiness</h1></div><p>Compare what a technology requires with what this place can evidence—then define a bounded pilot, fallback, stop condition, and local authority.</p></header><PlaceReadinessLab/></main>}
