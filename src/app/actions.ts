'use server';

import executeServerAction from '@/util/executeServerAction';

const LOCAL_STORAGE_KEY = 'text';

export async function updateText(text: string) {
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

export async function loadText(executedOnClient?: boolean) {
	return executeServerAction({
		action: async () => {
			return fetch('http://google.de').then(() => ({ text: '' }));
		},
		fallback: async () => null,
		fallbackClient: async () => ({
			text: localStorage.getItem(LOCAL_STORAGE_KEY) ?? '',
		}),
		executedOnClient,
	});
}
