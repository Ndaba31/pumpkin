import { existsSync, mkdirSync, rmdirSync } from 'fs';
import { join } from 'path';

// Use a relative path to the uploads directory
const uploadsDirectory = join(process.cwd(), 'public/uploads');

// Create user folder
const createUserFolder = (username) => {
	const userFolderPath = join(uploadsDirectory, username);

	if (!existsSync(userFolderPath)) {
		mkdirSync(userFolderPath);
	}
};

// Delete user folder
const deleteUserFolder = (username) => {
	const userFolderPath = join(uploadsDirectory, username);

	if (existsSync(userFolderPath)) {
		rmdirSync(userFolderPath, { recursive: true });
	}
};

export { createUserFolder, deleteUserFolder };
