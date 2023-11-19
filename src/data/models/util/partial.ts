import { upperFirst } from 'lodash';
import { IMaybe, IModelType, ModelProperties, types } from 'mobx-state-tree';

export function partial<TProperties extends ModelProperties>(
	model: IModelType<TProperties, unknown, unknown, unknown>,
) {
	const partialProperties = Object.entries(model.properties).reduce(
		(prev, [key, value]) => ({
			...prev,
			[key]: types.maybe(value),
		}),
		{} as { [K in keyof TProperties]: IMaybe<TProperties[K]> },
	);

	return types.model(`partial${upperFirst(model.name)}`, partialProperties);
}
