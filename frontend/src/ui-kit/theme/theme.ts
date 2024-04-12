import { type ThemeOptions, createTheme } from '@mui/material';

import { colors } from './colors';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: colors.primary,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 482,
      md: 770,
      lg: 1081,
      xl: 1281,
    },
  },
};

export const defaultTheme = createTheme(themeOptions);
