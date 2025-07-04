// src/features/onboarding/lib/hooks/use-onboarding.ts
import { ONBOARDING_STEPS } from '../config/onboarding-steps';
import { useStepNavigation } from './use-step-navigation';
import { useTelegram } from '@/shared/lib/hooks/use-telegram';
import { useOnboardingData } from './use-onboarding-data'; // Добавляем импорт

export const useOnboarding = () => {
  const { currentStep, next, back } = useStepNavigation(ONBOARDING_STEPS.length);
  const { tgUser, profileData } = useOnboardingData();
  const { webApp } = useTelegram(); // Используем webApp вместо sendData

  const completeOnboarding = async () => {
    const data = {
      userId: tgUser.id,
      ...profileData
    };
    
    try {
      // Используем метод webApp для отправки данных
      if (webApp) {
        webApp.sendData(JSON.stringify(data));
      }
      next();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return {
    currentStep,
    CurrentComponent: ONBOARDING_STEPS[currentStep].component,
    next: currentStep === ONBOARDING_STEPS.length - 1 ? completeOnboarding : next,
    back,
    totalSteps: ONBOARDING_STEPS.length,
  };
};