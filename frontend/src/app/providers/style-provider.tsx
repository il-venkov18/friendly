import { ThemeProvider } from '@/shared/ui/theme';
import { ReactNode } from 'react';

export const StyleProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);