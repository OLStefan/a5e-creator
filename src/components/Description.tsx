import Markdown from 'react-markdown';
import { Except } from 'type-fest';
import { BaseProps } from '../types';

// style is not supported by markdown component
interface Props extends Except<BaseProps, 'style'> {
	value: string;
}

export default function Description({ value, ...otherProps }: Props) {
	return <Markdown {...otherProps}>{loadMarkdownFromJson(value)}</Markdown>;
}

function loadMarkdownFromJson(json: string): string {
	return json.replaceAll('\\n', '\n');
}
