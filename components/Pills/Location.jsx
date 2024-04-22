import React from 'react';
import styles from '@/styles/Account.module.css';

const Location = ({ area }) => {
	return (
		<div style={{ marginBottom: '20px' }}>
			<button className={styles.pills}>{area.city}</button>
			{area.region !== undefined && area.region !== null && (
				<button className={styles.pills}>@{area.region}</button>
			)}
		</div>
	);
};

export default Location;
