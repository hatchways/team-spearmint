import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "sans-serif"',
    fontSize: 12,
    button: {
      fontWeight: 700,
    },
    caption: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 600,
    },
  },
});
