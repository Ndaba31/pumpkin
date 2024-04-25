import React from 'react';
import styles from '@/styles/Account.module.css';
import edit from '@/styles/EditAccount.module.css';
import { DeleteForever } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';

const Location = ({ area, stem, setArea }) => {
	const router = useRouter();
	const { setLoading, setIsBusy, isBusy } = useDateContext();

	const deleteLocation = async () => {
		setArea();
		setIsBusy(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/delete_details`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				property: 'location',
				stem: stem,
			}),
		});

		if (res.ok) {
			setLoading(true);
			setIsBusy(false);
			// router.reload();
		} else {
			console.log('Problem with delete locations query');
		}
	};

	return (
		<div className={edit.edit_section}>
			<button className={styles.pills}>{area.city}</button>
			{area.region !== undefined && area.region !== null && (
				<button className={styles.pills}>@{area.region}</button>
			)}
			<button className={edit.delete} onClick={deleteLocation} disabled={isBusy}>
				<DeleteForever />
			</button>
		</div>
	);
};

export default Location;
