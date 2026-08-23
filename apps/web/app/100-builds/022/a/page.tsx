import {buildVariantMetadata} from '../../_metadata';
export const metadata=buildVariantMetadata('022','a');
import type {Metadata} from 'next';
import Link from 'next/link';
import HumanConsequenceLab from './HumanConsequenceLab';
import shell from '../../001/room.module.css';

export default function Build022A(){return <main className={shell.toolRoom}><nav className={shell.crumb}><Link href="/100-builds/022">← Build 022</Link><span>022-A / Functional build</span></nav><header className={shell.toolLabel}><div><span>BUILD 022-A</span><h1>Human Consequence Map for AI Workflows</h1></div><p>Trace an AI-assisted workflow outward from its decision point to the people, households, workers, and communities who can experience its consequences.</p></header><HumanConsequenceLab/></main>}
