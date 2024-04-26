import IncomingForm from 'formidable-serverless';
import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === 'PUT') {
		const form = new IncomingForm();

		form.parse(req, async (err, fields, files) => {
			if (fields.update === 'details') {
				const userObject = fields.user;
				const stem = fields.stem;
				const user = JSON.parse(userObject);
				const stem_edited = user.stem.trim().split(' ').join('_').toLowerCase();

				console.log(`Previous stem: ${stem_edited}`);

				try {
					const updateUsers = query({
						query: 'UPDATE users SET stem = ?, first_name = ?, last_name = ? WHERE stem = ?;',
						values: [stem_edited, user.firstName, user.lastName, stem],
					});

					const updateUserDetails = query({
						query: 'UPDATE user_details SET stem = ?, bio = ? WHERE stem = ?;',
						values: [stem_edited, user.bio, stem],
					});

					const updateHobbiesStem = query({
						query: 'UPDATE hobbies SET stem = ? WHERE stem = ?;',
						values: [stem_edited, stem],
					});

					const updateLikesStem1 = query({
						query: 'UPDATE likes SET crush = ? WHERE crush = ?;',
						values: [stem_edited, stem],
					});

					const updateLikesStem2 = query({
						query: 'UPDATE likes SET crushee = ? WHERE crushee = ?;',
						values: [stem_edited, stem],
					});

					const updateLocationsStem = query({
						query: 'UPDATE locations SET stem = ? WHERE stem = ?;',
						values: [stem_edited, stem],
					});

					const updateMatchesStem1 = query({
						query: 'UPDATE matches SET crush = ? WHERE crush = ?;',
						values: [stem_edited, stem],
					});

					const updateMatchesStem2 = query({
						query: 'UPDATE matches SET crushee = ? WHERE crushee = ?;',
						values: [stem_edited, stem],
					});

					const updateOccupationsStem = query({
						query: 'UPDATE occupations SET stem = ? WHERE stem = ?;',
						values: [stem_edited, stem],
					});

					const updatePostsStem = query({
						query: 'UPDATE posts SET stem = ? WHERE stem = ?;',
						values: [stem_edited, stem],
					});

					const updateSocialsStem = query({
						query: 'UPDATE socials SET stem = ? WHERE stem = ?;',
						values: [stem_edited, stem],
					});
				} catch (error) {
					console.log(error);
				}
			} else if (fields.update === 'location') {
				const userObject = fields.user;
				const user = JSON.parse(userObject);
				const stem = fields.stem;
				console.log('Location Reached.\nStem: ', stem);
				console.log(user);
				const pumpkin_location = await query({
					query: 'SELECT * FROM locations WHERE stem = ?;',
					values: [stem],
				});

				console.log('Pumpkin Location Query:');
				console.log(pumpkin_location);

				if (pumpkin_location.length === 0) {
					console.log('Location does not exist');
					const insert_location = await query({
						query: 'INSERT INTO locations (stem, city, region) VALUES (?, ?, ?);',
						values: [stem, user.city, user.region],
					});
				} else {
					console.log('Location exists');
					const update_location = await query({
						query: 'UPDATE locations SET city = ?, region = ? WHERE stem = ?',
						values: [user.city, user.region, stem],
					});
				}
			} else if (fields.update === 'occupation') {
				const userObject = fields.user;
				const user = JSON.parse(userObject);
				const stem = fields.stem;
				console.log('Occupation Reached.\nStem: ', stem);
				console.log(user);
				const pumpkin_occupation = await query({
					query: 'SELECT * FROM occupations WHERE stem = ?;',
					values: [stem],
				});

				console.log('Pumpkin occupation Query:');
				console.log(pumpkin_occupation);

				if (pumpkin_occupation.length === 0) {
					console.log('occupation does not exist');
					const insert_occupation = await query({
						query: 'INSERT INTO occupations (stem, title, company) VALUES (?, ?, ?);',
						values: [stem, user.title, user.company],
					});
				} else {
					console.log('occupation exists');
					const update_occupation = await query({
						query: 'UPDATE occupations SET title = ?, company = ? WHERE stem = ?',
						values: [user.title, user.company, stem],
					});
				}
			} else if (fields.update === 'more_details') {
				const userObject = fields.user;
				const user = JSON.parse(userObject);
				const stem = fields.stem;
				console.log('More Details Reached.\nStem: ', stem);
				console.log(user);
				const pumpkin_more_details = await query({
					query: 'SELECT religion, ethnicity, sex, relationship_status, dob FROM user_details WHERE stem = ?;',
					values: [stem],
				});

				console.log('Pumpkin More Details Query:');
				console.log(pumpkin_more_details);

				if (user.dob !== '' && user.dob !== null) {
					const dob = new Date(user.dob).toISOString().slice(0, 10);
					const updateDetail = await query({
						query: 'UPDATE user_details SET dob = ? WHERE stem = ?;',
						values: [dob, stem],
					});

					if (!updateDetail) {
						console.log('Update Not Done');
						res.status(500).json({ success: false });
					}
				} else {
					await query({
						query: 'UPDATE user_details SET dob = NULL WHERE stem = ?;',
						values: [stem],
					});
				}

				if (user.relationship_status !== '' && user.relationship_status !== null) {
					const updateDetail = await query({
						query: 'UPDATE user_details SET relationship_status = ? WHERE stem = ?;',
						values: [user.relationship_status, stem],
					});

					if (!updateDetail) {
						console.log('Update Not Done');
						res.status(500).json({ success: false });
					}
				} else {
					await query({
						query: 'UPDATE user_details SET relationship_status = NULL WHERE stem = ?;',
						values: [stem],
					});
				}

				if (user.religion !== '' && user.religion !== null) {
					const updateDetail = await query({
						query: 'UPDATE user_details SET religion = ? WHERE stem = ?;',
						values: [user.religion, stem],
					});

					if (!updateDetail) {
						console.log('Update Not Done');
						res.status(500).json({ success: false });
					}
				} else {
					await query({
						query: 'UPDATE user_details SET religion = NULL WHERE stem = ?;',
						values: [stem],
					});
				}

				if (user.sex !== '' && user.sex !== null) {
					const updateDetail = await query({
						query: 'UPDATE user_details SET sex = ? WHERE stem = ?;',
						values: [user.sex, stem],
					});

					if (!updateDetail) {
						console.log('Update Not Done');
						res.status(500).json({ success: false });
					}
				} else {
					await query({
						query: 'UPDATE user_details SET sex = NULL WHERE stem = ?;',
						values: [stem],
					});
				}

				if (user.ethnicity !== '' && user.ethnicity !== null) {
					const updateDetail = await query({
						query: 'UPDATE user_details SET ethnicity = ? WHERE stem = ?;',
						values: [user.ethnicity, stem],
					});

					if (!updateDetail) {
						console.log('Update Not Done');
						res.status(500).json({ success: false });
					}
				} else {
					await query({
						query: 'UPDATE user_details SET ethnicity = NULL WHERE stem = ?;',
						values: [stem],
					});
				}
			} else if (fields.update === 'hobbies') {
				const stem = fields.stem;
				const hobby = fields.hobby;
				console.log(`Hobbies reached\nStem: ${stem}\nHobby: ${hobby}`);

				if (fields.action === 'add') {
					await query({
						query: 'INSERT INTO hobbies (stem, hobby) VALUES (?, ?)',
						values: [stem, hobby],
					});
				} else {
					await query({
						query: 'DELETE FROM hobbies WHERE stem = ? and hobby = ?',
						values: [stem, hobby],
					});
				}
			}
		});

		res.status(200).json({ success: true });
	} else {
		res.status(500).json({ success: false });
	}
}
