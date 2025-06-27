import { lazy } from 'react';

const WelcomePage = lazy(() => import('@/pages/welcome'));

export const publicRoutes = [
  { path: '/', element: <WelcomePage /> },
];