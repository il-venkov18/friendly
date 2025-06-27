import { initTelegramWebApp, isTelegramWebApp } from '../config/telegram';

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<WebApp | null>(null);

  useEffect(() => {
    if (isTelegramWebApp()) {
      setWebApp(initTelegramWebApp());
    }
  }, []);

  return {
    webApp,
    userData: webApp?.initDataUnsafe?.user,
    initData: webApp?.initData,
  };
};