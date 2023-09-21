import express, { Application } from 'express';
import 'express-async-errors';
import { userRouter, loginRouter, courseRouter } from './routers';
import middlewares from './middlewares';

const app: Application = express();
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/courses', courseRouter);

app.use(middlewares.handleError);

export default app;
