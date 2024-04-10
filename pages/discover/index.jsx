import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Header from '@/components/Head/Head';
import styles from '@/styles/Discover.module.css';
import { FilterList, Search } from '@mui/icons-material';
import { useDateContext } from '@/context/dateContext';
import SearchItem from '@/components/SearchItem/SearchItem';

const DiscoverPage = () => {
	const { setError, error } = useDateContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [openResults, setOpenResults] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);

	const handleChange = async (event) => {
		const term = event.target.value;
		setSearchTerm(term);

		if (term.length === 0) {
			setOpenResults(false);
		} else {
			setOpenResults(true);
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
		setOpenFilter(!openFilter);
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
						<div className={styles.searchList}>
							<h1>Filters</h1>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default DiscoverPage;
