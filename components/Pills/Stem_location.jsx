import React from 'react';
import styles from '@/styles/Account.module.css';
import edit from '@/styles/EditAccount.module.css';

const Stem_location = ({ area }) => {


	return (
		<div className={edit.edit_section}>
			<button className={styles.pills}>{area.city}</button>
			{area.region !== undefined && area.region !== null && (
				<button className={styles.pills}>@{area.region}</button>
			)}
		</div>
	);
};

export default Stem_location;