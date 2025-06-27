import { ReactNode, useEffect } from 'react';
import { initTelegramWebApp, isTelegramWebApp } from '@/shared/lib/config/telegram';

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (isTelegramWebApp()) {
      initTelegramWebApp();
    }
  }, []);

  return <>{children}</>;
};