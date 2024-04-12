import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useRoutes } from '@todo/hooks/useRoutes';
import api from '@todo/lib/api';
import type { ReactQueryMutateOptions } from '@todo/lib/react-query';

import { getGetTodosQuery } from './useGetTodosQuery';

type MutateOptions = ReactQueryMutateOptions<BackendResponse, unknown, MutationInput>;

export interface MutationInput {
  id: string;
}

export interface BackendResponse {
  message: string;
}

export function useDeleteTodoMutation(options?: MutateOptions) {
  const { enqueueSnackbar } = useSnackbar();
  const { gotoTodo } = useRoutes();
  const queryClient = useQueryClient();

  const { queryKey } = getGetTodosQuery();
  return useMutation<BackendResponse, unknown, MutationInput>({
    mutationKey: ['delete-todo'],
    mutationFn: async input => {
      const response = await api.delete(`todos/${input.id}`);

      if (!response.data) {
        return Promise.reject(response);
      }
      return response.data as BackendResponse;
    },
    onSuccess: async data => {
      queryClient.invalidateQueries({ queryKey });
      enqueueSnackbar({ message: data.message, variant: 'success' });
      gotoTodo();
    },
    onError: error => {
      enqueueSnackbar({
        message: (error as any)?.message || 'Something went wrong!!',
        variant: 'error',
      });
    },
    ...options,
  });
}
