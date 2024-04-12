import type { UserDataBackendResponse } from '@todo/queries/useGetUserDataQuery';

export interface AppLayoutProps {
  children: React.ReactNode;
  userDetails?: UserDataBackendResponse;
}
