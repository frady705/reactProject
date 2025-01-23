import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b2dfdb',
    },
    secondary: {
      main: '#4db6ac', 
    },
    text: {
      primary: '#004d40', 
    },
    background: {
      default: '#efebe9', 
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderComponent;
