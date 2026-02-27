import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import { LOCAL_STORAGE_CONSTANTS } from '@/core/constants/local-storage.constants';
import type { User } from '@/core/users/domain/models';

interface State {
  token: string
  user: User | null
}

interface Actions {
  setUserToken: (user:User) => void,
  deleteUser: () => void
}


export const useAuthStore = create<State & Actions>()(persist(
  (set) => ({
    token: "",
    user: null,

    setUserToken: (user) => {
      localStorage.setItem(LOCAL_STORAGE_CONSTANTS.userToken, user.user.sha256)
      set({user: user, token: user.user.sha256})
    },

    deleteUser:() =>{
      localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.userToken)
      set({user:null, token: ""})
    }

  }),
  {
    name: LOCAL_STORAGE_CONSTANTS.userData
  }
))