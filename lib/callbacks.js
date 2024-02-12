import { query } from './db';
import { hashPass } from './hash';

const callbacks = {};

callbacks.signUp = async (user, account, profile, isNewUser) => {
	if (isNewUser && account.type === 'credentials') {
		const { stem_edited, firstName, lastName, email, password } = user;
		const dateJoined = new Date();
		const hashedPassword = await hashPass(password);
		const stem = stem_edited;

		const userDB = await query({
			query: 'SELECT stem FROM users WHERE stem = ? OR email = ?',
			values: [stem, email],
		});

		if (userDB.length > 0) {
			throw Error('User already exists');
		}

		const addUser = await query({
			query: 'INSERT INTO users (stem, first_name, last_name, email, password, date_joined) VALUES (?, ?, ?, ?, ?, ?)',
			values: [stem, firstName, lastName, email, hashedPassword, dateJoined],
		});

		if (!addUser) {
			throw Error('Trouble adding to user table');
		}

		const addUserDetail = await query({
			query: 'INSERT INTO user_details (stem, hickies, pumpkins) VALUES (?, ?, ?)',
			values: [stem, 0, 0],
		});

		if (!addUserDetail) {
			throw Error('Trouble adding to users_detail table');
		}
	}
};

export default callbacks;
