import type { User } from '@/core/users/domain/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  users: User[];
}

interface Actions {
  setAllUsers: (users: User[]) => void;
  deleteUser: (email: string) => void;
}

export const useUserStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      users: [],

      setAllUsers: (users) => {
        set({ users: users });
      },

      deleteUser: (email: string) => {
        const { users } = get();
        const userFound = users.find((user) => user.user.email === email);

        if (userFound) {
          const usersFiltered = users.filter(
            (user) => user.user.email !== userFound.user.email,
          );
          set({ users: usersFiltered });
        }
      },
    }),
    {
      name: 'users',
    },
  ),
);