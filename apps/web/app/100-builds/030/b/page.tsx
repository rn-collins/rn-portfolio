import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('030','b');
import type {Metadata} from 'next';import Link from 'next/link';import LiveRepair from './LiveRepair';import shell from '../../001/room.module.css';export default function Build030B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/030">← Build 030</Link><span>030-B / Interactive visual build</span></nav><LiveRepair/></main>}
