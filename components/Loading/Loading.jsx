import React from 'react';
import Image from 'next/image';

const Loading = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'linear-gradient(270deg, #c3530a -2.97%, #191222 103.98%)',
				height: '100vh',
			}}
		>
			<Image src='/logo.svg' alt='Pumpkin Logo' priority height={300} width={300} />
			<h1 style={{ textAlign: 'center', color: 'white' }}>Loading...</h1>
		</div>
	);
};

export default Loading;
