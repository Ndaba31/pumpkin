import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);
	let message;
  
	if (req.method === 'POST') {
	  const { email } = req.body;
  
	  const slideForYou = await query({
		query: 'Select users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email From users, user_details where users.stem = user_details.stem and users.stem IN (Select crushee From matches where liked_back is null and crush in (Select stem From users where email = ?));',
		values: [email],
	  });
  
	  let youAcceptedMatch = await query({
		query: 'Select users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email From users, user_details where users.stem = user_details.stem and users.stem IN (Select crushee From matches where liked_back = ? and crush in (Select stem From users where email = ?));',
		values: [1,email],
	  });
  
	  let youRejectedMatch = await query({
		query: 'Select users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email From users, user_details where users.stem = user_details.stem and users.stem IN (Select crushee From matches where liked_back =? and crush in (Select stem From users where email = ?));',
		values: [0,email],
	  });
  
	  let slideForCrush = await query({
		query: 'Select users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email From users, user_details where users.stem = user_details.stem and users.stem IN (Select crush From matches where liked_back is null and crushee in (Select stem From users where email = ?));',
		values: [email],
	  });
  
	  let crushAccepted = await query({
		query: 'Select users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email From users, user_details where users.stem = user_details.stem and users.stem IN (Select crush From matches where liked_back = ? and crushee in (Select stem From users where email = ?));',
		values: [1,email],
	  });
  
	  let crushRejected = await query({
		query: 'Select users.stem AS stem, dob, hickies, pumpkins, profile_photo, first_name, last_name, email From users, user_details where users.stem = user_details.stem and users.stem IN (Select crush From matches where liked_back = ? and crushee in (Select stem From users where email = ?));',
		values: [0,email],
	  });
  
	  res.status(200).json({
		message: message,
		slideForYou: slideForYou,
		youAcceptedMatch: youAcceptedMatch,
		youRejectedMatch: youRejectedMatch,
		slideForCrush: slideForCrush,
		crushAccepted: crushAccepted,
		crushRejected: crushRejected,
	  });
	}
	if (req.method === 'PUT') {
		const { searchString, update } = req.body;

		if (update === 'getDiscover') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem WHERE users.first_name LIKE ? OR users.last_name LIKE ? OR user_details.stem LIKE ? OR user_details.nick_name LIKE ? LIMIT ?',
					values: [
						wildcardPattern,
						wildcardPattern,
						wildcardPattern,
						wildcardPattern,
						20,
					],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'name') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem WHERE users.first_name LIKE ? OR users.last_name LIKE ? OR user_details.stem LIKE ? OR user_details.nick_name LIKE ? LIMIT ?',
					values: [
						wildcardPattern,
						wildcardPattern,
						wildcardPattern,
						wildcardPattern,
						20,
					],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'age') {
			const yearPattern = '%' + 'Y';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem WHERE (DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), dob)), ?) + ?) >= ? LIMIT ?',
					values: [yearPattern, 0, Number(searchString), 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'city') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,locations.* FROM user_details LEFT JOIN locations ON locations.stem=user_details.stem WHERE city LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'region') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,locations.* FROM user_details LEFT JOIN locations ON locations.stem=user_details.stem WHERE region LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'hobbies') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,hobbies.* FROM user_details LEFT JOIN hobbies ON hobbies.stem=user_details.stem WHERE hobby LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'relationship') {
			const wildcardPattern = '%' + searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.* FROM user_details WHERE relationship_status LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'ethnicity') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*FROM user_details WHERE ethnicity LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'religion') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.* FROM user_details WHERE religion LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'job') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,occupations.* FROM user_details LEFT JOIN occupations ON occupations.stem=user_details.stem WHERE title LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
		if (update === 'company') {
			const wildcardPattern = searchString + '%';

			if (searchString.length === '') {
				const discoverAllUsers = await query({
					query: 'SELECT user_details.*,users.* FROM user_details LEFT JOIN users ON users.stem=user_details.stem LIMIT ?',
					values: [20],
				});

				console.log(discoverAllUsers);
				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			} else {
				const discoverAllUsers = await query({
					query: 'Select user_details.*,occupations.* FROM user_details LEFT JOIN occupations ON occupations.stem=user_details.stem WHERE company LIKE ? LIMIT ?',
					values: [wildcardPattern, 20],
				});

				res.status(200).json({
					discoverAllUsers: discoverAllUsers,
				});
			}
		}
	}
}