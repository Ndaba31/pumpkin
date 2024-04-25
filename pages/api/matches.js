import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);
	let message;
  
	if (req.method === 'POST') {
	  const { email } = req.body;
  
	  let slideForYou_names = await query({
		query: 'SELECT matches.crushee AS stem FROM matches, user_details,users WHERE matches.crush = user_details.stem and users.email = ? and liked_back is null;',
		values: [email],
	  });
  
	  let youAcceptedMatch_names = await query({
		query: 'SELECT matches.crushee AS stem FROM matches, user_details,users WHERE matches.crush = user_details.stem and users.email = ? and liked_back = ?;',
		values: [email, 1],
	  });
  
	  let youRejectedMatch_names = await query({
		query: 'SELECT matches.crushee AS stem FROM matches, user_details,users WHERE matches.crush = user_details.stem and users.email = ? and liked_back = ?;',
		values: [email, 0],
	  });
  
	  let slideForCrush_names = await query({
		query: 'SELECT matches.crush AS stem FROM matches, user_details,users WHERE matches.crush = user_details.stem and users.email = ? and liked_back is null;',
		values: [email],
	  });
  
	  let crushAccepted_names = await query({
		query: 'SELECT matches.crush AS stem FROM matches, user_details,users WHERE matches.crush = user_details.stem and users.email = ? and liked_back = ?;',
		values: [email, 1],
	  });
  
	  let crushRejected_names = await query({
		query: 'SELECT matches.crush AS stem FROM matches, user_details,users WHERE matches.crush = user_details.stem and users.email = ? and liked_back = ?;',
		values: [email, 0],
	  });
  
      let slideForYou=[]

	  let something = await Promise.all(slideForYou_names.forEach(async (stem) => {
		let value = await query({
		  query: 'SELECT users.stem,user_details.dob,user_details.hickies,user_details.pumpkins,user_details.profile_photo,users.first_name,users.last_name,users.email FROM user_details, users WHERE ? = user_details.stem;',
		  values: [stem]
		});
		slideForYou.push(value)
	  }));
  
      let youAcceptedMatch=[]

	  let anything = await Promise.all(youAcceptedMatch_names.forEach(async (stem) => {
		let value = await query({
		  query: 'SELECT users.stem,user_details.dob,user_details.hickies,user_details.pumpkins,user_details.profile_photo,users.first_name,users.last_name,users.email FROM user_details, users WHERE ? = user_details.stem;',
		  values: [stem]
		});
		youAcceptedMatch.push(value)
	  }));
  
	  let youRejectedMatch=[]

	  let everything = await Promise.all(youRejectedMatch_names.forEach(async (stem) => {
		let value = await query({
		  query: 'SELECT users.stem,user_details.dob,user_details.hickies,user_details.pumpkins,user_details.profile_photo,users.first_name,users.last_name,users.email FROM user_details, users WHERE ? = user_details.stem;',
		  values: [stem]
		});
		youRejectedMatch.push(value)
	  }));

	  let slideForCrush=[]

	  let combing = await Promise.all(slideForCrush_names.forEach(async (stem) => {
		let value = await query({
		  query: 'SELECT users.stem,user_details.dob,user_details.hickies,user_details.pumpkins,user_details.profile_photo,users.first_name,users.last_name,users.email FROM user_details, users WHERE ? = user_details.stem;',
		  values: [stem]
		});
		slideForCrush.push(value)
	  }));
  
      let crushAccepted=[]

	  let climbing = await Promise.all(crushAccepted_names.forEach(async (stem) => {
		let value = await query({
		  query: 'SELECT users.stem,user_details.dob,user_details.hickies,user_details.pumpkins,user_details.profile_photo,users.first_name,users.last_name,users.email FROM user_details, users WHERE ? = user_details.stem;',
		  values: [stem]
		});
		crushAccepted.push(value)
	  }));
  
	  let crushRejected=[]

	  let hallucinating = await Promise.all(crushRejected_names.forEach(async (stem) => {
		let value = await query({
		  query: 'SELECT users.stem,user_details.dob,user_details.hickies,user_details.pumpkins,user_details.profile_photo,users.first_name,users.last_name,users.email FROM user_details, users WHERE ? = user_details.stem;',
		  values: [stem]
		});
		crushRejected.push(value)
	  }));
  
	
  
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