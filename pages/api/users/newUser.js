import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';
import { hashPass } from '@/lib/hash';
import { error } from 'console';

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === 'POST') {
		const { stem, firstName, lastName, email, password } = req.body;
		const dateJoined = new Date();
		const hashedPassword = await hashPass(password);

		const userDB = await query({
			query: 'SELECT stem FROM users WHERE stem = ? OR email = ?',
			values: [stem, email],
		});

		if (userDB.length > 0) {
			res.status(500).json({ error: 'User Already Exists' });
		}

		const addUser = await query({
			query: 'INSERT INTO users (stem, first_name, last_name, email, password, date_joined) VALUES (?, ?, ?, ?, ?, ?)',
			values: [stem, firstName, lastName, email, hashedPassword, dateJoined],
		});

		if (!addUser) {
			res.status(500).json({ error: 'Trouble adding to user table' });
		}

		const addUserDetail = await query({
			query: 'INSERT INTO user_details (stem, hickies, pumpkins) VALUES (?, ?, ?)',
			values: [stem, 0, 0],
		});

		if (!addUserDetail) {
			res.status(500).json({ error: 'Trouble adding to user detail table' });
		}

		res.status(200).json({ success: true });
	}
}
