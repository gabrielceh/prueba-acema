import { usersContainer } from '@/core/di/users.container';
import { useQuery } from '@tanstack/react-query';


export function useGetUsersQuery(offset?: number | undefined) {
  const query = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => await usersContainer.usecases.getUsers.execute(offset),
    staleTime: 1000 * 60 * 60 * 24 // 24 horas,
  })

  return query
    
}
