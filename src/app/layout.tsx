import './globals.css';

import { ConfigProvider } from 'antd';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from './AntRegistry';
import theme from './theme';

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
				<StyledComponentsRegistry>
					<ConfigProvider theme={theme}>{children}</ConfigProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
