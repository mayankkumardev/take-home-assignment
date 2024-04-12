import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import type { TodoStatus } from '@todo/containers/todo-page/enums';
import { useRoutes } from '@todo/hooks/useRoutes';
import api from '@todo/lib/api';
import type { ReactQueryMutateOptions } from '@todo/lib/react-query';

import { getGetTodosQuery } from './useGetTodosQuery';

type MutateOptions = ReactQueryMutateOptions<BackendResponse, unknown, MutationInput>;

export interface MutationInput {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

export interface BackendResponse {
  message: string;
  data: {
    status: TodoStatus;
    description: string;
    title: string;
  };
}

export function useUpdateTodoMutation(options?: MutateOptions) {
  const { enqueueSnackbar } = useSnackbar();
  const { gotoTodo } = useRoutes();
  const queryClient = useQueryClient();

  const { queryKey } = getGetTodosQuery();

  return useMutation<BackendResponse, unknown, MutationInput>({
    mutationKey: ['update-todo'],
    mutationFn: async input => {
      const { id, ...rest } = input;
      const response = await api.put(`todos/${id}`, rest);

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
