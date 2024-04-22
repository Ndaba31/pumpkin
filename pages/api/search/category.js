import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === 'POST') {
		const { filteredList } = req.body;
		const hobbies = filteredList['Hobbies'];
		const relationship_status = filteredList['Relationship Status'];
		const ethnicity = filteredList['Ethnicity'];
		const region = filteredList['Region'];
		const religion = filteredList['Religion'];

		let response = {
			'Hobbies': [],
			'Relationship Status': [],
			'Ethnicity': [],
			'Region': [],
			'Religion': [],
		};

		console.log(hobbies, relationship_status, ethnicity, region, religion);

		if (hobbies.length !== 0) {
			hobbies.forEach(async (hobby) => {
				const filterHobbies = await query({
					query: 'SELECT hobby, users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email FROM user_details, users, hobbies WHERE users.stem = user_details.stem AND users.stem = hobbies.stem AND hobby = ? ORDER BY pumpkins DESC LIMIT 10',
					values: [hobby.toLowerCase()],
				});

				response.Hobbies.push(filterHobbies);
				console.log('FILTERED HOBBIES\n', filterHobbies);
				response['Hobbies'] = [...response['Hobbies'], filterHobbies];
			});
		}
		console.log('RESPONSE\n', response);

		res.status(200).json({ success: true });
	}
}
