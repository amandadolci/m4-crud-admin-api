import { z } from 'zod';

const user = z.object({
	id: z.number().positive(),
	name: z.string().max(50),
	email: z.string().email().max(50),
	password: z.string().max(120),
	admin: z.boolean().default(() => false),
});

const userCreate = user.omit({ id: true });
const userUpdate = userCreate.partial();
const userRead = user.omit({ password: true });
const usersList = userRead.array();
const userLogin = user.pick({ email: true, password: true });

export { user, userCreate, userUpdate, userRead, usersList, userLogin };
