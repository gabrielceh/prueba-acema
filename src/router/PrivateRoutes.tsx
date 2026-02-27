import { useAuthStore } from '@/modules/auth/stores/auth/auth.store';
import { Navigate, Outlet } from 'react-router';
import { ROUTES } from './routes';

export function PrivateRoutes() {
  const user = useAuthStore(state=>state.user)
  const deleteUser = useAuthStore(state=>state.deleteUser);

  if(!user){
    deleteUser()
    return <Navigate to={ROUTES.auth.login}/>
  }

  return (
    <Outlet/>
  )
}
