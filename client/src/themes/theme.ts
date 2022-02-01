import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#f14140',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "sans-serif"',
    fontSize: 12,
    button: {
      fontWeight: 700,
    },
  },
});
