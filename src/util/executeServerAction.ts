const isServer = process.env.IS_SERVER;
const serverAllowed = !process.env.NEXT_PUBLIC_STATIC_EXPORT;

export default function executeServerAction<Action extends (...args: never[]) => any>(params: {
	action: Action;
	fallback: Action;
	fallbackClient?: Action;
	params?: undefined;
}): ReturnType<Action>;
export default function executeServerAction<Action extends (...args: any) => any>(params: {
	action: Action;
	fallback: Action;
	fallbackClient?: Action;
	params: Parameters<Action>;
}): ReturnType<Action>;
export default function executeServerAction<Action extends (...args: any) => any>({
	action,
	fallback,
	fallbackClient,
	params = [] as Parameters<Action>,
}: {
	action: Action;
	fallback: Action;
	fallbackClient?: Action;
	params?: Parameters<Action>;
}) {
	if (serverAllowed) {
		console.log('Server Action');
		return action(...params);
	}

	if (isServer || !fallbackClient) {
		console.log('Server Fallback');
		return fallback(...params);
	}

	console.log('Client Fallback');
	return fallbackClient(...params);
}
