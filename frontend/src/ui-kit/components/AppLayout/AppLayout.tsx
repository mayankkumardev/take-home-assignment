import React, { useState } from 'react';

import { AppBar, Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';

import { useRoutes } from '@todo/hooks/useRoutes';
import Auth from '@todo/lib/auth';

import type { AppLayoutProps } from './AppLayout.props';
import { AppLayoutWrapper } from './AppLayout.styles';

export const AppLayout: React.FC<AppLayoutProps> = props => {
  const { children, userDetails } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const { gotoHomepage } = useRoutes();

  const closeProfileMenu = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    Auth.removeToken();
    closeProfileMenu();
    gotoHomepage();
  };

  return (
    <AppLayoutWrapper>
      <AppBar className="app-bar">
        <Typography variant="h6">Todo List</Typography>

        {!!userDetails && (
          <Box className="profile-item">
            <Avatar
              onClick={event => {
                setAnchorEl(event.currentTarget);
              }}
            >
              {userDetails.data.first_name.charAt(0).toUpperCase() ?? 'A'}
            </Avatar>
          </Box>
        )}
      </AppBar>

      <Box className="layout-content-wrapper">
        <Box>{children}</Box>
      </Box>

      <Menu id="profile-menu" anchorEl={anchorEl} open={open} onClose={closeProfileMenu}>
        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
      </Menu>
    </AppLayoutWrapper>
  );
};

AppLayout.displayName = 'AppLayout';
