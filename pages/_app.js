import { DateContextProvider } from '@/context/dateContext';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<DateContextProvider>
				<Component {...pageProps} />
			</DateContextProvider>
		</SessionProvider>
	);
}
