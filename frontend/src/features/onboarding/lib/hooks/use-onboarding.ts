import { ONBOARDING_STEPS } from '../config/onboarding-steps';
import { useStepNavigation } from './use-step-navigation';

export const useOnboarding = () => {
  const { currentStep, next, back } = useStepNavigation(ONBOARDING_STEPS.length);

  return {
    currentStep,
    CurrentComponent: ONBOARDING_STEPS[currentStep].component,
    next,
    back,
    totalSteps: ONBOARDING_STEPS.length,
  };
};