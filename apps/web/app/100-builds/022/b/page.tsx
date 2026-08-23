import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('022','b');
import type {Metadata} from 'next';
import Link from 'next/link';
import ImpactField from './ImpactField';
import shell from '../../001/room.module.css';

export default function Build022B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/022">← Build 022</Link><span>022-B / Interactive visual build</span></nav><ImpactField/></main>}
