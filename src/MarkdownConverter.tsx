import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import Description from './components/Description';

export default function MarkdownConverter() {
	const [val, setVal] = useState('');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', padding: 8, gap: 16, height: '100%' }}>
			<TextArea
				style={{ flex: '0 0 50%' }}
				onChange={(event) => {
					setVal(escapeMarkdown(event.target.value).string);
				}}
			/>
			<div>{val}</div>
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
