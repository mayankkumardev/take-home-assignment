import React from 'react';

import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import type { AppProps } from 'next/app';

import { CustomQueryClientProvider } from '@todo/hoc/CustomQueryClientProvider';
import '@todo/styles/globals.css';
import { defaultTheme } from '@todo/ui-kit/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <CustomQueryClientProvider>
          <Component {...pageProps} />
        </CustomQueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
