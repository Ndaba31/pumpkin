import React from 'react';
import styles from '@/styles/Account.module.css';

const Pills = ({ list }) => {
	return (
		<div className={styles.pillContainer}>
			{list.map(({ hobby }, i) => (
				<button className={styles.pills} key={i}>
					{hobby}
				</button>
			))}
		</div>
	);
};

export default Pills;
