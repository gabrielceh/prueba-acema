import type { User } from '@/core/users/domain/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  users: User[]
}

interface Actions {
  setAllUsers: (users: User[]) => void
}

export const useUserStore = create<State & Actions>()(
  persist((set) => ({
    users:[],

    setAllUsers: (users) => {
      set({users: users})
    }
  }),{
    name: "users"
  })
)