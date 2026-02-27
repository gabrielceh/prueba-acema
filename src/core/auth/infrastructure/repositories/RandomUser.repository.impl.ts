import type { User } from '@/core/users/domain/models';
import type { AuthRepository } from '../../domain/repositories/auth.repository';
import { usersApi } from '@/core/api/users-api';
import type { ResponseApiModel } from '@/core/api/model/response-api.model';
import { AxiosError } from 'axios';
import { API_SEED } from '@/core/constants/api-seed';

export class RandomUserRepositoryImpl implements AuthRepository {
  async login(
    email: string,
    password: string,
  ): Promise<ResponseApiModel<User | null>> {
    try {
      const { data } = await usersApi.get<{ results: User[] }>(``, {
        params: {
          seed: API_SEED,
          results: 100,
        },
      });

      const userFiltered = data.results.find(
        (user) => user.user.email === email && user.user.password === password,
      );
      if (!userFiltered) {
        throw new Error('User or password invalid');
      }

      return {
        data: userFiltered,
        status: 'success',
        message: 'User found',
      };
    } catch (error) {
      return {
        data: null,
        status: 'error',
        message:
          error instanceof AxiosError
            ? error.response?.data.message
            : error instanceof Error
              ? error?.message
              : 'Unexpected Error in login',
      };
    }
  }
}