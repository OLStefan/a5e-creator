'use server';

import executeServerAction from '@/util/executeServerAction';

const LOCAL_STORAGE_KEY = 'text';

export async function updateText(text: string) {
	return executeServerAction({
		action: (text: string) => {
			fetch('http://google.de').then(() => {
				console.log('Fetched');
				console.log(text);
			});
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
			return fetch('http://google.de').then(() => {
				console.log('Fetched');
				return '';
			});
		},
		fallback: async () => null,
		fallbackClient: async () => localStorage.getItem(LOCAL_STORAGE_KEY),
		executedOnClient,
	});
}
