'use client';

import useMount from '@/hooks/useMount';
import { IAnyModelType, Instance, SnapshotIn } from 'mobx-state-tree';
import { Context, ReactNode, useState } from 'react';

export interface StaticExportProviderHandlerProps<TModel extends IAnyModelType> {
	Context: Context<Instance<TModel>>;
	initialValue: SnapshotIn<TModel> | null;
	loadFunction: () => Promise<SnapshotIn<TModel> | null>;
	children: ReactNode;
	model: TModel;
}
export function StaticExportProviderHandler<TModel extends IAnyModelType>({
	Context,
	initialValue,
	loadFunction,
	children,
	model,
}: StaticExportProviderHandlerProps<TModel>) {
	const value = useLoadedValue({ initialValue, loadFunction });

	if (value === null) {
		return null;
	}

	const instance = model.create(value);

	return <Context.Provider value={instance}>{children}</Context.Provider>;
}

function useLoadedValue<Value extends unknown>({
	initialValue,
	loadFunction,
}: {
	initialValue: Value | null;
	loadFunction: () => Promise<Value | null>;
}): Value | null {
	const [value, setValue] = useState(initialValue);

	useMount(() => {
		if (initialValue === null) {
			loadFunction().then((v) => {
				console.log('Callback', { value: v });
				setValue(v);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	return value;
}
