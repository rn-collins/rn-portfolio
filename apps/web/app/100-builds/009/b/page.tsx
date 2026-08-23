import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('009','b');
import type {Metadata} from 'next';
import Link from 'next/link';
import FeasibilityField from './FeasibilityField';
import shell from '../../001/room.module.css';

export default function Build009B(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/009">← Build 009</Link><span>009-B / Web expression</span></nav><header className={shell.toolLabel}><div><span>BUILD 009-B</span><h1>Transfer Is a Place Question</h1></div><p>Change the place—not the technology—and watch feasibility, required adaptations, and local authority move.</p></header><FeasibilityField/></main>}
