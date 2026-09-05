import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';
import { getBaseUrl } from '@/lib/getBaseUrl';

const baseUrl = getBaseUrl();

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag =
    slug[0] === 'all' || slug[0] === undefined ? 'all' : (slug[0] as Tag);
  const title = `NoteHub - Notes filtered by ${tag}`;
  const description = `View and manage NoteHub notes filtered by the ${tag} tag.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/notes/filter/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? null : (slug[0] as Tag);
  const queryClient = new QueryClient();
  const queryKey = ['notes', '', 1, tag] as const;

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => fetchNotes('', 1, tag),
  });

  const error = queryClient.getQueryState(queryKey)?.error;

  if (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
