import React from 'react';
import Header from '../Head/Head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import { useDateContext } from '@/context/dateContext';

const Authenticate = ({ title }) => {
	const { success, setSuccess } = useDateContext();

	return (
		<>
			<Header title={title} />
			{success !== '' && (
				<p className={styles.success} style={{ width: '50%' }}>
					{success}
				</p>
			)}
			<p style={{ fontSize: '14pt', textAlign: 'center' }}>
				You need to login to view this page --{' '}
				<Link href='/' style={{ color: 'purple' }} onClick={() => setSuccess('')}>
					Take Me There
				</Link>
			</p>
		</>
	);
};

export default Authenticate;
