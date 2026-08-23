import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('046','b');
import type{Metadata}from'next';import Link from'next/link';import CascadeStory from'./CascadeStory';import shell from'../../001/room.module.css';export default function Page(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/046">← Build 046</Link><span>046-B / Interactive visual build</span></nav><CascadeStory/></main>}
