import React from 'react';
import Image from 'next/legacy/image';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

const DiscoverCard = ({ user }) => {
	const { profile_photo, first_name, last_name, pumpkins, hickies, dob, stem } = user;

	let age;

	if (!dob) {
		age = '';
	} else {
		age = ', ' + String(new Date().getFullYear() - new Date(dob).getFullYear());
	}

	return (
		<Link href={`/profile/${stem}`} className={styles.people_card}>
			<Image
				src={!profile_photo ? '/no_photo.png' : profile_photo}
				alt={!profile_photo ? 'No profile photo' : profile_photo}
				layout='fill'
				className={styles.user_profile}
			/>
			<div className={styles.people_details}>
				<h3>
					{first_name} {last_name} {age}
				</h3>
				<div className={styles.statistics}>
					<p>
						<span>{pumpkins}</span> Pumpkins
						<span className={styles.separator}>•</span>
						<span>{hickies}</span> Hickies
					</p>
				</div>
			</div>
		</Link>
	);
};

export default DiscoverCard;
