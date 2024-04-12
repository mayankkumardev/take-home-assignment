import type { Response } from 'express';

import GetUserDetailsService from 'src/services/users/getUserDetails';
import type { CustomRequest } from 'src/types';

import { sendResponse } from 'src/utils/responseHandler';

class UsersController {
  static async GetUserDetails(request: CustomRequest, response: Response) {
    sendResponse({
      service: GetUserDetailsService,
      parameters: {
        userId: request.loggedInUserId,
      },
      response,
    });
  }
}

export default UsersController;
