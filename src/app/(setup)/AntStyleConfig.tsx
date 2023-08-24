'use client';

import { ConfigProvider, type ThemeConfig } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import styles from './page.module.css';

const theme: ThemeConfig = {
	token: {
		fontSize: 14,
		colorPrimary: '#f48847',
		colorInfo: '#1677ff',
	},
};

interface Props {
	children: ReactNode;
}

export default function AntStyleConfig({ children }: Props) {
	return (
		<ConfigProvider theme={theme}>
			<AntStyleInjector>{children}</AntStyleInjector>
		</ConfigProvider>
	);
}

function AntStyleInjector({ children }: Props) {
	const antVariables: CSSProperties = {};

	return (
		<div style={antVariables} className={styles.root}>
			{children}
		</div>
	);
}
