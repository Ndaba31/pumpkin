import React from 'react';
import Image from 'next/legacy/image';
import styles from '@/styles/Home.module.css';
import DiscoverCard from './DiscoverCard';

const Discover = ({ color, category, users }) => {
	if (!users) {
		return;
	}

	return (
		<div className={styles.you_may_know}>
			<h2 style={{color: color}}>{category}</h2>
			<div className={styles.people_cards}>
				{users.map((user) => (
					<DiscoverCard key={user.stem} user={user} />
				))}
			</div>
		</div>
	);
};

export default Discover;
