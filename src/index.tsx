import './why-did-you-render.js';

import { createRoot } from 'react-dom/client';

import './style/globals.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import routes from './routes';

const router = createBrowserRouter(routes);

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    // main: '#ff5252',
    // },
  },
  colorSchemes: {
    dark: false,
  },
});

const container = document.getElementById('app');
if (!container) {
  throw new Error('container not found');
}
const root = createRoot(container);
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    {/* <App></App> */}
    <RouterProvider router={router} />
  </ThemeProvider>
);
