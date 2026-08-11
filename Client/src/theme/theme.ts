import { createTheme } from '@mui/material/styles';

/**
 * Material UI theme configuration according to UniMart design guidelines.
 * Primary: #1f4e78 (Deep Navy)
 * Secondary: #2e75b6 (Steel Blue)
 * Shape: borderRadius 8px
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1f4e78',
    },
    secondary: {
      main: '#2e75b6',
    },
  },
  shape: {
    borderRadius: 8,
  },
});
