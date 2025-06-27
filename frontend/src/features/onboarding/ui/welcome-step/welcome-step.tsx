import { OnboardingStepProps } from '@/features/onboarding/lib/types';
import { QuestionsLayout } from '@/shared/ui/questions-layout';
import { EditableText } from '@/widgets/editable-text';
import { useOnboardingData } from '@/features/onboarding/lib/hooks';

export const WelcomeStep = ({ onNext }: OnboardingStepProps) => {
  const { userName, userPhoto } = useOnboardingData();

  return (
    <QuestionsLayout
      header={
        <div className="text-center">
          <h2>Добро пожаловать!</h2>
          <p>Рады видеть вас в нашем приложении 🎉</p>
        </div>
      }
      footer={
        <button 
          onClick={onNext}
          className="bg-primary text-white px-4 py-2 rounded w-full"
        >
          Начать
        </button>
      }
    >
      <div className="flex flex-col items-center space-y-4">
        {userPhoto && (
          <img
            src={userPhoto}
            alt={userName}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <EditableText 
          value={userName}
          onChange={(val) => console.log('Name changed:', val)}
          className="text-xl font-semibold"
        />
      </div>
    </QuestionsLayout>
  );
};