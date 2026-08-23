import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('033','b');
import type {Metadata} from 'next';import Link from 'next/link';import AttackGraph from './AttackGraph';import shell from '../../001/room.module.css';export default function Build033B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/033">← Build 033</Link><span>033-B / Interactive visual build</span></nav><AttackGraph/></main>}
