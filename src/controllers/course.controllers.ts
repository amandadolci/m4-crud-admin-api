import { Request, Response } from 'express';
import { Course, CourseCreate, CoursesList, CourseResult, UserCourses } from '../interfaces';
import { courseServices } from '../services';

async function create(request: Request, response: Response): Promise<Response> {
	const course: Course = await courseServices.create(response.locals.validated);
	return response.status(201).json(course);
}

async function read(request: Request, response: Response): Promise<Response> {
	const courses: CoursesList = await courseServices.read();
	return response.status(200).json(courses);
}

async function register(request: Request, response: Response): Promise<Response> {
	const { courseId, userId } = request.params;
	await courseServices.register(courseId, userId);
	const successMessage = { message: 'User successfully vinculed to course' };
	return response.status(201).json(successMessage);
}

async function unregister(request: Request, response: Response): Promise<Response> {
	const { courseId, userId } = request.params;
	await courseServices.unregister(courseId, userId);
	return response.status(204).json();
}

async function retrieve(request: Request, response: Response): Promise<Response> {
	const usersOnCourse: UserCourses[] = await courseServices.retrieve(request.params.id);
	return response.status(200).json(usersOnCourse);
}

export default { create, read, register, unregister, retrieve };
