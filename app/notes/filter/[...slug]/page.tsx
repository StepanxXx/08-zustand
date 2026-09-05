import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

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
