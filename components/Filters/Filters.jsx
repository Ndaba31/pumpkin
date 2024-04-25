import React from 'react';
import styles from '@/styles/Discover.module.css';
import Filter from './Filter';

const Filters = ({ category, list, handleFilter }) => {
	const handleClick = (value) => {
		handleFilter(category, value);
	};
	return (
		<div className={styles.filterContainer}>
			<h4>{category}</h4>
			<div className={styles.filterCategories}>
				{list.map((item, i) => (
					<Filter handleClick={handleClick} item={item} key={i} />
				))}
			</div>
		</div>
	);
};

export default Filters;
