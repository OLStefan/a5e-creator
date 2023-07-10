'use client';

import { useEffect, useState } from 'react';

export function useLoadedValue<Value extends any>({
	initialValue,
	loadFunction,
	defaultValue,
}: {
	initialValue: Value | null;
	loadFunction: () => Promise<Value | null>;
	defaultValue: Value;
}): Value {
	console.log('Hook', { initialValue });
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		if (value === null) {
			loadFunction().then((v) => {
				console.log('Callback', { value: v });
				setValue(v ?? defaultValue);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return value ?? defaultValue;
}
