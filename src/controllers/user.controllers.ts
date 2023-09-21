import { Request, Response } from 'express';
import { LoginReturn, User, UserCourses, UserLogin, UserRead, UsersList } from '../interfaces';
import { userServices } from '../services';

async function create(request: Request, response: Response): Promise<Response> {
	const user: User = await userServices.create(response.locals.validated);
	return response.status(201).json(user);
}

async function login(request: Request, response: Response): Promise<Response> {
	const token: LoginReturn = await userServices.login(response.locals.validated);
	return response.status(200).json(token);
}

async function read(request: Request, response: Response): Promise<Response> {
	const users: UsersList = await userServices.read();
	return response.status(200).json(users);
}

async function retrieve(request: Request, response: Response): Promise<Response> {
	const userCourses: UserCourses[] = await userServices.retrieve(request.params.id);
	return response.status(200).json(userCourses);
}

export default { create, login, read, retrieve };
