import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import SignupModal from '@/components/Modal/SignupModal';
import LoginModal from '@/components/Modal/LoginModal';
import Header from '@/components/Head/Head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Home = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoginClick, setIsLoginClick] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
		setIsLoginClick(false);
		console.log('isModalOpen set to True');
	};

	const closeModal = () => {
		setIsModalOpen(false);
		console.log('isModalOpen set to False');
	};

	const openLoginCLick = () => {
		setIsLoginClick(true);
		setIsModalOpen(false);
		console.log('isLoginClick set to True');
	};

	const closeLoginCLick = () => {
		setIsLoginClick(false);
		console.log('isLoginClick set to False');
	};

	if (session) {
		router.replace('/home');
		return;
	}

	return (
		<div className={`${styles.body} ${styles.landingPage}`}>
			<Header title='Pumpkin' />
			<Navbar page='home' openLogin={openLoginCLick} openSignUp={openModal} />
			<Hero openModal={openModal} openLogin={openLoginCLick} />
			{isModalOpen && (
				<SignupModal isOpen={isModalOpen} onClose={closeModal} openLogin={openLoginCLick} />
			)}
			{isLoginClick && (
				<LoginModal
					isOpen={isLoginClick}
					onClose={closeLoginCLick}
					openSignUp={openModal}
				/>
			)}
		</div>
	);
};

export default Home;
