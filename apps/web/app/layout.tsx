import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'RN Builds', template: '%s — RN Builds' },
  description: '100 functional builds. 100 visual builds. One compounding public engineering experiment by RN Collins.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
