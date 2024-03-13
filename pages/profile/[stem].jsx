import Header from '@/components/Head/Head';
import Navbar from '@/components/Navbar/Navbar';
import Posts from '@/components/Posts/Posts';
import {
	AddBoxOutlined,
	Close,
	DirectionsRun,
	DoNotDisturb,
	Done,
	EditNoteSharp,
	Favorite,
	FavoriteBorder,
	LinkOff,
	MultipleStop,
	PeopleAltOutlined,
	RunCircle,
	Send,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import css from '@/styles/Navbar.module.css';
import styles from '@/styles/Account.module.css';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
import Authenticate from '@/components/Authenticate/Authenticate';
import { useDateContext } from '@/context/dateContext';
import { useSession } from 'next-auth/react';

const Stem = () => {
	const router = useRouter();
	const stem = router.query.stem;

	const { setLoading, loading, user, setUser } = useDateContext();
	const { data: session } = useSession();
	const [crush, setCrush] = useState({});
	const [posts, setPosts] = useState([]);
	const [favorite, setFavorite] = useState();
	const [isSlider, setIsSlider] = useState(true);
	const [slide, setSlide] = useState(false);
	const [acceptSlide, setAcceptSlide] = useState(null);
	const [liked_back, setLiked_back] = useState(false);

	const crushee = user;
	console.log(crushee);
	let totalMatches = crush.hickies === 0 ? 0 : crush.hickies;

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
				const { user } = await result.json();
				setUser(user);
			} else {
				const { error } = await result.json();
				console.log(error);
			}
		};

		const getCrush = async () => {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (result.ok) {
				const { user, posts } = await result.json();
				setCrush(user);
				setPosts(posts);
			} else {
				const { error } = await result.json();
				console.log(error);
			}

			setLoading(false);
		};

		const matchUsers = async () => {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					crushee: crushee.stem,
				}),
			});

			if (result.ok) {
				const { likes, slide, liked_back, isCrushee } = await result.json();
				setFavorite(likes);
				setSlide(slide);
				setLiked_back(liked_back);
				setAcceptSlide(
					slide && liked_back === 1 ? true : slide && liked_back === 0 ? false : null
				);
				setIsSlider(
					liked_back === null || liked_back === 0 || liked_back === 1 ? isCrushee : true
				);
				console.log(
					`Likes: ${likes}\nSlide: ${slide}\nLiked Back: ${liked_back}\nisSlider: ${isCrushee}\nAccept Slide: ${acceptSlide}`
				);
			} else {
				const { error } = await result.json();
				console.log(error);
			}

			setLoading(false);
		};

		setLoading(true);
		getUser();
		getCrush();
		matchUsers();
	}, []);

	const toggleLike = async () => {
		console.log('Toggle like acivated');
		let like_count = crush.pumpkins === 0 ? 0 : crush.pumpkins;
		console.log(`Like Count: ${like_count}`);

		const updateData = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				like: favorite ? 1 : 0,
				update: 'like',
				crushee: crushee.stem,
				crush: stem,
				like_count: !favorite ? ++like_count : like_count === 0 ? 0 : --like_count,
			}),
		};

		const removeData = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				like: favorite ? 1 : 0,
				update: 'dislike',
				crushee: crushee.stem,
				crush: stem,
				like_count: !favorite ? ++like_count : like_count === 0 ? 0 : --like_count,
			}),
		};

		if (!favorite) {
			setFavorite(true);
			const likeUser = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`,
				updateData
			);
			console.log('Liked User');
			const { message } = await likeUser.json();
		} else {
			setFavorite(false);
			const removeLike = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`,
				removeData
			);
			console.log('Unliked User');
		}
	};

	const toggleSlide = async () => {
		const slideData = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'slide',
				crushee: crushee.stem,
				crush: stem,
			}),
		};

		const cancelSlide = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'slideout',
				matched: false,
				crushee: crushee.stem,
				crush: stem,
			}),
		};

		const decline = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'slideout',
				crushee: stem,
				crush: crushee.stem,
			}),
		};

		if (!slide && liked_back === undefined) {
			const slide_onUser = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`,
				slideData
			);
			setSlide(true);
			setLiked_back(null);
			const { message } = await slide_onUser.json();

			// if (message === 'slideInitiated') {
			// 	setSlide(event.initial)
			// }
		} else if (slide && liked_back === null) {
			const slideCancel = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`,
				cancelSlide
			);
			setSlide(false);
			setLiked_back(undefined);
		} else if (slide && liked_back === 1) {
			const slideCancel = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					update: 'slideout',
					matched: true,
					crushee: crushee.stem,
					crush: stem,
				}),
			});
			setSlide(false);
			setLiked_back(undefined);
		}
	};

	const approve = async () => {
		setAcceptSlide(true);
		console.log('toggle Approve Started');

		const confirmMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'confirmMatch',
				crushee: stem,
				crush: crushee.stem,
				totalMatches: !liked_back
					? ++totalMatches
					: totalMatches === 0
					? 0
					: --totalMatches,
			}),
		};

		console.log('Approved Slide');
		const acceptMatch = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`,
			confirmMatch
		);
		setLiked_back(1);
	};

	const decline = async () => {
		setAcceptSlide(false);
		console.log('toggle Decline Started');

		const denyMatch = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'denyMatch',
				crushee: stem,
				crush: crushee.stem,
			}),
		};

		console.log('Declined Slide');
		const declineMatch = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`,
			denyMatch
		);
		setLiked_back(0);
	};

	const changeMind = async () => {
		setAcceptSlide(null);

		const nullify = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				update: 'nullify',
				crushee: stem,
				crush: crushee.stem,
				totalMatches: !liked_back
					? ++totalMatches
					: totalMatches === 0
					? 0
					: --totalMatches,
			}),
		};

		console.log('Changed Mind');
		const negate = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${stem}`, nullify);
		setLiked_back(null);
	};

	if (!session) {
		return <Authenticate />;
	}

	if (loading) {
		return <Loading />;
	}

	let age;

	if (!crush.dob) {
		age = '';
	} else {
		age = ', ' + String(new Date().getFullYear() - new Date(crush.dob).getFullYear());
	}

	return (
		<main className={styles.main}>
			<Header title={stem} />
			<div style={{ background: 'linear-gradient(270deg, #c3530a -2.97%, #191222 103.98%)' }}>
				<Navbar />
				<div className={styles.profile}>
					<div className={styles.profile_picture}>
						<div className={styles.profile_image}>
							<Image
								src={
									!crush.profile_photo
										? '/no_photo.png'
										: '/' + crush.profile_photo
								}
								alt={
									!crush.profile_photo ? 'No profile photo' : crush.profile_photo
								}
								layout='fill'
								className={styles.post_image}
							/>
						</div>
					</div>
					<div className=''>
						<h2>
							{crush.first_name} {crush.last_name}
							{age}
						</h2>
						<p>@{crush.stem}</p>
					</div>
				</div>
			</div>
			<div className={styles.statistics_section}>
				<div className={styles.statistics}>
					<p>
						<span>{crush.num_posts}</span> Post
						<span className={styles.separator}>•</span>
						<span>{crush.pumpkins}</span> Pumpkins
						<span className={styles.separator}>•</span>
						<span>{crush.hickies}</span> Hickies
					</p>
				</div>
				<div className={styles.buttons}>
					<button
						onClick={toggleLike}
						style={{ backgroundColor: 'transparent', border: 0 }}
					>
						{favorite ? (
							<Favorite className={styles.favorite} />
						) : (
							<FavoriteBorder className={styles.favorite} />
						)}
					</button>
					{isSlider ? (
						<div>
							{!slide && liked_back === undefined ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<p style={{ fontSize: '12pt' }}>
										<b>Make your move and slide into them DMs </b>
									</p>
									<button
										className={styles.match_button}
										style={{ fontSize: '12pt', margin: 'auto' }}
										onClick={toggleSlide}
									>
										Slide <Send />
									</button>
								</div>
							) : slide && liked_back === null ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<p style={{ fontSize: '12pt' }}>
										<b>Getting cold feet? Click to unslide </b>
									</p>
									<button
										className={styles.pending_match}
										style={{ fontSize: '12pt', margin: 'auto' }}
										onClick={toggleSlide}
									>
										Gwababa <DirectionsRun />
									</button>
								</div>
							) : slide && liked_back === 0 ? (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<p style={{ fontSize: '12pt' }}>
										<b>Oof, tough luck. You got an L </b>
									</p>
									<button
										className={styles.rejected_match}
										style={{ fontSize: '12pt', margin: 'auto' }}
										onClick={toggleSlide}
										disabled
									>
										Rejected <DoNotDisturb />
									</button>
								</div>
							) : (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<p style={{ fontSize: '12pt' }}>
										<b>It&apos;s a match! </b>
									</p>
									<button
										className={styles.accepted_match}
										style={{ fontSize: '12pt', margin: 'auto' }}
										onClick={toggleSlide}
									>
										Unmatch <LinkOff />
									</button>
								</div>
							)}
						</div>
					) : acceptSlide === null ? (
						<div id='choice'>
							<p style={{ fontSize: '12pt' }}>
								<b>This Person has already initiated to match with you </b>
							</p>
							<div className={styles.choice_buttons}>
								<button onClick={approve} className={styles.match_button_accept}>
									<p style={{ fontSize: '12pt' }}>Accept</p>
									<Done />
								</button>
								<button onClick={decline} className={styles.match_button_decline}>
									<p style={{ fontSize: '12pt' }}>Decline</p>
									<Close />
								</button>
							</div>
						</div>
					) : acceptSlide === false ? (
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<p style={{ fontSize: '12pt', margin: '10px auto' }}>
								<b>Second guessing your response? </b>
							</p>
							<button
								className={styles.match_button}
								style={{ fontSize: '12pt' }}
								onClick={changeMind}
							>
								Change mind <MultipleStop />
							</button>
						</div>
					) : (
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<p style={{ fontSize: '12pt', margin: '10px auto' }}>
								<b>It&apos;s a match! </b>
							</p>
							<button
								className={styles.accepted_match}
								style={{ fontSize: '12pt' }}
								onClick={changeMind}
							>
								Unmatch <LinkOff />
							</button>
						</div>
					)}
					{/* <Link
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
					</Link> */}
				</div>
			</div>
			<div className={styles.bio}>
				<h3>Bio</h3>
				<p>{crush.bio ? crush.bio : 'No Biography'}</p>
			</div>
			{/* <div className={styles.post_something}>
				<h3>More About {crush.first_name}</h3>
				<button>Post</button>
			</div> */}
			<div className={styles.user_post}>
				<h3>Posts</h3>
				<h4>{crush.num_posts}</h4>
				{posts.length !== 0 ? (
					<Posts posts={posts} isUser={false} />
				) : (
					<h1 style={{ textAlign: 'center' }}>No Posts Yet</h1>
				)}
			</div>
		</main>
	);
};

export default Stem;
