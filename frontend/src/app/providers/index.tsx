import React, { ReactNode } from 'react';
import { StoreProvider } from './store-provider';
import { AuthProvider } from './auth-provider';
import { TelegramProvider } from './telegram-provider';
import { StyleProvider } from './style-provider';

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => (
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

export default AppProviders;