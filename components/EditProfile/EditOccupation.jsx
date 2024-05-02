import React, { useState } from 'react';
import modal from '@/styles/SignupModal.module.css';
import styles from '@/styles/EditAccount.module.css';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';

const EditOccupation = ({ occupation, onClose, stem, setOccupation }) => {
	const router = useRouter();
	const { setLoading } = useDateContext();
	const [formData, setFormData] = useState({
		title:
			occupation !== undefined && occupation.title !== undefined && occupation.title !== null
				? occupation.title
				: '',
		company:
			occupation !== undefined &&
			occupation.company !== undefined &&
			occupation.company !== null
				? occupation.company
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
			data.append('update', 'occupation');

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
				method: 'PUT',
				body: data,
			});

			if (res.ok) {
				onClose();
				setOccupation(formData);
			} else {
				console.log('Problem with update occupations query');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={modal.modal}>
			<div className={modal.modalContent}>
				<div className={styles.editHeader}>
					<h2>Edit Occupation</h2>
					<span className={modal.close} onClick={onClose}>
						&times;
					</span>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={modal.formField}>
						<div className={styles.location}>
							<input
								type='text'
								name='title'
								className={modal.input}
								placeholder='Job Title'
								value={formData.title}
								onChange={handleChange}
								required
							/>
							<input
								type='text'
								name='company'
								className={modal.input}
								placeholder='Company'
								value={formData.company}
								onChange={handleChange}
							/>
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

export default EditOccupation;
