import type { TodoStatus } from '../../enums';

export interface TodoCardProps {
  className?: string;
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  highlightedText?: string;
  date: string;
  resetPage: () => void;
}
