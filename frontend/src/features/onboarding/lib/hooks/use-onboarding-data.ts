// src/features/onboarding/lib/hooks/use-onboarding-data.ts
import { useState } from 'react';
import { useTelegram } from '@/shared/lib/hooks/use-telegram';

export const useOnboardingData = () => {
  const { userData } = useTelegram();
  const [profileData, setProfileData] = useState({
    birthDate: '',
    gender: '',
    location: '',
    bio: '',
    interests: [] as string[],
  });

  const updateProfileData = (updates: Partial<typeof profileData>) => {
    setProfileData(prev => ({ ...prev, ...updates }));
  };

  return {
    tgUser: {
      id: userData?.id,
      firstName: userData?.first_name || '',
      lastName: userData?.last_name || '',
      username: userData?.username || '',
      photoUrl: userData?.photo_url || '',
    },
    profileData,
    updateProfileData,
  };
};