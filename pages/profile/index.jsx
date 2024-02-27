import styles from '@/styles/Account.module.css';
import css from '@/styles/Navbar.module.css';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Authenticate from '@/components/Authenticate/Authenticate';
import { useEffect, useState } from 'react';
import Header from '@/components/Head/Head';
import { useDateContext } from '@/context/dateContext';
import Posts from '@/components/Posts/Posts';
import { AddBoxOutlined, EditNoteSharp } from '@mui/icons-material';

const ProfilePage = () => {
	const { data: session } = useSession();
	const { user, setUser } = useDateContext();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/newUser`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: session ? session.user.email : '',
				}),
			});

			if (result.ok) {
				const { user, posts } = await result.json();
				setUser(user);
				setPosts(posts);
			} else {
				const { error } = await result.json();
				console.log(error);
			}
		};

		getUser();
	}, []);

	if (!session) {
		return <Authenticate />;
	}

	let age;

	if (!user.dob) {
		age = '';
	} else {
		age = ', ' + String(new Date().getFullYear() - new Date(user.dob).getFullYear());
	}

	console.log(session.user);
	console.log(user);
	return (
		<main className={styles.main}>
			<Header title='My Profile' />
			<div style={{ background: 'linear-gradient(270deg, #c3530a -2.97%, #191222 103.98%)' }}>
				<Navbar />
				<div className={styles.profile}>
					<div className={styles.profile_picture}>
						<div className={styles.profile_image}>
							<Image
								src={
									!user.profile_photo ? '/no_photo.png' : '/' + user.profile_photo
								}
								alt={!user.profile_photo ? 'No profile photo' : user.profile_photo}
								layout='fill'
								className={styles.post_image}
							/>
						</div>
					</div>
					<div className=''>
						<h2>
							{user.first_name} {user.last_name}
							{age}
						</h2>
						<p>@{user.stem}</p>
					</div>
				</div>
			</div>
			<div className={styles.statistics_section}>
				<div className={styles.statistics}>
					<p>
						<span>{user.num_posts}</span> Post
						<span className={styles.separator}>•</span>
						<span>{user.pumpkins}</span> Pumpkins
						<span className={styles.separator}>•</span>
						<span>{user.hickies}</span> Hickies
					</p>
				</div>
				<div className={styles.buttons}>
					<Link
						href='profile/edit'
						className={css.signupButton}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
							textDecoration: 'none',
							border: '1px solid darkgrey',
						}}
					>
						<p>Edit Profile</p>
						<EditNoteSharp />
					</Link>
					<Link
						href='profile/post-image'
						className={css.loginButton}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '10px',
							textDecoration: 'none',
						}}
					>
						<p>Post</p>
						<AddBoxOutlined />
					</Link>
				</div>
			</div>
			<div className={styles.bio}>
				<h3>Bio</h3>
				<p>{user.bio ? user.bio : 'No Biography'}</p>
			</div>
			<div className={styles.post_something}>
				<h3>More About {user.first_name}</h3>
				<button>Post</button>
			</div>
			<div className={styles.user_post}>
				<h3>Posts</h3>
				<h4>{user.num_posts}</h4>
				<Posts posts={posts} isUser={true} />
			</div>
		</main>
	);
};

export default ProfilePage;
