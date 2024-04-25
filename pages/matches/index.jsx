import React from 'react';
import styles from "@/styles/Matches.module.css"
import Navbar from '@/components/Navbar/Navbar';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import DiscoverMatch from '@/components/Discover/DiscoverMatch';
import Header from '@/components/Head/Head';

const MatchesPage = () => {
	const [sampleUsers, setSampleUsers] = useState([]);

    useEffect(()=>{
		const getUsers = async () => {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/users`, {
			  method: 'GET',
			  headers: {
				'Content-Type': 'application/json',
			  },
			});
			const { popular_users } = await result.json();
			console.log(popular_users);
			setSampleUsers(popular_users)
		}
			getUsers()
	},[])
		

	return (
		<div className={styles.body} >
			<Header title='Matches'/>
			<Navbar />
			    <div style={{marginTop: '30px' }}>
				<DiscoverMatch users={sampleUsers}/>
				</div>
			<div className={styles.all}>
				<Link href='/matches/all' className={styles.matches_link}>See All Matches</Link>
			</div>
		</div>
	);
}

export default MatchesPage;
