import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote, createNote } from '@/lib/api';
import { toast } from 'react-hot-toast';

export const useNoteCreate = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return createMutation;
};

export const useNoteDelete = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return deleteMutation;
};
