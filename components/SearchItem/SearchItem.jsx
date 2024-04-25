import Image from 'next/legacy/image';
import React from 'react';
import styles from '@/styles/Discover.module.css';
import Link from 'next/link';

const SearchItem = ({ user }) => {
	let age;

	if (!user.dob) {
		age = '';
	} else {
		age = ', ' + String(new Date().getFullYear() - new Date(user.dob).getFullYear());
	}

	let isNewUser;

	const today = new Date(); // Current date

	// Calculate the difference in milliseconds between the current date and date_joined
	const differenceInMilliseconds = today - user.date_joined;

	// Calculate the difference in days
	const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);

	// Check if the difference is less than 31 days
	if (differenceInDays < 31) {
		isNewUser = true;
		console.log('User is a new user');
	} else {
		isNewUser = false;
		console.log('User is not a new user');
	}

	return (
		<Link href={`/profile/${user.stem}`} className={styles.listItem}>
			<div className={styles.imgContainer}>
				<Image
					src={`/${!user.profile_photo ? 'no_photo.png' : user.profile_photo}`}
					alt={`${user.stem}'s profile photo`}
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<div className={styles.listContent}>
				<h3>
					{user.stem}
					{age}
				</h3>
				<p>
					{user.pumpkins} pumpkins • {user.hickies} hickies
				</p>
				{!isNewUser && <span className={styles.newUser}>New</span>}
			</div>
		</Link>
	);
};

export default SearchItem;
