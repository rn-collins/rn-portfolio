import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('018','b');
import type {Metadata} from 'next';import Link from 'next/link';import ProcessDrag from './ProcessDrag';import shell from '../../001/room.module.css';export default function Build018B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/018">← Build 018</Link><span>018-B / Interactive visual build</span></nav><ProcessDrag/></main>}
