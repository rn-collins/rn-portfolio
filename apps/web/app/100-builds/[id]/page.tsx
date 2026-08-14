import Link from 'next/link';

const build001={id:'001',title:'Human Review Design Framework',description:'An interactive framework for turning vague human-oversight claims into an explicit review design.',observation:'“Human in the loop” is often treated as if the presence of a person automatically creates meaningful oversight.',missing:'A practical way to specify who reviews an AI-assisted decision, what they review, against which standard, at what point, and what happens when review fails.'};

export function generateStaticParams(){
  return Array.from({length:100},(_,i)=>({id:String(i+1).padStart(3,'0')}));
}

export default async function BuildDetail({params}:{params:Promise<{id:string}>}){const {id}=await params; if(id!=='001')return <main className="build-wrap"><div className="eyebrow">Build {id} / 100</div><h1>Planned build</h1><p className="lede">The canonical registry contains this build. Its production detail page will be implemented when its cycle begins.</p><Link href="/100-builds">← Exhibition</Link></main>;
return <main className="build-wrap"><div className="eyebrow">Build 001 / 100 · Phase 01</div><h1>{build001.title}</h1><p className="lede">{build001.description}</p><div className="pair"><div className="pair-card"><div className="eyebrow">001-A · Functional</div><h2>Human Review Design Framework</h2><p>Specify reviewer, trigger, standard, evidence, authority, and failure path.</p><Link href="/100-builds/001/a">Open A →</Link></div><div className="pair-card"><div className="eyebrow">001-B · Visual</div><h2>Human in the Loop</h2><p>The reassuring slogan fractures into the questions required for meaningful oversight.</p><Link href="/100-builds/001/b">Open B →</Link></div></div><h2 className="serif">The observation</h2><p>{build001.observation}</p><h2 className="serif">The missing system</h2><p>{build001.missing}</p><p><Link href="/100-builds">← Exhibition</Link></p></main>}
