import type { User } from '../../../users/domain/models';

export interface AuthRepository {
  login: (email: string, password:string) => Promise<User | null>
}