import MarkdownEscape from './MarkdownEscape';
import { loadText } from './actions';

export const dynamic = 'force-static';

export default async function Page() {
	const initialText = await loadText();

	return <MarkdownEscape initialValue={initialText} />;
}
