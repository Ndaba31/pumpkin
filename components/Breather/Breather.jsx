import React from 'react';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';

const Breather = ({ title1, title2, subtitle, buttonText, link }) => {
	const router = useRouter();

	return (
		<div className={styles.search}>
			<h1>
				{title1} <br /> {title2}
			</h1>
			<p>{subtitle}</p>
			<button onClick={() => router.push(link)}>{buttonText}</button>
		</div>
	);
};

export default Breather;
