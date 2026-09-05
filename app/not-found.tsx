import type { Metadata } from 'next';

import css from './Home.module.css';

import baseUrl from '@/lib/getBaseUrl';

export const metadata: Metadata = {
  title: 'NoteHub - Page not found',
  description: 'NoteHub could not find the page you are looking for.',
  openGraph: {
    title: 'NoteHub - Page not found',
    description: 'NoteHub could not find the page you are looking for.',
    url: `${baseUrl}/404`,
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub - Page not found',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoteHub - Page not found',
    description: 'NoteHub could not find the page you are looking for.',
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
