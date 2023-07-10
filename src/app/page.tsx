import MarkdownEscape from './MarkdownEscape';
import { loadText } from './actions';

export default async function Page() {
	const initialText = await loadText();

	return <MarkdownEscape initialValue={initialText} />;
}
