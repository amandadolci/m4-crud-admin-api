import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';
import { verify } from 'jsonwebtoken';

export function verifyToken(request: Request, response: Response, next: NextFunction): void {
	const { authorization } = request.headers;
	if (!authorization) throw new AppError('Missing bearer token', 401);

	const [, token] = authorization.split(' ');

	verify(token, process.env.SECRET_KEY!, (error, decoded) => {
		if (error) throw new AppError(error.message, 401);
		response.locals = { ...response.locals, decoded };
	});

	return next();
}
