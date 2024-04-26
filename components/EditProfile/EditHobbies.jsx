import React, { useState } from 'react';
import modal from '@/styles/SignupModal.module.css';
import styles from '@/styles/EditAccount.module.css';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';
import { hobbies } from '@/data';

const EditHobbies = ({ listed_hobbies, stem, onClose, setHobbies }) => {
	const router = useRouter();
	const { setLoading } = useDateContext();
	const [formData, setFormData] = useState();
	const [selectedHobbies, setSelectedHobbies] = useState(listed_hobbies);

	const toggleHobby = async (chosen_hobby) => {
		const data = new FormData();

		data.append('hobby', chosen_hobby);
		data.append('stem', stem);
		data.append('update', 'hobbies');

		if (
			selectedHobbies.find(({ hobby }) => hobby.toLowerCase() === chosen_hobby.toLowerCase())
		) {
			try {
				data.append('action', 'remove');
				const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
					method: 'PUT',
					body: data,
				});

				if (res.ok) {
					// setLoading(true);
					// router.reload();
					setSelectedHobbies(
						selectedHobbies.filter(({ hobby }) => hobby !== chosen_hobby)
					);
				} else {
					console.log('Problem with update hobbies query - remove');
				}
			} catch (error) {
				console.log('Error in removing hobby - ', chosen_hobby);
			}
		} else {
			try {
				data.append('action', 'add');
				const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
					method: 'PUT',
					body: data,
				});

				if (res.ok) {
					// setLoading(true);
					// router.reload();
					setSelectedHobbies([...selectedHobbies, { hobby: chosen_hobby }]);
				} else {
					console.log('Problem with update hobbies query - add');
				}
			} catch (error) {
				console.log('Error in removing hobby - ', chosen_hobby);
			}
		}

		setHobbies(selectedHobbies);
	};

	const isHobbySelected = (chosen_hobby) =>
		selectedHobbies.find(({ hobby }) => hobby.toLowerCase() === chosen_hobby.toLowerCase());

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
	};

	return (
		<div className={modal.modal}>
			<div className={modal.modalContent}>
				<div className={styles.editHeader}>
					<h2>Select Hobbies</h2>
					<span className={modal.close} onClick={onClose}>
						&times;
					</span>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={modal.formField}>
						<div
							className={styles.location}
							style={{ display: 'grid', gridTemplateColumns: 'auto auto auto' }}
						>
							{hobbies.map((hobby, i) => (
								<button
									key={i}
									type='button'
									onClick={() => toggleHobby(hobby)}
									className={styles.hobby_buttons}
									style={{
										backgroundColor:
											isHobbySelected(hobby) !== undefined
												? 'orange'
												: '#d9d9d9',
									}}
								>
									{hobby}
								</button>
							))}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditHobbies;
