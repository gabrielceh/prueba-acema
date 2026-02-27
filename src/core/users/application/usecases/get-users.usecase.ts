import type { UsersRepository } from '../../domain/repositories/user.respository';

export class GetUsersUsecase {
  private repository: UsersRepository

    constructor(repository: UsersRepository){
    this.repository = repository
  }

  async execute(offset: number | undefined) {
    return await this.repository.getUsers(offset)
  }
 }