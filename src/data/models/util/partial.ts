import { IMaybe, IModelType, ModelProperties, types } from 'mobx-state-tree';

export function partial<T extends ModelProperties>(model: IModelType<T, unknown, unknown, unknown>) {
	const partialProperties = Object.entries(model.properties).reduce(
		(prev, [key, value]) => ({
			...prev,
			[key]: types.maybe(value),
		}),
		{} as { [K in keyof T]: IMaybe<T[K]> },
	);

	return types.model(partialProperties);
}
