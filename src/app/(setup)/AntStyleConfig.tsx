'use client';

import { ConfigProvider, theme } from 'antd';
import { CSSProperties, ReactNode } from 'react';
import { themeConfig } from '../../theme';
import styles from './setup.module.css';

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
