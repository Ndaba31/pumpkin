import Cors from 'cors';

export const cors = Cors({
	methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'], // Add the methods you need
	origin: process.env.NEXT_PUBLIC_URL,
});

export default function handler(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}
			return resolve(result);
		});
	});
}

export function runMiddleware(req, res, fn) {
	console.log('Running CORS middleware');
	return handler(req, res, fn);
}
