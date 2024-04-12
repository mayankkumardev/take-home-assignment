import { AppDataSource } from 'src/utils/data-source';

import { INTERNAL_SERVER_ERROR, INVALID_USER, UNAUTHORIZED } from '../../utils/constants';

import { User } from 'src/entities/user';
import type { ServiceResponseReturnType } from 'src/types';

interface IGetUserDetailsServiceParams {
  userId: string;
}

class GetUserDetailsService {
  static async run({ userId }: IGetUserDetailsServiceParams): ServiceResponseReturnType {
    try {
      const userRepository = AppDataSource.getRepository(User);

      const userData = await userRepository.findOne({
        where: { id: userId },
        select: {
          password: false,
        },
      });

      if (!userData) {
        return [
          {
            errorType: UNAUTHORIZED,
            message: INVALID_USER,
          },
        ];
      }

      return [
        null,
        {
          data: userData,
        },
      ];
    } catch (error) {
      console.log('Error while executing GetUserDetailsService', error);
      return [{ errorType: INTERNAL_SERVER_ERROR }];
    }
  }
}

export default GetUserDetailsService;
