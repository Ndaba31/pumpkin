import React, { useState } from 'react';
import modal from '@/styles/SignupModal.module.css';
import styles from '@/styles/EditAccount.module.css';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';
import { ethinicities, relationship_status, religions, sexes } from '@/data';

const MoreDetails = ({ stem, profile, onClose, setDetails }) => {
	const router = useRouter();
	const today = new Date().toISOString().split('T')[0];
	const { setLoading } = useDateContext();
	const [formData, setFormData] = useState({
		sex:
			profile !== undefined && profile.sex !== undefined && profile.sex !== null
				? profile.sex
				: '',
		dob:
			profile !== undefined && profile.dob !== undefined && profile.dob !== null
				? profile.dob
				: '',
		religion:
			profile !== undefined && profile.religion !== undefined && profile.religion !== null
				? profile.religion
				: '',
		relationship_status:
			profile !== undefined &&
			profile.relationship_status !== undefined &&
			profile.relationship_status !== null
				? profile.relationship_status
				: '',
		ethnicity:
			profile !== undefined && profile.ethnicity !== undefined && profile.ethnicity !== null
				? profile.ethnicity
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
			data.append('update', 'more_details');

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
				method: 'PUT',
				body: data,
			});

			if (res.ok) {
				// setLoading(true);
				// router.reload();
				setDetails(formData);
			} else {
				console.log('Problem with update more details query');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={modal.modal}>
			<div className={modal.modalContent}>
				<div className={styles.editHeader}>
					<h2>Edit Profile</h2>
					<span className={modal.close} onClick={onClose}>
						&times;
					</span>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={modal.formField}>
						<div className={styles.more_details}>
							<input
								type='date'
								name='dob'
								className={modal.input}
								value={formData.dob}
								onChange={handleChange}
								max={today}
							/>
							<select
								name='relationship_status'
								id='relationship_status'
								value={formData.relationship_status}
								onChange={handleChange}
							>
								<option value=''>Select Your Relationship Status</option>
								{relationship_status.map((relationship_status, i) => (
									<option
										value={relationship_status}
										key={i}
										selected={
											profile !== undefined
												? relationship_status ===
												  profile.relationship_status
													? true
													: false
												: relationship_status
										}
									>
										{relationship_status}
									</option>
								))}
							</select>
							<select
								name='religion'
								id='religion'
								value={formData.religion}
								onChange={handleChange}
							>
								<option value=''>Select Your Religion</option>
								{religions.map((religion, i) => (
									<option
										value={religion}
										key={i}
										selected={
											profile !== undefined
												? religion === profile.religion
													? true
													: false
												: religion
										}
									>
										{religion}
									</option>
								))}
							</select>
							<select
								name='sex'
								id='sex'
								value={formData.sex}
								onChange={handleChange}
							>
								<option value=''>Select Your Sex</option>
								{sexes.map(({ gender, value }, i) => (
									<option
										value={value}
										key={i}
										selected={
											profile !== undefined
												? gender === profile.sex
													? true
													: false
												: gender
										}
									>
										{gender}
									</option>
								))}
							</select>
							<select
								name='ethnicity'
								id='ethnicity'
								value={formData.ethnicity}
								onChange={handleChange}
							>
								<option value=''>Select Region</option>
								{ethinicities.map((ethnicity, i) => (
									<option
										value={ethnicity}
										key={i}
										selected={
											profile !== undefined
												? ethnicity === profile.ethnicity
													? true
													: false
												: ethnicity
										}
									>
										{ethnicity}
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

export default MoreDetails;
