'use client';

import { Divider, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useTextModel } from './TextProvider';
import styles from './markdown.module.css';

export default observer(function MarkdownEscape() {
	const model = useTextModel();

	return (
		<div className={styles.root}>
			<Input.TextArea
				value={model.text}
				className={styles['text-area']}
				onChange={(event) => {
					model.update(event.target.value);
				}}
				autoSize
			/>
			<Divider />
			<div>{model.escaped}</div>
			<Divider />
			{model.markdown}
		</div>
	);
});
