'use client';

import { Divider, Input } from 'antd';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { loadText, updateText } from './actions';
import styles from './index.module.css';

export interface MarkdownEscapeProps {
	initialValue: string | null;
}

export default function MarkdownEscape({ initialValue }: MarkdownEscapeProps) {
	const value = useLoadedValue(initialValue, loadText);
	const [val, setVal] = useState<ReturnType<typeof escapeMarkdown>>({ orig: value, string: value });

	return (
		<div className={styles.main}>
			<Input.TextArea
				className={styles.textarea}
				onChange={(event) => {
					const newValue = escapeMarkdown(event.target.value);
					setVal(newValue);
					updateText(newValue.orig);
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

function useLoadedValue(initialValue: string | null, loadFunction: () => Promise<string | null>) {
	const [value, setValue] = useState(initialValue);

	if (value === null) {
		loadFunction().then((v) => setValue(v));
		return '';
	}

	return value;
}
