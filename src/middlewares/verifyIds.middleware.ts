import { NextFunction, Request, Response } from 'express';
import { CourseResult, UserResult } from '../interfaces';
import { client } from '../database';
import { AppError } from '../error';

export async function verifyIds(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const { id, courseId, userId } = request.params;
	if (id) {
		const userQuery: UserResult = await client.query('SELECT * FROM "users" WHERE "id" = $1;', [
			id,
		]);
		const courseQuery: CourseResult = await client.query(
			'SELECT * FROM "courses" WHERE "id" = $1;',
			[id]
		);
		if (userQuery.rowCount === 0 && courseQuery.rowCount === 0) {
			throw new AppError('User/course not found', 404);
		}
	} else {
		const userQuery: UserResult = await client.query('SELECT * FROM "users" WHERE "id" = $1;', [
			userId,
		]);

		const courseQuery: CourseResult = await client.query(
			'SELECT * FROM "courses" WHERE "id" = $1;',
			[courseId]
		);

		if (userQuery.rowCount === 0 || courseQuery.rowCount === 0) {
			throw new AppError('User/course not found', 404);
		}
	}

	return next();
}
