import { serverAllowed } from '@/global';

export default function executeServerAction<Action extends (...args: never[]) => any>(params: {
	action: Action;
	fallback: Action;
	params?: undefined;
}): ReturnType<Action>;
export default function executeServerAction<Action extends (...args: any) => any>(params: {
	action: Action;
	fallback: Action;
	params: Parameters<Action>;
}): ReturnType<Action>;
export default function executeServerAction<Action extends (...args: any) => any>({
	action,
	fallback,
	params = [] as Parameters<Action>,
}: {
	action: Action;
	fallback: Action;
	params?: Parameters<Action>;
}) {
	if (serverAllowed) {
		return action(...params);
	}

	return fallback(...params);
}
