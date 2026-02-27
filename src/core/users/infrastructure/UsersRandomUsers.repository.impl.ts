import type { ResponseApiModel } from '@/core/api/model/response-api.model';
import type { User } from '../domain/models';
import type { UsersRepository } from '../domain/repositories/user.respository';
import { usersApi } from '@/core/api/users-api';
import { AxiosError } from 'axios';
import { API_SEED } from '@/core/constants/api-seed';

export class UsersRandomUsersRepositoryImpl implements UsersRepository {

  async getUsers(offset = 1): Promise<ResponseApiModel<User[]>> {
    try {
      const {data} = await usersApi.get<{results:User[]}>("", {
        params:{
          offset,
          results: 100,
          seed: API_SEED
        }
      })

      return  {
        data: data.results,
        status: "success",
        message: "Success"
      }
    } catch (error) {
      return {
        data: null,
        status: "error",
        message:
          error instanceof AxiosError
            ? error.response?.data.message
            : error instanceof Error
              ? error?.message
              : 'Unexpected Error in getUsers',
      }
    }
  };

}