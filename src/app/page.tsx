import MarkdownEscape from './(components)/MarkdownEscape';
import TextProvider from './(components)/TextProvider';
import { loadText } from './actions';

export default async function Page() {
	const initialText = await loadText();

	return (
		<TextProvider initialValue={initialText}>
			<MarkdownEscape />;
		</TextProvider>
	);
}
