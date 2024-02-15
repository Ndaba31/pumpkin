// Sidebar.js
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Sidebar.module.css';
import { Cancel } from '@mui/icons-material';

const Sidebar = ({ closeSidebar, openSignUp, openLogin }) => {
	return (
		<div className={styles.sidebar}>
			<button className={styles.closeButton} onClick={closeSidebar}>
				<Cancel />
			</button>
			<div className={styles.sidebarContent}>
				<Link
					href=''
					onClick={() => {
						openLogin();
						closeSidebar();
					}}
					className={styles.link}
				>
					Login
				</Link>
				<Link
					href=''
					onClick={() => {
						openSignUp();
						closeSidebar();
					}}
					className={styles.link}
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
