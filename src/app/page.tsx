'use client';

import { Divider, Input } from 'antd';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Markdown from 'react-markdown';
import styles from './index.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const [val, setVal] = useState<ReturnType<typeof escapeMarkdown>>({ orig: '', string: '' });

	return (
		<div className={classNames(inter.className, styles.main)}>
			<Input.TextArea
				className={styles.textarea}
				onChange={(event) => {
					setVal(escapeMarkdown(event.target.value));
				}}
				autoSize
			/>
			<Divider />
			<div>{val.string}</div>
			<Divider />
			<Markdown>{val.orig}</Markdown>
		</div>
	);
}

function escapeMarkdown(markdown: string) {
	return {
		orig: markdown,
		string: markdown.replaceAll('\\', '\\\\').replaceAll(/"/g, '"').replaceAll('\n', '\\n').replaceAll('’', "'"),
	};
}
