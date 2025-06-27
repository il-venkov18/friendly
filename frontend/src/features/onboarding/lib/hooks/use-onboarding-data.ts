import { useTelegram } from '@/shared/lib/hooks/use-telegram';

export const useOnboardingData = () => {
  const { userData } = useTelegram();
  
  return {
    userName: `${userData?.first_name} ${userData?.last_name}`,
    userPhoto: userData?.photo_url,
    userId: userData?.id,
  };
};