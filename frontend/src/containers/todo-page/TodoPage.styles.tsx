import { styled } from '@mui/material';

export const TodoPageWrapper = styled('div')(({ theme }) => ({
  minWidth: theme.spacing(76),
  maxWidth: theme.spacing(76),
  margin: 'auto',

  [theme.breakpoints.down('md')]: {
    minWidth: '100%',
    maxWidth: '100%',
  },

  '& .todo-card-wrapper': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },
  '& .header-wrapper': {
    display: 'flex',
    margin: theme.spacing(4, 0),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .no-todo-box': {
    marginTop: theme.spacing(3),
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  '& .pagination-wrapper': {
    marginTop: theme.spacing(3),
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
}));
