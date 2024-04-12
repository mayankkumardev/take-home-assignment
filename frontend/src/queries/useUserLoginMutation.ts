import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useRoutes } from '@todo/hooks/useRoutes';
import api from '@todo/lib/api';
import Auth from '@todo/lib/auth';
import type { ReactQueryMutateOptions } from '@todo/lib/react-query';

type MutateOptions = ReactQueryMutateOptions<BackendResponse, unknown, MutationInput>;

export interface MutationInput {
  email: string;
  password: string;
}

export interface BackendResponse {
  message: string;
  data: {
    access_token: string;
  };
}

export function useUserLoginMutation(options?: MutateOptions) {
  const { enqueueSnackbar } = useSnackbar();
  const { gotoTodo } = useRoutes();

  return useMutation<BackendResponse, unknown, MutationInput>({
    mutationKey: ['user-login'],
    mutationFn: async input => {
      const response = await api.post('/auth/login/', input);

      if (!response.data) {
        return await Promise.reject(response);
      }
      return response.data as BackendResponse;
    },
    onSuccess: async data => {
      Auth.setToken(data.data.access_token);
      await gotoTodo();
      enqueueSnackbar({ message: data.message, variant: 'success' });
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
