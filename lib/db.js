import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
	const db = await mysql.createConnection({
		host: process.env.MYSQL_HOST,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: '',
	});

	// host: process.env.PLANETSCALE_DB_HOST,
	// 	database: process.env.PLANETSCALE_DB,
	// 	user: process.env.PLANETSCALE_DB_USERNAME,
	// 	password: process.env.PLANETSCALE_DB_PASSWORD,
	// 	ssl: {
	// 		rejectUnauthorized: true,
	// 	},

	try {
		const [results] = await db.execute(query, values);
		db.end();
		return results;
	} catch (error) {
		throw Error(error.message);
	}
}
