import { styled } from '@mui/material';

export const HomePageWrapper = styled('div')(({ theme }) => ({
  '& .sign-in-wrapper': {
    width: '100%',
    maxWidth: theme.spacing(60),
  },
}));
