import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('038','b');
import type {Metadata} from 'next';import Link from 'next/link';import MetricSurface from './MetricSurface';import shell from '../../001/room.module.css';export default function Build038B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/038">← Build 038</Link><span>038-B / Interactive visual build</span></nav><MetricSurface/></main>}
