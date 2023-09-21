import { Router } from 'express';
import middlewares from '../middlewares';
import { userControllers } from '../controllers';
import { userLogin } from '../schemas';

const loginRouter: Router = Router();

loginRouter.post('', middlewares.validateBody(userLogin), userControllers.login);

export default loginRouter;
