import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('027','b');
import type {Metadata} from 'next';import Link from 'next/link';import OwnershipBoard from './OwnershipBoard';import shell from '../../001/room.module.css';export default function Build027B(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/027">← Build 027</Link><span>027-B / Interactive visual build</span></nav><OwnershipBoard/></main>}
