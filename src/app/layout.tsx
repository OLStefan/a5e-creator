import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'A5E Character Creator',
	icons: ['/favicon.ico']
  }

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}
