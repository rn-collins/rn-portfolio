import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('006','b');
import Link from 'next/link';
import FormGateField from './FormGateField';
import shell from '../../001/room.module.css';
export default function Build006B(){return <main className={shell.screeningRoom}><nav className={shell.crumb}><Link href="/100-builds/006">← Build 006</Link><span>006-B / Interactive visual build</span></nav><header className={shell.label}><div className={shell.accession}>BUILD 006-B<br/>IN THE LAB</div><div><h1>Form Gate Field</h1><p>Move the conditions around an idea and watch its most defensible candidate form shift across software, service, dataset, company, and keep-simple.</p></div></header><FormGateField/></main>}
