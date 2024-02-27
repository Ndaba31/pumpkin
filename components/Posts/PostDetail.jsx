import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Account.module.css';

const PostDetail = ({ post }) => {
	return (
		<div
			className={styles.post_card}
			// style={{ marginBottom: '16px', marginTop: '16px', height: '450px' }}
		>
			<Image
				objectFit='contain'
				width={400}
				height={450}
				src={'/' + post}
				alt={post}
				className={styles.post_image}
			/>
		</div>
	);
};

export default PostDetail;
