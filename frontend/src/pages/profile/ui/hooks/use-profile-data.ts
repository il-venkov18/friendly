import { useTelegram } from '@/shared/lib/hooks/use-telegram';

export const useProfileData = () => {
  const { userData } = useTelegram();
  return { userData };
};