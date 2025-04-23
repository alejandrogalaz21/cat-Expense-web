import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF',
    },
    secondary: {
      main: '#FF6584',
    },
    background: {
      default: '#F4F6FA',
    },
  },
  typography: {
    fontFamily: `'Nunito', sans-serif`,
  },
  shape: {
    borderRadius: 12,
  },
});
