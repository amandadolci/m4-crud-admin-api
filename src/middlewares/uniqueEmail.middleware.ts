import { NextFunction, Request, Response } from 'express';
import { UserResult } from '../interfaces';
import { client } from '../database';
import { AppError } from '../error';

export async function uniqueEmail(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const { email } = request.body;

	if (!email) {
		return next();
	}

	const query: UserResult = await client.query('SELECT * FROM "users" WHERE "email" = $1;', [
		email,
	]);

	if (query.rowCount !== 0) {
		throw new AppError('Email already registered', 409);
	}

	return next();
}
