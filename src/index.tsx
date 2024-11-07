import React from 'react';
import { createRoot } from 'react-dom/client';

import './style/globals.css';

import App from './pages/App';

const container = document.getElementById('app');
if (!container) {
  throw new Error('container not found');
}
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
