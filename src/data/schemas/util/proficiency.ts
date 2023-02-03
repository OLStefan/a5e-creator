import { IAnyComplexType, types } from 'mobx-state-tree';

export function createProficiency<Model extends IAnyComplexType, Category extends string>(
	model: Model,
	categories: Array<Category>,
) {
	return types.union(
		types.model({
			ref: types.literal('Individual'),
			weapon: types.reference(model),
		}),
		types.model({
			ref: types.enumeration(categories),
		}),
	);
}
