import { styled } from '@mui/material';

export const SignInBoxWrapper = styled('div')(({ theme }) => ({
  '& .sign-in-form': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      minWidth: theme.spacing(60),
    },
  },
  '& .text-field-wrapper': {
    width: '100%',
  },
}));
