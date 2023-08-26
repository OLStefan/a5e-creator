import '../scripts/antd.min.css';
import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AntHandling from './(setup)/AntHandling';

const basePath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}`;

export const metadata: Metadata = {
	title: 'A5E Character Creator',
	icons: `${basePath}/favicon.ico`,
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body className={inter.className}>
				<AntHandling>{children}</AntHandling>
			</body>
		</html>
	);
}
