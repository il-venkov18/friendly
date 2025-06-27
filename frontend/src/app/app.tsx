import { StrictMode } from 'react';
import { AppProviders } from './providers';
import { AppRouter } from './router/router';
import './styles/global.scss';

export const App = () => (
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);