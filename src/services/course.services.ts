import format from 'pg-format';
import { Course, CourseCreate, CoursesList, CourseResult, UserCourses } from '../interfaces';
import { client } from '../database';
import { coursesList } from '../schemas';

async function create(payload: CourseCreate): Promise<any> {
	const queryFormat: string = format(
		'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
		Object.keys(payload),
		Object.values(payload)
	);

	const query: CourseResult = await client.query(queryFormat);
	return query.rows[0];
}

async function read(): Promise<CoursesList> {
	const query: CourseResult = await client.query('SELECT * FROM "courses";');
	return coursesList.parse(query.rows);
}

async function register(courseId: string, userId: string): Promise<void> {
	await client.query('INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2);', [
		courseId,
		userId,
	]);
}

async function unregister(courseId: string, userId: string): Promise<void> {
	await client.query(
		`
		UPDATE "userCourses"
  	SET active = false
    WHERE "courseId" = $1
    AND "userId" = $2;`,
		[courseId, userId]
	);
}

async function retrieve(courseId: string): Promise<UserCourses[]> {
	const queryFormat: string = format(`
	SELECT
	    u."id" "userId",
	    u."name" "userName",
	    cs."id" "courseId",
	    cs."name" "courseName",
	    cs."description" "courseDescription",
	    uc."active" "userActiveInCourse"
	FROM
	    "users" u
	JOIN
	    "userCourses" uc ON u."id" = uc."userId"
	JOIN
	    "courses" cs ON cs."id" = uc."courseId"
	WHERE
		cs."id" = $1;
    `);

	const query = await client.query(queryFormat, [courseId]);

	return query.rows;
}

export default { create, read, register, unregister, retrieve };
