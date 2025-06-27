import { useState } from 'react';

export const useStepNavigation = (maxSteps: number) => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep(prev => Math.min(prev + 1, maxSteps - 1));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return { currentStep, next, back };
};