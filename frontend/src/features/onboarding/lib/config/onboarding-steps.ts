import { WelcomeStep } from '@/features/onboarding/ui/welcome-step';
import { BasicInfoStep } from '@/features/onboarding/ui/basic-info-step';
import { BioStep } from '@/features/onboarding/ui/bio-step';
import { InterestStep } from '@/features/onboarding/ui/interest-step';

export const ONBOARDING_STEPS = [
  { id: 'welcome', component: WelcomeStep },
  { id: 'interests', component: InterestStep },
  { id: 'basic-info', component: BasicInfoStep },
  { id: 'bio', component: BioStep },
] as const;