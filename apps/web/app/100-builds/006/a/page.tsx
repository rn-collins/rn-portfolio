import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('006','a');
import Link from 'next/link';
import SoftwareWorthinessLab from './SoftwareWorthinessLab';
import shell from '../../001/room.module.css';
export default function Build006A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/006">← Build 006</Link><span>006-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 006-A</span><h1>Does This Actually Deserve to Be Software?</h1></div><p>Start with the decision gap and the work itself. Then test whether the opportunity deserves software—or whether a service, dataset, company, or simple process is the stronger form.</p></header><SoftwareWorthinessLab/></main>}
