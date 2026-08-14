import Link from 'next/link';
import Script from 'next/script';
import Exhibition from './exhibition';

export default function BuildsPage(){
  return <>
    <Script src="/data/100-builds.js" strategy="afterInteractive" />
    <header className="topbar"><div className="shell nav"><Link href="/">RN Builds</Link><span className="mono">100 Builds</span></div></header>
    <section className="hero"><div className="shell"><div className="eyebrow">Digital exhibition · Engineering lab · Living lineage</div><h1>100</h1><h2>I keep noticing systems that should exist. So I’m building them.</h2><p>100 functional builds paired with 100 LinkedIn-native visual builds, sequenced so every cycle leaves real reusable capability behind for later work.</p></div></section>
    <main className="section"><div className="shell"><Exhibition /></div></main>
  </>;
}
