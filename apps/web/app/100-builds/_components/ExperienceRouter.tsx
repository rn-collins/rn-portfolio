'use client';

import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import PieceLinks from '../../_release/PieceLinks';
import type {PieceLinkSet} from '../../_release/gate';
import s from './b-experience.module.css';

// Only released builds are passed in (see ../layout.tsx), so held builds never reach this client bundle.
export type ExperiencePiece={id:string;purpose:string;limitations:string[];links:PieceLinkSet};

export default function ExperienceRouter({children,pieces}:{children:ReactNode;pieces:Record<string,ExperiencePiece>}){
 const pathname=usePathname();
 const match=pathname.match(/^\/100-builds\/(\d{3})\/(a|b)\/?$/);
 if(!match)return children;
 const[id,variant]=[match[1],match[2]];
 const build=pieces[id];
 if(!build)return children;
 const boundary=build.limitations.length?build.limitations.slice(0,2).join(' '):'This independent prototype demonstrates an approach; it is not a deployed client system, professional advice or proof of real-world outcomes.';
 const context=<section className={s.variantContext} aria-label={`Build ${id}${variant.toUpperCase()} orientation`}><article><span>WHAT IT IS</span><p>{variant==='a'?'The working A prototype: use its controls to test the build question.':'The B experience begins with the social film, continues through its scene-by-scene argument, and ends with the original web interaction.'}</p></article><article><span>WHY IT MATTERS</span><p>{build.purpose}</p></article><article><span>RN&apos;S ROLE</span><p>RN conceived the question, structured the evidence boundaries, designed the experience, implemented the prototype and documented its limits.</p></article><article><span>BOUNDARY</span><p>{boundary}</p></article><article><span>HOW TO USE THIS PAGE</span><p>{variant==='a'?'Work through the controls with a situation of your own rather than the sample values. The tool responds to what you put in, so the useful output comes from real input, and everything is processed in your browser as you go. Any sample content you find already loaded is there to show the shape of a filled-in state, and you can clear it and start again at any point.':'Watch the film first, then move through the scene-by-scene argument, then open the web interaction at the end. Each stage restates the same question at a different resolution, so the sequence matters more here than on the A side. You can leave at any stage and still have the whole argument.'}</p></article><article><span>WHERE TO GO NEXT</span><p>The build overview sets out the question, the purpose, the role and the evidence status in one place, and the public record behind it states what changed, what another person can reuse and what supports the system. If you want to judge how far this build should be trusted, the record is the page to read, not this one.</p></article></section>;
 return <>{context}<PieceLinks links={build.links} current={variant==='a'?'a':'b'}/>{children}</>;
}
