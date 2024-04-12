import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import type { ConfirmTodoDeleteProps } from './ConfirmTodoDelete.props';
import { ConfirmTodoDeleteWrapper } from './ConfirmTodoDelete.styles';

export const ConfirmTodoDelete: React.FC<ConfirmTodoDeleteProps> = props => {
  const { isDisable, onDelete, onCancel } = props;

  return (
    <ConfirmTodoDeleteWrapper>
      <Typography variant="h6" color="red">
        Are you sure you want to delete this to-do?
      </Typography>

      <Box className="action-box">
        <Button variant="contained" color="error" disabled={isDisable} onClick={onDelete}>
          Delete
        </Button>
        <Button variant="contained" disabled={isDisable} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </ConfirmTodoDeleteWrapper>
  );
};

ConfirmTodoDelete.displayName = 'ConfirmTodoDelete';
