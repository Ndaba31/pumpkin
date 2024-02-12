// components/LoginModal.js
import React, { useState } from 'react';
import styles from '@/styles/SignupModal.module.css';

const LoginModal = ({ isOpen, onClose, openSignUp }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	console.log(isOpen);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div
			className={`${styles.modal} ${
				isOpen ? styles.showModal + 'display: block' : 'display: none'
			}`}
		>
			<div className={styles.modalContent}>
				<span className={styles.close} onClick={onClose}>
					&times;
				</span>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<input
						type='email'
						name='email'
						className={styles.input}
						placeholder='Email'
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						type='password'
						name='password'
						className={styles.input}
						placeholder='Password'
						value={formData.password}
						onChange={handleChange}
					/>
					<button
						type='submit'
						className={styles.createAccountButton + ' ' + styles.button}
					>
						Login
					</button>
				</form>
				<p className={styles.signupText}>
					Don&apos;t have an account? <span onClick={openSignUp}>Sign Up</span>
				</p>
			</div>
		</div>
	);
};

export default LoginModal;
