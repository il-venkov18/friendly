import { scan } from 'react-scan';

if (import.meta.env.DEV) {
  scan({ enabled: true });
}

// Инициализация аналитики/мониторинга
export const initApp = () => {
  console.log('App initialized');
};