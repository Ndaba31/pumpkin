import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Header from '@/components/Head/Head';
import styles from '@/styles/Discover.module.css';
import { Cancel, FilterList, Search } from '@mui/icons-material';
import { useDateContext } from '@/context/dateContext';
import SearchItem from '@/components/SearchItem/SearchItem';
import Filters from '@/components/Filters/Filters';
import { ethinicities, hobbies, regions, relationship_status, religions } from '@/data';

const DiscoverPage = () => {
	const { setError, error } = useDateContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [openResults, setOpenResults] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState({
		'Relationship Status': [],
		'Religion': [],
		'Hobbies': [],
		'Ethnicity': [],
		'Region': [],
	});

	const handleChange = async (event) => {
		const term = event.target.value;
		setSearchTerm(term);

		if (term.length === 0) {
			setOpenResults(false);
		} else {
			setOpenResults(true);
		}

		if (openResults) {
			setOpenFilter(false);
		}

		try {
			const response = await fetch(`/api/search/${term}`);

			if (!response.ok) {
				const { message } = await response.json();
				setError(message);
				console.log(message);
			} else {
				setError('');
				const data = await response.json();
				setSearchResults(data.searchedUsers);
				console.log(data);
			}
		} catch (err) {
			console.error('Error searching for people:', err);
		}
	};

	const toggleFilter = () => {
		if (openFilter) {
			setOpenResults(false);
		}

		setOpenFilter(!openFilter);
	};

	const handleFilter = async (category, value) => {
		const updatedFilters = { ...appliedFilters };
		const index = updatedFilters[category].indexOf(value);

		if (index === -1) {
			updatedFilters[category] = [...updatedFilters[category], value];
		} else {
			updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
		}

		setAppliedFilters(updatedFilters);

		try {
			const response = await fetch(`/api/search/category`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					filteredList: appliedFilters,
				}),
			});
		} catch (error) {
			console.log('Error with category search');
		}
		console.log(updatedFilters);
		console.log(`Category: ${category}\nValue: ${value}`);
	};

	return (
		<>
			<Header title='Discover' description='Search for your true love' />
			<div className={styles.hero}>
				<Navbar />
				<div className={styles.heroContent}>
					<h1>Discover Potential Dates</h1>
					<div className={styles.searchContainer}>
						<div className={styles.inputContainer}>
							<Search className={styles.searchIcon} />
							<input
								type='text'
								placeholder='Search People...'
								value={searchTerm}
								onChange={handleChange}
								className={styles.input}
							/>
						</div>
						<button className={styles.filterIconContainer} onClick={toggleFilter}>
							<FilterList className={styles.filterIcon} />
						</button>
					</div>
					{openResults && (
						<div className={styles.searchList}>
							{searchResults.length !== 0 ? (
								searchResults.map((user) => (
									<SearchItem user={user} key={user.stem} />
								))
							) : (
								<h1 style={{ textAlign: 'center' }}>{error}</h1>
							)}
						</div>
					)}
					{openFilter && (
						<div className={styles.filterList}>
							<div className={styles.filterHeader}>
								<h3>Search by Category</h3>
								<div className={styles.filterButtons}>
									<button
										className={styles.clearFilters}
										onClick={() => console.log('Hello')}
									>
										Clear Filters
									</button>
									<button
										className={styles.filterIconContainer}
										onClick={() => setOpenFilter(false)}
									>
										<Cancel
											className={styles.filterIcon}
											style={{ color: 'black' }}
										/>
									</button>
								</div>
							</div>
							<Filters
								category='Hobbies'
								list={hobbies}
								handleFilter={handleFilter}
							/>
							<Filters
								category='Relationship Status'
								list={relationship_status}
								handleFilter={handleFilter}
							/>
							<Filters category='Region' list={regions} handleFilter={handleFilter} />
							<Filters
								category='Ethnicity'
								list={ethinicities}
								handleFilter={handleFilter}
							/>
							<Filters
								category='Religion'
								list={religions}
								handleFilter={handleFilter}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default DiscoverPage;
