import { styled } from '@mui/material';

export const AddTodoItemWrapper = styled('div')(({ theme }) => ({
  width: '100%',

  '& .add-todo-form': {
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
}));
