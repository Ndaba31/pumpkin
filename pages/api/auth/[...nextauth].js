import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { query } from '@/lib/db';
import isSamePass from '@/lib/hash';
import { cors, runMiddleware } from '@/lib/cors';
import callbacks from '@/lib/callbacks';

const cors_ = runMiddleware;

export const authOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials;

				const userDB = await query({
					query: 'SELECT * FROM users WHERE email = ?',
					values: [email],
				});

				let message;

				if (!userDB.length) {
					message = 'Email not correct';
					// return Promise.resolve({ user: null, message: message });
					return null;
				}

				const pass = await isSamePass(password, userDB[0].password);

				if (!pass) {
					message = 'Password Incorrect';
					return null;
				} else {
					const user = userDB[0];
					console.log(user);

					message = `Welcome back ${user.first_name}`;
					return user;
				}
			},
		}),
	],
	pages: {
		signIn: '/',
		signOut: '/auth/signout',
		error: '/auth/error', // Error code passed in query string as ?error=
		newUser: '/', // New users will be directed here on first sign in (leave the property out if not of interest) // Customize the sign-in page URL
	},
	callbacks: callbacks,
	secret: process.env.NEXTAUTH_SECRET,
};

export default async function handler(req, res) {
	// Run the CORS middleware
	await cors_(req, res, cors);

	// Pass the request and response to NextAuth.js
	await NextAuth(req, res, authOptions);
}
