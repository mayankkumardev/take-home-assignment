import express from 'express';

import userController from 'src/controllers/users.controller';
import Authenticate from 'src/middlewares/authenticate';

const args = { mergeParams: true };
const userRouter = express.Router(args);

userRouter.route('/user_details').get(Authenticate, userController.GetUserDetails);

export { userRouter };
