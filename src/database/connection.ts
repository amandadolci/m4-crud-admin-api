import client from "./config";

async function startDatabase(): Promise<void> {
	await client.connect();
	console.log('Database connected.');
};

export default startDatabase;
