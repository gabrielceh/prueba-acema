import { useAuthStore } from '@/modules/auth/stores/auth/auth.store';
import { Navigate } from 'react-router';
import { ROUTES } from './routes';

export default function RootPage() {
  const user = useAuthStore(state=>state.user)
  const deleteUser = useAuthStore(state=>state.deleteUser)

  if(!user){
    deleteUser()
    return <Navigate to={ROUTES.auth.login}/>
  }

  return <Navigate to={ROUTES.home.users} />
}
