import { Router } from 'express';
import middlewares from '../middlewares';
import { courseControllers } from '../controllers';
import { courseCreate } from '../schemas';

const courseRouter: Router = Router();

courseRouter.get('', courseControllers.read);

courseRouter.use('', middlewares.verifyToken, middlewares.validateAdmin);

courseRouter.post('', middlewares.validateBody(courseCreate), courseControllers.create);

courseRouter.get('/:id/users', middlewares.verifyIds, courseControllers.retrieve);

courseRouter.use('/:courseId/users/:userId', middlewares.verifyIds);

courseRouter.post('/:courseId/users/:userId', courseControllers.register);

courseRouter.delete('/:courseId/users/:userId', courseControllers.unregister);

export default courseRouter;
