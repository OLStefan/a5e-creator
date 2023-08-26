import { types } from 'mobx-state-tree';
import Markdown from 'react-markdown';
import updateText from '../(actions)/updateText';

export const uiModel = types
	.model({
		text: types.string,
	})
	.extend((self) => {
		const views = {
			get escaped() {
				return escapeMarkdown(self.text);
			},
			get markdown() {
				return <Markdown>{self.text}</Markdown>;
			},
		};

		const actions = {
			update(text: string) {
				updateText(text);
				self.text = text;
			},
		};

		return { views, actions };
	});

function escapeMarkdown(markdown: string) {
	return markdown.replaceAll('\\', '\\\\').replaceAll(/"/g, '"').replaceAll('\n', '\\n').replaceAll('’', "'");
}
