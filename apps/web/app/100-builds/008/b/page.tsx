import type {Metadata} from 'next';
import Link from 'next/link';
import DecisionPathField from './DecisionPathField';
import shell from '../../001/room.module.css';

export const metadata:Metadata={
  title:'Build 008-B — Data Is Not a Decision',
  description:'A chart wall resolves into decision, owner, action and next state.',
  alternates:{canonical:'/100-builds/008/b'}
};

export default function Build008B(){
  return <main className={shell.toolRoom}>
    <nav className={shell.crumb}><Link href="/100-builds/008">← Build 008</Link><span>008-B / Web expression</span></nav>
    <header className={shell.toolLabel}><div><span>BUILD 008-B</span><h1>Data Is Not a Decision</h1></div><p>Move from displayed information to a reviewable commitment: decision, accountable owner, authorized action, and observable next state.</p></header>
    <DecisionPathField/>
  </main>
}
