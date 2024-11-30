import localFont from 'next/font/local';
import { lora } from './google-fonts/fonts';
import './globals.css';

export const metadata = {
	title: '...',
	description: '...',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${lora.variable} `}>{children}</body>
		</html>
	);
}

