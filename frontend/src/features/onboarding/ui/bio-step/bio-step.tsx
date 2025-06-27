import { OnboardingStepProps } from '@/features/onboarding/lib/';
import QuestionsLayout from '@/shared/ui/layouts/questions-layout/questions-layout';

export const BioStep = ({ onNext, onBack }: OnboardingStepProps) => {
  return (
    <QuestionsLayout
      header={<h2>Расскажите о себе</h2>}
      footer={
        <div className="flex justify-between">
          <button onClick={onBack}>Назад</button>
          <button onClick={onNext}>Далее</button>
        </div>
      }
    >
      <textarea 
        className="border p-2 w-full h-40"
        placeholder="Ваша биография..."
      />
    </QuestionsLayout>
  );
};