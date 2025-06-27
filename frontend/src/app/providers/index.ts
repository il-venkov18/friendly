import { ReactNode } from 'react';
import { StoreProvider } from './store-provider';
import { AuthProvider } from './auth-provider';
import { TelegramProvider } from './telegram-provider';
import { StyleProvider } from './style-provider';

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <StoreProvider>
    <AuthProvider>
      <TelegramProvider>
        <StyleProvider>
          {children}
        </StyleProvider>
      </TelegramProvider>
    </AuthProvider>
  </StoreProvider>
);