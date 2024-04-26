import React, { useState } from 'react';
import modal from '@/styles/SignupModal.module.css';
import styles from '@/styles/EditAccount.module.css';
import { regions } from '@/data';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';

const EditLocation = ({ area, onClose, stem, setLocation }) => {
	const router = useRouter();
	const { setLoading } = useDateContext();
	const [formData, setFormData] = useState({
		city: area !== undefined && area.city !== undefined && area.city !== null ? area.city : '',
		region:
			area !== undefined && area.region !== undefined && area.region !== null
				? area.region
				: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(stem);
		try {
			const data = new FormData();

			data.append('user', JSON.stringify(formData));
			data.append('stem', stem);
			data.append('update', 'location');

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
				method: 'PUT',
				body: data,
			});

			if (res.ok) {
				// setLoading(true);
				// router.reload();
				setLocation(formData);
			} else {
				console.log('Problem with update locations query');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={modal.modal}>
			<div className={modal.modalContent}>
				<div className={styles.editHeader}>
					<h2>Edit Location</h2>
					<span className={modal.close} onClick={onClose}>
						&times;
					</span>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={modal.formField}>
						<div className={styles.location}>
							<input
								type='text'
								name='city'
								className={modal.input}
								placeholder='Name of Your City'
								value={formData.city}
								onChange={handleChange}
								required
							/>
							<select
								name='region'
								id='region'
								value={formData.region}
								onChange={handleChange}
								required
							>
								<option value='' disabled>
									Select Region
								</option>
								{regions.map((region, i) => (
									<option
										value={region}
										key={i}
										selected={
											area !== undefined
												? region === area.region
													? true
													: false
												: region
										}
									>
										{region}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className={modal.formAction}>
						<button
							type='submit'
							className={modal.createAccountButton + ' ' + modal.button}
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditLocation;
