import React from 'react';

import { useGetUserDataQuery } from '@todo/queries/useGetUserDataQuery';
import { PageLoading } from '@todo/ui-kit/components/PageLoading/PageLoading';

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = props => {
  const { children } = props;
  const { data: userData } = useGetUserDataQuery();

  if (userData?.data.id) {
    return children;
  }

  return <PageLoading />;
};

PrivateRoute.displayName = 'PrivateRoute';
