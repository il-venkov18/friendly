import { useTelegram } from '@/shared/lib/hooks/use-telegram';

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  photoUrl?: string;
}

export const useProfileData = (): ProfileData => {
  const { userData } = useTelegram();
  
  return {
    firstName: userData?.first_name || '',
    lastName: userData?.last_name || '',
    username: userData?.username ? `@${userData.username}` : '',
    photoUrl: userData?.photo_url,
  };
};