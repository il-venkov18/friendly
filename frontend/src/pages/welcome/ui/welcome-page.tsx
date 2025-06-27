import { useOnboarding } from '@/features/onboarding/lib/hooks/use-onboarding';

export const WelcomePage = () => {
  const { currentStep, CurrentComponent, next, totalSteps } = useOnboarding();

  if (currentStep >= totalSteps) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Спасибо! 🎉</h2>
        <p className="mt-2">Вы завершили приветствие.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      <CurrentComponent onNext={next} />
    </div>
  );
};