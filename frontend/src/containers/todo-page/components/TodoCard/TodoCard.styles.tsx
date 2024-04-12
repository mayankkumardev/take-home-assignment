import { Card as MuiCard, styled } from '@mui/material';

import { colors } from '@todo/ui-kit/theme';

export const StyledTodoCard = styled(MuiCard)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),

  '& .MuiCardHeader-root': {
    padding: theme.spacing(2.5, 2.5, 0),
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(0, 2.5),
  },
  '& .MuiCardActions-root': {
    padding: theme.spacing(0, 2.5, 2.5),
    justifyContent: 'space-between',
  },
  '& .title-text': {
    fontSize: theme.spacing(3),
    fontWeight: 500,
  },
  '& .single-line-ellipsis': {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'pre-wrap',
    WebkitLineClamp: 1,
  },
  '& .description-text': {
    fontSize: theme.spacing(2),
    color: colors.gray,
  },
  '& .highlight-text': {
    color: colors.blueLight,
  },
}));
