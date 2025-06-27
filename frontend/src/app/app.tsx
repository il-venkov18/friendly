import { StrictMode } from 'react';
import AppProviders from './providers';
import { RouterProviderComponent } from './router/router-provider';
import './styles/global.scss';

export const App = () => (
  <StrictMode>
    <AppProviders>
      <RouterProviderComponent />
    </AppProviders>
  </StrictMode>
);