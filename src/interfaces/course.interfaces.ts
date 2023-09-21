import { QueryResult } from 'pg';
import { z } from 'zod';
import { course, courseCreate, courseUpdate, coursesList } from '../schemas';

type Course = z.infer<typeof course>;

type CourseCreate = z.infer<typeof courseCreate>;
type CourseUpdate = z.infer<typeof courseUpdate>;
type CoursesList = z.infer<typeof coursesList>;

type CourseResult = QueryResult<Course>;

export { Course, CourseCreate, CourseUpdate, CoursesList, CourseResult };
