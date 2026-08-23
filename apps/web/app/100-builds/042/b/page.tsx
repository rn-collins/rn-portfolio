import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('042','b');
import type{Metadata}from'next';import Link from'next/link';import RoleTopology from'./RoleTopology';import shell from'../../001/room.module.css';export default function Page(){return <main className={shell.visualRoom}><nav className={shell.crumb}><Link href="/100-builds/042">← Build 042</Link><span>042-B / Interactive visual build</span></nav><RoleTopology/></main>}
