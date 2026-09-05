import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import type { Tag } from '@/types/note';

export const useNotes = (search: string, page: number, tag?: Tag | null) => {
  const response = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (response.isError) {
      toast.error(response.error.message);
    }
  }, [response.error, response.isError]);

  return response;
};
