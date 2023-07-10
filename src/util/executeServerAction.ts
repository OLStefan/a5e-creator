const serverAllowed = !process.env.NEXT_PUBLIC_STATIC_EXPORT;

export default function executeServerAction<Action extends (...args: never[]) => any>(params: {
	action: Action;
	fallback: Action | (() => Promise<null>);
	fallbackClient?: Action;
	params?: undefined;
	executedOnClient?: boolean;
}): ReturnType<Action> | null;
export default function executeServerAction<Action extends (...args: any) => any>(params: {
	action: Action;
	fallback: Action | ((...args: Parameters<Action>) => Promise<null>);
	fallbackClient?: Action;
	params: Parameters<Action>;
	executedOnClient?: boolean;
}): ReturnType<Action> | null;
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
		return action(...params);
	}

	if (executedOnClient) {
		const func = fallbackClient ?? fallback;
		return func(...params);
	}
	return fallback(...params);
}
