import type { TodoFilter } from '@todo/queries/useGetTodosQuery';

import type { SortBy } from './enums';

export interface TodoPageProps {
  className?: string;
}

export interface Filter {
  searchString: string;
  status: TodoFilter;
  sortBy: SortBy;
}
