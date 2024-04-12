import React from 'react';

import { DialogContent } from '@mui/material';

import { useMobileDeviceBreakpoint } from '@todo/hooks/useMobileDeviceBreakpoint';

import type { DialogProps } from './Dialog.props';
import { StyledDialog } from './Dialog.styles';

export const Dialog: React.FC<DialogProps> = props => {
  const { open, onClose, children, testId, ...rest } = props;

  const isMobile = useMobileDeviceBreakpoint();

  return (
    <StyledDialog
      fullScreen={isMobile}
      data-test-id={testId}
      open={open}
      onClose={onClose}
      {...rest}
    >
      {!!children && <DialogContent>{children}</DialogContent>}
    </StyledDialog>
  );
};

Dialog.displayName = 'Dialog';
