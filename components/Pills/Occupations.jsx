import React from 'react';
import styles from '@/styles/Account.module.css';

const Occupations = ({ occupation }) => {
	return (
		<div style={{ marginBottom: '20px' }}>
			<button className={styles.pills}>{occupation.title}</button>
			{occupation.company !== undefined && occupation.company !== null && (
				<button className={styles.pills}>@{occupation.company}</button>
			)}
		</div>
	);
};

export default Occupations;
