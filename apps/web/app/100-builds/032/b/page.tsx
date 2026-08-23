import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('032','b');
import type {Metadata} from 'next';import Link from 'next/link';import ReleaseDoor from './ReleaseDoor';import shell from '../../001/room.module.css';export default function Build032B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/032">← Build 032</Link><span>032-B / Interactive visual build</span></nav><ReleaseDoor/></main>}
