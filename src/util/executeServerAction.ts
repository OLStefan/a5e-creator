import { isServer, serverAllowed } from '@/global';

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
		return action(...params);
	}

	if (isServer || !fallbackClient) {
		return fallback(...params);
	}

	return fallbackClient(...params);
}
