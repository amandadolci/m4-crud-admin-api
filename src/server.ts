import 'dotenv/config';
import app from './app';
import { startDatabase } from './database';

const PORT = Number(process.env.PORT!) || 3000;
const runningMsg: string = `Server is running on http://localhost:${PORT}`;

app.listen(PORT, async () => {
	await startDatabase();
	console.log(runningMsg);
});
