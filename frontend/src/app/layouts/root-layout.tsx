import { Outlet } from 'react-router-dom';

export const RootLayout = () => (
  <div className="app-layout">
    <Outlet />
  </div>
);