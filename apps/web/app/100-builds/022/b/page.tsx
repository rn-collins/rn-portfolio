import type {Metadata} from 'next';
import Link from 'next/link';
import ImpactField from './ImpactField';
import shell from '../../001/room.module.css';
export const metadata:Metadata={title:'Build 022-B — Human Impact Nodes',description:'Human impact nodes light up as workflow assumptions change.',alternates:{canonical:'/100-builds/022/b'}};
export default function Build022B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/022">← Build 022</Link><span>022-B / Interactive visual build</span></nav><ImpactField/></main>}
