import { Route, Routes } from 'react-router';

import { LoginPage } from '@/modules/auth/LoginPage';
import { ROUTES } from './routes';
import RootPage from './RootPage';
import { PrivateRoutes } from './PrivateRoutes';
import { UsersPage } from '@/modules/users/UsersPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<RootPage />} />
      <Route path={ROUTES.auth.login} element={<LoginPage />} />
      <Route path={ROUTES.home.root} element={<PrivateRoutes />}>
        <Route path={ROUTES.home.users} element={<UsersPage />} />
      </Route>
    </Routes>
  );
}
