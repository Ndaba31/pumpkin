import IncomingForm from 'formidable-serverless';
import { Storage } from '@google-cloud/storage';
import { cors, runMiddleware } from '@/lib/cors';
import { query } from '@/lib/db';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	await runMiddleware(req, res, cors);

	if (req.method === 'POST') {
		const form = new IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const stem = fields.stem;
			console.log('Stem: ', stem);

			const post_count = await query({
				query: 'SELECT MAX(id) AS num_posts FROM posts WHERE stem = ?',
				values: [stem],
			});

			const num_posts = Number(post_count[0].num_posts) + 1;
			console.log('Num_posts: ', num_posts);

			const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
			const storage = new Storage({ credentials });
			const bucketName = process.env.BUCKET_NAME;
			const folderName = process.env.POSTED_PICS;
			const upload = files.file;
			const filePath = upload.path;
			const fileName = upload.name;

			try {
				const destinationPath = `${folderName}/${num_posts}-${stem}-${fileName}`;
				const gcsPath = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;

				await storage.bucket(bucketName).upload(filePath, {
					destination: destinationPath,
				});

				await query({
					query: 'INSERT INTO posts VALUES (?, ?, ?)',
					values: [num_posts, stem, gcsPath],
				});
			} catch (error) {
				console.log(error);
				res.status(400).json({ success: false, error: error });
			}
		});

		res.status(200).json({ success: true });
	}
}
