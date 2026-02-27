import type { ResponseApiModel } from '@/core/api/model/response-api.model';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import type { User } from '@/core/users/domain/models';

export class LoginUsecase {
  private repository: AuthRepository

  constructor(repository: AuthRepository){
    this.repository = repository
  }

  async execute(email:string, password:string): Promise<ResponseApiModel<User | null>> {
    return await this.repository.login(email, password)
  }
}