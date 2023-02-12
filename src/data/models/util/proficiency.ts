import { IAnyComplexType, types } from 'mobx-state-tree';

export function createProficiency<Model extends IAnyComplexType, Category extends string>(
	model: Model,
	categories: Array<Category>,
	name: string,
) {
	return types.union(
		types.model(`Individual ${name} Proficiency`, {
			ref: types.literal('Individual'),
			weapon: types.safeReference(model),
		}),
		types.model(`Category ${name} Proficiency`, {
			ref: types.enumeration(categories),
		}),
	);
}
