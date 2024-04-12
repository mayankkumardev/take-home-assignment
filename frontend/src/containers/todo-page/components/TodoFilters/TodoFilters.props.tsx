import type { Filter } from '../../TodoPage.props';

export interface TodoFiltersProps {
  filters: Filter;
  disabled?: boolean;
  onFiltersChange: (newFilters: Filter) => void;
}
