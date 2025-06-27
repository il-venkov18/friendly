import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts/root-layout';
import { publicRoutes } from './routes/public-routes';
//import { privateRoutes } from './routes/private-routes';

export const AppRouter = createBrowserRouter([
  {
    element: <RootLayout />,
//  errorElement: <ErrorPage />,
    children: [
      ...publicRoutes,
//      ...privateRoutes,
    ],
  },
]);