import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/root-layout';
import { WelcomePage } from '@/pages/welcome/ui/welcome-page';
import { ProfilePage } from '@/pages/profile/ui/profile-page';
import { OnboardingFlow } from '@/features/onboarding/ui/onboarding-flow';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/onboarding',
        element: <OnboardingFlow />,
      },
    ]
  }
]);