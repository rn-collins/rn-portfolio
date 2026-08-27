import Link from 'next/link';

export default function DossierNav(){return <nav aria-label="Build 001 dossier navigation"><Link href="/100-builds/001/record">Public record</Link><span aria-hidden="true"> · </span><Link href="/100-builds/001/making">Making</Link><span aria-hidden="true"> · </span><Link href="/100-builds/001/method">Method</Link><span aria-hidden="true"> · </span><Link href="/100-builds/001/evidence">Evidence</Link></nav>}
