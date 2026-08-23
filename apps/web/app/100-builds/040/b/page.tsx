import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('040','b');
import type {Metadata} from 'next';import Link from 'next/link';import DecisionBoundary from './DecisionBoundary';import shell from '../../001/room.module.css';export default function Build040B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/040">← Build 040</Link><span>040-B / Interactive visual build</span></nav><DecisionBoundary/></main>}
