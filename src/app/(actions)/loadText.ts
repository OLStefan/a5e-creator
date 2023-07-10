'use server';

import executeServerAction from '@/util/executeServerAction';

export default async function loadText(executedOnClient?: boolean) {
	return executeServerAction({
		action: async () => {
			// TODO implement loading from DB
			return fetch('http://google.de').then(() => ({ text: '' }));
		},
		fallback: async () => ({
			text: localStorage.getItem('text') ?? '',
		}),
		executedOnClient,
	});
}
