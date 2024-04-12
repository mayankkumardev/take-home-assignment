import { styled } from '@mui/material';

export const EditTodoItemWrapper = styled('div')(({ theme }) => ({
  width: '100%',

  '& .edit-todo-form': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  '& .text-field-wrapper': {
    width: '100%',
  },
  '& .title-box-wrapper': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .select-root': {
    width: '100%',
  },
}));
