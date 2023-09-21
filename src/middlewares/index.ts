import { handleError } from './handleError.middleware';
import { uniqueEmail } from './uniqueEmail.middleware';
import { validateBody } from './validateBody.middleware';
import { verifyIds } from './verifyIds.middleware';
import { verifyToken } from './verifyToken.middleware';
import { validateAdmin } from './validateAdmin.middleware';

export default {
	handleError,
	uniqueEmail,
	validateBody,
	verifyIds,
	verifyToken,
	validateAdmin,
};
