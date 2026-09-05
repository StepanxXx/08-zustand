'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Link from 'next/link';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';

import type { Note, Tag } from '@/types/note';
import { useNotes } from '@/hooks/useNotes';

import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: Tag | null;
}

export default function NotesClient({ tag = null }: NotesClientProps) {
  const activeQueries = useIsFetching();
  const activeMutations = useIsMutating();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isSuccess, isFetching } = useNotes(search, page, tag);

  const notes: Note[] = data ? data.notes : [];
  const totalPages = data?.totalPages ?? 0;
  const isShowLoader = activeQueries > 0 || activeMutations > 0;

  useEffect(() => {
    if (isSuccess && !isFetching && data?.notes.length === 0) {
      toast('No notes found', {
        icon: 'ℹ️',
      });
    }
  }, [isSuccess, isFetching, data?.notes.length]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {notes && notes.length > 0 && <NoteList noteList={notes} />}
      {notes && notes.length === 0 && <h2>No notes found</h2>}
      {isShowLoader && <Loader />}
    </div>
  );
}
