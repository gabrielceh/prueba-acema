import { authContainer } from '@/core/di/auth.container';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth/auth.store';
import { useNavigate } from 'react-router';

interface Args {
  email:string,
  password: string;
}


export  function useLoginMutation() {
  const setUser = useAuthStore(state=> state.setUserToken)
  const navigate = useNavigate()
  
  const authQuery = useMutation({
    mutationFn: async(data: Args) => await authContainer.usecases.loginUsecase.execute(data.email, data.password),
    onSuccess:(data)=>{
      if(!data.data){
        throw new Error(data.message)
      }
      setUser(data.data)
      navigate("/")
    },

  })

  return authQuery
}
