const bcrypt = require('bcrypt');

const saltRounds = 10;

export function hashPass(unHashedPass) {
	return bcrypt.hash(unHashedPass, saltRounds).then(function (hash) {
		return hash;
	});
}

export default function isSamePass(unHashedPass, hashedPass) {
	return bcrypt.compare(unHashedPass, hashedPass).then(function (result) {
		return result;
	});
}
