const serverAllowed = !process.env.NEXT_PUBLIC_STATIC_EXPORT;

export default function executeServerAction<Action extends (...args: never[]) => any>(params: {
	action: Action;
	fallback: Action;
	params?: undefined;
	executedOnClient?: boolean;
}): ReturnType<Action> | null;
export default function executeServerAction<Action extends (...args: any) => any>(params: {
	action: Action;
	fallback: Action | ((...args: Parameters<Action>) => Promise<null>);
	params: Parameters<Action>;
	executedOnClient?: boolean;
}): ReturnType<Action> | null;
export default function executeServerAction<Action extends (...args: any) => any>({
	action,
	fallback,
	params = [] as Parameters<Action>,
	executedOnClient,
}: {
	action: Action;
	fallback: Action;
	params?: Parameters<Action>;
	executedOnClient?: boolean;
}) {
	if (serverAllowed) {
		// Server action
		return action(...params);
	}

	if (executedOnClient) {
		// Fallback for static export
		return fallback(...params);
	}

	// Static export build
	return null;
}
