import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('035','b');
import type {Metadata} from 'next';import Link from 'next/link';import DataJourney from './DataJourney';import shell from '../../001/room.module.css';export default function Build035B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/035">← Build 035</Link><span>035-B / Interactive visual build</span></nav><DataJourney/></main>}
