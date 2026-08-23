import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('043','b');
import type{Metadata}from'next';import Link from'next/link';import TeamTopology from'./TeamTopology';import shell from'../../001/room.module.css';export default function Page(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/043">← Build 043</Link><span>043-B / Interactive visual build</span></nav><TeamTopology/></main>}
