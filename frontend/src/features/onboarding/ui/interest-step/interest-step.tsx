import { OnboardingStepProps } from '@/features/onboarding/lib/models/types';
import QuestionsLayout from '@/shared/ui/layouts/questions-layout/questions-layout';

const INTERESTS = [
  'Кино', 'Музыка', 'Спорт', 'Путешествия', 'IT', 'Кулинария'
];

export const InterestStep = ({ onNext, onBack }: OnboardingStepProps) => {
  return (
    <QuestionsLayout
      header={<h2>Выберите интересы</h2>}
      footer={
        <div className="flex justify-between">
          <button onClick={onBack}>Назад</button>
          <button onClick={onNext}>Завершить</button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2">
        {INTERESTS.map(interest => (
          <label key={interest} className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>{interest}</span>
          </label>
        ))}
      </div>
    </QuestionsLayout>
  );
};