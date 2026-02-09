import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TempoDevtools } from 'tempo-devtools';
import { BrowserRouter } from 'react-router-dom';
import { TempoRoutes } from './TempoRoutes';

TempoDevtools.init();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TempoRoutes />
      <App />
    </BrowserRouter>
  </StrictMode>
);
