import type { DialogProps as MuiDialogProps } from '@mui/material';
import { Dialog as MuiDialog, styled } from '@mui/material';

import { colors } from '@todo/ui-kit/theme';

export const StyledDialog = styled(MuiDialog)<MuiDialogProps>(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: theme.spacing(1.25),
    padding: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      borderRadius: theme.spacing(0),
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(3),

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
      },
    },
  },
}));
