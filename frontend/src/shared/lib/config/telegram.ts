import WebApp from '@twa-dev/sdk';

export const initTelegramWebApp = () => {
  WebApp.ready();
  const { bg_color } = WebApp.themeParams;
  
  WebApp.setHeaderColor(bg_color || "#2481cc");
  WebApp.setBackgroundColor(bg_color || "#ffffff");
  
  return WebApp; // Для возможности расширения
};

export const isTelegramWebApp = (): boolean => Boolean(WebApp.platform);