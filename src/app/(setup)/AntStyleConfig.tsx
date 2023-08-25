'use client';

import { ConfigProvider, theme, type ThemeConfig } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import styles from './setup.module.css';

const themeConfig: ThemeConfig = {
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
		<ConfigProvider theme={themeConfig}>
			<AntStyleInjector>{children}</AntStyleInjector>
		</ConfigProvider>
	);
}

function AntStyleInjector({ children }: Props) {
	const { token } = theme.useToken();
	const antVariables = {
		'--spacing-small': token.margin,
	} as CSSProperties;

	return (
		<div style={antVariables} className={styles.root}>
			{children}
		</div>
	);
}
