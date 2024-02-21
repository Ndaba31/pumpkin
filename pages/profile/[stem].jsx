import { useRouter } from 'next/router';
import React from 'react';

const Stem = () => {
	const router = useRouter();
	const id = router.query.stem;
	return <div>{id}</div>;
};

export default Stem;
