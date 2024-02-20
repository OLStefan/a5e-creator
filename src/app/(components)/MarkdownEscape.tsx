'use client';

import { Divider, Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { observer } from 'mobx-react-lite';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { useTextModel } from './TextProvider';
import styles from './markdown.module.css';

export default observer(function MarkdownEscape() {
	const model = useTextModel();

	const callbacks = useUpdatingCallbacks({
		onChange: ((event) => {
			model.update(event.target.value);
		}) satisfies TextAreaProps['onChange'],
	});

	return (
		<div className={styles.root}>
			<Input.TextArea value={model.text} className={styles['text-area']} onChange={callbacks.onChange} autoSize />
			<Divider />
			<div>{model.escaped}</div>
			<Divider />
			{model.markdown}
		</div>
	);
});
