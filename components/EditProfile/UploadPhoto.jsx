import React, { useState } from 'react';
import modal from '@/styles/SignupModal.module.css';
import styles from '@/styles/EditAccount.module.css';
import Image from 'next/legacy/image';
import { Filter, ImageOutlined } from '@mui/icons-material';

const UploadPhoto = ({ onClose, user }) => {
	const [photo, setPhoto] = useState(user.profile_photo);
	const [imagePreview, setImagePreview] = useState(null);

	const onFileUploadChange = (e) => {
		const selectedFile = e.target.files[0];
		setPhoto(selectedFile);
		// setIsBusy(false);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const data = new FormData();

			// data.append('user', JSON.stringify(formData));
			data.append('stem', user.stem);
			// data.append('update', 'details');

			photo !== user.profile_photo
				? data.append('file', photo)
				: data.append('temp_photo', photo);

			user.profile_photo
				? data.append('profile_photo', user.profile_photo)
				: data.append('profile_photo', null);

			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
				method: 'POST',
				body: data,
			});

			if (res.ok) {
				// setLoading(true);
				onClose();
				router.reload();
				console.log('Posted picture');
			} else {
				console.log('Problem with post query');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={modal.modal}>
			<div className={modal.modalContent}>
				<div className={styles.editHeader}>
					<h2>Post A Picture</h2>
					<span className={modal.close} onClick={onClose}>
						&times;
					</span>
				</div>
				<div className={styles.profile_photo} style={{ margin: 'auto' }}>
					{imagePreview ? (
						<Image
							src={imagePreview}
							layout='fill'
							objectFit='contain'
							alt='Profile Photo Preview'
							priority
						/>
					) : (
						<ImageOutlined style={{ height: 100, width: 100, margin: 'auto' }} />
					)}
				</div>
				<div className={styles.uploadButton}>
					<div>
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
					</div>
					<button
						className={modal.button}
						style={{
							cursor: imagePreview === null ? 'not-allowed' : 'pointer',
							opacity: imagePreview === null ? '0.7' : '',
						}}
						disabled={imagePreview === null ? true : false}
						onClick={handleSubmit}
					>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadPhoto;
