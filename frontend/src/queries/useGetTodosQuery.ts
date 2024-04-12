import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { TodoStatus } from '@todo/containers/todo-page/enums';
import api from '@todo/lib/api';
import type { ReactQueryOptions } from '@todo/lib/react-query';

export enum TodoFilter {
  all = 'ALL',
  done = 'DONE',
  todo = 'TODO',
  inProgress = 'IN_PROGRESS',
}

interface GetTodosQueryParams {
  page_number?: number;
  page_size?: number;
  search_keyword?: string;
  status?: TodoFilter;
  sort_by_date?: 'ASC' | 'DESC';
  sort_by_title?: 'ASC' | 'DESC';
}

export interface Todo {
  id: string;
  status: TodoStatus;
  title: string;
  description: string;
  created_date: string;
  updated_date: string;
}

interface BackendResponse {
  message: string;
  data: {
    todos: Todo[];
    count: number;
    pageNumber: number;
    pageSize: number;
  };
}

export function getGetTodosQuery(params: GetTodosQueryParams = {}) {
  const queryKey = ['get-todos', params];
  const queryFn = async () => {
    const { page_number: pageNumber = 1, page_size: pageSize = 10, ...rest } = params;

    const response = await api.get(`/todos/?page_number=${pageNumber}&page_size=${pageSize}`, {
      params: rest,
    });

    if (!response.data) {
      return Promise.reject(response);
    }
    return response.data as BackendResponse;
  };

  return {
    queryKey,
    queryFn,
  };
}

export function useGetTodosQuery(
  params: GetTodosQueryParams = {},
  options: ReactQueryOptions<BackendResponse> = {},
) {
  const { queryKey, queryFn } = getGetTodosQuery(params);

  const query = useQuery({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
    staleTime: 0,
    ...options,
  });

  return query;
}
