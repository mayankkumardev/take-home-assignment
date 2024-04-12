import React from 'react';

import { Box, Typography, MenuItem, Select, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';

import { TodoFilter } from '@todo/queries/useGetTodosQuery';

import { SortBy } from '../../enums';

import type { TodoFiltersProps } from './TodoFilters.props';
import { TodoFiltersWrapper } from './TodoFilters.styles';
import { DEFAULT_FILTER } from '../../constants';

const TodoFilterTransformCase: Record<TodoFilter, string> = {
  [TodoFilter.all]: 'All',
  [TodoFilter.done]: 'Done',
  [TodoFilter.inProgress]: 'In Progress',
  [TodoFilter.todo]: 'To do',
};

export const TodoFilters: React.FC<TodoFiltersProps> = props => {
  const { filters, disabled, onFiltersChange } = props;

  const { values, handleChange, handleSubmit, handleReset } = useFormik({
    initialValues: filters,
    onSubmit: values => {
      onFiltersChange(values);
    },
    onReset: () => {
      onFiltersChange(DEFAULT_FILTER);
    }
  });

  return (
    <TodoFiltersWrapper>
      <Box className="full-width-item">
        <Typography>Search Todo</Typography>
        <TextField
          name="searchString"
          placeholder="Search by title or description"
          fullWidth
          value={values.searchString}
          onChange={handleChange}
        />
      </Box>

      <Box className="select-wrapper">
        <Typography>Filter by todo status</Typography>
        <Select
          name="status"
          id="todo-page__status-select"
          className="select-root"
          value={values.status}
          onChange={handleChange}
        >
          {Object.values(TodoFilter).map(status => (
            <MenuItem key={status} value={status}>
              {TodoFilterTransformCase[status]}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box className="select-wrapper">
        <Typography>Sort By</Typography>
        <Select
          name="sortBy"
          id="todo-page__sort-by"
          className="select-root"
          value={values.sortBy}
          onChange={handleChange}
        >
          {Object.values(SortBy).map(sort => (
            <MenuItem key={sort} value={sort}>
              {sort}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box className="action-wrapper full-width-item">
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
          disabled={disabled}
        >
          Submit
        </Button>
        <Button disabled={disabled} onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </TodoFiltersWrapper>
  );
};

TodoFilters.displayName = 'TodoFilters';
