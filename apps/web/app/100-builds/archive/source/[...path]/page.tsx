import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import fs from 'node:fs';
import path from 'node:path';
import {publicArchiveDocuments,publicArchiveDocumentSet} from '../../../_archive/public-documents';
import s from './source.module.css';

const repoRoot=path.resolve(process.cwd(),'../..');
function sourcePath(parts:string[]){return parts.join('/');}
function readAllowed(file:string){if(!publicArchiveDocumentSet.has(file))notFound();const absolute=path.resolve(repoRoot,file);if(!absolute.startsWith(repoRoot+path.sep))notFound();if(!fs.existsSync(absolute)||!fs.statSync(absolute).isFile())notFound();return fs.readFileSync(absolute,'utf8');}
export function generateStaticParams(){return publicArchiveDocuments.map(file=>({path:file.split('/')}));}
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}):Promise<Metadata>{const {path:parts}=await params;const file=sourcePath(parts);if(!publicArchiveDocumentSet.has(file))return {title:'Archive record not found',robots:{index:false,follow:false}};const title=`Archive Record — ${file.split('/').at(-1)}`;const description=`Full allowlisted system-of-record file: ${file}`;return {title,description,alternates:{canonical:`/100-builds/archive/source/${file}`},robots:{index:false,follow:true}};}
export default async function ArchiveSourcePage({params}:{params:Promise<{path:string[]}>}){const {path:parts}=await params;const file=sourcePath(parts);const content=readAllowed(file);return <main className={s.page}><header className={s.mast}><Link href="/100-builds/archive">← PROGRAM ARCHIVE</Link><span>FULL ARCHIVE RECORD</span></header><section className={s.hero}><span>ALLOWLISTED DURABLE SOURCE</span><h1>{file.split('/').at(-1)}</h1><code>{file}</code><p>This is the retained record itself—not a chat summary. It is exposed because it materially documents the research, method, evidence, audit, production, planning or release history of The 100.</p></section><section className={s.record}><pre>{content}</pre></section><footer className={s.footer}><Link href="/100-builds/archive">RETURN TO PROGRAM ARCHIVE →</Link></footer></main>}
