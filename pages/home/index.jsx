import Header from '@/components/Head/Head';
import React from 'react';
import Image from 'next/legacy/image';
import styles from '@/styles/Home.module.css';

const Home = () => {
	return (
		<div>
			<Header
				title='Pumpkin'
				description='Pumpkin Dating website. Where true love meets fortune'
			/>
			<div className={styles.hero}>
				<Image src='/lady.webp' alt='Pumpkin Hero Image' layout='fill' />
			</div>
		</div>
	);
};

export default Home;
