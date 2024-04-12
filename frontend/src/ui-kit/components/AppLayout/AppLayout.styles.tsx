import { styled } from '@mui/material';

export const AppLayoutWrapper = styled('div')(({ theme }) => ({
  '& .app-bar': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1.5),
    },
  },
  '& .layout-content-wrapper': {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
    marginTop: theme.spacing(9),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(8),
    },
  },
  '& .profile-item': {
    cursor: 'pointer',
  },
}));
