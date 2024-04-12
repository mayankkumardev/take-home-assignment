import React from 'react';

import { CircularProgress } from '@mui/material';

import type { PageLoadingProps } from './PageLoading.props';
import { PageLoadingWrapper } from './PageLoading.styles';

export const PageLoading: React.FC<PageLoadingProps> = props => {
  const { size = 100 } = props;

  return (
    <PageLoadingWrapper>
      <CircularProgress disableShrink size={size} />
    </PageLoadingWrapper>
  );
};

PageLoading.displayName = 'PageLoading';
