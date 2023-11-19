import { Instance, types } from 'mobx-state-tree';
import { sourceReferenceModel } from '../source';

export const descriptionModel = types.model('description', {
	name: types.identifier,
	description: types.optional(types.string, ''),
});

export const sourcedDescriptionModel = types.compose(
	'sourcedDescription',
	descriptionModel,
	types.model({
		source: sourceReferenceModel,
		disabled: types.maybe(types.boolean),
	}),
);

export interface SourcedDescription extends Instance<typeof sourcedDescriptionModel> {}

export const additionalDescriptionModel = types.compose(
	'additionalDescription',
	sourcedDescriptionModel,
	types.model({
		additionalString: types.optional(types.string, ''),
	}),
);

export function createAdditionalDescriptionReference<T extends typeof additionalDescriptionModel>(
	model: T,
	name: string,
) {
	return types.model(`${name}Reference`, {
		ref: types.reference(model),
		additional: types.map(types.union(types.string, types.number)),
	});
}
