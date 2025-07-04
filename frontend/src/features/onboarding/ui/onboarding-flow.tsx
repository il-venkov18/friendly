import { useOnboarding } from '../lib/hooks/use-onboarding';

export const OnboardingFlow = () => {
  const { CurrentComponent, next, back } = useOnboarding();
  
  return (
    <CurrentComponent onNext={next} onBack={back} />
  );
};