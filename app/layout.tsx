import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import ToastProvider from '@/providers/ToastProvider';
import baseUrl from '@/lib/getBaseUrl';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Application for viewing and managing personal notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'Application for viewing and managing personal notes.',
    url: baseUrl,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub',
    description: 'Application for viewing and managing personal notes.',
    images: [baseUrl + '/notehub-og-meta.jpg'],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
          <ToastProvider />
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}
