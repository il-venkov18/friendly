import { WelcomeStep } from '@/features/onboarding/ui/welcome-step';
import { ChoiceStep } from '@/features/onboarding/ui/choice-step';
import { BioStep } from '@/features/onboarding/ui/bio-step';
import { InterestStep } from '@/features/onboarding/ui/interest-step';

export const ONBOARDING_STEPS = [
  { id: 'welcome', component: ChoiceStep },
  { id: 'interests', component: InterestStep },
  { id: 'choice', component: WelcomeStep },
  { id: 'bio', component: BioStep },
] as const;