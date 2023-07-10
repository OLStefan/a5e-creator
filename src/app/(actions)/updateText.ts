'use server';

import executeServerAction from '@/util/executeServerAction';

export const LOCAL_STORAGE_KEY = 'text';

export default async function updateText(text: string) {
	return executeServerAction({
		action: async (_text: string) => {
			await fetch('http://google.de');
		},
		fallback: (text: string) => {
			localStorage.setItem(LOCAL_STORAGE_KEY, text);
		},
		params: [text],
	});
}
