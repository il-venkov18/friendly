import { OnboardingStepProps } from '@/features/onboarding/lib/types';
import { QuestionsLayout } from '@/shared/ui/questions-layout';

export const BasicInfoStep = ({ onNext }: OnboardingStepProps) => {
  return (
    <QuestionsLayout
      header={<h2>Основная информация</h2>}
      footer={
        <button 
          onClick={onNext}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Далее
        </button>
      }
    >
      <form className="space-y-4">
        <div>
          <label>Имя</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label>Фамилия</label>
          <input type="text" className="border p-2 w-full" />
        </div>
      </form>
    </QuestionsLayout>
  );
};