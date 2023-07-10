import loadText from './(actions)/loadText';
import MarkdownEscape from './(components)/MarkdownEscape';
import TextProvider from './(components)/TextProvider';

export default async function Page() {
	const initialText = await loadText();

	return (
		<TextProvider initialValue={initialText}>
			<MarkdownEscape />;
		</TextProvider>
	);
}
