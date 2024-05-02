import React, { useState } from 'react';
import modal from '@/styles/SignupModal.module.css';
import styles from '@/styles/EditAccount.module.css';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { useDateContext } from '@/context/dateContext';

const EditDetails = ({ onClose, user }) => {
	const router = useRouter();
	const { setLoading } = useDateContext();
	const [photo, setPhoto] = useState(user.profile_photo);
	const [imagePreview, setImagePreview] = useState(null);
	const [isBusy, setIsBusy] = useState(user.profile_photo ? false : true);
	const [formData, setFormData] = useState({
		firstName: user.first_name,
		lastName: user.last_name,
		stem: user.stem,
		bio: user.bio ? user.bio : '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const onFileUploadChange = (e) => {
		const selectedFile = e.target.files[0];
		setPhoto(selectedFile);
		setIsBusy(false);

		// Generate a preview of the selected image
		if (selectedFile) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setImagePreview(null);
		}
	};

	const onCancelFile = () => {
		setPhoto(null);
		setImagePreview(null);
		setIsBusy(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const data = new FormData();

			data.append('user', JSON.stringify(formData));
			data.append('stem', user.stem);
			data.append('update', 'details');

			photo !== user.profile_photo
				? data.append('file', photo)
				: data.append('temp_photo', photo);

			user.profile_photo
				? data.append('profile_photo', user.profile_photo)
				: data.append('profile_photo', null);

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/update`, {
				method: 'PUT',
				body: data,
			});

			if (res.ok) {
				// setLoading(true);
				onClose();
				router.reload();
				console.log('Transferred profile data');
			} else {
				console.log('Problem with update details query');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={modal.modal}>
			<div className={modal.modalContent}>
				<div className={styles.editHeader}>
					<h2>Edit Details</h2>
					<span className={modal.close} onClick={onClose}>
						&times;
					</span>
				</div>
				<div>
					<div className={styles.photoContainer}>
						<div className={styles.profile_photo}>
							{imagePreview ? (
								<Image
									src={imagePreview}
									layout='fill'
									objectFit='contain'
									alt='Profile Photo Preview'
									priority
								/>
							) : photo ? (
								<Image
									layout='fill'
									objectFit='contain'
									src={photo}
									alt={user.profile_photo}
									priority
								/>
							) : (
								<Image
									layout='fill'
									objectFit='contain'
									src='/no_photo.png'
									alt='No Photo'
									priority
								/>
							)}
						</div>
						<div className={styles.photoButtons}>
							<label htmlFor='imgInput' className={styles.edit_upload_button}>
								Upload Photo
							</label>
							<input
								id='imgInput'
								type='file'
								accept='image/*'
								style={{ display: 'none' }}
								onChange={onFileUploadChange}
							/>
							<button
								type='button'
								onClick={onCancelFile}
								className={`${styles.edit_delete_button} ${
									isBusy ? styles.edit_busy : ''
								}`}
								disabled={isBusy}
							>
								Delete Photo
							</button>
						</div>
					</div>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={modal.formField}>
							<div className={styles.formGrid}>
								<input
									type='text'
									name='firstName'
									className={modal.input}
									placeholder='First Name'
									value={formData.firstName}
									onChange={handleChange}
									required
								/>
								<input
									type='text'
									name='lastName'
									className={modal.input}
									placeholder='Last Name'
									value={formData.lastName}
									onChange={handleChange}
									required
								/>
								<input
									type='text'
									name='stem'
									className={modal.input}
									placeholder='Stem (Username)'
									value={formData.stem}
									onChange={handleChange}
									required
								/>
							</div>
							<textarea
								name='bio'
								id='bio'
								placeholder='Enter Biography...'
								value={formData.bio}
								onChange={handleChange}
							></textarea>
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
		</div>
	);
};

export default EditDetails;
