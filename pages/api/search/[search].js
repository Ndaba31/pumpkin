import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	// Run the CORS middleware
	await runMiddleware(req, res, cors);
	const { search } = req.query;
	const likeTerm = search + '%';

	if (req.method === 'GET') {
		const searchedUsers = await query({
			query: 'SELECT profile_photo, users.stem AS stem, dob, date_joined, pumpkins, hickies FROM user_details, users WHERE users.stem = user_details.stem AND (users.stem LIKE ? OR first_name LIKE ? OR last_name LIKE ?) LIMIT 5',
			values: [likeTerm, likeTerm, likeTerm],
		});

		if (searchedUsers.length !== 0) {
			res.status(200).json({ searchedUsers: searchedUsers });
		} else {
			res.status(500).json({ message: 'No pumpkins found' });
		}
	}
}
