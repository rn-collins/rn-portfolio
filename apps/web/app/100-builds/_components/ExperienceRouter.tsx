'use client';

import {usePathname} from 'next/navigation';
import type {ReactNode} from 'react';
import BExperience from './BExperience';

export default function ExperienceRouter({children}:{children:ReactNode}){
  const pathname=usePathname();
  const match=pathname.match(/^\/100-builds\/(\d{3})\/b\/?$/);
  if(!match)return children;
  return <BExperience id={match[1]}>{children}</BExperience>;
}
