import { TodoFilter } from '@todo/queries/useGetTodosQuery';

import type { Filter } from './TodoPage.props';
import { SortBy } from './enums';

export const DEFAULT_PAGE: number = 1;

export const DEFAULT_FILTER: Filter = {
  searchString: '',
  status: TodoFilter.all,
  sortBy: SortBy.default,
};
