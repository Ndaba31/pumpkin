// components/Hero.js
import React from 'react';
import styles from '@/styles/Hero.module.css';
import Image from 'next/legacy/image';

const Hero = ({ openModal }) => {
	return (
		<div className={styles.hero}>
			<div className={styles.shadow}>
				<div className={styles.left}>
					<h1 className={styles.title}>Welcome To</h1>
					<h1 className={styles.title}>
						Pu
						<span className={styles.image}>
							<Image src='/logo.svg' alt='Pumpkin Logo' width={50} height={50} />
						</span>
						pkin
					</h1>
					<p className={styles.subtitle}>Where True Love Meets Fortune</p>
					<button onClick={openModal} className={styles.createAccountButton}>
						Create Account
					</button>
				</div>
				<div className={styles.imageContainer}>
					<Image
						src='/lady.webp'
						alt='Pumpkin Hero Image'
						layout='fill'
						objectFit='cover'
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
