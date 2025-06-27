import { ReactNode, useEffect } from 'react';
import { useTelegram } from '@/shared/lib/hooks/use-telegram';
import { authByTelegram } from '@/features/auth/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { initData } = useTelegram();

  useEffect(() => {
    if (initData) {
      authByTelegram(initData)
        .then((user) => console.log('Authenticated:', user))
        .catch(console.error);
    }
  }, [initData]);

  return <>{children}</>;
};