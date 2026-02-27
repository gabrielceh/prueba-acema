import type { ResponseApiModel } from '@/core/api/model/response-api.model';
import { type User } from '../models';

export interface UsersRepository {
  getUsers: (offset?:number) => Promise<ResponseApiModel<User[]>>
}