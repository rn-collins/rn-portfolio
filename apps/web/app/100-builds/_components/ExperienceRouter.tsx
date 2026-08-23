'use client';

import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import {builds} from '../../../../../packages/registry/src/index';
import s from './b-experience.module.css';

export default function ExperienceRouter({children}:{children:ReactNode}){
 const pathname=usePathname();
 const match=pathname.match(/^\/100-builds\/(\d{3})\/(a|b)\/?$/);
 if(!match)return children;
 const[id,variant]=[match[1],match[2]];
 const build=builds.find(item=>item.id===id);
 if(!build)return children;
 const boundary=build.limitations.length?build.limitations.slice(0,2).join(' '):'This independent prototype demonstrates an approach; it is not a deployed client system, professional advice or proof of real-world outcomes.';
 const context=<section className={s.variantContext} aria-label={`Build ${id}${variant.toUpperCase()} orientation`}><article><span>WHAT IT IS</span><p>{variant==='a'?'The working A prototype: use its controls to test the build question.':'The B experience begins with the social film, continues through its scene-by-scene argument, and ends with the original web interaction.'}</p></article><article><span>WHY IT MATTERS</span><p>{build.public?.plainPurpose??build.description}</p></article><article><span>RN&apos;S ROLE</span><p>RN conceived the question, structured the evidence boundaries, designed the experience, implemented the prototype and documented its limits.</p></article><article><span>BOUNDARY</span><p>{boundary}</p></article></section>;
 return <>{context}{children}</>;
}
