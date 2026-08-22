import type { Metadata } from 'next';
import './globals.css';
import { siteUrl } from './site';

export const metadata: Metadata = {
  metadataBase:siteUrl,
  title:{default:'RN Builds',template:'%s — RN Builds'},
  description:'100 functional builds. 100 interactive visual builds. One compounding public engineering experiment by RN Collins.',
  alternates:{canonical:'/'},
  openGraph:{
    title:'RN Builds',
    description:'100 functional builds. 100 interactive visual builds. One compounding public engineering experiment by RN Collins.',
    type:'website',
    url:'/',
    images:[{url:'/og-image.png',width:1200,height:630,alt:'RN Builds public exhibition'}]
  },
  twitter:{
    card:'summary_large_image',
    title:'RN Builds',
    description:'100 functional builds. 100 interactive visual builds. One compounding public engineering experiment by RN Collins.',
    images:['/og-image.png']
  }
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="en"><body>{children}</body></html>;
}
