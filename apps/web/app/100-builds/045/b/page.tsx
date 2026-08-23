import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('045','b');
import type{Metadata}from'next';import Link from'next/link';import JourneyStory from'./JourneyStory';import shell from'../../001/room.module.css';export default function Page(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/045">← Build 045</Link><span>045-B / Interactive visual build</span></nav><JourneyStory/></main>}
