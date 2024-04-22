import React, { useState } from 'react';
import styles from '@/styles/Discover.module.css';

const Filter = ({ item, handleClick }) => {
	const [active, setActive] = useState(false);

	const toggleActive = () => {
		setActive(!active);
	};

	return (
		<button
			className={`${styles.filterCategory} ${
				active ? styles.selected : styles.filterCategory
			}`}
			onClick={() => {
				handleClick(item);
				toggleActive();
			}}
		>
			{item}
		</button>
	);
};

export default Filter;
