'use server';

import executeServerAction from '@/util/executeServerAction';

export default async function updateText(text: string) {
	return executeServerAction({
		action: async (_text: string) => {
			// TODO implement storing to DB
			await fetch('http://google.de');
		},
		fallback: (text: string) => {
			localStorage.setItem('text', text);
		},
		params: [text],
		// Is only triggered from user action
		executedOnClient: true,
	});
}
