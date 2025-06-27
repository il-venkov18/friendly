import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { initTelegramWebApp, isTelegramWebApp } from '../config/telegram';
import { InitData } from '@/features/auth/api'; // Импортируем наш тип

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<typeof WebApp | null>(null);

  useEffect(() => {
    if (isTelegramWebApp()) {
      setWebApp(initTelegramWebApp());
    }
  }, []);

  // Преобразуем initData из строки в объект InitData
  const parseInitData = (): InitData | null => {
    if (!webApp?.initData) return null;
    
    try {
      const params = new URLSearchParams(webApp.initData);
      return {
        user: webApp.initDataUnsafe?.user,
        hash: params.get('hash') || '',
        auth_date: params.get('auth_date') || undefined,
        query_id: params.get('query_id') || undefined
      };
    } catch {
      return null;
    }
  };

  return {
    webApp,
    userData: webApp?.initDataUnsafe?.user,
    initData: parseInitData(), // Возвращаем распарсенные данные
    rawInitData: webApp?.initData // Исходная строка на случай необходимости
  };
};