import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote, createNote } from '@/lib/api';
import { toast } from 'react-hot-toast';

export const useNoteCreate = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notes'],
        refetchType: 'all',
      });
      toast.success('Note created successfully!');
      onSuccessCallback?.();
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['notes'],
        refetchType: 'all',
      });
      toast.success('Note deleted successfully!');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return deleteMutation;
};
