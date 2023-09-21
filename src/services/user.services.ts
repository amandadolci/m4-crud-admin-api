import format from 'pg-format';
import {
	User,
	UserCreate,
	UserRead,
	UsersList,
	UserResult,
	UserLogin,
	LoginReturn,
	UserCourses,
} from '../interfaces';
import { client } from '../database';
import { userRead, usersList } from '../schemas';
import { AppError } from '../error';
import { sign } from 'jsonwebtoken';
import { compare, hash, hashSync } from 'bcryptjs';

async function create(payload: UserCreate): Promise<any> {
	payload.password = hashSync(payload.password, 10);
	const queryFormat: string = format(
		'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
		Object.keys(payload),
		Object.values(payload)
	);

	const query: UserResult = await client.query(queryFormat);
	return userRead.parse(query.rows[0]);
}

async function login(payload: UserLogin): Promise<LoginReturn> {
	const query: UserResult = await client.query('SELECT * FROM "users" WHERE "email" = $1;', [
		payload.email,
	]);

	const user: User = query.rows[0];

	if (!user) {
		throw new AppError('Wrong email/password', 401);
	}

	const verifiedPassword: boolean = await compare(payload.password, user.password);

	if (!verifiedPassword) {
		throw new AppError('Wrong email/password', 401);
	}

	const token = sign({ email: user.email, admin: user.admin }, process.env.SECRET_KEY!, {
		subject: user.id.toString(),
		expiresIn: process.env.EXPIRES_IN!,
	});

	return { token };
}

async function read(): Promise<UsersList> {
	const query: UserResult = await client.query('SELECT * FROM "users";');
	return usersList.parse(query.rows);
}

async function retrieve(userId: string): Promise<UserCourses[]> {
	const queryFormat: string = format(`
	SELECT
			cs."id" "courseId",
			cs."name" "courseName",
			cs."description" "courseDescription",
			uc."active" "userActiveInCourse",
			u."id" "userId",
			u."name" "userName"
	FROM
	    "users" u
	JOIN
	    "userCourses" uc ON u."id" = uc."userId"
	JOIN
	    "courses" cs ON cs."id" = uc."courseId"
	WHERE
		u."id" = $1;
    `);

	const query = await client.query(queryFormat, [userId]);

	if (query.rowCount === 0) {
		throw new AppError('No course found', 404);
	}

	return query.rows;
}

export default { create, login, read, retrieve };
