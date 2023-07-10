import MarkdownEscape from './(components)/MarkdownEscape';
import TextProvider from './(components)/TextProvider';
import { loadText } from './actions';

export const dynamic = 'force-static';

export default async function Page() {
	const initialText = await loadText();

	return (
		<TextProvider initialValue={initialText}>
			<MarkdownEscape />;
		</TextProvider>
	);
}
