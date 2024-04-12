import React, { useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Pagination, Typography } from '@mui/material';

import { useRouter } from 'next/router';

import { useRoutes } from '@todo/hooks/useRoutes';
import { useGetTodosQuery } from '@todo/queries/useGetTodosQuery';
import { useGetUserDataQuery } from '@todo/queries/useGetUserDataQuery';
import { AppLayout } from '@todo/ui-kit/components/AppLayout/AppLayout';
import { PageLoading } from '@todo/ui-kit/components/PageLoading/PageLoading';

import { Dialog } from '../../ui-kit/components/Dialog/Dialog';

import type { Filter, TodoPageProps } from './TodoPage.props';
import { TodoPageWrapper } from './TodoPage.styles';
import { AddTodoItem } from './components/AddTodoItem/AddTodoItem';
import { EditTodoItem } from './components/EditTodoItem/EditTodoItem';
import { TodoCard } from './components/TodoCard/TodoCard';
import { TodoFilters } from './components/TodoFilters/TodoFilters';
import { DEFAULT_FILTER, DEFAULT_PAGE } from './constants';
import { SortBy, TodoAction } from './enums';

export const TodoPage: React.FC<TodoPageProps> = props => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [filters, setFilters] = useState<Filter>(DEFAULT_FILTER);

  const { searchString, status, sortBy } = filters;

  const {
    data: todoData,
    isLoading,
    isFetching,
  } = useGetTodosQuery({
    page_number: page,
    search_keyword: searchString,
    status,
    sort_by_title:
      sortBy === SortBy.titleAsc ? 'ASC' : sortBy === SortBy.titleDesc ? 'DESC' : undefined,
    sort_by_date:
      sortBy === SortBy.dateAsc ? 'ASC' : sortBy === SortBy.dateDesc ? 'DESC' : undefined,
  });
  const { data: userData } = useGetUserDataQuery();

  const { gotoTodo } = useRoutes();
  const router = useRouter();

  const { count = 0, pageSize = 10, todos: todoList = [] } = todoData?.data ?? {};
  const totalPage = Math.ceil(count / pageSize);

  const action = router.query.action as TodoAction | undefined;
  const todoId = router.query.id as string | undefined;

  const isCreateTodoDialogOpen = action === TodoAction.add;
  const isEditTodoDialogOpen = action === TodoAction.edit && !!todoId;

  if (isLoading) {
    return <PageLoading />;
  }

  const handleFiltersChange = (newFilters: Filter) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetPage = () => {
    if (todoList.length === 1) {
      setPage(prevState => Math.max(prevState - 1, DEFAULT_PAGE));
    }
  };

  return (
    <TodoPageWrapper>
      <AppLayout userDetails={userData}>
        <Box className="header-wrapper">
          <Typography variant="h4">Todo List</Typography>

          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => {
              gotoTodo(TodoAction.add);
            }}
          >
            Create Todo
          </Button>
        </Box>

        <Box>
          <TodoFilters
            filters={filters}
            disabled={isFetching}
            onFiltersChange={handleFiltersChange}
          />
        </Box>
        
        {
          !!count && 
          <Box my={2}>
            <Typography textAlign="center">Total Todo: {count}</Typography>
          </Box>
        } 

        <Box className="todo-card-wrapper">
          {todoList.map(todo => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              status={todo.status}
              date={todo.created_date}
              highlightedText={searchString}
              resetPage={resetPage}
            />
          ))}
        </Box>

        {!todoList.length && (
          <Box className="no-todo-box">
            <Typography variant="h4">No to-do data was found.</Typography>
          </Box>
        )}

        {!!count && (
          <Box className="pagination-wrapper">
            <Pagination
              count={totalPage}
              page={page}
              onChange={(_, page) => {
                setPage(page);
              }}
            />
          </Box>
        )}
      </AppLayout>

      <Dialog
        testId="todo-page__create-todo-dlg"
        open={isCreateTodoDialogOpen}
        onClose={() => {
          gotoTodo();
        }}
      >
        <AddTodoItem />
      </Dialog>

      <Dialog
        testId="todo-page__edit-todo-dlg"
        open={isEditTodoDialogOpen}
        onClose={() => {
          gotoTodo();
        }}
      >
        {!!todoId && <EditTodoItem todoId={todoId} todoList={todoList} />}
      </Dialog>
    </TodoPageWrapper>
  );
};

TodoPage.displayName = 'TodoPage';
