'use client';

import { Divider, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from '../index.module.css';
import { useTextModel } from './TextProvider';

export default observer(function MarkdownEscape() {
	const model = useTextModel();

	return (
		<div className={styles.main}>
			<Input.TextArea
				value={model.text}
				className={styles.textarea}
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
