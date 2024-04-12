import type { Todo } from '@todo/queries/useGetTodosQuery';

export interface EditTodoItemProps {
  className?: string;
  todoId: string;
  todoList: Todo[];
}
