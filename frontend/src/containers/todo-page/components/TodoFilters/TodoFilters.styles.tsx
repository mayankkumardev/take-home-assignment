import { styled } from '@mui/material';

export const TodoFiltersWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  '& .full-width-item': {
    width: '100%',
    flexBasis: '100%',
  },
  '& .select-wrapper': {
    width: `calc(50% - ${theme.spacing(1)})`,
    flexBasis: `calc(50% - ${theme.spacing(1)})`,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      flexBasis: '100%',
    },
  },
  '& .select-root': {
    width: '100%',
  },
  '& .action-wrapper': {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));
