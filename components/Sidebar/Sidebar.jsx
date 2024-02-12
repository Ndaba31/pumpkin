// Sidebar.js
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Sidebar.module.css';
import { Cancel } from '@mui/icons-material';

const Sidebar = ({ closeSidebar }) => {
	return (
		<div className={styles.sidebar}>
			<button className={styles.closeButton} onClick={closeSidebar}>
				<Cancel />
			</button>
			<div className={styles.sidebarContent}>
				<Link href='/login' className={styles.link}>
					Login
				</Link>
				<Link href='/signup' className={styles.link}>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
