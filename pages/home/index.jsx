import styles from '@/styles/Home.module.css';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/legacy/image';
import Header from '@/components/Head/Head';
import { useSession } from 'next-auth/react';
import Authenticate from '@/components/Authenticate/Authenticate';
import Discover from '@/components/Discover/Discover';
import { useEffect, useState } from 'react';
import { useDateContext } from '@/context/dateContext';
import Loading from '@/components/Loading/Loading';
import Breather from '@/components/Breather/Breather';

const HomePage = () => {
	const { setLoading, loading } = useDateContext();
	const { data: session } = useSession();
	const [popularUsers, setPopularUsers] = useState([]);
	const [mostWantedUsers, setMostWantedUsers] = useState([]);
	const [singleUsers, setSingleUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/users`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const { popular_users, most_wanted_users, single_users } = await result.json();
			setPopularUsers(popular_users);
			setMostWantedUsers(most_wanted_users);
			setSingleUsers(single_users);
			setLoading(false);
		};
		setLoading(true);
		getUsers();
	}, []);

	if (!session) {
		return <Authenticate />;
	}

	if (loading) {
		return <Loading />;
	}

	console.log(`Popular: ${popularUsers}\nWanted: ${mostWantedUsers}\nSingle: ${singleUsers}\n`);

	return (
		<main className={styles.main}>
			<Header title='Pumpkin' description='Where true love meets fortune' />
			<div className={styles.main_part}>
				<Navbar />
				<Image
					src='/lady.webp'
					alt='Pumpkin App'
					priority
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<Discover category='Most Popular' users={popularUsers} />
			<Breather
				title1='Discover'
				title2='More People'
				subtitle='Where true love meets fortune'
				buttonText='Search'
				link='/discover'
			/>
			<Discover category='Most Wanted' users={mostWantedUsers} />
			<Breather
				title1='See People'
				title2='You Matched With'
				subtitle='Where true love meets fortune'
				buttonText='Go'
				link='/matches'
			/>
			<Discover category='Single & Searching' users={singleUsers} />
		</main>
	);
};

export default HomePage;
