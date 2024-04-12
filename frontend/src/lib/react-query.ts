import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type ReactQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = any,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;

export type ReactQueryMutateOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn' | 'mutationKey'>;
