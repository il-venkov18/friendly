import { ReactNode, useEffect } from 'react';
import { initTelegramWebApp, isTelegramWebApp } from '@/shared/lib/telegram';

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (isTelegramWebApp()) {
      initTelegramWebApp();
    }
  }, []);

  return <>{children}</>;
};