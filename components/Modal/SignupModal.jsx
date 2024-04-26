// components/SignupModal.js
import React, { useState } from 'react';
import styles from '@/styles/SignupModal.module.css';
import { useDateContext } from '@/context/dateContext';
import { useRouter } from 'next/router';

const SignupModal = ({ isOpen, onClose, openLogin }) => {
	const { error, setError, setSuccess, setUserEmail } = useDateContext();
	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		stem: '',
		password: '',
		confirmPassword: '',
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

		// Validation
		if (formData.password.length < 8) {
			setError('Password must be at least 8 characters long');
			return;
		} else {
			setError('');
		}

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		} else {
			setError('');
		}

		const { firstName, lastName, email, stem, password } = formData;
		const stem_edited = stem.trim().split(' ').join('_').toLowerCase();

		const result = await fetch(`/api/users/newUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				stem: stem_edited,
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			}),
		});

		if (result.ok) {
			setSuccess('Account created successfully. Click on link to Login.');
			setUserEmail(email);
			router.push('/home');
		} else {
			const { error } = await result.json();
			setError(error);
		}

		console.log(formData);
	};

	return (
		<div className={`${styles.modal} ${isOpen ? styles.showModal : ''}`}>
			<div className={styles.modalContent}>
				<span className={styles.close} onClick={onClose}>
					&times;
				</span>
				<h2>Create Account</h2>
				{error !== '' && <p className={styles.error}>{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className={styles.formField}>
						<input
							type='text'
							name='firstName'
							className={styles.input}
							placeholder='First Name'
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='lastName'
							className={styles.input}
							placeholder='Last Name'
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
						<input
							type='email'
							name='email'
							className={styles.input}
							placeholder='Email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='stem'
							className={styles.input}
							placeholder='Stem (username)'
							value={formData.stem}
							onChange={handleChange}
							required
						/>
						<input
							type='password'
							name='password'
							className={styles.input}
							placeholder='Password'
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<input
							type='password'
							name='confirmPassword'
							className={styles.input}
							placeholder='Confirm Password'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</div>
					<p className={styles.signupText}>
						Already have an account? <span onClick={openLogin}>Login</span>
					</p>
					<div className={styles.formAction}>
						<button
							type='submit'
							className={styles.createAccountButton + ' ' + styles.button}
						>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignupModal;
