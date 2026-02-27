import { GetUsersUsecase } from '../users/application/usecases/get-users.usecase';
import { UsersRandomUsersRepositoryImpl } from '../users/infrastructure/UsersRandomUsers.repository.impl';

const repository = new UsersRandomUsersRepositoryImpl()

const getUsers = new GetUsersUsecase(repository)

export const usersContainer = {
  usecases:{
    getUsers,
  },
  repository
}