import type { Metadata } from 'next';

import css from './Home.module.css';

import baseUrl from '@/lib/getBaseUrl';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: `${baseUrl}/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page not found',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const NotFound = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
};

export default NotFound;
