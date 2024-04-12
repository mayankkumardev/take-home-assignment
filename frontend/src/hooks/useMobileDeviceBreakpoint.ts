import type { UseMediaQueryOptions } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

/**
 * Custom hook for checking if the screen size matches a mobile device breakpoint.
 *
 * @param {UseMediaQueryOptions} options - Options for the media query.
 * @returns {boolean} True if the screen size is at or below the breakpoint for mobile devices.
 */
export const useMobileDeviceBreakpoint = (options?: UseMediaQueryOptions): boolean => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('md'), options);
};
