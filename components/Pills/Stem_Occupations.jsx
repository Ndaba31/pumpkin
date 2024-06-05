import React from 'react';
import edit from '@/styles/EditAccount.module.css';
import styles from '@/styles/Account.module.css';


const Stem_Occupations = ({ occupation}) => {	

	return (
		<div className={edit.edit_section}>
			<button className={styles.pills}>{occupation.title}</button>
			{occupation.company !== undefined && occupation.company !== null && (
				<button className={styles.pills}>@{occupation.company}</button>
			)}
		</div>
	);
};

export default Stem_Occupations;