import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('005','a');
import Link from 'next/link';
import ServiceSoftwareLab from './ServiceSoftwareLab';
import shell from '../../001/room.module.css';
export default function Build005A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/005">← Build 005</Link><span>005-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 005-A</span><h1>Service-to-Software Discovery</h1></div><p>Map the work people actually repeat. Then decide whether each step looks like a software candidate, expert judgment, or waste that should disappear.</p></header><ServiceSoftwareLab/></main>}
