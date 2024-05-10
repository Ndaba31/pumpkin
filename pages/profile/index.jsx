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
import Pills from '@/components/Pills/Pills';
import Occupations from '@/components/Pills/Occupations';
import ProfileSegment from '@/components/Pills/ProfileSegment';
import Location from '@/components/Pills/Location';
import EditDetails from '@/components/EditProfile/EditDetails';
import Loading from '@/components/Loading/Loading';
import EditLocation from '@/components/EditProfile/EditLocation';
import EditOccupation from '@/components/EditProfile/EditOccupation';
import MoreDetails from '@/components/EditProfile/MoreDetails';
import EditHobbies from '@/components/EditProfile/EditHobbies';
import UploadPhoto from '@/components/EditProfile/UploadPhoto';

const ProfilePage = () => {
	const { data: session, loading } = useSession();
	const { user, setUser } = useDateContext();
	const [posts, setPosts] = useState([]);
	const [hobbies, setHobbies] = useState([]);
	const [occupation, setOccupation] = useState([]);
	const [details, setDetails] = useState([]);
	const [area, setArea] = useState([]);
	const [openEditDetails, setOpenEditDetails] = useState(false);
	const [openEditMoreDetails, setOpenEditMoreDetails] = useState(false);
	const [openEditLocation, setOpenEditLocation] = useState(false);
	const [openEditOccupation, setOpenEditOccupation] = useState(false);
	const [openEditHobbies, setOpenEditHobbies] = useState(false);
	const [openPost, setOpenPost] = useState(false);

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
				const { user, posts, hobbies, occupation, details, area } = await result.json();
				setUser(user);
				setPosts(posts);
				setHobbies(hobbies);
				setOccupation(occupation);
				setDetails(details);
				setArea(area);
				console.log(details);
			} else {
				const { error } = await result.json();
				console.log(error);
			}
		};

		getUser();
	}, [session]);

	const openDetailsModal = () => {
		setOpenEditDetails(true);
	};

	const closeDetailsModal = () => {
		setOpenEditDetails(false);
	};

	const openMoreDetailsModal = () => {
		setOpenEditMoreDetails(true);
	};

	const closeMoreDetailsModal = () => {
		setOpenEditMoreDetails(false);
	};

	const openLocationModal = () => {
		setOpenEditLocation(true);
	};

	const closeLocationModal = () => {
		setOpenEditLocation(false);
	};

	const openOccupationModal = () => {
		setOpenEditOccupation(true);
	};

	const closeOccupationModal = () => {
		setOpenEditOccupation(false);
	};

	const openHobbiesModal = () => {
		setOpenEditHobbies(true);
	};

	const closeHobbiesModal = () => {
		setOpenEditHobbies(false);
	};

	const openPostModal = () => {
		setOpenPost(true);
	};

	const closePostModal = () => {
		setOpenPost(false);
	};

	if (loading) {
		<Loading />;
	}

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
			<div className={styles.left}>
				<div
					style={{
						background: 'linear-gradient(270deg, #c3530a -2.97%, #191222 103.98%)',
					}}
				>
					<Navbar />
					<div className={styles.profile}>
						<div className={styles.profile_picture}>
							<div className={styles.profile_image}>
								<Image
									src={!user.profile_photo ? '/no_photo.png' : user.profile_photo}
									alt={
										!user.profile_photo
											? 'No profile photo'
											: user.profile_photo
									}
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
							href=''
							onClick={openDetailsModal}
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
							href=''
							className={css.loginButton}
							onClick={openPostModal}
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
				{openEditDetails && <EditDetails user={user} onClose={closeDetailsModal} />}
				{openPost && <UploadPhoto user={user} onClose={closePostModal} />}
				{openEditMoreDetails && (
					<MoreDetails
						profile={details}
						stem={user.stem}
						onClose={closeMoreDetailsModal}
						setDetails={setDetails}
					/>
				)}
				{openEditOccupation && (
					<EditOccupation
						occupation={occupation}
						stem={user.stem}
						onClose={closeOccupationModal}
						setOccupation={setOccupation}
					/>
				)}
				{openEditHobbies && (
					<EditHobbies
						listed_hobbies={hobbies}
						setHobbies={setHobbies}
						stem={user.stem}
						onClose={closeHobbiesModal}
					/>
				)}
				{openEditLocation && (
					<EditLocation
						area={area}
						stem={user.stem}
						onClose={closeLocationModal}
						setLocation={setArea}
					/>
				)}
				<div className={styles.editInfo}>
					<div className={styles.bio}>
						<h3>Bio</h3>
						<p>{user.bio ? user.bio : 'No Biography'}</p>
					</div>
					<div className={styles.right}>
						<div>
							<div className={styles.editBio}>
								<h3>Hobbies</h3>
								<button onClick={openHobbiesModal}>
									<h3>Edit</h3>
								</button>
							</div>
							<div className={styles.pillsView}>
								{hobbies === undefined || hobbies.length === 0 ? (
									<h3>No Hobbies Selected Yet</h3>
								) : (
									<Pills list={hobbies} />
								)}
							</div>
							<div className={styles.editBio}>
								<h3>Occupation</h3>
								<button onClick={openOccupationModal}>
									<h3>Edit</h3>
								</button>
							</div>
							<div className={styles.pillsView}>
								{occupation === undefined || occupation.length === 0 ? (
									<h3>No Occupations Listed Yet</h3>
								) : (
									<Occupations
										occupation={occupation}
										setOccupation={setOccupation}
										stem={user.stem}
									/>
								)}
							</div>
							<div className={styles.editBio}>
								<h3>Personal Details</h3>
								<button onClick={openMoreDetailsModal}>
									<h3>Edit</h3>
								</button>
							</div>
							<div className={styles.pillsView}>
								{details === undefined ||
								details.length === 0 ||
								(!details.relationship_status &&
									!details.sex &&
									!details.dob &&
									!details.ethnicity &&
									!details.religion) ? (
									<h3>No Personal Details</h3>
								) : (
									<ProfileSegment profile={details} />
								)}
							</div>
							<div className={styles.editBio}>
								<h3>Location</h3>
								<button onClick={openLocationModal}>
									<h3>Edit</h3>
								</button>
							</div>
							<div className={styles.pillsView}>
								{area === undefined || area.length === 0 ? (
									<h3>No Location Details</h3>
								) : (
									<Location area={area} stem={user.stem} setArea={setArea} />
								)}
							</div>
						</div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div className={styles.user_post}>
					<h3>Posts</h3>
					<h4>{user.num_posts}</h4>
					{posts.length !== 0 ? (
						<Posts posts={posts} isUser={true} />
					) : (
						<h1 style={{ textAlign: 'center' }}>No Posts Yet</h1>
					)}
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
