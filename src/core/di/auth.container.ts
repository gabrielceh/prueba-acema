import { LoginUsecase } from '../auth/application/usecases/login.usecase';
import { RandomUserRepositoryImpl } from '../auth/infrastructure/repositories/RandomUser.repository.impl';

const repository = new RandomUserRepositoryImpl()

const loginUsecase = new LoginUsecase(repository);

export const authContainer = {
  usecases: {
    loginUsecase,
  },
  repository
}