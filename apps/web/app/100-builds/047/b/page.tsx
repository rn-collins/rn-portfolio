import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('047','b');
import type{Metadata}from'next';import Link from'next/link';import TransferStory from'./TransferStory';import shell from'../../001/room.module.css';export default function Page(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/047">← Build 047</Link><span>047-B / Interactive visual build</span></nav><TransferStory/></main>}
