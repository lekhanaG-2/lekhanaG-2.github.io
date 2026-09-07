import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lekhanag-2.github.io'),
  title: 'Lekhana G | Full-Stack Developer Portfolio',
  description:
    'Portfolio of Lekhana G, an MCA student and full-stack developer building responsive, dependable web applications.',
  keywords: [
    'Lekhana G',
    'Full-Stack Developer',
    'Web Developer',
    'MCA student',
    'Bangalore',
  ],
  authors: [{ name: 'Lekhana G' }],
  creator: 'Lekhana G',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Lekhana G | Full-Stack Developer Portfolio',
    description:
      'MCA student and full-stack developer building responsive, dependable web applications.',
    siteName: 'Lekhana G — Developer Portfolio',
    images: [
      {
        url: '/og-lekhana.png',
        width: 1200,
        height: 630,
        alt: 'Lekhana G — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lekhana G | Full-Stack Developer Portfolio',
    description:
      'MCA student and full-stack developer building responsive, dependable web applications.',
    images: ['/og-lekhana.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
