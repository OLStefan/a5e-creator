'use client';

import { Divider, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useText } from './TextProvider';
import styles from './index.module.css';

export default observer(function MarkdownEscape() {
	const model = useText();

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
