import axios from 'axios';
import type { Note, NewNote, Tag } from '../types/note';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_URL;

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: 'application/json',
  },
});

export const fetchNotes = async (
  search = '',
  page = 1,
  tag?: Tag | null
): Promise<NoteHttpResponse> => {
  const response = await api.get<NoteHttpResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (payload: NewNote): Promise<Note> => {
  const response = await api.post<Note>('/notes', payload);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
