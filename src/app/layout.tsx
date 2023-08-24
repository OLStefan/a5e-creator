import './globals.css';

import { App } from 'antd';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AntMessageHandling from './(setup)/AntMessageHandling';
import StyledComponentsRegistry from './(setup)/AntRegistry';
import AntStyleConfig from './(setup)/AntStyleConfig';

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
					<AntStyleConfig>
						<App>
							<AntMessageHandling />
							{children}
						</App>
					</AntStyleConfig>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
