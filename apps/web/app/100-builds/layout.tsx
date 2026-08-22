import type { Metadata } from 'next';
import './active-exhibition.css';

export const metadata:Metadata={
 title:'The 100',
 description:'Explore 100 paired functional and visual builds whose technical capability compounds across one public engineering experiment.',
 alternates:{canonical:'/100-builds'},
 openGraph:{
  title:'The 100 — RN Builds',
  description:'Explore 100 paired functional and visual builds whose technical capability compounds across one public engineering experiment.',
  url:'/100-builds'
 }
};

export default function HundredBuildsLayout({children}:{children:React.ReactNode}){
 return children;
}
