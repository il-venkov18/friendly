import { useOnboarding } from '@/features/onboarding/lib/hooks/use-onboarding';
import { ProgressBar } from '@/widgets/progress';
import { QuestionsLayout } from '@/shared/ui/layouts';

// Изменяем экспорт на именованный
export const WelcomePage = () => {
  const { currentStep, CurrentComponent, next, totalSteps } = useOnboarding();

  if (currentStep >= totalSteps) {
    return (
      <QuestionsLayout>
        <h2>Спасибо! 🎉</h2>
        <p>Вы завершили приветствие.</p>
      </QuestionsLayout>
    );
  }

  return (
    <div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <CurrentComponent onNext={next} />
    </div>
  );
};