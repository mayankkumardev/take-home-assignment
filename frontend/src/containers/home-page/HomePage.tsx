import React from 'react';

import { Box } from '@mui/material';

import { SignInBox } from '@todo/containers/home-page/components/SignInBox/SignInBox';
import { AppLayout } from '@todo/ui-kit/components/AppLayout/AppLayout';

import type { HomePageProps } from './HomePage.props';
import { HomePageWrapper } from './HomePage.styles';

export const HomePage: React.FC<HomePageProps> = props => {
  return (
    <HomePageWrapper>
      <AppLayout>
        <Box className="sign-in-wrapper">
          <SignInBox />
        </Box>
      </AppLayout>
    </HomePageWrapper>
  );
};

HomePage.displayName = 'HomePage';
