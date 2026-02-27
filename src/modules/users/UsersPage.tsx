import { useEffect, useMemo } from 'react';
import { useGetUsersQuery } from './hooks/useGetUsersQuery';
import Loader from '../shared/components/Loader/Loader';
import { UserCard } from './components/UserCard';
import { useUserStore } from './stores/users/users.store';
import { usePagination } from '../shared/hooks/usePagination';
import { Pagination } from '../shared/components';

export function UsersPage() {
  const queryUsers = useGetUsersQuery();
  const setUsers = useUserStore((state) => state.setAllUsers);
  const users = useUserStore((state) => state.users);
  const limit = 10;

  useEffect(() => {
    if (queryUsers.data?.data) {
      setUsers(queryUsers.data.data);
    } else {
      setUsers([]);
    }
  }, [queryUsers.data]);


  const { currentPage, totalPages, onNextPage, onPrevPage } = usePagination({
    limit: limit,
    totalItems: users.length,
  });

  const usersToShow = useMemo(() => {
    if (users.length > 10) {
      const offset = currentPage * limit;
      return users.slice(offset, limit * (currentPage + 1));
    } else {
      return users;
    }
  }, [currentPage, users]);

  if (queryUsers.isLoading) {
    return (
      <main className='w-full min-h-dvh flex justify-center items-center'>
        <Loader />
      </main>
    );
  }

  return (
    <main className=''>
      <section className='flex flex-col gap-4 p-4 max-w-150 mx-auto'>
        {usersToShow.map((user) => (
          <UserCard key={user.user.email} user={user} />
        ))}
      </section>

      <section className='flex items-center justify-center w-full'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={onNextPage}
          onPrev={onPrevPage}
        />
      </section>
    </main>
  );
}
