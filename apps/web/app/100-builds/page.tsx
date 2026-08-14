import Link from 'next/link';
import Script from 'next/script';
import Exhibition from './exhibition';

export default function BuildsPage(){
  return <>
    <Script src="/data/100-builds.js" strategy="afterInteractive" />
    <header className="topbar"><div className="shell nav"><Link href="/">RN Systems Lab</Link><span className="mono">The 100 · public engineering sequence</span></div></header>
    <section className="hero"><div className="shell"><div className="eyebrow">Digital exhibition · Systems laboratory · Living lineage</div><h1>100</h1><h2>Build the system. Build the explanation. Leave capability behind.</h2><p>One hundred functional builds paired with one hundred bespoke visual builds. The sequence begins with small deterministic tools and compounds toward integrated systems, while every public cycle documents what it inherited and what it made possible next.</p></div></section>
    <main className="section"><div className="shell"><Exhibition /></div></main>
  </>;
}
