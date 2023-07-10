'use client';

import { useEffect, useState } from 'react';

export function useLoadedValue<Value extends unknown>({
	initialValue,
	loadFunction,
}: {
	initialValue: Value | null;
	loadFunction: () => Promise<Value | null>;
}): Value | null {
	console.log('Hook', { initialValue });
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (initialValue === null) {
			loadFunction().then((v) => {
				console.log('Callback', { value: v });
				setValue(v);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return value;
}
