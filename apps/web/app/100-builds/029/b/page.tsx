import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('029','b');
import type {Metadata} from 'next';import Link from 'next/link';import DiffGraph from './DiffGraph';import shell from '../../001/room.module.css';export default function Build029B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/029">← Build 029</Link><span>029-B / Interactive visual build</span></nav><DiffGraph/></main>}
