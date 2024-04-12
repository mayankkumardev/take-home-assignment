import { styled } from '@mui/material';

export const ConfirmTodoDeleteWrapper = styled('div')(({ theme }) => ({
  '& .action-box': {
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));
