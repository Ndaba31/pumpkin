import React from 'react';
import Image from 'next/legacy/image';
import styles from '@/styles/Home.module.css';
import DiscoverCard from './DiscoverCard';

const Discover = ({ category, users }) => {
	if (!users) {
		return;
	}

	return (
		<div className={styles.you_may_know}>
			<h2>{category}</h2>
			<div className={styles.people_cards}>
				{users.map((user) => (
					<DiscoverCard key={user.stem} user={user} />
				))}

				<div className={styles.people_card}>
					<Image
						src='/females/f2.webp'
						alt=''
						layout='fill'
						className={styles.user_profile}
					/>
					<div className={styles.people_details}>
						<h3>Andile Dlamini 22</h3>
						<div className={styles.statistics}>
							<p>
								<span>80</span> Pumpkins
								<span className={styles.separator}>•</span>
								<span>30</span> Hickies
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Discover;
