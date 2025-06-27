import { ThemeProvider } from '@/shared/ui/theme/theme-provider';
import { ReactNode } from 'react';

export const StyleProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);