import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === 'DELETE') {
		const { property, stem } = req.body;
		console.log(stem, property);

		if (property === 'location') {
			const removeLocation = await query({
				query: 'DELETE FROM locations WHERE stem = ?',
				values: [stem],
			});

			if (!removeLocation) {
				res.status(500).json({ success: false });
			}
		}

		if (property === 'occupation') {
			const removeOccupation = await query({
				query: 'DELETE FROM occupations WHERE stem = ?',
				values: [stem],
			});

			if (!removeOccupation) {
				res.status(500).json({ success: false });
			}
		}

		res.status(200).json({ success: true });
	}
}
