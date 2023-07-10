const serverAllowed = !process.env.NEXT_PUBLIC_STATIC_EXPORT;

export default function executeServerAction<Action extends (...args: never[]) => any>(params: {
	action: Action;
	fallback: Action;
	fallbackClient?: Action;
	params?: undefined;
	executedOnClient?: boolean;
}): ReturnType<Action>;
export default function executeServerAction<Action extends (...args: any) => any>(params: {
	action: Action;
	fallback: Action;
	fallbackClient?: Action;
	params: Parameters<Action>;
	executedOnClient?: boolean;
}): ReturnType<Action>;
export default function executeServerAction<Action extends (...args: any) => any>({
	action,
	fallback,
	fallbackClient,
	params = [] as Parameters<Action>,
	executedOnClient,
}: {
	action: Action;
	fallback: Action;
	fallbackClient?: Action;
	params?: Parameters<Action>;
	executedOnClient?: boolean;
}) {
	if (serverAllowed) {
		console.log('Server Action');
		return action(...params);
	}

	if (executedOnClient) {
		const func = fallbackClient ?? fallback;
		return func(...params);
	}
	return fallback(...params);
}
