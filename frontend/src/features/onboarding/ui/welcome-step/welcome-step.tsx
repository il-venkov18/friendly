import { OnboardingStepProps } from '@/features/onboarding/lib/models/types';
import { useOnboardingData } from '@/features/onboarding/lib/hooks/use-onboarding-data';

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const { userName, userPhoto } = useOnboardingData();

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Добро пожаловать!</h2>
        <p className="text-gray-600 mt-2">Рады видеть вас в нашем приложении 🎉</p>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        {userPhoto && (
          <img
            src={userPhoto}
            alt={userName}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
        )}
        <div className="text-xl font-semibold text-gray-800">
          {userName}
        </div>
      </div>

      {/* Footer */}
      <button 
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition-colors"
      >
        Начать
      </button>
    </div>
  );
};