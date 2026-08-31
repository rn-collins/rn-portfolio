import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('005','b');
import Link from 'next/link';
import ServicePathSplit from './ServicePathSplit';
import shell from '../../001/room.module.css';
export default function Build005B(){return <main className={shell.screeningRoom}><nav className={shell.crumb}><Link href="/100-builds/005">← Build 005</Link><span>005-B / Interactive visual build</span></nav><header className={shell.label}><div className={shell.accession}>BUILD 005-B<br/>IN THE LAB</div><div><h2>Service Path Split</h2><p>Change the conditions around repeated service work and watch the path separate into software candidates, expert judgment, and work that should disappear.</p></div></header><ServicePathSplit/></main>}
