import type { ResponseApiModel } from '@/core/api/model/response-api.model';
import type { User } from '@/core/users/domain/models';

export interface AuthRepository {
  login: (
    email: string,
    password: string,
  ) => Promise<ResponseApiModel<User | null>>;
}
