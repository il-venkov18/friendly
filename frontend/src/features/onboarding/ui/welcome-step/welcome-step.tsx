// src/features/onboarding/ui/welcome-step.tsx
import { OnboardingStepProps } from '@/features/onboarding/lib/models/types';
import { useOnboardingData } from '../../lib/hooks/use-onboarding-data';

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const { tgUser } = useOnboardingData();

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Добро пожаловать!</h2>
        <p className="text-gray-600 mt-2">Рады видеть вас в нашем приложении 🎉</p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        {tgUser.photoUrl && (
          <img
            src={tgUser.photoUrl}
            alt={`${tgUser.firstName} ${tgUser.lastName}`}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div className="text-xl font-semibold">
          {tgUser.firstName} {tgUser.lastName}
        </div>
      </div>

      <button 
        onClick={onNext}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
      >
        Начать
      </button>
    </div>
  );
};