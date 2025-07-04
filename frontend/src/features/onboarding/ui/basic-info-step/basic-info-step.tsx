// src/features/onboarding/ui/basic-info-step.tsx
import { OnboardingStepProps } from '@/features/onboarding/lib/models/types';
import { useOnboardingData } from '../../lib/hooks/use-onboarding-data';
import QuestionsLayout from '@/shared/ui/layouts/questions-layout/questions-layout';

export const BasicInfoStep = ({ onNext }: OnboardingStepProps) => {
  const { tgUser, profileData, updateProfileData } = useOnboardingData();

  return (
    <QuestionsLayout
      header={<h2>Основная информация</h2>}
      footer={<button onClick={onNext}>Далее</button>}
    >
      <div className="space-y-4">
        <div>
          <label>Имя</label>
          <input 
            type="text" 
            defaultValue={tgUser.firstName}
            disabled
          />
        </div>
        <div>
          <label>Фамилия</label>
          <input 
            type="text" 
            defaultValue={tgUser.lastName}
            disabled
          />
        </div>
        <div>
          <label>Дата рождения</label>
          <input 
            type="date" 
            value={profileData.birthDate}
            onChange={(e) => updateProfileData({ birthDate: e.target.value })}
          />
        </div>
      </div>
    </QuestionsLayout>
  );
};