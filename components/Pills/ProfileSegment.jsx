import React from 'react';
import styles from '@/styles/Account.module.css';

const formatDate = (dateString = Date()) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
};

const ProfileSegment = ({ profile }) => {
	console.log(profile);
	const birth = formatDate(profile.dob);

	return (
		<div className={styles.segmentGrid}>
			{profile.dob !== undefined && profile.dob !== null && profile.dob !== '' && (
				<div className={styles.segmentContainer}>
					<h4>Date of Birth:</h4>
					<button className={styles.pills}>{birth}</button>
				</div>
			)}
			{profile.relationship_status !== undefined &&
				profile.relationship_status !== null &&
				profile.relationship_status !== '' && (
					<div className={styles.segmentContainer}>
						<h4>Relationship Status:</h4>
						<button className={styles.pills}>{profile.relationship_status}</button>
					</div>
				)}
			{profile.religion !== undefined &&
				profile.religion !== null &&
				profile.religion !== '' && (
					<div className={styles.segmentContainer}>
						<h4>Religion:</h4>
						<button className={styles.pills}>{profile.religion}</button>
					</div>
				)}
			{profile.sex !== undefined && profile.sex !== null && profile.sex !== '' && (
				<div className={styles.segmentContainer}>
					<h4>Sex:</h4>
					<button className={styles.pills}>{profile.sex}</button>
				</div>
			)}
			{profile.ethnicity !== undefined &&
				profile.ethnicity !== null &&
				profile.ethnicity !== '' && (
					<div className={styles.segmentContainer}>
						<h4>Ethnicity:</h4>
						<button className={styles.pills}>{profile.ethnicity}</button>
					</div>
				)}
		</div>
	);
};

export default ProfileSegment;
