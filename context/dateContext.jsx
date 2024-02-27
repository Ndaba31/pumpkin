import { createContext, useContext, useState } from 'react';

const DateContext = createContext(undefined);

// Create a custom provider component that wraps your date
const DateContextProvider = ({ children }) => {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});

	return (
		<DateContext.Provider
			value={{ error, setError, success, setSuccess, loading, setLoading, user, setUser }}
		>
			{children}
		</DateContext.Provider>
	);
};

// Create a custom hook to access the context values
const useDateContext = () => {
	const context = useContext(DateContext);

	if (!context) {
		throw new Error('useDateContext must be used within a DateContextProvider');
	}

	return context;
};

export { DateContextProvider, useDateContext };
