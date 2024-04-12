import { useQuery } from '@tanstack/react-query';

import api from '@todo/lib/api';
import type { ReactQueryOptions } from '@todo/lib/react-query';

export interface UserDataBackendResponse {
  message: string;
  data: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    created_date: string;
    updated_date: string;
  };
}

export function getGetUserDataQuery() {
  const queryKey = ['get-user-data'];
  const queryFn = async () => {
    const response = await api.get('users/user_details/');

    if (!response.data) {
      return Promise.reject(response);
    }
    return response.data as UserDataBackendResponse;
  };

  return {
    queryKey,
    queryFn,
  };
}

export function useGetUserDataQuery(options: ReactQueryOptions<UserDataBackendResponse> = {}) {
  const { queryKey, queryFn } = getGetUserDataQuery();

  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
}
