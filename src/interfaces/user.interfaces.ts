import { QueryResult } from 'pg';
import { z } from 'zod';
import { user, userCreate, userUpdate, userRead, usersList, userLogin } from '../schemas';

type User = z.infer<typeof user>;

type UserCreate = z.infer<typeof userCreate>;
type UserUpdate = z.infer<typeof userUpdate>;
type UserRead = z.infer<typeof userRead>;
type UsersList = z.infer<typeof usersList>;
type UserLogin = z.infer<typeof userLogin>;
type LoginReturn = {
	token: string;
};

type UserResult = QueryResult<User>;

export { User, UserCreate, UserUpdate, UserRead, UsersList, UserLogin, LoginReturn, UserResult };