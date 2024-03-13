import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	// Run the CORS middleware
	await runMiddleware(req, res, cors);

	if (req.method === 'GET') {
		const popular_users = await query({
			query: 'SELECT users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email FROM user_details, users WHERE users.stem = user_details.stem ORDER BY pumpkins DESC LIMIT 10',
			values: [],
		});

		const most_wanted_users = await query({
			query: 'SELECT users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email FROM user_details, users WHERE users.stem = user_details.stem ORDER BY hickies DESC LIMIT 10',
			values: [],
		});

		const single_users = await query({
			query: 'SELECT users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email, relationship_status FROM user_details, users WHERE users.stem = user_details.stem AND (relationship_status = ? OR relationship_status = ? OR relationship_status = ?) ORDER BY hickies DESC LIMIT 10',
			values: ['single', 'widowed', 'divorced'],
		});

		res.status(200).json({
			popular_users: popular_users,
			most_wanted_users: most_wanted_users,
			single_users: single_users,
		});
	}
}
