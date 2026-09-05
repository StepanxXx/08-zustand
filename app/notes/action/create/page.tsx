import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import baseUrl from '@/lib/getBaseUrl';

export const metadata: Metadata = {
  title: 'NoteHub - Create note',
  description: 'Create and save a new personal note in NoteHub.',
  openGraph: {
    title: 'NoteHub - Create note',
    description: 'Create and save a new personal note in NoteHub.',
    url: `${baseUrl}/notes/action/create`,
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
    title: 'NoteHub - Create note',
    description: 'Create and save a new personal note in NoteHub.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
