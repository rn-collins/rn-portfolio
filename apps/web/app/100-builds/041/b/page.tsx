import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('041','b');
import type{Metadata}from'next';import Link from'next/link';import OwnershipTopology from'./OwnershipTopology';import shell from'../../001/room.module.css';export default function Page(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/041">← Build 041</Link><span>041-B / Interactive visual build</span></nav><OwnershipTopology/></main>}
