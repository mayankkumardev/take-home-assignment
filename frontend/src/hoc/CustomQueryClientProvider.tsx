import React, { useState } from 'react';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { useRoutes } from '@todo/hooks/useRoutes';

export const CustomQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = props => {
  const { children } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { gotoHomepage } = useRoutes();

  const handleUnauthorizedError = async (error: any) => {
    const message = error?.message || 'Please log in to continue';
    const status = error?.response?.status;
    if (status === 401) {
      await gotoHomepage();

      enqueueSnackbar({
        message,
        variant: 'error',
        preventDuplicate: true,
      });
    }
  };

  const [reactQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: error => {
            handleUnauthorizedError(error);
          },
        }),
      }),
  );

  return <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>;
};
