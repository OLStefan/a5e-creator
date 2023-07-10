import { Metadata } from 'next';
import './globals.css';

const basePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}`;

export const metadata: Metadata = {
	title: 'A5E Character Creator',
	icons: `${basePath}/favicon.ico`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}
