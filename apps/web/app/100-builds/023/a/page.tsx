import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('023','a');
import type {Metadata} from 'next';import Link from 'next/link';import ConsentRightsLab from './ConsentRightsLab';import shell from '../../001/room.module.css';

export default function Build023A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/023">← Build 023</Link><span>023-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 023-A</span><h1>Consent & Data Rights Manager</h1></div><p>Separate permission by purpose, preserve every state change, and route access, correction, deletion, retention, and downstream-use questions.</p></header><ConsentRightsLab/></main>}