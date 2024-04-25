import React from 'react';
import edit from '@/styles/EditAccount.module.css';
import styles from '@/styles/Account.module.css';
import { DeleteForever } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';

const Occupations = ({ occupation, stem, setOccupation }) => {
	const router = useRouter();
	const { setLoading, setIsBusy, isBusy } = useDateContext();

	const deleteOccupation = async () => {
		setOccupation();
		setIsBusy(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/delete_details`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				property: 'occupation',
				stem: stem,
			}),
		});

		if (res.ok) {
			setLoading(true);
			setIsBusy(false);
			// router.reload();
		} else {
			console.log('Problem with delete occupations query');
		}
	};

	return (
		<div className={edit.edit_section}>
			<button className={styles.pills}>{occupation.title}</button>
			{occupation.company !== undefined && occupation.company !== null && (
				<button className={styles.pills}>@{occupation.company}</button>
			)}
			<button className={edit.delete} onClick={deleteOccupation} disabled={isBusy}>
				<DeleteForever />
			</button>
		</div>
	);
};

export default Occupations;
