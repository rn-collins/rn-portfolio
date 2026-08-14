import Link from 'next/link';

export default function Home() {
  return <>
    <header className="topbar"><div className="shell nav"><strong>RN Builds</strong><span className="mono">Platform foundation · F0</span></div></header>
    <main>
      <section className="hero"><div className="shell"><div className="eyebrow">RN Collins · public engineering lab</div><h1>RN Builds</h1><h2>The portfolio is becoming the laboratory.</h2><p>This Next.js application is the migration target for the existing RN Builds portfolio. Production remains on the current static site until feature parity and preview QA pass.</p><p><Link href="/100-builds">Enter the 100 Builds exhibition →</Link></p></div></section>
      <section className="section"><div className="shell"><h2 className="serif">Migration principle</h2><p>The existing portfolio remains authoritative during Foundation Sprint F0. This application establishes reusable infrastructure first; no production replacement occurs until parity, accessibility, mobile, and regression gates pass.</p></div></section>
    </main>
  </>;
}
