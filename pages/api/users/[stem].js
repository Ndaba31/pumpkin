import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export default async function handler(req, res) {
	// Run the CORS middleware
	await runMiddleware(req, res, cors);

	let message;
	const query_result = req.query;
	const { stem } = query_result;
	const { crushee } = req.body;

	console.log(stem);
	if (req.method === 'GET') {
		const userDB = await query({
			query: 'SELECT first_name, last_name, user_details.stem AS stem, COUNT(posts) AS num_posts, dob, profile_photo, pumpkins, hickies, bio FROM users, user_details, posts WHERE users.stem = user_details.stem AND user_details.stem = posts.stem AND users.stem = ?',
			values: [stem],
		});

		if (userDB.length !== 1) {
			res.status(500).json({ error: 'Problem finding user' });
		}

		const userPosts = await query({
			query: 'SELECT posts, id FROM users, posts WHERE users.stem = posts.stem AND users.stem = ?',
			values: [stem],
		});

		const userHobbies = await query({
			query: 'SELECT hobby FROM users, hobbies WHERE users.stem = hobbies.stem AND users.stem = ?',
			values: [stem],
		});

		const userOccupation = await query({
			query: 'SELECT title, company FROM occupations, users WHERE occupations.stem = users.stem AND users.stem = ?',
			values: [stem],
		});

		const userDetails = await query({
			query: 'SELECT dob, sex, ethnicity, relationship_status, religion FROM user_details, users WHERE user_details.stem = users.stem AND users.stem = ?',
			values: [stem],
		});

		const userLocation = await query({
			query: 'SELECT city, region FROM locations, users WHERE locations.stem = users.stem AND users.stem = ?',
			values: [stem],
		});

		res.status(200).json({
			user: userDB[0],
			posts: userPosts,
			hobbies: userHobbies,
			occupation: userOccupation[0],
			details: userDetails[0],
			area: userLocation[0],
		});
	}

	if (req.method === 'POST') {
		const isCrushee = await query({
			query: 'SELECT * FROM matches WHERE crushee = ? AND crush = ?',
			values: [crushee, stem],
		});

		const likes = await query({
			query: 'SELECT crush FROM likes WHERE crush = ? AND crushee = ?;',
			values: [stem, crushee],
		});

		const slide_array = await query({
			query: 'SELECT slide FROM matches WHERE (crush = ? AND crushee = ?) OR (crush = ? AND crushee = ?);',
			values: [crushee, stem, stem, crushee],
		});

		const liked_back_array = await query({
			query: 'SELECT liked_back FROM matches WHERE (crush = ? AND crushee = ?) OR (crush = ? AND crushee = ?);',
			values: [crushee, stem, stem, crushee],
		});

		res.status(200).json({
			likes: likes.length === 0 ? false : true,
			slide: slide_array.length === 0 ? false : true,
			liked_back: liked_back_array.length === 0 ? undefined : liked_back_array[0].liked_back,
			isCrushee: isCrushee.length === 0 ? false : true,
		});
	}

	if (req.method === 'PUT') {
		const { update, crush, crushee, like_count } = req.body;
		const today = new Date().toISOString().split('T');
		const time = today[1].substring(0, today[1].length - 2);
		const currentDate = today[0] + ' ' + time;
		console.log(`Like Count: ${like_count}`);

		if (update === 'like') {
			console.log('Update is equal to like');
			const checkPreviousLike = await query({
				query: 'SELECT * FROM likes WHERE crushee = ? AND crush = ?',
				values: [crushee, crush],
			});

			console.log(`Previous Like: ${checkPreviousLike}`);

			if (checkPreviousLike.length === 0) {
				const updatePumpkin = await query({
					query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
					values: [like_count, crush],
				});

				const likeProfile = await query({
					query: 'INSERT into likes (crushee,crush) values (?,?)',
					values: [crushee, crush],
				});

				message =
					updatePumpkin && likeProfile ? 'Liked profile!' : 'Error with Like Button';
			}
		} else if (update === 'dislike') {
			console.log('Update is equal to DISLIKE');
			const dislike = await query({
				query: 'DELETE from likes where crushee = ? AND crush = ?',
				values: [crushee, crush],
			});

			const updatePumpkin = await query({
				query: `UPDATE user_details SET pumpkins = ? WHERE stem = ?`,
				values: [like_count, crush],
			});

			message = dislike && updatePumpkin ? 'Removed Like' : 'Error';
		}

		if (update == 'slide') {
			const checkOppMatch = await query({
				query: 'SELECT * From matches WHERE crush = ? AND crushee = ?',
				values: [crushee, crush],
			});

			if (checkOppMatch[0] === undefined) {
				const checkMatch = await query({
					query: 'SELECT * From matches WHERE crushee = ? AND crush = ?',
					values: [crushee, crush],
				});

				if (checkMatch[0] === undefined) {
					const initiateSlide = await query({
						query: `INSERT into matches (crushee, crush, date_slide, slide) values (?, ?, ?, ?)`,
						values: [crushee, crush, currentDate, 1],
					});
					message =
						initiateSlide && checkOppMatch && checkMatch
							? 'Slide Initiated'
							: 'Error with sliding';
				} else {
					message = 'slideInitiated';
				}
			} else {
				message = 'slideInitiated';
			}

			console.log(message);
		} else if (update == 'slideout') {
			const removeSlide = await query({
				query: `DELETE from matches where crushee = ? AND crush = ? AND slide = ?`,
				values: [crushee, crush, 1],
			});

			const { matched } = req.body;

			if (matched) {
				const hickies1 = await query({
					query: 'SELECT hickies FROM user_details WHERE stem = ?;',
					values: [crush],
				});

				const num_hickies1 =
					Number(hickies1[0].hickies) === 0 ? 0 : Number(hickies1[0].hickies) - 1;

				const updateHicky1 = await query({
					query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
					values: [num_hickies1, crush],
				});

				const hickies2 = await query({
					query: 'SELECT hickies FROM user_details WHERE stem = ?;',
					values: [crushee],
				});

				const num_hickies2 =
					Number(hickies2[0].hickies) === 0 ? 0 : Number(hickies2[0].hickies) - 1;

				const updateHicky2 = await query({
					query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
					values: [num_hickies2, crushee],
				});
			}

			message = removeSlide ? 'Slide Cancelled' : 'There is no slide to retract';
			console.log(message);
		}

		if (update == 'confirmMatch') {
			const acceptSlide = await query({
				query: 'UPDATE matches SET liked_back = ?, date_responded = ? WHERE crushee = ? AND crush = ?',
				values: [1, currentDate, crushee, crush],
			});

			const pumpkins1 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crush],
			});

			const num_hickies1 = Number(pumpkins1[0].hickies);

			const updateHicky1 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies1 + 1, crush],
			});

			const pumpkins2 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crushee],
			});

			const num_hickies2 = Number(pumpkins2[0].hickies);

			const updateHicky2 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies2 + 1, crushee],
			});

			message =
				acceptSlide && updateHicky1 && updateHicky2
					? 'Successful Confirmation'
					: 'Could not accept this match';
		} else if (update == 'denyMatch') {
			const declineSlide = await query({
				query: 'UPDATE matches SET liked_back = ?, date_responded = ? WHERE crushee = ? AND crush = ?',
				values: [0, currentDate, crushee, crush],
			});
		} else if (update == 'nullify') {
			const nullify = await query({
				query: 'UPDATE matches SET liked_back = null, date_responded = null WHERE crushee = ? AND crush = ?',
				values: [crushee, crush],
			});

			const hickies1 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crush],
			});

			const num_hickies1 =
				Number(hickies1[0].hickies) === 0 ? 0 : Number(hickies1[0].hickies) - 1;

			const updateHicky1 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies1, crush],
			});

			const hickies2 = await query({
				query: 'SELECT hickies FROM user_details WHERE stem = ?;',
				values: [crushee],
			});

			const num_hickies2 =
				Number(hickies2[0].hickies) === 0 ? 0 : Number(hickies2[0].hickies) - 1;

			const updateHicky2 = await query({
				query: `UPDATE user_details SET hickies = ? WHERE stem = ?`,
				values: [num_hickies2, crushee],
			});
		}
		res.status(200).json({ success: true });
	}
}
