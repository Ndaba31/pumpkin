import { DateContextProvider } from '@/context/dateContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<DateContextProvider>
			<Component {...pageProps} />
		</DateContextProvider>
	);
}
