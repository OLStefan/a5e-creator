'use client';
import { useState } from 'react';

export function useLoadedValue<Value extends any>({
	initialValue,
	loadFunction,
	defaultValue,
}: {
	initialValue: Value | null;
	loadFunction: () => Promise<Value | null>;
	defaultValue: Value;
}): Value {
	console.log('Hook', {initialValue});
	const [value, setValue] = useState(initialValue);

	if (value === null) {
		loadFunction().then((v) => {
			console.log('Callback', {value: v});
			setValue(v ?? defaultValue);
		});
		return defaultValue;
	}

	return value;
}
