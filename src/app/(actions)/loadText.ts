'use server';

import executeServerAction from '@/util/executeServerAction';
import { LOCAL_STORAGE_KEY } from './updateText';

export default async function loadText(executedOnClient?: boolean) {
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
