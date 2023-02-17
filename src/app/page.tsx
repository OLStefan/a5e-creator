'use client';

import { Inter } from '@next/font/google';
import { Divider, Input } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import Description from '../components/Description';
// import styles from './page.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [val, setVal] = useState('');

	return (
		<div className={classNames(inter.className /*styles.main*/)}>
			<Input.TextArea
				// className={styles.textarea}
				onChange={(event) => {
					setVal(escapeMarkdown(event.target.value).string);
				}}
				autoSize
			/>
			<Divider />
			<div>{val}</div>
			<Divider />
			<Description value={val} />
		</div>
	);
}

function escapeMarkdown(markdown: string) {
	return {
		orig: markdown,
		string: markdown.replaceAll('\\', '\\\\').replaceAll(/"/g, '"').replaceAll('\n', '  \\n').replaceAll('’', "'"),
	};
}
