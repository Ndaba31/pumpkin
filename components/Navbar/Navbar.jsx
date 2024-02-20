// components/Navbar.js
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';
import { Menu } from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = ({ openSignUp, openLogin, page }) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const { data: session } = useSession();

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<div className={styles.navbar} style={{ color: session ? 'black' : 'white' }}>
			<Link href='/' className={styles.logo} style={{ textDecoration: 'none' }}>
				<Image src='/logo.svg' alt='Pumpkin Logo' height={75} width={75} />
				<h1 className={styles.logo}>Pumpkin</h1>
			</Link>
			{!session ? (
				<div className={styles.buttons}>
					<button className={styles.loginButton} onClick={openLogin}>
						Login
					</button>
					<button className={styles.signupButton} onClick={openSignUp}>
						Sign Up
					</button>
				</div>
			) : (
				<div className={styles.options}>
					<div className={styles.buttons}>
						<Link href={`${page !== 'home' ? '../' : '/'}`} className={styles.link}>
							Home
						</Link>
						<Link href={`/discover`} className={styles.link}>
							Discover
						</Link>
						<Link href={`/matches`} className={styles.link}>
							Matches
						</Link>
					</div>
					<div className={styles.buttons}>
						<Link href={`/profile`} className={styles.link}>
							Profile
						</Link>
						<button
							className={styles.logoutButton}
							onClick={() => {
								signOut({
									callbackUrl: `${process.env.NEXT_PUBLIC_URL}`,
								});
							}}
						>
							Logout
						</button>
					</div>
				</div>
			)}
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
