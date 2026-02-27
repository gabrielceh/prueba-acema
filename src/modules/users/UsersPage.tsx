import { useEffect, useMemo, useState } from 'react';
import { useGetUsersQuery } from './hooks/useGetUsersQuery';
import Loader from '../shared/components/Loader/Loader';
import { UserCard } from './components/UserCard';
import { useUserStore } from './stores/users/users.store';
import { usePagination } from '../shared/hooks/usePagination';
import { Pagination } from '../shared/components';
import { useAuthStore } from '../auth/stores/auth/auth.store';

export function UsersPage() {
  const logout = useAuthStore((state) => state.deleteUser);
  const queryUsers = useGetUsersQuery();
  const setUsers = useUserStore((state) => state.setAllUsers);
  const users = useUserStore((state) => state.users);
  const [search, setSearch] = useState('');
  const limitPerPage = 10;

  useEffect(() => {
    if (queryUsers.data?.data) {
      setUsers(queryUsers.data.data);
    } else {
      setUsers([]);
    }
  }, [queryUsers.data]);

  const { currentPage, totalPages, onNextPage, onPrevPage } = usePagination({
    limit: limitPerPage,
    totalItems: users.length,
  });

  const usersToShow = useMemo(() => {
    let toShow = users;
    if (search) {
      toShow = users.filter(
        (user) =>
          user.user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.user.name.first.toLowerCase().includes(search.toLowerCase()) ||
          user.user.name.last.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (toShow.length > 10) {
      const offset = currentPage * limitPerPage;
      return toShow.slice(offset, limitPerPage * (currentPage + 1));
    } else {
      return toShow;
    }
  }, [currentPage, users, search]);

  if (queryUsers.isLoading) {
    return (
      <main className='w-full min-h-dvh flex justify-center items-center'>
        <Loader />
      </main>
    );
  }

  return (
    <main className=''>
      <section className='flex gap-4 p-4 max-w-150 mx-auto'>
        <input
          className='border border-gray-300 rounded-lg p-2 w-full'
          placeholder='Buscar...'
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
        <button onClick={logout}>Logout</button>
      </section>

      <section className='flex flex-col gap-4 p-4 max-w-150 mx-auto'>
        {usersToShow.map((user) => (
          <UserCard key={user.user.email} user={user} />
        ))}
      </section>

      {totalPages > 1 && (
        <section className='flex items-center justify-center w-full'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={onNextPage}
            onPrev={onPrevPage}
          />
        </section>
      )}
    </main>
  );
}
