// components/Navbar.js
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { Menu } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = ({ openSignUp, openLogin }) => {
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<div className={styles.navbar}>
			<Link href='/' className={styles.logo} style={{ textDecoration: 'none' }}>
				<Image src='/logo.svg' alt='Pumpkin Logo' height={75} width={75} />
				<h1 className={styles.logo}>Pumpkin</h1>
			</Link>
			<div className={styles.buttons}>
				<button className={styles.loginButton} onClick={openLogin}>
					Login
				</button>
				<button className={styles.signupButton} onClick={openSignUp}>
					Sign Up
				</button>
			</div>
			<button className={styles.mobileMenu} onClick={toggleSidebar}>
				<Menu />
			</button>
			{showSidebar && (
				<Sidebar
					closeSidebar={toggleSidebar}
					openLogin={openLogin}
					openSignUp={openSignUp}
				/>
			)}
		</div>
	);
};

export default Navbar;
