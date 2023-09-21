import { Router } from 'express';
import middlewares from '../middlewares';
import { userControllers } from '../controllers';
import { userCreate } from '../schemas';

const userRouter: Router = Router();

userRouter.post(
	'',
	middlewares.validateBody(userCreate),
	middlewares.uniqueEmail,
	userControllers.create
);
userRouter.use('', middlewares.verifyToken, middlewares.validateAdmin);

userRouter.get('', userControllers.read);

userRouter.get('/:id/courses', middlewares.verifyIds, userControllers.retrieve);

export default userRouter;
